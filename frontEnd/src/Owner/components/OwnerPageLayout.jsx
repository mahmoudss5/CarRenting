import Footer from "../../footer";
import Navbar from "../../shared/components/Navbar";

export default function OwnerPageLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <Navbar />
      <main className="mx-auto max-w-[1500px] px-6 pt-[72px] pb-10 md:px-10 lg:px-[80px] xl:pr-[120px]">{children}</main>
      <Footer />
    </div>
  );
}
