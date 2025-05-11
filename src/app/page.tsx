"use client";

import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FadeInSection } from "../components/FadeInSection";

const PRIMARY = "#F610C1"; // Hot Pink from image
const ACCENT = "#F6F640"; // Bright Yellow from image
const BACKGROUND = "#ffffff"; // White background
const TEXT = "#1a1a1a";

const YellowGradient = {
  top: 'linear-gradient(180deg, rgba(255, 242, 51, 0.3) 0%, rgba(255, 242, 51, 0) 100%)',
  bottom: 'linear-gradient(0deg, rgba(255, 242, 51, 0.3) 0%, rgba(255, 242, 51, 0) 100%)',
  card: 'linear-gradient(135deg, rgba(255, 242, 51, 0.1) 0%, rgba(255, 242, 51, 0.05) 100%)'
};

// Add new analytical grid background component
const AnalyticalGrid = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none">
    {/* Top Gradient */}
    <div className="absolute top-0 left-0 right-0 h-48" style={{ background: YellowGradient.top }} />
    {/* Bottom Gradient */}
    <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: YellowGradient.bottom }} />
    <div className="absolute inset-0" style={{ backgroundColor: BACKGROUND }}>
      <div className="absolute inset-0 grid-background" />
    </div>
  </div>
);

// Update pixel effect to create a more glitch-like appearance
const PixelEffect = () => {
  const pixelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const createGlitchPixel = () => {
      const pixel = document.createElement('div');
      const size = Math.random() * 6 + 2; // 2-8px
      pixel.className = 'glitch-pixel';
      pixel.style.width = `${size}px`;
      pixel.style.height = `${size}px`;
      pixel.style.left = `${Math.random() * 120 - 10}%`;
      pixel.style.top = `${Math.random() * 120 - 10}%`;
      pixel.style.opacity = `${Math.random() * 0.5 + 0.25}`;
      pixel.style.animationDelay = `${Math.random() * 3}s`;
      return pixel;
    };

    const pixels = Array.from({ length: 150 }).map(createGlitchPixel);
    pixelRef.current?.append(...pixels);
    
    return () => {
      pixels.forEach(pixel => pixel.remove());
    };
  }, []);
  
  return (
    <>
      <div ref={pixelRef} className="absolute inset-0 pointer-events-none glitch-container" />
      <div className="absolute inset-0 glitch-overlay" />
    </>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scanUrl, setScanUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const mobileNavTimeout = useRef<NodeJS.Timeout | null>(null);
  const heroImages = [
    "/blazer.png",
    "/floral.png",
    "/pink.png",
    "/trench.png",
    "/green.png",
  ];
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 300); 
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle slide-in/out visibility
  useEffect(() => {
    if (mobileNavOpen) {
      setMobileNavVisible(true);
    } else if (mobileNavVisible) {
      // Wait for animation before hiding
      mobileNavTimeout.current = setTimeout(() => setMobileNavVisible(false), 350);
    }
    return () => {
      if (mobileNavTimeout.current) clearTimeout(mobileNavTimeout.current);
    };
  }, [mobileNavOpen, mobileNavVisible]);

  const handleWaitlistClick = () => {
    setShowModal(true);
    setMessage(null);
    setScanUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.from("email").insert([{ email: scanUrl }]);
    setLoading(false);
    if (error) {
      setMessage("Something went wrong. Please try again.");
    } else {
      setMessage("Thank you for joining the waitlist!");
      setScanUrl("");
    }
  };

  const router = useRouter();

const handleScan = async () => {
  setLoading(true);
  setMessage(null);
  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: scanUrl }),
    });

    const data = await res.json();
    if (res.ok) {
      const { data: saved, error } = await supabase.from("reports").insert([{
        url: scanUrl,
        brand: data.brand,
        overall_score: data.overallScore,
        quality: data.quality,
        construction: data.construction,
        durability: data.durability,
        ethics: data.ethics,
        cost_per_wear: data.costPerWear,
      }]).select().single();

      if (error) {
        console.error("Insert error:", error.message);
        setMessage("Something went wrong saving the report.");
        return;
      }

      router.push(`/report/${saved.id}`);
    } else {
      setMessage("⚠️ Could not analyze this link.");
    }
  } catch (err) {
    console.error(err);
    setMessage("❌ An error occurred. Try again.");
  }
  setLoading(false);
};

  

  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden text-[PRIMARY]" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)', scrollBehavior: 'smooth'}}>
      
      <AnalyticalGrid />
      <PixelEffect />
      {/* Update header styles */}
      <div className="sticky top-0 z-[100]">
        <header className={`flex justify-between items-center px-4 sm:px-8 py-6 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-transparent'}`}>
          {/* Navbar Gradient */}
          <div className="absolute inset-0" style={{ background: YellowGradient.top, opacity: 0.7 }} />
          <FadeInSection className="flex justify-between items-center w-full relative z-10">
            <div className="flex items-center gap-2">
              <Image src="/transparent.png" alt="CIRA Logo" className="w-10 h-10" width={500} height={500} />
              <span className="text-xl font-bold tracking-wide" style={{ color: '#FF1493' }}>CIRA</span>
            </div>
            <nav className="hidden md:flex gap-6 text-sm font-medium" style={{ color: '#FF1493' }}>
              <a href="#how-it-works" className="text-[#FF1493] hover:text-[#ff69b4] transition">How It Works</a>
              <a href="#why-cira" className="hidden text-[#FF1493] hover:text-[#ff69b4] transition">Why CIRA</a>
              <a href="#rewards" className="hidden text-[#FF1493] hover:text-[#ff69b4] transition">Rewards</a>
              <a href="#contact" className="text-[#FF1493] hover:text-[#ff69b4] transition">Contact</a>
            </nav>
            <button className="md:hidden hover:text-[#FF1493] transition-colors" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </FadeInSection>
        </header>
      </div>

{/* Hero Section */}
<section
  className="relative flex flex-col items-center justify-start min-h-screen px-4 pt-8"
  style={{ backgroundColor: BACKGROUND, color: TEXT }}
>
  <FadeInSection className="w-full">
    <div className="max-w-4xl mx-auto text-center mb-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[#FF1FB2]">Are your clothes <span className="relative inline-block">lying<span className="absolute inset-0 border-2 border-[#FFF233] rounded-full -m-2 transform -rotate-6"></span></span> to you?</h1>
      <p className="text-lg md:text-xl text-[#1A1A1A]">
        Buy less. Choose better. Know the truth.
      </p>
    </div>
  </FadeInSection>

  {/* Rotate Image */}
  <div className="w-full max-w-xs mx-auto mb-8">
    <div className="relative">
      <Image
        src={heroImages[currentHeroImageIndex]}
        alt="CIRA Analysis"
        className="w-full h-auto transition-opacity duration-500 ease-in-out"
        width={500}
        height={500}
      />
    </div>
  </div>

  {/* Search Section */}
  <div className="w-full max-w-2xl mx-auto">
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
      <input
        type="url"
        placeholder="Paste any shopping link"
        className="w-full md:w-2/3 px-6 py-4 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2"
        style={{
          borderColor: PRIMARY,
          color: TEXT,
          backgroundColor: "transparent",
        }}
        value={scanUrl}
        onChange={(e) => setScanUrl(e.target.value)}
      />
      <button
        className={`w-full md:w-auto px-8 py-4 border-2 rounded-lg font-medium transition-all duration-300 hover:text-white hover:bg-[${PRIMARY}] relative z-10`}
        style={{
          borderColor: PRIMARY,
          color: TEXT,
          backgroundColor: "transparent"
        }}
        onClick={handleScan}
      >
        🔍 Scan for Truth
      </button>
    </div>
    <p className="text-sm text-center" style={{ color: TEXT }}>
      Instantly see the real quality, construction, and impact behind every
      piece.
    </p>
  </div>
</section>

     


      {/* Why CIRA Section */}
      <section id="why-cira" className=" hidden py-24 px-16 flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
            You deserve better than the polyester pandemic.
          </h2>
          <div className="space-y-8 text-center">
            <p className="text-lg max-w-xl text-gray-600">
              Fast fashion tricks you into chasing trends, and paying more over time for clothes that fall apart.
            </p>
            <p className="text-lg max-w-xltext-gray-600">
              Greenwashing hides human rights violations and cheap labor behind fake &quot;eco&quot; promises

            </p>
            <p className="text-lg text-gray-600">
              CIRA shows you the real material strength, construction quality, and human impact behind every piece, before you buy.
            </p>
            <p className="text-lg font-medium text-[#7079a9]">
              Build a wardrobe that actually lasts. And a future you&apos;re proud of.
            </p>
          </div>
        </div>
      </section>
    

      {/* Choose Your Rewards Section - Hidden but preserved */}
      <section id="rewards" className="hidden w-full max-w-5xl mx-auto mb-40 mt-24 px-4 flex flex-col items-center animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-normal text-[#1a1a1a] mb-16 text-center tracking-tight" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>Choose Your Rewards</h2>
        <div className="flex flex-col md:flex-row gap-16 w-full relative">
          {/* Link Bank Card Option */}
          <div className="flex-1">
            <h3 className="font-medium text-2xl mb-6 text-[#7079a9] text-center" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>Link Your Bank Card</h3>
            <div className="flex flex-col items-center border-2 border-[#7079a9]/20 rounded-3xl p-10 bg-white shadow-sm min-h-[360px] transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{minWidth: 220}}>
              <ul className="text-[#1a1a1a] text-base mb-8 space-y-4 list-disc pl-6 text-left w-full flex-1">
                <li>Standard cash back at certified brands</li>
                <li>Track your conscious wardrobe growth</li>
                <li>Easy, no new card needed</li>
                <li>Limited access to premium drops</li>
              </ul>
              <span className="inline-block border border-[#7079a9] text-[#7079a9] text-xs font-semibold px-3 py-1 rounded-full w-fit">Simple start, basic rewards</span>
            </div>
          </div>
          
          {/* CIRA Card Option */}
          <div className="flex-1">
            <h3 className="font-medium text-2xl mb-6 text-[#d95d4b] text-center" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>Get the CIRA Card</h3>
            <div className="flex flex-col items-center border-2 border-[#d95d4b]/30 rounded-3xl p-10 bg-white shadow-sm min-h-[360px] transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{minWidth: 220}}>
              <ul className="text-[#1a1a1a] text-base mb-8 space-y-4 list-disc pl-6 text-left w-full flex-1">
                <li><b>2X CIRA Points</b> on every eligible purchase</li>
                <li><b>2X gift card value</b> (e.g., $10 gift card for $5 worth of points)</li>
                <li>VIP capsule access & exclusive events</li>
                <li>Premium physical & digital card</li>
                <li>Unlock exclusive perks</li>
              </ul>
              <div className="flex flex-col items-center gap-2">
                <span className="inline-block border border-[#d95d4b] text-[#d95d4b] text-xs font-semibold px-3 py-1 rounded-full w-fit">Maximize your rewards</span>
                <span className="inline-block border border-[#7079a9] text-[#7079a9] text-xs font-semibold px-3 py-1 rounded-full w-fit">Recommended for conscious shoppers</span>
              </div>
            </div>
          </div>
        </div>
        <button
          className="mt-16 px-10 py-4 border-2 border-[#7079a9] rounded-full bg-transparent text-xl font-medium text-[#7079a9] hover:bg-[#e6e0f8] transition-all duration-200 hover:scale-105 hover:shadow-lg"
          onClick={handleWaitlistClick}
        >
          Claim Your CIRA Card Now
        </button>
      </section>

      {/* Loyalty Rewards Section */}
      <section id="loyalty-rewards" className="py-24 px-4 hidden">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-16 text-center">
            Get rewarded for choosing better.
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Link Your Bank Card</h3>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 text-left">
                <li>Earn True Orbit Points on every purchase from approved brands</li>
                <li>Get personalized recommendations based on your style and values</li>
                <li>Track your impact on fashion sustainability</li>
              </ul>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-6">Get the CIRA Card</h3>
              <ul className="list-disc pl-6 space-y-4 text-gray-600 text-left">
                <li>2x True Orbit Points on all approved brand purchases</li>
                <li>Early access to exclusive capsule drops</li>
                <li>Premium integrity reports with detailed analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="hidden py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-16 text-center">
            The CIRA Difference
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-red-500">Without CIRA</h3>
              <ul className="space-y-4">
                {[
                  "Misleading marketing claims",
                  "Hidden quality issues",
                  "Unclear pricing value",
                  "Wasteful shopping habits",
                  "Supporting unethical practices"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-green-500">With CIRA</h3>
              <ul className="space-y-4">
                {[
                  "Verified quality metrics",
                  "Transparent construction details",
                  "Clear cost-per-wear analysis",
                  "Informed purchasing decisions",
                  "Support for ethical brands"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center mt-16">
            <button
              className="px-8 py-4 bg-[#A8B2EA] text-white rounded-lg font-medium hover:bg-[#A8B2EA]/90 transition-colors"
              onClick={() => {/* Handle sign up */}}
            >
              Join the Movement
            </button>
          </div>
        </div>
      </section>

            {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative w-full py-24 px-4 flex flex-col items-center justify-start min-h-[160vh]"
        style={{ backgroundColor: BACKGROUND, color: TEXT }}
      >
        <div className="max-w-5xl w-full">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-24 text-center"
            style={{ color: TEXT }}
          >
            We show you what the tag <span className="relative inline-block">
              {/* Rotated yellow circle */}
              <span className="absolute -inset-1 border-2 border-yellow-300 rounded-full transform rotate-12" style={{ opacity: 0.6 }} />
              <span className="relative text-[#FF1493]">won&apos;t</span>
            </span>.
          </h2>
      
          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                number: "01",
                title: "Discover",
                description:
                  "Browse curated clothing from trusted, verified brands — filtered by quality, ethics, and values",
              },
              {
                number: "02",
                title: "Learn",
                description:
                  "See the real quality score, construction details, and impact assessment of each item you find with our CIRA Report",
              },
              {
                number: "03",
                title: "Shop Smarter",
                description:
                  "Save your favorites, earn rewards, and feel confident in what you&apos;re buying and why it matters",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="relative bg-white p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105"
                style={{
                  boxShadow: '0 4px 20px -2px rgba(255, 242, 51, 0.5)',
                }}
      >
                <span
                  className="absolute -top-6 left-6 text-4xl font-bold"
                  style={{ color: `${PRIMARY}95` }} // 80% opacity
                >
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
      
          {/* Example Report */}
          <div className="max-w-4xl w-full mx-auto grid md:grid-cols-2 gap-8 items-start mt-16">
            <div className="relative">
              <Image
                src="/blazer.png"
                alt="CIRA Analysis"
                className="w-full h-auto rounded-lg"
                width={500}
                height={500}
              />
            </div>
            <div
              className="rounded-xl shadow-lg p-8"
              style={{ backgroundColor: "white", color: TEXT }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-medium">Cream Wool Blazer</h3>
                  <p className="text-sm" style={{ color: `${TEXT}80` }}>
                    Analyzed 2 minutes ago
                  </p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                  style={{
                    backgroundColor: `${PRIMARY}20`, // 20% opacity
                    color: PRIMARY,
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Verified from Zara
                </span>
              </div>
      
              <div className="space-y-8">
                {/* Overall Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: `${TEXT}80` }}>
                      Overall Score
                    </span>
                    <span className="text-lg font-semibold" style={{ color: PRIMARY }}>
                      83%
                    </span>
                  </div>
                  <FadeInSection>
                    {({ isInView }) => (
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-3 rounded-full transition-all duration-[1500ms] ease-out-slow"
                          style={{ 
                            backgroundColor: PRIMARY,
                            width: isInView ? '83%' : '0%',
                            transitionDelay: '200ms'
                          }}
                        />
                      </div>
                    )}
                  </FadeInSection>
                </div>
      
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Quality", value: "Excellent" },
                    { label: "Construction", value: "Premium" },
                    { label: "Durability", value: "5+ Years" },
                    { label: "Human Impact", value: "Positive" },
                  ].map((metric, i) => (
                    <div
                      key={i}
                      className="rounded-lg p-4"
                      style={{ backgroundColor: "white" }}
                    >
                      <div
                        className="text-sm mb-1"
                        style={{ color: `${TEXT}80` }}
                      >
                        {metric.label}
                      </div>
                      <div className="text-lg font-semibold">{metric.value}</div>
                    </div>
                  ))}
                </div>
      
                {/* Quick Stats */}
                <div
                  className="flex items-center justify-between text-sm border-t pt-4"
                  style={{ borderColor: `${TEXT}20`, color: `${TEXT}80` }}
                >
                  <span>Made in Italy</span>
                  <span>100% Wool</span>
                  <span>Fully Lined</span>
                </div>
              </div>
            </div>
          </div>
      
          {/* Call to Action Button */}
          <div className="text-center mt-16">
            <button
              className="px-8 py-4 border-2 rounded-lg font-medium transition-colors hover:text-white hover:bg-[${PRIMARY}]"
              style={{
                borderColor: PRIMARY,
                color: PRIMARY,
                backgroundColor: "transparent",
              }}
              onClick={() => {
                /* Handle action */
              }}
            >
              🔍 Try Your First Scan
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
<section
  id="cta"
  className="relative w-full min-h-[70vh] flex flex-col items-center justify-center mt-20"
  style={{ backgroundColor: '#ffffff', color: TEXT }}
>
  {/* Bottom CTA Gradient */}
  <div 
    className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none pb-12" 
    style={{ 
      background: YellowGradient.bottom,
      opacity: 0.6,
      marginTop: '20px'
    }} 
  />
  <FadeInSection>
    <div className="relative z-10 flex flex-col items-center text-center px-4 py-40 mb-20">
      <h2
        className="text-3xl max-w-xl sm:text-4xl font-normal mb-10"
        style={{ color: TEXT }}
      >
        You deserve better than the{" "}
        <span className="font-bold" style={{ color: PRIMARY }}>
          polyester pandemic.
        </span>
      </h2>
      <p
        className="text-lg mb-16 max-w-6xl -mt-4"
        style={{ color: `${TEXT}CC` }} // 80% opacity
      >
        Paste any shopping link. See what it&apos;s really made of.
      </p>
      <button
        className="px-10 py-4 border-2 rounded-full text-xl font-medium transition-all duration-200 hover:bg-[#FF1493] hover:text-white hover:border-[#FF1493]"
        style={{
          borderColor: PRIMARY,
          color: PRIMARY,
          backgroundColor: "transparent"
        }}
        onClick={handleWaitlistClick}
      >
        🔍 Join the waitlist
      </button>
    </div>
  </FadeInSection>
</section>

      {/* Modal Popup */}
{showModal && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
    style={{ backgroundColor: `${TEXT}66` }} // 40% opacity
  >
    <div
      className="relative rounded-3xl shadow-2xl p-8 w-full max-w-sm border scale-95 opacity-0 animate-modal-in"
      style={{
        backgroundColor: `${BACKGROUND}E6`, // 90% opacity
        borderColor: `${ACCENT}33`, // 20% opacity
      }}
    >
      <button
        className="absolute top-4 right-4 text-2xl transition-all duration-300 focus:outline-none animate-spin-on-close hover:text-[#FF1493]"
        style={{ color: PRIMARY }}
        onClick={() => setShowModal(false)}
        aria-label="Close"
        type="button"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <h3
        className="text-2xl font-semibold mb-4 text-center tracking-tight"
        style={{ color: PRIMARY, fontFamily: "var(--font-nng, Inter, Arial, sans-serif)" }}
      >
        Join the Waitlist
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 transition"
          style={{
            borderColor: `${PRIMARY}33`, // 20% opacity
            color: TEXT,
            backgroundColor: "transparent",
            boxShadow: `0 0 0 2px ${PRIMARY}66`, // 40% opacity
          }}
          value={scanUrl}
          onChange={(e) => setScanUrl(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-full px-4 py-2 font-medium shadow transition-all duration-200 bg-[#4a4a4a] text-white hover:bg-[#FF1493] hover:scale-105 hover:shadow-lg"
          disabled={loading}
        >
          {loading ? "Joining..." : "Join"}
        </button>
      </form>
      {message && (
        <div
          className="mt-4 text-center text-sm"
          style={{ color: PRIMARY }}
        >
          {message}
        </div>
      )}
    </div>
    <style jsx global>{`
      @keyframes modal-in {
        0% {
          opacity: 0;
          transform: scale(0.95);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      .animate-modal-in {
        animation: modal-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      @keyframes spin-on-close {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(180deg);
        }
      }
      .animate-spin-on-close:active {
        animation: spin-on-close 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      @keyframes fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .animate-fade-in {
        animation: fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      @keyframes progress-load {
        from {
          width: 0%;
        }
        to {
          width: 60%;
        }
      }
      .animate-progress-load {
        animation: progress-load 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
    `}</style>
  </div>
)}
    </div>
  );
}
