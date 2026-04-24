import React from "react";

const words = [
  "Goodyear Welt",
  "Box-Calf Italiano",
  "Hand-Lasted in Roma",
  "120 Passaggi",
  "Leather Insole",
  "Hand-Finished Edges",
  "Goodyear Welt",
  "Box-Calf Italiano",
  "Hand-Lasted in Roma",
  "120 Passaggi",
  "Leather Insole",
  "Hand-Finished Edges",
];

export default function Marquee() {
  return (
    <div
      data-testid="marquee"
      className="relative py-8 border-y border-[rgba(242,240,233,0.1)] overflow-hidden bg-[#070707]"
    >
      <div className="flex whitespace-nowrap marquee-track">
        {words.concat(words).map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-8 px-6 font-serif italic text-2xl md:text-3xl text-[#F2F0E9]/70"
          >
            {w}
            <span className="text-[#A69076] text-sm">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
