import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="bg-cover bg-center flex items-center relative min-h-[calc(100vh-72px)]"
      style={{ backgroundImage: "url('/your-car-image.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 to-white/10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-10">
        <h1 className="text-[3.5rem] font-extrabold text-[#1e1b4b] leading-tight max-w-[520px]">
          Your journey starts with the right car
        </h1>

        <p className="mt-5 text-gray-700 text-[1.05rem] leading-7 max-w-[440px]">
          Whether you're planning a weekend getaway, a business trip, or just need
          a ride for the day — we've got the perfect car for you. Easy booking,
          flexible options, and unbeatable prices.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-8 py-3.5 rounded-full text-base font-semibold no-underline cursor-pointer hover:bg-indigo-700 transition-colors"
          >
            Browse Cars
          </Link>

          <button className="bg-transparent text-indigo-600 px-8 py-3.5 rounded-full border-2 border-indigo-600 text-base font-semibold cursor-pointer hover:bg-indigo-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}