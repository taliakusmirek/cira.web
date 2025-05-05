"use client";

import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Add new analytical grid background component
const AnalyticalGrid = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none">
    <div className="absolute inset-0 bg-[#fafafa]">
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
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden text-[#1a1a1a]" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)', scrollBehavior: 'smooth'}}>
      
      <AnalyticalGrid />
      <PixelEffect />
      {/* Update header styles */}
      <header className={`sticky top-0 z-50 flex justify-between items-center px-4 sm:px-8 py-6 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="CIRA Logo" className="w-10 h-10" width={500} height={500} />
          <span className="text-xl font-bold tracking-wide text-[#1a1a1a]">CIRA</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#how-it-works" className="text-[#1a1a1a] hover:text-[#7079a9] transition">How It Works</a>
          <a href="#why-cira" className="hidden text-[#1a1a1a] hover:text-[#7079a9] transition">Why CIRA</a>
          <a href="#rewards" className="hidden text-[#1a1a1a] hover:text-[#7079a9] transition">Rewards</a>
          <a href="#cta" className="text-[#1a1a1a] hover:text-[#7079a9] transition">Compare</a>
        </nav>
        <button className="md:hidden" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
          <span className="sr-only">Menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-start min-h-screen px-4 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight 
               bg-gradient-to-r from-[#666e9d] to-[#909de2] 
               bg-clip-text text-transparent">
Are your clothes lying to you?</h1>
          <p className="text-lg md:text-xl text-gray-600">
          Buy less. Choose better. Know the truth.
          </p>
        </div>

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
              className="w-full md:w-2/3 px-6 py-4 rounded-lg border-2 border-[#7079a9] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#7079a9]"
              value={scanUrl}
              onChange={(e) => setScanUrl(e.target.value)}
            />
            <button
              className="w-full md:w-auto px-8 py-4 border-2 border-[#7079a9] text-[#2c366e] rounded-lg font-medium hover:bg-[#7079a9] hover:text-white transition-all duration-300 bg-transparent"
              onClick={handleScan}
            >
              🔍 Scan for Truth
            </button>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Instantly see the real quality, construction, and impact behind every piece.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative w-full py-24 px-4 flex flex-col items-center justify-start min-h-[160vh] bg-white">
  <div className="max-w-5xl w-full">
    <h2 className="text-2xl md:text-3xl font-semibold mb-24 text-center">
    We show you what the tag won&apos;t.
    </h2>

    {/* 3 Steps */}
    <div className="grid md:grid-cols-3 gap-8 mb-24">
      {[
        {
          number: "01",
          title: "Discover",
          description: "Browse curated clothing from trusted, verified brands — filtered by quality, ethics, and values"
        },
        {
          number: "02",
          title: "Learn",
          description: "See the real quality score, construction details, and impact assessment of each item you find with our CIRA Report"
        },
        {
          number: "03",
          title: "Shop Smarter",
          description: "Save your favorites, earn rewards, and feel confident in what you&apos;re buying and why it matters"
        }
      ].map((step, i) => (
        <div key={i} className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <span className="absolute -top-6 left-6 text-4xl font-bold text-[#2c366e]/30">{step.number}</span>
          <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
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
      <div className="rounded-xl shadow-lg p-8 bg-white">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Cream Wool Blazer</h3>
            <p className="text-sm text-gray-500">Analyzed 2 minutes ago</p>
          </div>
          <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Verified from Zara
          </span>
        </div>

        <div className="space-y-8">
          {/* Overall Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Overall Score</span>
              <span className="text-lg font-semibold text-[#7079a9]">85%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-[#7079a9] h-3 rounded-full transition-all duration-500" style={{ width: '85%' }} />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Quality</div>
              <div className="text-lg font-semibold text-gray-900">Excellent</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Construction</div>
              <div className="text-lg font-semibold text-gray-900">Premium</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Durability</div>
              <div className="text-lg font-semibold text-gray-900">5+ Years</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1"> Human Impact</div>
              <div className="text-lg font-semibold text-gray-900">Positive</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
            <span>Made in Italy</span>
            <span>100% Wool</span>
            <span>Fully Lined</span>
          </div>
        </div>
      </div>
    </div>

    {/* Call to Action Button */}
    <div className="text-center mt-16">
      <button className="px-8 py-4 bg-white border-2 border-[#7079a9] text-[#7079a9] rounded-lg font-medium hover:bg-[#7079a9] hover:text-white transition-colors">
        🔍 Try Your First Scan
      </button>
    </div>
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

      {/* Final CTA Section */}
      <section id="cta" className="relative w-full min-h-[70vh] flex flex-col items-center justify-center mt-36">
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-20">
        <h2 className="text-3xl max-w-xl sm:text-4xl font-normal text-[#1a1a1a] mb-6">
  You deserve better than the <span className="font-bold">polyester pandemic.</span>
</h2>          <p className="text-lg text-[#1a1a1a]/80 mb-16 max-w-6xl -mt-4">
            Paste any shopping link.
            See what it&apos;s really made of.
          </p>
          <button
            className="px-10 py-4 bg-transparent border-2 border-[#A8B2EA] text-[#2c366e] rounded-full text-xl font-medium hover:bg-[#A8B2EA] hover:text-white transition-all duration-200"
            onClick={handleWaitlistClick}
          >
            🔍 Reveal the Truth
          </button>
        </div>
      </section>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
          <div className="relative bg-white/90 rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-[#e6e0f8] scale-95 opacity-0 animate-modal-in">
            <button
              className="absolute top-4 right-4 text-2xl text-[#A8B2EA] hover:text-[#d95d4b] transition-transform duration-300 focus:outline-none animate-spin-on-close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-center text-[#A8B2EA] tracking-tight" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>Join the Waitlist</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="url"
                required
                placeholder="Paste any shopping link"
                className="border border-[#e6e0f8] rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#A8B2EA]/40 transition"
                value={scanUrl}
                onChange={(e) => setScanUrl(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#A8B2EA] to-[#d95d4b] text-white rounded-full px-4 py-2 font-medium shadow hover:scale-105 hover:shadow-lg transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Joining..." : "Join"}
              </button>
            </form>
            {message && <div className="mt-4 text-center text-sm text-[#A8B2EA]">{message}</div>}
          </div>
          <style jsx global>{`
            @keyframes modal-in {
              0% { opacity: 0; transform: scale(0.95); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-modal-in {
              animation: modal-in 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
            }
            @keyframes spin-on-close {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(180deg); }
            }
            .animate-spin-on-close:active {
              animation: spin-on-close 0.4s cubic-bezier(0.4,0,0.2,1);
            }
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: fade-in 0.3s cubic-bezier(0.4,0,0.2,1);
            }
            .grid-background {
              background-image: 
                linear-gradient(to right, rgba(59, 59, 250, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 59, 250, 0.05) 1px, transparent 1px);
              background-size: 24px 24px;
              background-position: center;
            }

            .image-container {
              position: relative;
              overflow: hidden;
            }

            .glitch-image {
              animation: reveal 2s ease-out forwards;
              filter: blur(20px);
              transform: scale(1.05);
            }

            @keyframes reveal {
              0% {
                filter: blur(20px);
                transform: scale(1.05);
              }
              100% {
                filter: blur(0);
                transform: scale(1);
              }
            }

            .glitch-container {
              mix-blend-mode: screen;
            }

            .glitch-pixel {
              position: absolute;
              background: #A8B2EA;
              border-radius: 1px;
              animation: glitch 4s ease-in-out infinite;
            }

            .glitch-overlay {
              position: absolute;
              inset: -10px;
              background: radial-gradient(
                circle at center,
                transparent 30%,
                rgba(59, 59, 250, 0.03) 70%,
                rgba(59, 59, 250, 0.05) 100%
              );
              pointer-events: none;
              mix-blend-mode: multiply;
            }

            @keyframes glitch {
              0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
              }
              25% {
                transform: translate(4px, -4px) scale(1.02);
                opacity: 0.5;
                background: #d95d4b;
              }
              75% {
                transform: translate(-4px, 4px) scale(0.98);
                opacity: 0.4;
                background: #e6a07e;
              }
            }

            /* Update button styles to be more minimal */
            button {
              background: transparent;
              border: 1px solid #A8B2EA;
              color: #A8B2EA;
              transition: all 0.2s ease;
            }

            button:hover {
              background: #A8B2EA;
              border-color: #A8B2EA;
              color: black;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
