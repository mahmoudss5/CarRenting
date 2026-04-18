import Navbar from "../shared/components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsBar from "./components/StatsBar";
import FeaturedSection from "./components/FeaturedSection";
import TrustSection from "./components/TrustSection";
import SiteFooter from "../components/layout/SiteFooter";

export default function HomePage() {
  return (
    <div className="bg-surface">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturedSection />
      <TrustSection />
      <SiteFooter />
    </div>
  );
}
