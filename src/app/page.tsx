"use client";

import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FadeInSection } from "../components/FadeInSection";
import { LoadingScreen } from "./components/LoadingScreen";
import { LandingHero } from "./components/LandingHero";
import { LandingSections } from "./components/LandingSections";

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
  const [waitlistEmail, setWaitlistEmail] = useState("");
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
  const [showLoading, setShowLoading] = useState(true);

  // State to control modal animation
  const [modalAnimating, setModalAnimating] = useState(false);

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
    setModalAnimating(true); // Start opening animation
    setMessage(null);
    setWaitlistEmail("");
  };

  const handleCloseModal = () => {
    setModalAnimating(false); // Start closing animation
    // Wait for animation to finish before hiding
    setTimeout(() => setShowModal(false), 500); // Increased delay to 500ms
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.from("email").insert([{ email: waitlistEmail }]);
    setLoading(false);
    if (error) {
      setMessage("Something went wrong. Please try again.");
    } else {
      setMessage("Thank you for joining the waitlist!");
      setWaitlistEmail("");
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
    <>
      {showLoading && <LoadingScreen onFinish={() => setShowLoading(false)} />}
      <LandingHero scanUrl={scanUrl} setScanUrl={setScanUrl} onScan={handleScan} onWaitlistClick={handleWaitlistClick} />
      <LandingSections onWaitlistClick={handleWaitlistClick} />
      {showModal && (
        <div className={`fixed inset-0 flex items-center justify-center z-[1000] transition-opacity duration-500 backdrop-filter backdrop-blur-sm ${modalAnimating ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform duration-500 ${modalAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold" style={{ color: PRIMARY }}>Join the Waitlist</h2>
              <button 
                onClick={handleCloseModal}
                className="text-xl font-bold focus:outline-none"
                style={{ color: PRIMARY }}
              >
                &times;
              </button>
            </div>
            <p className="mb-4" style={{ color: PRIMARY }}>Be the first to know when CIRA launches. Get exclusive early access and updates!</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 mb-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white placeholder-[#F610C1] placeholder-opacity-50 text-[#F610C1]"
                style={{ borderColor: PRIMARY }}
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-md font-semibold transition-colors"
                style={{ backgroundColor: PRIMARY, color: 'white' }}
                disabled={loading}
              >
                {loading ? "Joining..." : "Join Now"}
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-center ${message.startsWith("Thank you") ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
