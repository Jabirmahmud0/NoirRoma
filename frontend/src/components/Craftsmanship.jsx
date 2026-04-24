import React from "react";

export default function Craftsmanship() {
  return (
    <section
      id="atelier"
      data-testid="craftsmanship-section"
      className="relative py-24 md:py-32 bg-[#070707]"
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="md:col-span-7 relative">
            <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/34510831/pexels-photo-34510831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1200"
                alt="A cobbler crafting leather shoes"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-[#070707] border border-[rgba(242,240,233,0.1)] p-6 max-w-xs">
              <p className="overline mb-2">N° 04</p>
              <p className="font-mono text-xs text-[#8A8A85] leading-relaxed">
                Hand-stitching the welt · 14,200 passes per pair
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-5 md:pl-6">
            <p className="overline mb-6">II. L'Atelier</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter uppercase leading-[0.95]">
              A shoe is
              <br />
              <span className="italic text-[#A69076]">never</span> finished
            </h2>
            <div className="mt-10 space-y-6 text-[#F2F0E9]/80 font-light leading-relaxed tracking-wide">
              <p>
                Our workshop sits above Via Giulia, in a seventeenth-century
                palazzo where our grandfather first stitched a welt in 1962. The
                rooms have not changed. Neither has the process.
              </p>
              <p>
                Each pair takes forty-eight hours across one-hundred-and-twenty
                steps. We cut from a single hide to preserve grain continuity. We
                last for seven days. We hand-burnish every edge in open flame.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[rgba(242,240,233,0.1)] pt-8">
              {[
                ["48", "hours per pair"],
                ["120", "artisanal steps"],
                ["1962", "established in Roma"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-serif text-3xl md:text-4xl text-[#F2F0E9]">
                    {n}
                  </p>
                  <p className="mt-2 text-[10px] tracking-[0.2em] uppercase text-[#8A8A85]">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
