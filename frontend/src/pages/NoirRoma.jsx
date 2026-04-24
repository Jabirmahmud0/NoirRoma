import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import ProductCarousel from "../components/ProductCarousel";
import Craftsmanship from "../components/Craftsmanship";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import LiveChat from "../components/LiveChat";
import SizeGuideProvider from "../components/SizeGuideProvider";

export default function NoirRoma() {
  return (
    <SizeGuideProvider>
      <main
        data-testid="noir-roma-landing"
        className="relative min-h-screen bg-[#070707] text-[#F2F0E9] overflow-x-hidden"
      >
        <Header />
        <Hero />
        <Marquee />
        <ProductCarousel />
        <Craftsmanship />
        <Testimonials />
        <Newsletter />
        <Footer />
        <LiveChat />
      </main>
    </SizeGuideProvider>
  );
}
