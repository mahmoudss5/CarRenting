import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import HeroSection from './components/HeroSection';
import FeaturedSection from './components/FeaturedSection';
import ValueProposition from './components/ValueProposition';
import TrustSection from './components/TrustSection';
import { useSearch } from './hooks/useSearch';

/**
 * Home page — does NOT use PageLayout so the hero can bleed
 * under the fixed glass navbar. Composes all sections.
 */
export default function RenterHomePage() {
  const { values, handleChange, handleSearch } = useSearch();

  return (
    <>
      <Navbar />

      <HeroSection
        values={values}
        onChange={handleChange}
        onSearch={handleSearch}
      />

      <FeaturedSection />
      <ValueProposition />
      <TrustSection />

      <Footer />
    </>
  );
}
