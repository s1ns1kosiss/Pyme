import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudy from "@/components/CaseStudy";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--orange)] selection:text-white">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Services />
        <Process />
        <CaseStudy />
        <Pricing />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
}
