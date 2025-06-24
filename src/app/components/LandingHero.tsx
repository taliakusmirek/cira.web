import React, { useState } from 'react';
import Image from 'next/image';

export const LandingHero: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  // Pricing values
  const pricing = {
    basic: isYearly ? 297 * 12 * 0.8 : 297, // 20% off for yearly
    pro: isYearly ? 497 * 12 * 0.8 : 497,
    enterprise: 'Custom',
    period: isYearly ? '/ yr' : '/ mo',
    sub: isYearly ? (<span>Billed yearly. Save <span style={{ fontFamily: 'Arial, sans-serif' }}>20%</span>.</span>) : 'Pause or cancel anytime.'
  };

  return (
    <section
      className="w-full bg-white min-h-[90vh] flex flex-col"
      style={{ fontFamily: "'Nordique Pro Cyrillic SemiBold', sans-serif" }}
    >
      <style>{`
        @font-face {
          font-family: 'Nordique Pro Cyrillic SemiBold';
          src: url('/fonts/nordique.otf') format('opentype');
          font-weight: 600;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
      {/* Top Nav Bar */}
      <div className="w-full relative flex items-center justify-between px-12 py-2 border-b border-gray-100" style={{ minHeight: 40 }}>
        {/* Logo */}
        <div className="flex items-center gap-2 z-10">
          <Image src="/logo.png" alt="CIRA Logo" width={96} height={96} className="h-24 w-24" />
        </div>
        {/* Nav - perfectly centered */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-10 text-lg font-medium text-[#0439C1]" style={{ letterSpacing: '-0.01em' }}>
          <a href="#about" className="hover:text-[#4ED193] transition">About</a>
          <a href="#changelog" className="hover:text-[#4ED193] transition">Changelog</a>
          <a href="#contact" className="hover:text-[#4ED193] transition">Contact</a>
        </nav>
        {/* CTA Button */}
        <a
          href="#demo-form"
          className="px-12 py-2.5 rounded-full border-2 font-bold text-lg transition-all z-10"
          style={{
            letterSpacing: '-0.01em',
            minWidth: 180,
            textAlign: 'center',
            borderColor: '#0439C1',
            color: '#0439C1',
            background: 'white',
          }}
          onMouseOver={e => {
            (e.currentTarget as HTMLElement).style.background = '#4ED193';
            (e.currentTarget as HTMLElement).style.color = '#0439C1';
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLElement).style.background = 'white';
            (e.currentTarget as HTMLElement).style.color = '#0439C1';
          }}
        >
          Get Started
        </a>
      </div>
      {/* Hero Content */}
      <div className="w-full flex flex-col items-center max-w-4xl mx-auto px-6 pt-16 pb-0 text-center" style={{ position: 'relative', top: '-20px' }}>
        {/* Badge */}
        <div className="mb-8 flex justify-center w-full">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#0439C1] font-bold text-base tracking-wide border border-[#4ED193] shadow-sm" style={{ letterSpacing: '0.01em' }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2"><circle cx="8" cy="8" r="8" fill="#4ED193"/><path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            EU 2027 READY
          </span>
        </div>
        {/* Headline */}
        <h1 className="text-[3.3rem] md:text-[5.4rem] lg:text-[5.4rem] font-black leading-[1.08] tracking-tight w-full mb-6" style={{ letterSpacing: '-0.03em', lineHeight: 1.08, fontWeight: 900 }}>
          <span className="block text-[#0439C1]">Turn compliance into</span>
          <span
  className="block text-[#4ED193] -mt-3  ml-3 tracking-widest"
  style={{ letterSpacing: '0em' }}
>
connection.
</span>        </h1>
        {/* Subheadline */}
        <div className="text-sm md:text-base text-[#5B6B6B] font-medium w-full max-w-2xl mb-6 mx-auto" style={{ letterSpacing: '-0.01em' }}>
        CIRA helps you create beautiful, 


          <span style={{ fontFamily: 'Arial, sans-serif' }}>-</span>
          on brand Digital Product Passports that showcase your materials, process, and purpose: fully EU compliant, designed to build trust.        </div>
        {/* CTA Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full mb-12">
          <a
            href="#demo-form"
            className="px-8 py-2 rounded-full bg-[#4ED193] text-white text-base font-extrabold shadow-md transition text-center flex items-center justify-center"
            style={{ minWidth: 140, fontSize: '1rem', height: '44px' }}
            onMouseOver={e => {
              (e.currentTarget as HTMLElement).style.background = '#4ED193';
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLElement).style.background = '#4ED193';
            }}
          >
            Get Started
          </a>
          <div className="flex items-center gap-2 md:ml-2 justify-center mt-4 md:mt-0">
            {/* Placeholder avatars */}
            <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar1" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-white shadow -ml-2 first:ml-0" />
            <Image src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar2" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-white shadow -ml-2" />
            <Image src="https://randomuser.me/api/portraits/men/65.jpg" alt="avatar3" width={32} height={32} className="w-8 h-8 rounded-full border-2 border-white shadow -ml-2" />
            <span className="text-[#0439C1] text-sm font-semibold ml-3">Trusted by 100<span style={{ fontFamily: 'Arial, sans-serif' }}>+</span> brands preparing for the 2027 EU ESPR mandate.</span>
          </div>
        </div>
      </div>
      {/* Loved by teams row (hidden) */}
      <div className="hidden">
        <div className="text-[#0439C1] text-base font-bold tracking-wide mb-4" style={{ letterSpacing: '0.01em' }}>
          LOVED BY TEAMS AROUND THE WORLD
        </div>
        {/* Logos row */}
        <div className="flex flex-row items-center justify-center gap-4 opacity-60 mb-0">
          {/* DiceBear business avatar icons */}
          <Image src="https://api.dicebear.com/7.x/identicon/svg?seed=alice" alt="user1" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow -ml-2 first:ml-0" />
          <Image src="https://api.dicebear.com/7.x/identicon/svg?seed=bob" alt="user2" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow -ml-2" />
          <Image src="https://api.dicebear.com/7.x/identicon/svg?seed=carol" alt="user3" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow -ml-2" />
          <Image src="https://api.dicebear.com/7.x/identicon/svg?seed=dave" alt="user4" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow -ml-2" />
          <Image src="https://api.dicebear.com/7.x/identicon/svg?seed=ellen" alt="user5" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow -ml-2" />
        </div>
      </div>
      {/* Dashboard on landscape visual */}
      <div className="w-full flex justify-center items-center mt-8 mb-0 relative" style={{ minHeight: '420px' }}>
        {/* Landscape background */}
        <div className="relative flex justify-center items-center w-full">
          <Image src="/landscape.png" alt="Landscape background" width={1200} height={400} className="w-[100vw] max-w-5xl h-auto object-cover rounded-3xl shadow-lg mb-10" style={{ zIndex: 1, objectFit: 'cover', pointerEvents: 'none' }} />
          {/* Dashboard image centered */}
          <Image src="/dashboard.png" alt="Dashboard" width={900} height={400} className="absolute w-[58vw] max-w-3xl h-auto rounded-2xl shadow-2xl border border-white" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, marginTop: 0, marginBottom: 0 }} />
        </div>
      </div>
      {/* New Features Section (reference layout) */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto px-4 py-20" style={{ fontFamily: "'Nordique Pro Cyrillic SemiBold', sans-serif" }}>
        {/* Left column */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl w-full mb-12 md:mb-0">
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#0439C1] font-bold text-base tracking-wide border border-[#4ED193] shadow-sm">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2"><circle cx="8" cy="8" r="8" fill="#4ED193"/><path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              FEATURES
            </span>
          </div>
          {/* Headline (Step 1) */}
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ letterSpacing: '-0.03em', color: '#0439C1' }}>
            Add Your Product<br />or URL
          </h2>
          {/* Subheadline (Step 1) */}
          <div className="text-lg text-[#5B6B6B] font-medium mb-10 max-w-md">
          Upload your docs or enter details: no code, no dev team.
We turn your raw data into a beautiful, human-readable story page.

          </div>
          {/* Buttons */}
          <div className="flex flex-row gap-4 mt-2">
            <a href="#about" className="px-7 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>About CIRA</a>
            <a href="#demo-form" className="px-7 py-3 rounded-full bg-[#0439C1] text-white font-bold text-lg shadow-md hover:bg-[#4ED193] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>Get Started</a>
          </div>
        </div>
        {/* Right column: screenshot/mockup */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative w-full max-w-2xl">
            <Image src="/one.png" alt="Dashboard" width={800} height={400} className="w-full h-auto rounded-2xl shadow-2xl border border-white" />
          </div>
        </div>
      </section>
      {/* Second Features Section (image left, text right) */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto px-4 py-20" style={{ fontFamily: "'Nordique Pro Cyrillic SemiBold', sans-serif" }}>
        {/* Left column: screenshot/mockup */}
        <div className="flex-1 flex items-center justify-center w-full mb-12 md:mb-0">
          <div className="relative w-full max-w-xl">
            <Image src="/two.png" alt="About Dashboard" width={800} height={400} className="w-full h-auto max-w-xl rounded-2xl shadow-2xl border border-white" />
          </div>
        </div>
        {/* Right column (Step 2) */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl w-full">
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#0439C1] font-bold text-base tracking-wide border border-[#4ED193] shadow-sm">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2"><circle cx="8" cy="8" r="8" fill="#4ED193"/><path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              FEATURES
            </span>
          </div>
          {/* Headline (Step 2) */}
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ letterSpacing: '-0.03em', color: '#0439C1' }}>
            Instantly Generate<br />Your DPP
          </h2>
          {/* Subheadline (Step 2) */}
          <div className="text-lg text-[#5B6B6B] font-medium mb-10 max-w-md">
          Instantly generate a shareable, EU-compliant Digital Product Passport: with your fonts, photos, and brand story built in.

</div>
          {/* Buttons */}
          <div className="flex flex-row gap-4 mt-2">
            <a href="#about" className="px-7 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>About CIRA</a>
            <a href="#demo-form" className="px-7 py-3 rounded-full bg-[#0439C1] text-white font-bold text-lg shadow-md hover:bg-[#4ED193] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>Get Started</a>
          </div>
        </div>
      </section>
      {/* Third Features Section (same as first, alternate content, Step 3) */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto px-4 py-20" style={{ fontFamily: "'Nordique Pro Cyrillic SemiBold', sans-serif" }}>
        {/* Left column (Step 3) */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl w-full mb-12 md:mb-0">
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#0439C1] font-bold text-base tracking-wide border border-[#4ED193] shadow-sm">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2"><circle cx="8" cy="8" r="8" fill="#4ED193"/><path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              FEATURES
            </span>
          </div>
          {/* Headline (Step 3) */}
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ letterSpacing: '-0.03em',  color: '#0439C1' }}>
            Embed the CIRA<br />Widget or QR Code
          </h2>
          {/* Subheadline (Step 3) */}
          <div className="text-lg text-[#5B6B6B] font-medium mb-10 max-w-md">
          Embed a QR code or widget to link every product to its story: from raw materials to maker insights to recyclability.

</div>
          {/* Buttons */}
          <div className="flex flex-row gap-4 mt-2">
            <a href="#about" className="px-7 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>About CIRA</a>
            <a href="#demo-form" className="px-7 py-3 rounded-full bg-[#0439C1] text-white font-bold text-lg shadow-md hover:bg-[#4ED193] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>Get Started</a>
          </div>
        </div>
        {/* Right column: screenshot/mockup */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative w-full max-w-2xl">
            <Image src="/three.png" alt="Dashboard" width={800} height={400} className="w-full h-auto rounded-2xl shadow-2xl border border-white" />
          </div>
        </div>
      </section>
      {/* Fourth Features Section (image left, text right, alternate content, Step 4) */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto px-4 py-20" style={{ fontFamily: "'Nordique Pro Cyrillic SemiBold', sans-serif" }}>
        {/* Left column: screenshot/mockup */}
        <div className="flex-1 flex items-center justify-center w-full mb-12 md:mb-0">
          <div className="relative w-full max-w-xl">
            <Image src="/dashboard.png" alt="About Dashboard" width={800} height={400} className="w-full h-auto max-w-xl rounded-2xl shadow-2xl border border-white" />
          </div>
        </div>
        {/* Right column (Step 4) */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl w-full">
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#0439C1] font-bold text-base tracking-wide border border-[#4ED193] shadow-sm">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2"><circle cx="8" cy="8" r="8" fill="#4ED193"/><path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              FEATURES
            </span>
          </div>
          {/* Headline (Step 4) */}
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ letterSpacing: '-0.03em', color: '#0439C1'  }}>
            Track Compliance<br />& Build Trust
          </h2>
          {/* Subheadline (Step 4) */}
          <div className="text-lg text-[#5B6B6B] font-medium mb-10 max-w-md">
            Stay audit ready and see how shoppers engage, live from your CIRA dashboard.
          </div>
          {/* Buttons */}
          <div className="flex flex-row gap-4 mt-2">
            <a href="#about" className="px-7 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>About CIRA</a>
            <a href="#demo-form" className="px-7 py-3 rounded-full bg-[#0439C1] text-white font-bold text-lg shadow-md hover:bg-[#4ED193] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>Get Started</a>
          </div>
        </div>
      </section>
      {/* Pricing Section (reference style) */}
      <section className="w-full flex flex-col items-center justify-center px-4 py-24 bg-white" style={{ fontFamily: "'Nordique Pro Cyrillic SemiBold', sans-serif" }}>
        {/* Badge */}
        <div className="mb-6 flex justify-center w-full">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#0439C1] font-bold text-base tracking-wide border border-[#4ED193] shadow-sm">
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2"><circle cx="8" cy="8" r="8" fill="#4ED193"/><path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            PRICING
          </span>
        </div>
        {/* Headline */}
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-center mb-4" style={{ letterSpacing: '-0.03em', color: '#0439C1'  }}>
          Explore Our <span className="text-[#4ED193]">Pricing<span style={{ fontFamily: 'Arial, sans-serif' }}>.</span></span>
        </h2>
        {/* Toggle */}
        <div className="flex items-center justify-center gap-2 mb-10 mt-8">
          <button
            className={`px-7 py-2 rounded-full font-bold text-lg shadow transition-all focus:outline-none ${!isYearly ? 'bg-[#0439C1] text-white scale-105' : 'bg-white text-[#0439C1] border border-[#0439C1]'}`}
            style={{ fontFamily: "'Nordique Pro Cyrillic SemiBold', sans-serif", transition: 'all 0.2s cubic-bezier(.4,2,.6,1)' }}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button
            className={`px-7 py-2 rounded-full font-bold text-lg shadow transition-all focus:outline-none ml-2 ${isYearly ? 'bg-[#0439C1] text-white scale-105' : 'bg-white text-[#0439C1] border border-[#0439C1]'}`}
            style={{ fontFamily: "'Nordique Pro Cyrillic SemiBold', sans-serif", transition: 'all 0.2s cubic-bezier(.4,2,.6,1)' }}
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </button>
        </div>
        {/* Pricing Cards */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
          {/* Basic Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-[#F0F2F5] flex flex-col items-start p-10 min-h-[520px]">
            <div className="flex items-center gap-2 mb-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#4ED193"/><path d="M11 6v5l3 3" stroke="#4ED193" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="text-xl font-bold text-[#0439C1]">Basic</span>
            </div>
            <div className="text-[#5B6B6B] mb-6">Best for personal use.</div>
            <div className="text-4xl font-extrabold text-[#0439C1] mb-1">{typeof pricing.basic === 'number' ? <><span style={{ fontFamily: 'Arial, sans-serif' }}>$</span>{pricing.basic.toLocaleString(undefined, { maximumFractionDigits: 0 })}</> : pricing.basic} <span className="text-lg font-medium text-[#5B6B6B]" style={{ fontFamily: 'Arial, sans-serif' }}>{pricing.period}</span></div>
            <div className="text-[#5B6B6B] mb-6">{pricing.sub}</div>
            <button className="w-full px-6 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all mb-6">Start Today</button>
            <ul className="text-[#0439C1] text-base font-medium space-y-3 w-full mt-2">
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Unlimited Pages</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Fully Customizable</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> 100<span style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.95em', verticalAlign: 'baseline', display: 'inline', letterSpacing: 0 }}>%</span>Responsive</li>
              <li className="flex items-center gap-3"><span className="text-[#B0B0B0]">✖</span> Lightning<span style={{ fontFamily: 'Arial, sans-serif', fontSize: '1em', verticalAlign: 'baseline', display: 'inline', letterSpacing: 0 }}>-</span>Fast Performance</li>
              <li className="flex items-center gap-3"><span className="text-[#B0B0B0]">✖</span> Seamless Integrations</li>
            </ul>
          </div>
          {/* Pro Card */}
          <div className="bg-[#0439C1] rounded-3xl shadow-2xl border-2 border-[#0439C1] flex flex-col items-start p-10 min-h-[520px] relative">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-[#FF3B3B] px-5 py-1.5 rounded-full text-xs font-bold border border-[#F0F2F5] shadow" style={{ letterSpacing: '0.04em' }}>🔥 MOST POPULAR</span>
            <div className="flex items-center gap-2 mb-2 mt-4">
              <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#4ED193"/><path d="M11 6v5l3 3" stroke="#4ED193" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="text-xl font-bold text-white">Pro</span>
            </div>
            <div className="text-[#4ED193] mb-6">Best for startups.</div>
            <div className="text-4xl font-extrabold text-white mb-1">{typeof pricing.pro === 'number'
              ? <>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, display: 'inline', letterSpacing: 0, padding: 0, margin: 0 }}>
                    ${String(pricing.pro.toLocaleString(undefined, { maximumFractionDigits: 0 }))[0]}
                  </span>
                  {String(pricing.pro.toLocaleString(undefined, { maximumFractionDigits: 0 })).slice(1)}
                </>
              : pricing.pro} <span className="text-lg font-medium text-[#4ED193]" style={{ fontFamily: 'Arial, sans-serif' }}>{pricing.period}</span></div>
            <div className="text-[#4ED193] mb-6">{pricing.sub}</div>
            <button className="w-full px-6 py-3 rounded-full border-2 border-[#4ED193] text-[#4ED193] font-bold text-lg bg-[#0439C1] hover:bg-[#4ED193] hover:text-white transition-all mb-6">Start Today</button>
            <ul className="text-white text-base font-medium space-y-3 w-full mt-2">
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Unlimited Pages</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Fully Customizable</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> 100<span style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.95em', verticalAlign: 'baseline', display: 'inline', letterSpacing: 0 }}>%</span>Responsive</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Lightning<span style={{ fontFamily: 'Arial, sans-serif', fontSize: '1em', verticalAlign: 'baseline', display: 'inline', letterSpacing: 0 }}>-</span>Fast Performance</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Seamless Integrations</li>
            </ul>
          </div>
          {/* Enterprise Card */}
          <div className="bg-[#F7F9FB] rounded-3xl shadow-lg border border-[#F0F2F5] flex flex-col items-start p-10 min-h-[520px]">
            <div className="flex items-center gap-2 mb-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#4ED193"/><path d="M11 6v5l3 3" stroke="#4ED193" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="text-xl font-bold text-[#0439C1]">Enterprise</span>
            </div>
            <div className="text-[#5B6B6B] mb-6">Best for enterprise business.</div>
            <div className="text-4xl font-extrabold text-[#0439C1] mb-1">Custom</div>
            <div className="text-[#5B6B6B] mb-6">Get in touch for details.</div>
            <button className="w-full px-6 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all mb-6">Start Today</button>
            <ul className="text-[#0439C1] text-base font-medium space-y-3 w-full mt-2">
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Unlimited Pages</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Fully Customizable</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> 100<span style={{ fontFamily: 'Arial, sans-serif', fontSize: '0.95em', verticalAlign: 'baseline', display: 'inline', letterSpacing: 0 }}>%</span>Responsive</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Lightning<span style={{ fontFamily: 'Arial, sans-serif', fontSize: '1em', verticalAlign: 'baseline', display: 'inline', letterSpacing: 0 }}>-</span>Fast Performance</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Seamless Integrations</li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}; 