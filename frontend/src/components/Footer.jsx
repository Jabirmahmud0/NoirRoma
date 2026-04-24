import React from "react";
import { useSizeGuide } from "./SizeGuideProvider";

export default function Footer() {
  const { open: openSizeGuide } = useSizeGuide();

  return (
    <footer
      data-testid="site-footer"
      className="relative bg-[#070707] border-t border-[rgba(242,240,233,0.08)] pt-24 pb-10 overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 pb-20">
          <div className="col-span-2 md:col-span-5">
            <p className="font-serif text-2xl tracking-[0.35em] uppercase">
              Noir Roma
            </p>
            <p className="mt-6 text-sm text-[#8A8A85] font-light leading-relaxed max-w-sm">
              Via Giulia 142, Roma 00186 · Italia
              <br />
              Atelier open by appointment, Tuesday–Saturday.
            </p>
            <p className="mt-6 font-mono text-xs text-[#8A8A85]">
              concierge@noirroma.it
            </p>
          </div>

          <FooterCol
            title="Atelier"
            links={[
              { label: "Our Story", href: "#atelier" },
              { label: "The Workshop", href: "#atelier" },
              { label: "Journal", href: "#journal" },
            ]}
          />
          <FooterCol
            title="Shop"
            links={[
              { label: "Oxfords", href: "#collection" },
              { label: "Loafers", href: "#collection" },
              { label: "Bespoke Service", href: "#collection" },
            ]}
          />
          <FooterCol
            title="Service"
            links={[
              { label: "Size Guide", onClick: openSizeGuide },
              { label: "Shipping", href: "#" },
              { label: "Returns", href: "#" },
              { label: "Care Notes", href: "#" },
            ]}
          />
        </div>

        {/* Massive brand mark */}
        <div className="relative border-t border-[rgba(242,240,233,0.08)] pt-10">
          <p className="font-serif text-[22vw] leading-[0.8] tracking-tighter uppercase text-[#F2F0E9]/[0.04] select-none pointer-events-none whitespace-nowrap text-center">
            NOIR ROMA
          </p>
          <div className="relative -mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[10px] tracking-[0.2em] uppercase text-[#8A8A85]">
            <p>© MMXXV NOIR ROMA S.r.l.</p>
            <p className="font-mono normal-case tracking-wider">
              Hand-made in Roma · Italia
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#A69076] transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-[#A69076] transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-[#A69076] transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div className="col-span-1 md:col-span-2">
      <p className="overline mb-6">{title}</p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            {l.onClick ? (
              <button
                onClick={l.onClick}
                className="text-sm font-light text-[#F2F0E9]/80 hover:text-[#A69076] transition-colors link-underline"
              >
                {l.label}
              </button>
            ) : (
              <a
                href={l.href}
                className="text-sm font-light text-[#F2F0E9]/80 hover:text-[#A69076] transition-colors link-underline"
              >
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
