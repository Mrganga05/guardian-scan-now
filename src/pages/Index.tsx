import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
};

export default Index;
