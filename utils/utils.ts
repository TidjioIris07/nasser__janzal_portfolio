export const scrollToSection = (
  event: React.MouseEvent<HTMLAnchorElement>,
  sectionId: string,
) => {
  event.preventDefault();

  const id = sectionId.replace("#", "");
  const element = document.getElementById(id);

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  window.history.pushState(null, "", `#${id}`);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const showForm = () => {
  window.dispatchEvent(new CustomEvent("open-enquiry-form"));
};

export const hideForm = () => {
  window.dispatchEvent(new CustomEvent("close-enquiry-form"));
};