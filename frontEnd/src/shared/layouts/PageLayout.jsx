import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * Page layout for non-hero pages (Auth, Admin, etc.).
 * Adds pt-[72px] to push content below the fixed navbar.
 */
export default function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
