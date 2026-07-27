export default function Navbar() {
  return (
    <nav className="nav relative z-40 mx-auto mt-4 flex w-full max-w-3xl items-center rounded-full border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
      {/* Left */}
      <div className="flex flex-1 items-center gap-3">
        <div
          className="font-black leading-none"
          style={{ fontFamily: "Bebit" }}
        >
          <span className="text-3xl">
            <span className="text-[#EAC435]">T</span>
            <span className="text-[#03CEA4]">C</span>
            <span className="text-[#FB4D3D]">E</span>
          </span>
        </div>

        <p className="hidden whitespace-nowrap text-sm text-white sm:block">
          The Creative Explorer
        </p>
      </div>

      {/* Center */}
      <div className="hidden flex-1 justify-center md:flex">
        <div className="flex items-center gap-10 text-sm text-white/70">
          <a href="#about" className="hover:text-white transition">
            About
          </a>

          <a href="#shop" className="hover:text-white transition">
            Shop
          </a>

          <a href="#portfolio" className="hover:text-white transition">
            Work
          </a>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 justify-end">
        <a
          href="#contact"
          className="rounded-full bg-[#03CEA4] px-5 py-2.5 text-sm font-semibold text-[#07111f] transition-all duration-300 hover:scale-105 hover:bg-[#05e6b8]"
        >
          Let's Talk
        </a>
      </div>
    </nav>
  );
}