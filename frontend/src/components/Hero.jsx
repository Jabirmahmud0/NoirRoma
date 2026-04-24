import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen w-full flex items-end overflow-hidden"
    >
      {/* Background product image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/4161710/pexels-photo-4161710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800"
          alt="Black leather oxford"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/70 to-[#070707]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/80 via-transparent to-transparent" />
      </div>

      {/* Top-right label */}
      <div className="absolute top-28 md:top-32 right-6 md:right-12 z-10 text-right fade-up">
        <p className="overline mb-2">Collezione · Inverno</p>
        <p className="font-mono text-xs text-[#8A8A85] tracking-wider">
          Roma — MMXXV
        </p>
      </div>

      {/* Main content bottom-left */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 pb-20 md:pb-32 w-full">
        <div className="max-w-3xl fade-up">
          <p className="overline mb-6">Atelier — Est. 1962</p>
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-light leading-[0.9] tracking-tighter uppercase">
            Architettura
            <br />
            <span className="italic font-light text-[#A69076]">del</span> Passo
          </h1>
          <p className="mt-10 max-w-lg text-base md:text-lg font-light leading-relaxed text-[#F2F0E9]/80 tracking-wide">
            Oxfords and loafers hand-lasted across one hundred and twenty steps in
            our Roma atelier. Italian box-calf, Goodyear welt, patience.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
            <button
              data-testid="hero-cta-explore"
              onClick={() =>
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-4 px-8 py-4 bg-[#F2F0E9] text-[#070707] text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#A69076] hover:text-[#070707] transition-all duration-500"
            >
              Explore Collection
              <ArrowRight
                strokeWidth={1.5}
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              data-testid="hero-cta-story"
              onClick={() =>
                document
                  .getElementById("atelier")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-[11px] tracking-[0.3em] uppercase font-medium text-[#F2F0E9]/80 hover:text-[#A69076] transition-colors link-underline"
            >
              The Atelier Story
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-3 opacity-60">
        <span className="overline text-[10px]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#F2F0E9] to-transparent" />
      </div>
    </section>
  );
}
