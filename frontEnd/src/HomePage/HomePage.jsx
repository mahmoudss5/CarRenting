import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCars from "./components/FeaturedCars";
import Footer from "../footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCars />
      <Footer />
    </>
  );
}