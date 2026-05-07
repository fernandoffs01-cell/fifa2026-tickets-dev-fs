import HeroSection from "@/components/home/HeroSection";
import TeamsFlagsBanner from "@/components/home/TeamsFlagsBanner";
import StadiumsPreview from "@/components/home/StadiumsPreview";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TeamsFlagsBanner />
      <StadiumsPreview />
      <CTASection />
    </main>
  );
};

export default Index;
