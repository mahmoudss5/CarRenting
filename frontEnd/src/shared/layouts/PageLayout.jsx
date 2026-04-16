import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export default function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-[65px] min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
