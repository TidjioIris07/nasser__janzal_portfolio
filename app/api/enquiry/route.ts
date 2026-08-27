import { Resend } from "resend";

const MAX_NAME_LENGTH = 120;
const MAX_COMPANY_LENGTH = 160;
const MAX_SCOPE_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 5_000;

type Enquiry = {
  fullName: string;
  email: string;
  company: string;
  scope: string;
  message: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatMessage = (value: string) =>
  escapeHtml(value).replaceAll("\n", "<br />");

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const getEnquiry = (body: unknown): Enquiry | null => {
  if (!body || typeof body !== "object") return null;

  const payload = body as Record<string, unknown>;
  const getString = (key: string) =>
    typeof payload[key] === "string" ? payload[key].trim() : "";

  const enquiry = {
    fullName: getString("fullName"),
    email: getString("email").toLowerCase(),
    company: getString("company"),
    scope: getString("scope"),
    message: getString("message"),
  };

  if (
    !enquiry.fullName ||
    !isValidEmail(enquiry.email) ||
    !enquiry.scope ||
    !enquiry.message ||
    enquiry.fullName.length > MAX_NAME_LENGTH ||
    enquiry.company.length > MAX_COMPANY_LENGTH ||
    enquiry.scope.length > MAX_SCOPE_LENGTH ||
    enquiry.message.length > MAX_MESSAGE_LENGTH
  ) {
    return null;
  }

  return enquiry;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !recipient || !from) {
    console.error("Enquiry email is not configured.");
    return Response.json({ error: "Email service is not configured." }, { status: 503 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const enquiry = getEnquiry(body);

  if (!enquiry) {
    return Response.json({ error: "Please provide valid enquiry details." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const senderName = escapeHtml(enquiry.fullName);
  const company = enquiry.company ? escapeHtml(enquiry.company) : "Not provided";

  const enquiryEmail = await resend.emails.send({
    from,
    to: recipient,
    replyTo: enquiry.email,
    subject: `New enquiry from ${enquiry.fullName}`,
    text: [
      "New website enquiry",
      "",
      `Name: ${enquiry.fullName}`,
      `Email: ${enquiry.email}`,
      `Company: ${enquiry.company || "Not provided"}`,
      `Engagement scope: ${enquiry.scope}`,
      "",
      "Message:",
      enquiry.message,
    ].join("\n"),
    html: `
      <h1>New website enquiry</h1>
      <p><strong>Name:</strong> ${senderName}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(enquiry.email)}">${escapeHtml(enquiry.email)}</a></p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Engagement scope:</strong> ${escapeHtml(enquiry.scope)}</p>
      <p><strong>Message:</strong></p>
      <p>${formatMessage(enquiry.message)}</p>
    `,
  });

  if (enquiryEmail.error) {
    console.error("Could not send enquiry email:", enquiryEmail.error);
    return Response.json({ error: "We could not send your enquiry." }, { status: 502 });
  }

  const confirmationEmail = await resend.emails.send({
    from,
    to: enquiry.email,
    subject: "We received your enquiry",
    text: `Hello ${enquiry.fullName},\n\nThank you for contacting Nasser's management team. Your enquiry has been received and the team will be in touch shortly.\n\nKind regards,\nNasser's Management Team`,
    html: `
      <p>Hello ${senderName},</p>
      <p>Thank you for contacting Nasser's management team. Your enquiry has been received and the team will be in touch shortly.</p>
      <p>Kind regards,<br />Nasser's Management Team</p>
    `,
  });

  if (confirmationEmail.error) {
    console.error("Enquiry received, but confirmation email could not be sent:", confirmationEmail.error);
    return Response.json(
      { error: "Your enquiry was received, but the confirmation email could not be sent." },
      { status: 502 },
    );
  }

  return Response.json({ success: true });
}
