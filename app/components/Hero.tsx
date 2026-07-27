import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07111f] px-5 py-24 sm:px-8 md:px-12 lg:px-10"
    >
      {/* Navbar */}
      <div className="absolute left-0 top-0 z-50 w-full px-5 sm:px-8 md:px-12 lg:px-10">
        <Navbar />
      </div>

      {/* Background glow */}
      <div className="orb absolute bottom-[-100px] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#EAC435]/25 blur-3xl sm:h-80 sm:w-80 md:h-[28rem] md:w-[28rem]" />

      <div className="absolute left-[-100px] top-1/3 h-56 w-56 rounded-full bg-[#03CEA4]/10 blur-3xl" />

      <div className="absolute right-[-100px] top-1/4 h-56 w-56 rounded-full bg-[#FB4D3D]/10 blur-3xl" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center">
        <div className="hero-copy mx-auto flex w-full max-w-6xl flex-col items-center text-center mt-10">

          <h1
            className="text-[clamp(3.2rem,6vw,7.5rem)] leading-[0.88] tracking-tight text-white sm:leading-[0.9] md:leading-[0.92]"
            style={{ fontFamily: "Bebit" }}
          >
            <span className="hero-tilt-word block origin-center">
              Precision in Every Detail
            </span>

            <span className="hero-tilt-word mt-2 block origin-center text-[#EAC435]">
              Creativity Without Compromise.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
            We combine branding, technology, creative production, and business
            solutions to help modern brands stand out and grow.
          </p>
        </div>
      </div>
    </section>
  );
}