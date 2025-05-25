import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const PRIMARY = '#F610C1';
const ACCENT = '#F6F640';

export const LandingHero: React.FC<{
  scanUrl: string;
  setScanUrl: (v: string) => void;
  onScan: () => void;
  onWaitlistClick: () => void;
  onSignUpClick: () => void;
  onLoginClick: () => void;
}> = ({ scanUrl, setScanUrl, onScan, onWaitlistClick, onSignUpClick, onLoginClick }) => {
  const [showContent, setShowContent] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    // Start fade-in animation after a short delay
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Nav */}
      <header className={`flex items-center justify-between w-full px-8 pt-8 pb-4 md:px-12 relative z-20 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(180deg, rgba(255, 242, 51, 0.3) 0%, rgba(255, 242, 51, 0) 100%)' }}>
        <div className="flex items-center gap-3">
          <Image src="/transparent.png" alt="CIRA Logo" width={48} height={48} className="rounded-full" />
          <span className="text-2xl font-bold tracking-wide" style={{ color: PRIMARY }}>CIRA</span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-base font-medium items-center">
          <a href="#about" className="relative group" style={{ color: '#F610C1' }}>
            About
            <span className="absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F610C1' }}></span>
          </a>
          <a href="#faq" className="relative group" style={{ color: '#F610C1' }}>
            FAQ
            <span className="absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F610C1' }}></span>
          </a>
          <button
            onClick={onLoginClick}
            className="text-[#F610C1] bg-transparent border-none hover:underline focus:underline font-medium px-2"
            style={{ minWidth: '60px' }}
          >
            Login
          </button>
          <button
            onClick={onSignUpClick}
            className="px-6 py-2 rounded-full font-bold text-base shadow-lg transition border-2 border-[#F610C1] text-[#F610C1] bg-white hover:bg-pink-50"
            style={{ boxShadow: '0 2px 12px 0 rgba(246,16,193,0.10)' }}
          >
            Sign Up
          </button>
          <button
            onClick={onWaitlistClick}
            className="px-6 py-2 rounded-full font-bold text-base shadow-lg transition bg-[#F610C1] text-white hover:bg-pink-700"
            style={{ boxShadow: '0 2px 12px 0 rgba(246,16,193,0.15)' }}
          >
            Join the waitlist
          </button>
        </nav>
        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          aria-label="Open navigation menu"
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <span className="block w-7 h-1 rounded-full mb-1" style={{ background: PRIMARY }}></span>
          <span className="block w-7 h-1 rounded-full mb-1" style={{ background: PRIMARY }}></span>
          <span className="block w-7 h-1 rounded-full" style={{ background: PRIMARY }}></span>
        </button>
        {/* Mobile Fullscreen Dropdown Menu */}
        <div
          className={`md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-400 ${mobileNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          style={{ transitionProperty: 'opacity' }}
        >
          {/* Close Icon */}
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center focus:outline-none"
            aria-label="Close navigation menu"
            onClick={() => setMobileNavOpen(false)}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="8" y1="8" x2="24" y2="24" stroke={PRIMARY} strokeWidth="3" strokeLinecap="round" />
              <line x1="24" y1="8" x2="8" y2="24" stroke={PRIMARY} strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>
          <nav className="flex flex-col items-center w-full max-w-xs gap-0 mt-12">
            <a
              href="#about"
              onClick={() => setMobileNavOpen(false)}
              className="w-full text-3xl font-extrabold py-4 text-center text-[#F610C1] bg-transparent border-none rounded-full transition hover:bg-pink-100 active:bg-pink-200 focus:bg-pink-100"
            >
              About
            </a>
            <a
              href="#faq"
              onClick={() => setMobileNavOpen(false)}
              className="w-full text-3xl font-extrabold py-4 text-center text-[#F610C1] bg-transparent border-none rounded-full transition hover:bg-pink-100 active:bg-pink-200 focus:bg-pink-100"
            >
              FAQ
            </a>
            <button
              onClick={() => { setMobileNavOpen(false); onLoginClick(); }}
              className="w-full text-3xl font-extrabold py-4 text-center text-[#F610C1] bg-transparent border-none rounded-full transition hover:bg-pink-100 active:bg-pink-200 focus:bg-pink-100"
            >
              Login
            </button>
            <button
              onClick={() => { setMobileNavOpen(false); onSignUpClick(); }}
              className="w-full px-8 py-3 rounded-full font-extrabold text-2xl shadow-lg transition border-2 border-[#F610C1] text-[#F610C1] bg-white hover:bg-pink-50 text-center mt-8"
              style={{ boxShadow: '0 2px 12px 0 rgba(246,16,193,0.10)' }}
            >
              Sign Up
            </button>
            <button
              onClick={() => { setMobileNavOpen(false); onWaitlistClick(); }}
              className="w-full px-8 py-3 rounded-full font-extrabold text-2xl shadow-lg transition bg-[#F610C1] text-white hover:bg-pink-700 text-center mt-4"
              style={{ boxShadow: '0 2px 12px 0 rgba(246,16,193,0.15)' }}
            >
              Join the waitlist
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 w-full flex flex-col md:flex-row items-stretch px-8 pt-16 md:px-12 gap-8 md:gap-10">
        {/* Left Side (Headline only on mobile) */}
        <div className={`flex flex-col justify-start md:justify-center pt-4 md:pt-0 md:flex-basis-2/5 md:pl-40 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {/* Headline */}
          <h1 className="text-[2.5rem] md:text-[4.5rem] font-extrabold leading-[1.05] mb-8 md:mb-12 -mt-8 md:-mt-16 text-center md:text-left" style={{ color: PRIMARY }}>
            Buy better,<br /> not blindly.
          </h1>
          {/* Scan Bar and Waitlist Button (desktop only) */}
          <div className="hidden md:flex w-full max-w-md gap-2 mb-8">
            <input
              type="url"
              placeholder="Paste any shopping link"
              className="flex-1 px-5 py-4 rounded-l-lg border-2 focus:outline-none text-lg input-placeholder-hotpink text-[#F610C1]"
              style={{ borderColor: PRIMARY, borderRight: 'none' }}
              value={scanUrl}
              onChange={e => setScanUrl(e.target.value)}
            />
            <button
              className="px-7 py-4 rounded-r-lg border-2 font-semibold text-lg transition"
              style={{ borderColor: PRIMARY, color: PRIMARY }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = PRIMARY;
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = PRIMARY;
              }}
              onClick={onScan}
            >
              Scan for Truth
            </button>
          </div>
          {/* Waitlist button under scan bar (desktop only) */}
          <div className="hidden md:flex items-center gap-2 mb-12">
              <span className="text-lg" style={{ color: PRIMARY }}>Not shopping right now?</span>
              <button 
                className="font-bold text-lg py-2"
                style={{ color: PRIMARY }}
                onClick={onWaitlistClick}
              >
                Join the Waitlist
              </button>
            </div>
        </div>

        {/* Right Side (Image always, scan bar/waitlist below on mobile) */}
        <div className={`flex-1 flex flex-col items-center justify-start relative md:flex-basis-3/5 md:justify-end md:items-start pr-0 md:pr-34 -mt-4 md:-mt-8 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {/* Hero image container with yellow cards */}
          <div className="relative w-full max-w-lg h-[340px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl mb-8 md:mb-0 z-10">
            <Image src="/landing.jpg" alt="CIRA Hero" fill className="object-cover z-1" />

            {/* Yellow cards overlay */}
            <div className="absolute inset-0 p-4 pointer-events-none z-10">
              <div 
                className="absolute top-4 left-2 text-center p-2 rounded-lg shadow-md text-sm font-semibold transform -rotate-3 z-10 mr-8 transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-lg pointer-events-auto"
                style={{ maxWidth: '120px', backgroundColor: '#F6F640', color: PRIMARY }}
              >
                Its not just what it looks like.
              </div>
              <div 
                className="absolute bottom-4 right-4 text-center p-2 rounded-lg shadow-md text-sm font-semibold transform rotate-3 z-10 transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-lg pointer-events-auto"
                style={{ maxWidth: '150px', backgroundColor: '#F6F640', color: PRIMARY }}
              >
                Know the truth. Instantly see the real quality.
              </div>
            </div>
          </div>
          {/* Scan Bar and Waitlist Button (mobile only) */}
          <div className="flex flex-col w-full max-w-md gap-2 mb-8 md:hidden">
            <div className="flex w-full gap-2 mb-2">
              <input
                type="url"
                placeholder="Paste any shopping link"
                className="flex-1 px-5 py-4 rounded-l-lg border-2 focus:outline-none text-lg input-placeholder-hotpink text-[#F610C1]"
                style={{ borderColor: PRIMARY, borderRight: 'none' }}
                value={scanUrl}
                onChange={e => setScanUrl(e.target.value)}
              />
              <button
                className="px-7 py-4 rounded-r-lg border-2 font-semibold text-lg transition"
                style={{ borderColor: PRIMARY, color: PRIMARY }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = PRIMARY;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = PRIMARY;
                }}
                onClick={onScan}
              >
                Scan for Truth
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg" style={{ color: PRIMARY }}>Not shopping right now?</span>
              <button 
                className="font-bold text-lg py-2"
                style={{ color: PRIMARY }}
                onClick={onWaitlistClick}
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Remove keyframes for falling lines animation */}
      <style jsx global>{`
        .input-placeholder-hotpink::placeholder {
          color: #F610C1;
          opacity: 0.6;
        }

        @keyframes drawCircle {
          0% {
            clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }

        .animate-draw-circle {
          animation: drawCircle 0.8s ease-out forwards;
        }

        .mobile-nav-fade {
          transition: opacity 0.4s;
        }
      `}</style>
    </div>
  );
}; 