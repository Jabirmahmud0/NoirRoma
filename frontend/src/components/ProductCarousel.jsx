import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const products = [
  {
    id: "il-cavaliere",
    name: "Il Cavaliere",
    type: "Whole-cut Oxford",
    price: "€1,480",
    leather: "Nero Box-Calf",
    image:
      "https://images.pexels.com/photos/4161710/pexels-photo-4161710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=960",
  },
  {
    id: "il-senatore",
    name: "Il Senatore",
    type: "Double-Monk Strap",
    price: "€1,580",
    leather: "Cognac Box-Calf",
    image:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "appia-antica",
    name: "Appia Antica",
    type: "Cap-toe Oxford",
    price: "€1,520",
    leather: "Nero Box-Calf",
    image:
      "https://images.unsplash.com/photo-1677203006929-fd0d9f4f350d?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
  },
  {
    id: "trastevere",
    name: "Trastevere",
    type: "Brogue Oxford",
    price: "€1,390",
    leather: "Caffè Box-Calf",
    image:
      "https://images.pexels.com/photos/8670488/pexels-photo-8670488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=960",
  },
  {
    id: "sorrento",
    name: "Sorrento",
    type: "Derby",
    price: "€1,260",
    leather: "Biscotto Box-Calf",
    image:
      "https://images.unsplash.com/photo-1653868250398-8efc756b601d?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
  },
  {
    id: "piazza-navona",
    name: "Piazza Navona",
    type: "Classic Derby",
    price: "€1,340",
    leather: "Noir Box-Calf",
    image:
      "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=960",
  },
];

export default function ProductCarousel() {
  const scrollerRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.clientWidth + 48 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const addToBag = (p) => {
    toast(`${p.name} added to bag`, {
      description: `${p.type} · ${p.leather}`,
    });
  };

  return (
    <section
      id="collection"
      data-testid="product-carousel-section"
      className="relative py-24 md:py-32 bg-[#070707]"
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Header row */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <p className="overline mb-4">I. Collezione</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter uppercase leading-[0.95]">
              The <span className="italic">Collezione</span>
            </h2>
            <p className="mt-6 max-w-md text-sm text-[#8A8A85] font-light leading-relaxed">
              Six silhouettes. One atelier. Each pair numbered, signed, and
              delivered in a linen sleeve.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              data-testid="carousel-prev-btn"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Previous"
              className="w-12 h-12 flex items-center justify-center border border-[rgba(242,240,233,0.2)] text-[#F2F0E9] hover:bg-[#F2F0E9] hover:text-[#070707] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#F2F0E9] transition-all duration-500"
            >
              <ArrowLeft strokeWidth={1.5} className="w-4 h-4" />
            </button>
            <button
              data-testid="carousel-next-btn"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Next"
              className="w-12 h-12 flex items-center justify-center border border-[rgba(242,240,233,0.2)] text-[#F2F0E9] hover:bg-[#F2F0E9] hover:text-[#070707] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#F2F0E9] transition-all duration-500"
            >
              <ArrowRight strokeWidth={1.5} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroller */}
      <div
        ref={scrollerRef}
        data-testid="product-scroller"
        className="no-scrollbar overflow-x-auto scroll-smooth"
      >
        <div className="flex gap-8 md:gap-12 px-6 md:px-12 pb-4 w-max">
          {products.map((p, idx) => (
            <article
              key={p.id}
              data-card
              data-testid={`product-card-${p.id}`}
              className="group w-[75vw] sm:w-[50vw] md:w-[32vw] lg:w-[26vw] max-w-[440px] flex-shrink-0"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#121212]">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform ease-out group-hover:scale-105"
                  style={{ transitionDuration: '1.2s' }}
                />
                <div className="absolute top-4 left-4 font-mono text-[10px] text-[#F2F0E9]/70 tracking-widest">
                  N° 0{idx + 1}
                </div>
                <button
                  data-testid={`add-to-bag-${p.id}`}
                  onClick={() => addToBag(p)}
                  className="absolute bottom-4 left-4 right-4 bg-[#F2F0E9] text-[#070707] text-[10px] tracking-[0.3em] uppercase font-medium py-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#A69076]"
                >
                  Add to Bag
                </button>
              </div>
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-light tracking-tight">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#8A8A85] tracking-wider uppercase">
                    {p.type} · {p.leather}
                  </p>
                </div>
                <p className="font-mono text-sm text-[#F2F0E9] whitespace-nowrap">
                  {p.price}
                </p>
              </div>
            </article>
          ))}
          {/* Tail spacer */}
          <div className="w-6 md:w-12 flex-shrink-0" />
        </div>
      </div>

      {/* Mobile arrows */}
      <div className="flex md:hidden items-center justify-center gap-3 mt-10">
        <button
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          aria-label="Previous"
          className="w-11 h-11 flex items-center justify-center border border-[rgba(242,240,233,0.2)] text-[#F2F0E9] disabled:opacity-30"
        >
          <ArrowLeft strokeWidth={1.5} className="w-4 h-4" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          aria-label="Next"
          className="w-11 h-11 flex items-center justify-center border border-[rgba(242,240,233,0.2)] text-[#F2F0E9] disabled:opacity-30"
        >
          <ArrowRight strokeWidth={1.5} className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
