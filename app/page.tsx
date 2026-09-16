"use client";

import Hero from "./components/ui/home/Hero";
import ObserverShowcase from "./components/ui/home/ObserverShowcase";
import SipAndPaintCampaign from "./components/ui/home/SipAndPaintCampaign";
import ContactSection from "./components/ui/home/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Hero />
      <ObserverShowcase />
      <SipAndPaintCampaign />
      <ContactSection />
    </main>
  );
}