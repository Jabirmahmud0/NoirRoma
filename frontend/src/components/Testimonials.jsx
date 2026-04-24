import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "The loafers are built like no other pair I own. I bought my first in Roma a decade ago — they have been resoled twice and are more handsome now than the day they arrived.",
    author: "Marcus Vellani",
    role: "Architect · Milano",
  },
  {
    quote:
      "Every man should own one pair of shoes that out-lives him. For me, that is my Cavaliere oxford. The leather learned my foot and I think I learned something from it.",
    author: "Laurent Dubois",
    role: "Editor-in-Chief · Paris",
  },
  {
    quote:
      "I wrote to the atelier about a bespoke cognac and received a handwritten letter and a hide sample the following week. This is not commerce. It is correspondence.",
    author: "Hiroshi Tanaka",
    role: "Gallerist · Kyoto",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[i];

  return (
    <section
      id="journal"
      data-testid="testimonials-section"
      className="relative py-24 md:py-40 bg-[#070707] overflow-hidden"
    >
      {/* Background lifestyle image with heavy overlay */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://images.pexels.com/photos/15776455/pexels-photo-15776455.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800"
          alt=""
          className="w-full h-full object-cover grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070707] via-[#070707]/85 to-[#070707]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
        <p className="overline mb-10">III. Voci</p>

        <span className="font-serif text-[8rem] md:text-[12rem] leading-none text-[#A69076]/30 block -mb-12 md:-mb-20 select-none">
          &ldquo;
        </span>

        <div
          key={i}
          data-testid={`testimonial-${i}`}
          className="fade-up"
        >
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-tight italic text-[#F2F0E9] max-w-4xl mx-auto">
            {t.quote}
          </blockquote>
          <div className="mt-12">
            <div className="w-16 h-px bg-[#A69076] mx-auto mb-4" />
            <p className="text-sm tracking-[0.2em] uppercase text-[#F2F0E9] font-medium">
              {t.author}
            </p>
            <p className="mt-1 text-xs text-[#8A8A85] tracking-wider">
              {t.role}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-16 flex items-center justify-center gap-6">
          <button
            data-testid="testimonial-prev"
            onClick={() =>
              setI((v) => (v - 1 + testimonials.length) % testimonials.length)
            }
            aria-label="Previous testimonial"
            className="text-[#F2F0E9]/70 hover:text-[#A69076] transition-colors"
          >
            <ArrowLeft strokeWidth={1.5} className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                data-testid={`testimonial-dot-${idx}`}
                onClick={() => setI(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-px transition-all duration-500 ${
                  idx === i
                    ? "w-10 bg-[#A69076]"
                    : "w-6 bg-[#F2F0E9]/20 hover:bg-[#F2F0E9]/50"
                }`}
              />
            ))}
          </div>
          <button
            data-testid="testimonial-next"
            onClick={() => setI((v) => (v + 1) % testimonials.length)}
            aria-label="Next testimonial"
            className="text-[#F2F0E9]/70 hover:text-[#A69076] transition-colors"
          >
            <ArrowRight strokeWidth={1.5} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
