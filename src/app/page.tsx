"use client";

import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabaseClient";

const howItWorksSteps = [
  {
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><polygon points="20,6 23,16 34,16 25,23 28,34 20,28 12,34 15,23 6,16 17,16" stroke="#3b3bfa" strokeWidth="2" fill="none" strokeLinejoin="round"/></svg>,
    title: 'Define Your Style',
    desc: 'In just minutes, CIRA helps you clarify your life moments, values, style feelings, and cultural inspirations. Every choice helps you build a profile of who you are becoming.'
  },
  {
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="13" stroke="#d95d4b" strokeWidth="2" /><circle cx="29" cy="20" r="2" fill="#d95d4b" /><circle cx="20" cy="11" r="2" fill="#d95d4b" /></svg>,
    title: 'Discover What Fits You',
    desc: 'Your discovery feed is tailored to your life journey. Find pieces that feel like they were made for your story, meaningful, versatile, and bias-aware.'
  },
  {
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="13" stroke="#e6a07e" strokeWidth="2" /><polyline points="15,20 19,25 27,15" stroke="#e6a07e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Shop with Confidence',
    desc: 'Every brand and piece is rated on bias transparency, material quality, and cost per wear. Only the most authentic, lasting options are featured.'
  },
  {
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="13" stroke="#3b3bfa" strokeWidth="2" /><polyline points="20,27 20,13" stroke="#3b3bfa" strokeWidth="2" strokeLinecap="round"/><polyline points="16,17 20,13 24,17" stroke="#3b3bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Track Your Impact',
    desc: 'See how your wardrobe evolves with a personal dashboard, longevity score, and bias-consciousness score as you shop with awareness.'
  }
];

const trustCards = [
  {
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="20" rx="13" ry="8" stroke="#3b3bfa" strokeWidth="2" /><circle cx="20" cy="20" r="4" fill="#3b3bfa" /></svg>,
    title: 'Bias Transparency',
    desc: 'Diversity, cultural respect, and sustainability are rated for every brand and piece.'
  },
  {
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 8 L32 14 V22 C32 32 20 36 20 36 C20 36 8 32 8 22 V14 Z" stroke="#d95d4b" strokeWidth="2" fill="none" /></svg>,
    title: 'Material Quality',
    desc: 'Durability, repairability, and real-world performance are at the core of every rating.'
  },
  {
    icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="13" stroke="#e6a07e" strokeWidth="2" /><text x="20" y="27" textAnchor="middle" fontSize="18" fill="#e6a07e" fontFamily="sans-serif">$</text></svg>,
    title: 'Cost per Wear',
    desc: 'True value, not hype. See the real cost and longevity of every piece you choose.'
  }
];

const whyQuotes = [
  {
    quote: '"Meaning is greater than hype."',
    desc: 'You are more than a trend. Your clothes should tell your story and last for the journeys ahead.'
  },
  {
    quote: '"Integrity is the new luxury."',
    desc: 'Every piece you choose shapes the future of fashion. CIRA helps you choose consciously building a future where cultural pride, durability, and fairness are the norm.'
  },
  {
    quote: '"Style is your signature, not a costume."',
    desc: 'Express your identity, not just your wardrobe. CIRA empowers you to curate who you are becoming.'
  }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const mobileNavTimeout = useRef<NodeJS.Timeout | null>(null);

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
  }, [mobileNavOpen]);

  const handleWaitlistClick = () => {
    setShowModal(true);
    setMessage(null);
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.from("email").insert([{ email }]);
    setLoading(false);
    if (error) {
      setMessage("Something went wrong. Please try again.");
    } else {
      setMessage("Thank you for joining the waitlist!");
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f7f3ef] font-sans overflow-x-hidden text-[#1a1a1a]" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)', scrollBehavior: 'smooth'}}>
      {/* Neon/gradient background streaks */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-[-20%] top-[-10%] w-[140%] h-[60vh] bg-gradient-to-r from-[#7b61ff]/60 via-[#00eaff]/40 to-[#b6b5f8]/30 blur-3xl opacity-70 rotate-[-8deg]" />
        <div className="absolute right-[-10%] bottom-0 w-[80vw] h-[40vh] bg-gradient-to-l from-[#b6b5f8]/40 via-[#7b61ff]/30 to-[#00eaff]/20 blur-2xl opacity-60 rotate-[8deg]" />
      </div>

      {/* Sticky Nav Bar with scroll effect */}
      <header className={`sticky top-0 z-50 flex justify-between items-center px-4 sm:px-8 pt-6 pb-3 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="13" ry="8" stroke="#1a1a1a" strokeWidth="2"/><ellipse cx="16" cy="16" rx="13" ry="8" transform="rotate(30 16 16)" stroke="#1a1a1a" strokeWidth="1.2" opacity=".5"/></svg></span>
          <span className="text-xl font-bold tracking-wide" style={{letterSpacing: '-0.01em'}}>CIRA</span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 text-sm font-medium">
          <a href="#how-it-works" className="px-4 py-1 border border-[#1a1a1a] rounded-full hover:bg-[#f7f3ef] transition">How It Works</a>
          <a href="#rewards" className="px-4 py-1 border border-[#1a1a1a] rounded-full hover:bg-[#f7f3ef] transition">Rewards</a>
          <a href="#trust" className="px-4 py-1 border border-[#1a1a1a] rounded-full hover:bg-[#f7f3ef] transition">How We Rate Brands</a>
          <a href="#why-cira" className="px-4 py-1 border border-[#1a1a1a] rounded-full hover:bg-[#f7f3ef] transition">Why CIRA Matters</a>
          <a href="#cta" className="px-4 py-1 border border-[#1a1a1a] rounded-full hover:bg-[#f7f3ef] transition">Join</a>
        </nav>
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border border-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#3b3bfa]/40 transition"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Open navigation menu"
        >
          <span className={`block w-6 h-0.5 bg-[#1a1a1a] mb-1 transition-all duration-300 ${mobileNavOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#1a1a1a] mb-1 transition-all duration-300 ${mobileNavOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300 ${mobileNavOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        {/* Mobile Nav Dropdown */}
        {mobileNavVisible && (
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex flex-col items-end md:hidden">
            <div
              className={`w-3/4 max-w-xs bg-white rounded-l-3xl shadow-lg mt-4 mr-2 py-8 px-6 flex flex-col gap-4 transform transition-transform transition-opacity duration-400 ease-in-out
                ${mobileNavOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'}`}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-2xl text-[#3b3bfa] hover:text-[#d95d4b] focus:outline-none transition-transform duration-300"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close navigation menu"
                type="button"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <a href="#how-it-works" className="py-2 px-4 rounded-full border border-[#1a1a1a] text-base font-medium hover:bg-[#f7f3ef] transition" onClick={() => setMobileNavOpen(false)}>How It Works</a>
              <a href="#rewards" className="py-2 px-4 rounded-full border border-[#1a1a1a] text-base font-medium hover:bg-[#f7f3ef] transition" onClick={() => setMobileNavOpen(false)}>Rewards</a>
              <a href="#trust" className="py-2 px-4 rounded-full border border-[#1a1a1a] text-base font-medium hover:bg-[#f7f3ef] transition" onClick={() => setMobileNavOpen(false)}>How We Rate Brands</a>
              <a href="#why-cira" className="py-2 px-4 rounded-full border border-[#1a1a1a] text-base font-medium hover:bg-[#f7f3ef] transition" onClick={() => setMobileNavOpen(false)}>Why CIRA Matters</a>
              <a href="#cta" className="py-2 px-4 rounded-full border border-[#1a1a1a] text-base font-medium hover:bg-[#f7f3ef] transition" onClick={() => setMobileNavOpen(false)}>Join</a>
            </div>
            <style jsx global>{`
              .transition-transform {
                transition-property: transform;
              }
              .transition-opacity {
                transition-property: opacity;
              }
            `}</style>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-8 pt-32 max-w-7xl mx-auto gap-12 animate-fade-in" id="hero">
        {/* Left: Headline and CTA */}
        <div className="flex-1 flex flex-col gap-8 items-start -mt-10 mb-20">
          <span className="text-base font-medium tracking-widest text-[#3b3bfa] uppercase mb-2">Engineered for Conscious Fashion</span>
          <h1 className="text-5xl md:text-7xl font-normal leading-tight tracking-tight mb-2" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>
            Define your style,&nbsp;meaning,<br />and identity
          </h1>
          <p className="text-xl text-[#1a1a1a] max-w-lg mb-4">Discover ethical, enduring pieces guided by meaning, not trends.</p>
          <button
            className="px-8 py-3 border-2 border-[#1a1a1a] rounded-full bg-transparent text-lg font-medium hover:bg-[#e6e0f8] transition"
            onClick={handleWaitlistClick}
          >
            Join the Waitlist
          </button>
        </div>
        {/* Right: Abstract Ellipse Illustration */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <svg width="700" height="480" viewBox="0 0 700 480" fill="none" className="drop-shadow-xl">
            <style>
              {`
                @keyframes rotateIcons {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes counterRotate {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(-360deg); }
                }
                .icon-group {
                  animation: rotateIcons 20s linear infinite;
                  transform-origin: 350px 240px;
                  transform-box: fill-box;
                }
                .icon-group > * {
                  animation: counterRotate 20s linear infinite;
                  transform-origin: center;
                  transform-box: fill-box;
                }
              `}
            </style>
            <ellipse cx="350" cy="240" rx="240" ry="120" fill="url(#ellipseGradient)" />
            <ellipse cx="350" cy="240" rx="240" ry="120" stroke="#1a1a1a" strokeWidth="3" fill="none" />
            <ellipse cx="350" cy="240" rx="240" ry="120" transform="rotate(18 350 240)" stroke="#1a1a1a" strokeWidth="2" opacity=".4" fill="none" />
            <g className="icon-group">
              <circle cx="470" cy="180" r="5" fill="#1a1a1a" />
              <circle cx="230" cy="320" r="3" fill="#1a1a1a" />
              <polygon points="540,260 546,272 534,272" fill="#1a1a1a" />
            </g>
            <defs>
              <radialGradient id="ellipseGradient" cx="0" cy="0" r="1" gradientTransform="translate(350 240) scale(240 120)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e6a07e" />
                <stop offset="0.5" stopColor="#d95d4b" />
                <stop offset="0.7" stopColor="#3b3bfa" />
                <stop offset="1" stopColor="#f7c6f7" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full max-w-5xl mx-auto mt-24 mb-80 px-4 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-normal text-[#1a1a1a] mb-24 tracking-tight" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>How It Works</h2>
        <div className="flex flex-col gap-20">
          {howItWorksSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-8 group">
              {/* Number and Line */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-[#3b3bfa] flex items-center justify-center text-lg font-medium text-[#3b3bfa] bg-white transition-all duration-300 group-hover:bg-[#3b3bfa] group-hover:text-white">
                  {String(i + 1).padStart(2, '0')}
                </div>
                {i < howItWorksSteps.length - 1 && (
                  <div className="w-0.5 h-[calc(100%+5rem)] bg-gradient-to-b from-[#3b3bfa] to-transparent mt-4" />
                )}
              </div>
              {/* Content */}
              <div className="flex-1 pt-2">
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-xl mb-3" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>{step.title}</h3>
                    <p className="text-[#1a1a1a]/80 text-base">{step.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Choose Your Rewards Section */}
      <section id="rewards" className="w-full max-w-5xl mx-auto mb-40 mt-24 px-4 flex flex-col items-center animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-normal text-[#1a1a1a] mb-16 text-center tracking-tight" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>Choose Your Rewards</h2>
        <div className="flex flex-col md:flex-row gap-16 w-full relative">
          {/* Link Bank Card Option */}
          <div className="flex-1">
            <h3 className="font-medium text-2xl mb-6 text-[#3b3bfa] text-center" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>Link Your Bank Card</h3>
            <div className="flex flex-col items-center border-2 border-[#3b3bfa]/20 rounded-3xl p-10 bg-white/60 shadow-sm min-h-[360px] transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{minWidth: 220}}>
              <ul className="text-[#1a1a1a]/80 text-base mb-8 space-y-4 list-disc pl-4 text-left w-full flex-1">
                <li>Standard cash back at certified brands</li>
                <li>Track your conscious wardrobe growth</li>
                <li>Easy, no new card needed</li>
                <li>Limited access to premium drops</li>
              </ul>
              <span className="inline-block border border-[#3b3bfa] text-[#3b3bfa] text-xs font-semibold px-3 py-1 rounded-full w-fit">Simple start, basic rewards</span>
            </div>
          </div>
          
          {/* Divider */}
          <div className="hidden md:flex flex-col items-center justify-center gap-3">
            <div className="w-0.5 h-24 bg-gradient-to-b from-[#3b3bfa]/20 to-[#d95d4b]/20"></div>
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#3b3bfa]/10 to-[#d95d4b]/10 text-sm font-medium">OR</span>
            <div className="w-0.5 h-24 bg-gradient-to-b from-[#d95d4b]/20 to-[#3b3bfa]/20"></div>
          </div>

          {/* CIRA Card Option */}
          <div className="flex-1">
            <h3 className="font-medium text-2xl mb-6 text-[#d95d4b] text-center" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>Get the CIRA Card</h3>
            <div className="flex flex-col items-center border-2 border-[#d95d4b]/30 rounded-3xl p-10 bg-white/60 shadow-sm min-h-[360px] transition-all duration-200 hover:scale-105 hover:shadow-lg" style={{minWidth: 220}}>
              <ul className="text-[#1a1a1a]/80 text-base mb-8 space-y-4 list-disc pl-4 text-left w-full flex-1">
                <li><b>2X CIRA Points</b> on every eligible purchase</li>
                <li><b>2X gift card value</b> (e.g., $10 gift card for $5 worth of points)</li>
                <li>VIP capsule access & exclusive events</li>
                <li>Premium physical & digital card</li>
                <li>Unlock exclusive perks</li>
              </ul>
              <div className="flex flex-col items-center gap-2">
                <span className="inline-block border border-[#d95d4b] text-[#d95d4b] text-xs font-semibold px-3 py-1 rounded-full w-fit">Maximize your rewards</span>
                <span className="inline-block border border-[#3b3bfa] text-[#3b3bfa] text-xs font-semibold px-3 py-1 rounded-full w-fit">Recommended for conscious shoppers</span>
              </div>
            </div>
          </div>
        </div>
        <button
          className="mt-16 px-10 py-4 border-2 border-[#3b3bfa] rounded-full bg-transparent text-xl font-medium text-[#3b3bfa] hover:bg-[#e6e0f8] transition-all duration-200 hover:scale-105 hover:shadow-lg"
          onClick={handleWaitlistClick}
        >
          Claim Your CIRA Card Now
        </button>
      </section>

      {/* How We Rate Brands Section */}
      <section id="trust" className="w-full max-w-5xl mx-auto mb-40 mt-24 px-4 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-normal text-[#1a1a1a] mb-10 text-center tracking-tight" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>How We Rate Brands</h2>
        <div className="relative flex flex-row items-stretch justify-between gap-8 py-12 px-4 bg-gradient-to-r from-[#f7f3ef] via-[#e6e0f8]/60 to-[#f7f3ef] rounded-3xl shadow-md overflow-x-auto">
          {trustCards.map((card, i) => (
            <div key={i} className={`relative flex flex-col items-center text-center border-2 rounded-3xl p-8 bg-white/80 shadow-lg min-w-[260px] max-w-xs transition-all duration-200 hover:scale-105 hover:shadow-2xl z-10 ${i % 2 === 1 ? 'mt-12' : ''}`}
              style={{borderColor: i === 0 ? '#3b3bfa' : i === 1 ? '#d95d4b' : '#e6a07e'}}>
              <div className="mb-4 scale-125">{card.icon}</div>
              <h3 className="font-medium text-lg mb-2" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>{card.title}</h3>
              <p className="text-[#1a1a1a]/80 text-base">{card.desc}</p>
              {i < trustCards.length - 1 && (
                <div className="absolute right-[-32px] top-1/2 transform -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-[#3b3bfa]/40 to-[#e6a07e]/40 z-0" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why CIRA Matters Section */}
      <section id="why-cira" className="w-full max-w-6xl mx-auto mb-40 mt-24 px-4 animate-fade-in overflow-hidden">
        <h2 className="text-3xl sm:text-4xl font-normal text-[#1a1a1a] mb-16 text-center tracking-tight" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>Why CIRA Matters</h2>
        
        {/* Featured Quote */}
        <div className="relative mb-16 bg-gradient-to-r from-[#f7f3ef] via-[#e6e0f8]/40 to-[#f7f3ef] rounded-3xl p-12 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-4xl font-normal text-[#3b3bfa] mb-6" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>{whyQuotes[0].quote}</p>
            <span className="text-[#1a1a1a]/80 text-xl">{whyQuotes[0].desc}</span>
          </div>
        </div>

        {/* Supporting Quotes Scroll */}
        <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory">
          {whyQuotes.slice(1).map((q, i) => (
            <div key={i} className="snap-center flex-none w-[calc(50%-1rem)] min-w-[300px] bg-white/80 rounded-2xl shadow p-8 flex flex-col items-center text-center border border-[#e6a07e]/30 transition-all duration-200 hover:shadow-lg">
              <p className="text-2xl font-normal text-[#3b3bfa] mb-4" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>{q.quote}</p>
              <span className="text-[#1a1a1a]/80 text-base">{q.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="relative w-full min-h-screen flex flex-col items-center justify-center mt-24 animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f3ef] via-[#f7f3ef] to-[#e6e0f8] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-20">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1a1a1a] mb-6" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>Ready to get started?</h2>
          <p className="text-lg text-[#1a1a1a]/80 mb-8 max-w-xl">Join CIRA&apos;s early access waitlist. Curate who you are becoming through clothes that matter.</p>
          <button
            className="px-10 py-4 border-2 border-[#3b3bfa] rounded-full bg-transparent text-xl font-medium text-[#3b3bfa] hover:bg-[#e6e0f8] transition-all duration-200 hover:scale-105 hover:shadow-lg"
            onClick={handleWaitlistClick}
          >
            Join the Waitlist
          </button>
        </div>
      </section>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
          <div className="relative bg-white/90 rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-[#e6e0f8] scale-95 opacity-0 animate-modal-in">
            <button
              className="absolute top-4 right-4 text-2xl text-[#3b3bfa] hover:text-[#d95d4b] transition-transform duration-300 focus:outline-none animate-spin-on-close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-center text-[#3b3bfa] tracking-tight" style={{fontFamily: 'var(--font-nng, Inter, Arial, sans-serif)'}}>Join the Waitlist</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="border border-[#e6e0f8] rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#3b3bfa]/40 transition"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#3b3bfa] to-[#d95d4b] text-white rounded-full px-4 py-2 font-medium shadow hover:scale-105 hover:shadow-lg transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Joining..." : "Join"}
              </button>
            </form>
            {message && <div className="mt-4 text-center text-sm text-[#3b3bfa]">{message}</div>}
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
          `}</style>
        </div>
      )}
    </div>
  );
}
