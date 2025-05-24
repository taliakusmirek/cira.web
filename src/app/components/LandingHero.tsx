import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const PRIMARY = '#F610C1';
const ACCENT = '#F6F640';

export const LandingHero: React.FC<{
  scanUrl: string;
  setScanUrl: (v: string) => void;
  onScan: () => void;
  onWaitlistClick: () => void;
}> = ({ scanUrl, setScanUrl, onScan, onWaitlistClick }) => {
  const [showContent, setShowContent] = useState(false);

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
        <nav className="flex gap-8 text-base font-medium">
          <a href="#about" className="relative group" style={{ color: '#F610C1' }}>
            About
            <span className="absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F610C1' }}></span>
          </a>
          <a href="#faq" className="relative group" style={{ color: '#F610C1' }}>
            FAQ
            <span className="absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F610C1' }}></span>
          </a>
          <button onClick={onWaitlistClick} className="relative group text-base font-medium" style={{ color: '#F610C1' }}>
            Waitlist
            <span className="absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F610C1' }}></span>
          </button>
        </nav>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 w-full flex flex-col md:flex-row items-stretch px-8 pt-16 md:px-12 gap-8 md:gap-10">
        {/* Left Side */}
        <div className={`flex flex-col justify-start md:justify-center pt-4 md:pt-0 md:flex-basis-2/5 pl-40 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {/* Headline */}
          <h1 className="text-[2.5rem] md:text-[4.5rem] font-extrabold leading-[1.05] mb-12 -mt-16 text-left" style={{ color: PRIMARY }}>
            Buy better,<br /> not blindly.
          </h1>
          {/* Scan Bar and Waitlist Button */}
          <div className="flex w-full max-w-md gap-2 mb-8">
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
          {/* Waitlist button under scan bar */}
          <div className="flex items-center gap-2 mb-12">
              <span className="text-lg" style={{ color: PRIMARY }}>Not shopping right now?</span>
              <button 
                className="font-bold text-lg py-2" // Styled to match Scan for Truth height
                style={{ color: PRIMARY }}
                onClick={onWaitlistClick} // Call the passed handler
              >
                Join the Waitlist
              </button>
            </div>
        </div>

        {/* Right Side */}
        <div className={`flex-1 flex items-start justify-end relative md:flex-basis-3/5 pr-34 -mt-8 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {/* Hero image container with yellow cards */}
          <div className="relative w-full max-w-lg h-[600px] rounded-2xl overflow-hidden shadow-xl -mt-8 md:mt-0 z-10">
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
      `}</style>
    </div>
  );
}; 