export default function Footer() {
  return (
    <footer className="bg-[#f1f3f5] px-16 pt-6 pb-4">
      <div className="flex justify-between mb-4">

        {/* Left */}
        <div className="max-w-[200px]">
          <h3 className="font-extrabold text-[1.1rem] mb-3">
            Car<span className="text-indigo-500">Share</span>
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Premium car sharing for the modern explorer. Redefining mobility one journey at a time.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h4 className="font-bold text-xs tracking-widest mb-3 text-gray-700 uppercase">
            Platform
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            <li><a href="#" className="text-gray-500 no-underline text-sm hover:text-indigo-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="text-gray-500 no-underline text-sm hover:text-indigo-500 transition-colors">Fleet Solutions</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-bold text-xs tracking-widest mb-3 text-gray-700 uppercase">
            Legal
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            <li><a href="#" className="text-gray-500 no-underline text-sm hover:text-indigo-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-500 no-underline text-sm hover:text-indigo-500 transition-colors">Terms of Service</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 pt-2">
        <p className="text-gray-400 text-xs tracking-wider">
          © 2024 CARSHARE MOBILITY. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}