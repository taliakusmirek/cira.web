import React, { useState } from 'react';
import Image from 'next/image';

export const LandingHero: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  // Pricing values
  const pricing = {
    starter: isYearly ? 297 * 12 * 0.8 : 297, // 20% off for yearly
    growth: isYearly ? 497 * 12 * 0.8 : 497,
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
          <a href="#solutions" className="hover:text-[#4ED193] transition">Solutions</a>
          <a href="#industries" className="hover:text-[#4ED193] transition">Industries</a>
          <a href="#resources" className="hover:text-[#4ED193] transition">Resources</a>
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
        {/* Headline */}
        <h1 className="text-[3.3rem] md:text-[5.4rem] lg:text-[5.4rem] font-black leading-[1.08] tracking-tight w-full mb-6" style={{ letterSpacing: '-0.03em', lineHeight: 1.08, fontWeight: 900 }}>
          <span className="block text-[#0439C1]">The no-code platform for</span>
          <span className="block text-[#4ED193] -mt-3 ml-3 tracking-widest" style={{ letterSpacing: '0em' }}>
            product compliance.
          </span>
        </h1>
        {/* Subheadline */}
        <div className="text-sm md:text-base text-[#5B6B6B] font-medium w-full max-w-2xl mb-6 mx-auto" style={{ letterSpacing: '-0.01em' }}>
          From fashion to AI, CIRA turns your internal documents into compliant,<br /> shareable product passports no dev team required.
        </div>
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
          <a
            href="#use-cases"
            className="px-8 py-2 rounded-full border-2 border-[#0439C1] text-[#0439C1] text-base font-extrabold transition text-center flex items-center justify-center"
            style={{ minWidth: 140, fontSize: '1rem', height: '44px' }}
          >
            Explore Use Cases
          </a>
        </div>
        {/* Trust line removed */}
      </div>

      {/* Hero Visual */}
      <div className="w-full flex justify-center items-center mt-8 mb-0 relative" style={{ minHeight: '420px' }}>
        {/* Dashboard visual */}
        <div className="relative flex justify-center items-center w-full">
          <Image src="/landscape.png" alt="Landscape background" width={1200} height={400} className="w-[100vw] max-w-5xl h-auto object-cover rounded-3xl shadow-lg mb-10" style={{ zIndex: 1, objectFit: 'cover', pointerEvents: 'none' }} />
          {/* Dashboard image centered */}
          <Image src="/dashboard.png" alt="Dashboard" width={900} height={400} className="absolute w-[58vw] max-w-3xl h-auto rounded-2xl shadow-2xl border border-white" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, marginTop: 0, marginBottom: 0 }} />
        </div>
      </div>

      {/* How It Works Section */}
      <section className="w-full" style={{ fontFamily: "'Nordique Pro Cyrillic SemiBold', sans-serif" }}>
        {/* Step 1 */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto px-4 py-20">
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl w-full mb-12 md:mb-0">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#0439C1] font-bold text-base tracking-wide border border-[#4ED193] shadow-sm">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2"><circle cx="8" cy="8" r="8" fill="#4ED193"></circle><path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"></path></svg>
                FEATURES
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ letterSpacing: '-0.03em', color: '#0439C1' }}>Upload Your Docs</h2>
            <div className="text-lg text-[#5B6B6B] font-medium mb-10 max-w-md">Drop in your product documentation, sourcing info, or internal reports. CIRA handles a range of formats from PDFs to spreadsheets.</div>
            <div className="flex flex-row gap-4 mt-2">
              <a href="#about" className="px-7 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>About CIRA</a>
              <a href="#demo-form" className="px-7 py-3 rounded-full bg-[#0439C1] text-white font-bold text-lg shadow-md hover:bg-[#4ED193] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>Get Started</a>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="relative w-full max-w-2xl">
              <Image src="/one.png" alt="Upload docs" width={800} height={400} className="w-full h-auto rounded-2xl shadow-2xl border border-white" />
            </div>
          </div>
        </section>
        {/* Step 2 */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto px-4 py-20">
          <div className="flex-1 flex items-center justify-center w-full mb-12 md:mb-0 order-2 md:order-1">
            <div className="relative w-full max-w-xl">
              <Image src="/two.png" alt="Choose regulation" width={800} height={400} className="w-full h-auto max-w-xl rounded-2xl shadow-2xl border border-white" />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl w-full order-1 md:order-2">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#0439C1] font-bold text-base tracking-wide border border-[#4ED193] shadow-sm">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2"><circle cx="8" cy="8" r="8" fill="#4ED193"></circle><path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"></path></svg>
                FEATURES
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ letterSpacing: '-0.03em', color: '#0439C1' }}>Choose a Regulation</h2>
            <div className="text-lg text-[#5B6B6B] font-medium mb-10 max-w-md">Select your applicable compliance path: EU Digital Product Passports, AI Act transparency, carbon disclosures, and more.</div>
            <div className="flex flex-row gap-4 mt-2">
              <a href="#about" className="px-7 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>About CIRA</a>
              <a href="#demo-form" className="px-7 py-3 rounded-full bg-[#0439C1] text-white font-bold text-lg shadow-md hover:bg-[#4ED193] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>Get Started</a>
            </div>
          </div>
        </section>
        {/* Step 3 */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto px-4 py-20">
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl w-full mb-12 md:mb-0">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#0439C1] font-bold text-base tracking-wide border border-[#4ED193] shadow-sm">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2"><circle cx="8" cy="8" r="8" fill="#4ED193"></circle><path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"></path></svg>
                FEATURES
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ letterSpacing: '-0.03em', color: '#0439C1' }}>Auto-Generate Product Passport</h2>
            <div className="text-lg text-[#5B6B6B] font-medium mb-10 max-w-md">Instantly generate a branded, shareable page or PDF with all required fields plus optional storytelling modules for added trust.</div>
            <div className="flex flex-row gap-4 mt-2">
              <a href="#about" className="px-7 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>About CIRA</a>
              <a href="#demo-form" className="px-7 py-3 rounded-full bg-[#0439C1] text-white font-bold text-lg shadow-md hover:bg-[#4ED193] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>Get Started</a>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="relative w-full max-w-2xl">
              <Image src="/three.png" alt="Generate passport" width={800} height={400} className="w-full h-auto rounded-2xl shadow-2xl border border-white" />
            </div>
          </div>
        </section>
        {/* Step 4 */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto px-4 py-20">
          <div className="flex-1 flex items-center justify-center w-full mb-12 md:mb-0 order-2 md:order-1">
            <div className="relative w-full max-w-xl">
              <Image src="/dashboard.png" alt="Dashboard tracking" width={800} height={400} className="w-full h-auto max-w-xl rounded-2xl shadow-2xl border border-white" />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl w-full order-1 md:order-2">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#0439C1] font-bold text-base tracking-wide border border-[#4ED193] shadow-sm">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2"><circle cx="8" cy="8" r="8" fill="#4ED193"></circle><path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"></path></svg>
                FEATURES
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ letterSpacing: '-0.03em', color: '#0439C1' }}>Share + Track</h2>
            <div className="text-lg text-[#5B6B6B] font-medium mb-10 max-w-md">Embed a QR or widget on-site, on product packaging, or in B2B docs. Track compliance and engagement from your dashboard.</div>
            <div className="flex flex-row gap-4 mt-2">
              <a href="#about" className="px-7 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>About CIRA</a>
              <a href="#demo-form" className="px-7 py-3 rounded-full bg-[#0439C1] text-white font-bold text-lg shadow-md hover:bg-[#4ED193] transition-all" style={{ minWidth: 150, textAlign: 'center' }}>Get Started</a>
            </div>
          </div>
        </section>
      </section>

      {/* Add spacing between sections */}
      <div className="py-24" />

      {/* Pricing Section */}
      <section className="w-full flex flex-col items-center justify-center px-4 py-24 bg-white" style={{ fontFamily: "'Nordique Pro Cyrillic SemiBold', sans-serif" }}>
        {/* Badge */}
        <div className="mb-8 flex justify-center w-full">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#0439C1] font-bold text-base tracking-wide border border-[#4ED193] shadow-sm" style={{ letterSpacing: '0.01em' }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mr-2"><circle cx="8" cy="8" r="8" fill="#4ED193"></circle><path d="M8 4v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"></path></svg>
            PRICING
          </span>
        </div>
        {/* Headline */}
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-center mb-4" style={{ letterSpacing: '-0.03em', color: '#0439C1' }}>
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
          {/* Starter Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-[#F0F2F5] flex flex-col items-start p-10 min-h-[520px]">
            <div className="flex items-center gap-2 mb-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#4ED193"/><path d="M11 6v5l3 3" stroke="#4ED193" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="text-xl font-bold text-[#0439C1]">Starter</span>
            </div>
            <div className="text-[#5B6B6B] mb-6">Best for solo operators or pilot teams.</div>
            <div className="text-4xl font-extrabold text-[#0439C1] mb-1">{typeof pricing.starter === 'number' ? <><span style={{ fontFamily: 'Arial, sans-serif' }}>$</span>{pricing.starter.toLocaleString(undefined, { maximumFractionDigits: 0 })}</> : pricing.starter} <span className="text-lg font-medium text-[#5B6B6B]" style={{ fontFamily: 'Arial, sans-serif' }}>{pricing.period}</span></div>
            <div className="text-[#5B6B6B] mb-6">{pricing.sub}</div>
            <button className="w-full px-6 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all mb-6">Start Today</button>
            <ul className="text-[#0439C1] text-base font-medium space-y-3 w-full mt-2">
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> 3 Products</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Regulation Templates (ESPR, AI Act)</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Branded QR Pages</li>
              <li className="flex items-center gap-3"><span className="text-[#B0B0B0]">✖</span> Advanced Analytics</li>
              <li className="flex items-center gap-3"><span className="text-[#B0B0B0]">✖</span> Team Roles</li>
            </ul>
          </div>
          {/* Growth Card */}
          <div className="bg-[#0439C1] rounded-3xl shadow-2xl border-2 border-[#0439C1] flex flex-col items-start p-10 min-h-[520px] relative">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-[#FF3B3B] px-5 py-1.5 rounded-full text-xs font-bold border border-[#F0F2F5] shadow" style={{ letterSpacing: '0.04em' }}>MOST POPULAR</span>
            <div className="flex items-center gap-2 mb-2 mt-4">
              <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#4ED193"/><path d="M11 6v5l3 3" stroke="#4ED193" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="text-xl font-bold text-white">Growth</span>
            </div>
            <div className="text-[#4ED193] mb-6">For growing brands and full compliance teams.</div>
            <div className="text-4xl font-extrabold text-white mb-1">{typeof pricing.growth === 'number'
              ? <>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, display: 'inline', letterSpacing: 0, padding: 0, margin: 0 }}>
                    ${String(pricing.growth.toLocaleString(undefined, { maximumFractionDigits: 0 }))[0]}
                  </span>
                  {String(pricing.growth.toLocaleString(undefined, { maximumFractionDigits: 0 })).slice(1)}
                </>
              : pricing.growth} <span className="text-lg font-medium text-[#4ED193]" style={{ fontFamily: 'Arial, sans-serif' }}>{pricing.period}</span></div>
            <div className="text-[#4ED193] mb-6">{pricing.sub}</div>
            <button className="w-full px-6 py-3 rounded-full border-2 border-[#4ED193] text-[#4ED193] font-bold text-lg bg-[#0439C1] hover:bg-[#4ED193] hover:text-white transition-all mb-6">Start Today</button>
            <ul className="text-white text-base font-medium space-y-3 w-full mt-2">
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Unlimited Products</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> All Regulation Templates</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Dashboard Analytics</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> On-brand Customization</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Slack & Webhook Integration</li>
            </ul>
          </div>
          {/* Enterprise Card */}
          <div className="bg-[#F7F9FB] rounded-3xl shadow-lg border border-[#F0F2F5] flex flex-col items-start p-10 min-h-[520px]">
            <div className="flex items-center gap-2 mb-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#4ED193"/><path d="M11 6v5l3 3" stroke="#4ED193" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="text-xl font-bold text-[#0439C1]">Enterprise</span>
            </div>
            <div className="text-[#5B6B6B] mb-6">For global teams, custom pipelines, and regulatory counsel.</div>
            <div className="text-4xl font-extrabold text-[#0439C1] mb-1">Custom</div>
            <div className="text-[#5B6B6B] mb-6">Get in touch for details.</div>
            <button className="w-full px-6 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg bg-white hover:bg-[#F5F6FA] transition-all mb-6">Start Today</button>
            <ul className="text-[#0439C1] text-base font-medium space-y-3 w-full mt-2">
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> All Features</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Dedicated CSM</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Custom Regulation Modules</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> Legal Review Partnerships</li>
              <li className="flex items-center gap-3"><span className="text-[#4ED193]">✔</span> API Access</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full flex flex-col items-center justify-center px-4 py-20 bg-[#F7F9FB]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6" style={{ letterSpacing: '-0.03em', color: '#0439C1' }}>
            FAQs
          </h2>
        </div>

        <div className="w-full max-w-4xl space-y-8">
          {/* FAQ Item 1 */}
          <div className="bg-white rounded-3xl shadow-lg border border-[#F0F2F5] p-8">
            <h3 className="text-xl font-bold text-[#0439C1] mb-4">Is CIRA only for fashion?</h3>
            <p className="text-[#5B6B6B] text-lg">
              Today, CIRA is trusted by 100+ fashion brands for EU 2027 compliance. Tomorrow, it&apos;s for any brand needing to turn complex regulations into shareable, trust-building stories.
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div className="bg-white rounded-3xl shadow-lg border border-[#F0F2F5] p-8">
            <h3 className="text-xl font-bold text-[#0439C1] mb-4">What if I&apos;m not in the EU?</h3>
            <p className="text-[#5B6B6B] text-lg">
              CIRA helps you get ahead of global transparency trends whether it&apos;s DPP, carbon data, AI disclosures, or voluntary ESG reporting.
            </p>
          </div>

          {/* FAQ Item 3 */}
          <div className="bg-white rounded-3xl shadow-lg border border-[#F0F2F5] p-8">
            <h3 className="text-xl font-bold text-[#0439C1] mb-4">What makes CIRA different?</h3>
            <p className="text-[#5B6B6B] text-lg">
              Compliance tools are usually dry and hard to use. CIRA is no-code, on-brand, and built to help you turn regulation into connection.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}; 