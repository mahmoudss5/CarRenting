/**
 * Image gallery — one large main image + two stacked side images.
 * Matches the design's 2:1 left-to-right layout.
 */
export default function CarGallery({ car }) {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-3 rounded-xl overflow-hidden mt-6 h-[380px]">
      {/* Main image */}
      <div className="bg-[#111] overflow-hidden">
        <img
          src={car.images.main}
          alt={`${car.name} ${car.variant} — main view`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Side images stacked */}
      <div className="flex flex-col gap-3">
        <div className="bg-[#111] overflow-hidden flex-1 rounded-tr-xl">
          <img
            src={car.images.side1}
            alt={`${car.name} — side view`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-[#111] overflow-hidden flex-1 rounded-br-xl">
          <img
            src={car.images.side2}
            alt={`${car.name} — detail view`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
