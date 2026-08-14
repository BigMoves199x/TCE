"use client";

import { useEffect, useState } from "react";

type AuthIntroProps = {
  children: React.ReactNode;
};

export default function AuthIntro({
  children,
}: AuthIntroProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, 1500);

    const removeTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07111f]">
      {/* The actual page always remains mounted */}
      <div
        className={`min-h-screen transition-opacity duration-500 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>

      {showIntro && (
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#07111f] transition duration-500 ${
            isExiting
              ? "pointer-events-none scale-105 opacity-0"
              : "scale-100 opacity-100"
          }`}
        >
          {/* Background glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-1/3 size-[28rem] rounded-full bg-[#03CEA4]/10 blur-[140px]" />

            <div className="absolute -right-40 bottom-1/4 size-[28rem] rounded-full bg-[#FB4D3D]/10 blur-[140px]" />

            <div className="absolute -bottom-48 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-[#EAC435]/10 blur-[150px]" />
          </div>

          <div className="relative flex flex-col items-center">
            <div className="auth-intro-logo font-bebit text-[clamp(6rem,18vw,12rem)] leading-none tracking-[0.03em]">
              <span className="auth-intro-letter auth-intro-letter-one text-[#EAC435]">
                T
              </span>

              <span className="auth-intro-letter auth-intro-letter-two text-[#03CEA4]">
                C
              </span>

              <span className="auth-intro-letter auth-intro-letter-three text-[#FB4D3D]">
                E
              </span>
            </div>

            <p className="auth-intro-caption mt-6 text-[10px] uppercase tracking-[0.48em] text-white/40 sm:text-xs">
              The Creative Explorer
            </p>

            <div className="mt-7 h-px w-32 overflow-hidden bg-white/10">
              <div className="auth-intro-line h-full w-full bg-[#03CEA4]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}