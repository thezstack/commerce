'use client';

import Image from 'next/image';

type SocialProofLogo = {
  label: string;
  src?: string;
};

type SocialProofTestimonial = {
  quote: string;
  name: string;
  role: string;
  school: string;
};

export default function SocialProof({
  title,
  subtitle,
  logos,
  testimonials
}: {
  title: string;
  subtitle: string;
  logos: SocialProofLogo[];
  testimonials: SocialProofTestimonial[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-[#0B2C3F]">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm text-[#4C616E]">{subtitle}</p>
        </div>
        <span className="rounded-full bg-[#E7F7FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B80A7]">
          Partner schools
        </span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {logos.map((logo, index) => (
          <div
            key={`${logo.label}-${index}`}
            className="flex items-center justify-center rounded-2xl border border-[#E3EEF4] bg-white/80 p-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7E8A] shadow-sm"
          >
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.label}
                width={120}
                height={48}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span>{logo.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.name}-${index}`}
            className="rounded-2xl border border-[#E3EEF4] bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-[#344D5A]">“{testimonial.quote}”</p>
            <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#0B80A7]">
              {testimonial.name}
            </div>
            <div className="text-xs text-[#6B7E8A]">
              {testimonial.role} · {testimonial.school}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

