import Image from "next/image";

interface PartnerCardProps {
    name: string;
    photo: string;
    location: string;
    details: string[];
}

const PartnerCard = ({
    name,
    photo,
    location,
    details,
}: PartnerCardProps) => {
    return (
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] hover:border-neutral-300 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="font-brand font-bold text-xl sm:text-2xl md:text-3xl text-neutral-950 uppercase tracking-[-0.03em] leading-snug">
                    {name}
                </h3>

                <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-3 shrink-0">
                    <span className="text-xs font-mono text-neutral-500 tracking-wider">
                        {location}
                    </span>

                    <div className="relative h-14 sm:h-16 w-36 sm:w-44 bg-white rounded-2xl p-2.5 border border-neutral-200/90 flex items-center justify-center shadow-sm">
                        <Image
                            src={photo}
                            alt={`${name} logo`}
                            fill
                            className="object-contain p-2.5"
                        />
                    </div>
                </div>
            </div>

            <ul className="space-y-2.5 pt-4 border-t border-neutral-100 mt-4">
                {details.map((detail, index) => (
                    <li
                        key={index}
                        className="text-sm leading-relaxed text-neutral-600 sm:text-base"
                    >
                        {detail}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PartnerCard;