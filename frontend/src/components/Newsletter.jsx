import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast("Please enter a valid email", {
        description: "We respect your inbox.",
      });
      return;
    }
    setSubmitted(true);
    toast("Welcome to the Atelier", {
      description: "A letter is on its way to " + trimmed,
    });
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      data-testid="newsletter-section"
      className="relative py-24 md:py-40 bg-[#070707] border-t border-[rgba(242,240,233,0.08)]"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <p className="overline mb-8">IV. Corrispondenza</p>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter uppercase leading-[0.95]">
          Join <span className="italic text-[#A69076]">the</span> Atelier
        </h2>
        <p className="mt-8 max-w-xl mx-auto text-sm md:text-base text-[#8A8A85] font-light leading-relaxed tracking-wide">
          Receive a letter four times a year. New releases, workshop notes, and
          the occasional invitation to Roma. No noise.
        </p>

        <form
          data-testid="newsletter-form"
          onSubmit={handleSubmit}
          className="mt-16 max-w-xl mx-auto flex items-end gap-4 border-b border-[rgba(242,240,233,0.2)] focus-within:border-[#A69076] transition-colors"
        >
          <input
            data-testid="newsletter-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@residence.com"
            className="flex-1 bg-transparent py-4 text-base md:text-lg font-light text-[#F2F0E9] placeholder:text-[#8A8A85]/60 outline-none tracking-wide"
            aria-label="Email address"
          />
          <button
            data-testid="newsletter-submit-btn"
            type="submit"
            className="pb-4 pl-4 text-[#F2F0E9] hover:text-[#A69076] transition-colors"
            aria-label="Subscribe"
          >
            {submitted ? (
              <Check strokeWidth={1.5} className="w-6 h-6 text-[#A69076]" />
            ) : (
              <ArrowRight strokeWidth={1.5} className="w-6 h-6" />
            )}
          </button>
        </form>

        <p className="mt-6 text-[10px] tracking-[0.2em] uppercase text-[#8A8A85]">
          Unsubscribe with a single reply · We never share
        </p>
      </div>
    </section>
  );
}
