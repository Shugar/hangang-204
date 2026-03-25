import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Amenities } from "@/components/Amenities";
import { HouseRules } from "@/components/HouseRules";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Header />
      <main id="main">
        <Hero />
        <Gallery />
        <About />
        <Amenities />
        <HouseRules />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
