import React, { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useSizeGuide } from "./SizeGuideProvider";

const navLinks = [
  { label: "Collezione", id: "collection" },
  { label: "Atelier", id: "atelier" },
  { label: "Journal", id: "journal" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openSizeGuide } = useSizeGuide();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <>
      <header
        data-testid="site-header"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#070707]/80 backdrop-blur-xl border-b border-[rgba(242,240,233,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Left: nav links (desktop) / burger (mobile) */}
          <nav className="hidden md:flex items-center gap-10 flex-1">
            {navLinks.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-${l.id}`}
                onClick={() => scrollTo(l.id)}
                className="text-[11px] tracking-[0.25em] uppercase font-medium text-[#F2F0E9]/80 hover:text-[#A69076] transition-colors link-underline"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            data-testid="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-[#F2F0E9]"
            aria-label="Open menu"
          >
            <Menu strokeWidth={1.5} className="w-6 h-6" />
          </button>

          {/* Center: logo */}
          <div className="flex-1 flex justify-center">
            <button
              data-testid="brand-logo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-serif text-xl md:text-2xl tracking-[0.4em] uppercase font-light"
            >
              Noir Roma
            </button>
          </div>

          {/* Right: utilities */}
          <div className="flex-1 flex items-center justify-end gap-6 md:gap-8">
            <button
              data-testid="size-guide-trigger"
              onClick={openSizeGuide}
              className="hidden md:inline-block text-[11px] tracking-[0.25em] uppercase font-medium text-[#F2F0E9]/80 hover:text-[#A69076] transition-colors link-underline"
            >
              Size Guide
            </button>
            <button
              data-testid="search-btn"
              className="text-[#F2F0E9]/80 hover:text-[#A69076] transition-colors"
              aria-label="Search"
            >
              <Search strokeWidth={1.5} className="w-[18px] h-[18px]" />
            </button>
            <button
              data-testid="cart-btn"
              className="relative text-[#F2F0E9]/80 hover:text-[#A69076] transition-colors"
              aria-label="Bag"
            >
              <ShoppingBag strokeWidth={1.5} className="w-[18px] h-[18px]" />
              <span className="absolute -top-1 -right-2 text-[9px] font-mono text-[#A69076]">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="fixed inset-0 z-50 bg-[#070707] flex flex-col"
        >
          <div className="h-20 px-6 flex items-center justify-between border-b border-[rgba(242,240,233,0.08)]">
            <span className="font-serif text-xl tracking-[0.4em] uppercase">
              Noir Roma
            </span>
            <button
              data-testid="mobile-menu-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X strokeWidth={1.5} className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-10 gap-10">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left font-serif text-4xl font-light tracking-tight hover:text-[#A69076] transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                openSizeGuide();
                setMobileOpen(false);
              }}
              className="text-left font-serif text-4xl font-light tracking-tight hover:text-[#A69076] transition-colors"
            >
              Size Guide
            </button>
          </div>
        </div>
      )}
    </>
  );
}
