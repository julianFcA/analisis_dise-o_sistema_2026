import Navbar from "@/components/landing/Navbar/Navbar";
import HeroSection from "@/components/landing/HeroSection/HeroSection";
import QuickSearchSection from "@/components/landing/QuickSearchSection/QuickSearchSection";
import CategoriesSection from "@/components/landing/CategoriesSection/CategoriesSection";
import ReasonsSection from "@/components/landing/ReasonsSection/ReasonsSection";
import ServicesSection from "@/components/landing/ServicesSection/ServicesSection";
import AboutSection from "@/components/landing/AboutSection/AboutSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection/ContactSection";
import FooterSection from "@/components/landing/FooterSection/FooterSection";

// SOLO composición (docs/architecture.md §1): cada sección del Home Page vive
// en components/landing/ y se importa aquí en el orden de Figma
// (docs/landing-page.md). El Navbar y el Footer quedan fuera de <main>.
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <QuickSearchSection />
        <CategoriesSection />
        <ReasonsSection />
        <ServicesSection />
        <AboutSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
