import { AudienceProvider } from "@/components/audience/AudienceProvider";
import { Benefits } from "@/components/landing/Benefits";
import { Categories } from "@/components/landing/Categories";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SectionViewTracker } from "@/components/landing/SectionViewTracker";
import { StickyNav } from "@/components/landing/StickyNav";
import { TrustStrip } from "@/components/landing/TrustStrip";

export default function Home() {
  return (
    <AudienceProvider>
      <a
        href="#contenido"
        className="skip-link"
      >
        Saltar al contenido
      </a>
      <StickyNav />
      <Hero />
      <main>
        <TrustStrip />
        <Benefits />
        <HowItWorks />
        <Categories />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <SectionViewTracker />
    </AudienceProvider>
  );
}
