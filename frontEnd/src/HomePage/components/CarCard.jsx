import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white transition-transform duration-200 hover:-translate-y-1 w-full max-w-sm mx-auto">
      <img src={car.image} alt={car.name} className="w-full h-[200px] object-cover block" />

      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="text-[1.1rem] font-bold text-[#1e1b4b] m-0">{car.name}</h3>
        <p className="text-sm text-gray-500 m-0">{car.type}</p>
        <p className="text-base font-bold text-indigo-500 m-0">${car.price}/day</p>

        <Link
          to="/signup"
          className="mt-2 self-start px-4 py-2 bg-transparent border-2 border-indigo-500 rounded-lg text-indigo-500 font-semibold no-underline transition-colors duration-300 hover:bg-indigo-500 hover:text-white"
        >
          Details
        </Link>
      </div>
    </div>
  );
}