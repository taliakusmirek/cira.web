import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { WaitlistModal } from './WaitlistModal';

export const LandingHero: React.FC = () => {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Debug video loading
    if (videoRef.current) {
      console.log('Video element found:', videoRef.current);
      videoRef.current.addEventListener('loadstart', () => console.log('Video loadstart'));
      videoRef.current.addEventListener('canplay', () => console.log('Video canplay'));
      videoRef.current.addEventListener('error', (e) => console.error('Video error:', e));
      videoRef.current.addEventListener('loadeddata', () => console.log('Video loadeddata'));
      
      // Loop video from 0:00 to 5 seconds
      videoRef.current.addEventListener('timeupdate', () => {
        if (videoRef.current && videoRef.current.currentTime >= 5) {
          videoRef.current.currentTime = 0;
        }
      });
    }
  }, []);

  return (
    <>
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-black/5 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-10">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <span className="text-2xl font-light text-gray-900 tracking-wide">CIRA</span>
              </div>
              
              {/* Navigation - Centered */}
              <nav className="hidden md:flex gap-8 text-sm font-normal text-gray-600 tracking-wide">
                <a href="/about" className="hover:text-gray-900 transition-colors duration-300">About</a>
                <a href="/brands" className="hover:text-gray-900 transition-colors duration-300">Brands</a>
                <a href="/users" className="hover:text-gray-900 transition-colors duration-300">Users</a>
                <a href="/changelog" className="hover:text-gray-900 transition-colors duration-300">Changelog</a>
              </nav>
              
              {/* Waitlist Button */}
              <a
                href="https://beta.cirastyle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors"
              >
                Try our Beta
              </a>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden min-h-screen">
          {/* Background Video */}
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              ref={videoRef}
              onPlay={() => console.log('Video is playing!')}
              onPause={() => console.log('Video is paused!')}
            >
              <source src="/landing.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          {/* Triptych Layout */}
          <div className="grid grid-cols-3 h-screen relative z-10">
            {/* Left Segment - Woman with product */}
            <div className="relative flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-sm font-normal">Check product quality</p>
              </div>
            </div>
            
            {/* Central Segment - Main Content */}
            <div className="relative flex items-center justify-center px-8">
              <div className="text-center text-white max-w-md">
                <h1 className="text-5xl lg:text-6xl font-light text-white mb-8 leading-tight tracking-tight">
                  Stop guessing. Start choosing quality.
                </h1>
                <p className="text-lg text-white/90 mb-10 leading-relaxed font-normal tracking-wide">
                  See how durable, clean, and intentional your fashion and beauty picks are: instantly.
                </p>
                
                {/* Trust Bar */}
                <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/90 font-normal">Trusted by 500+ women grading 1,200+ products in beta</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://beta.cirastyle.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-gray-900 rounded-xl font-medium text-lg tracking-wide hover:bg-gray-100 transition-colors inline-block text-center"
                  >
                    Try the Beta
                  </a>
                  <button
                    onClick={() => setIsWaitlistModalOpen(true)}
                    className="px-8 py-4 bg-transparent text-white border border-white/30 rounded-xl font-medium text-lg tracking-wide hover:border-white hover:bg-white/10 transition-colors inline-block"
                  >
                    Join Waitlist
                  </button>
                </div>
                
                {/* Quick Demo Text */}
                <div className="mt-6 text-sm text-white/70 font-normal">
                  Paste any Sephora, Zara, or Amazon product link
                </div>
              </div>
            </div>
            
            {/* Right Segment - Woman with laptop */}
            <div className="relative flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm font-normal">Get instant scores</p>
              </div>
            </div>
          </div>
        </div>

        {/* Use-Case Snapshots Section */}
        <div className="max-w-6xl mx-auto px-10 py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Real scores. Real quality. No fluff.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal tracking-wide">
              See what we&apos;re actually grading.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Abercrombie Example */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-50 px-3 py-1 rounded-full z-20">
                <span className="text-yellow-700 text-sm font-medium">Score: B</span>
              </div>
              <div className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/p1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Short-Sleeve Collared Cardigan</h3>
              <p className="text-sm text-gray-600 mb-4 font-normal italic">ABERCROMBIE</p>
              <div className="space-y-2 text-xs text-gray-500">
                <div><strong>Materials:</strong> 90% Cotton, 9% Nylon, 1% Elastane</div>
                <div><strong>Care:</strong> Machine wash cold, with like colors</div>
                <div><strong>Durability:</strong> Better Cotton certified</div>
              </div>
            </div>
            
            {/* Zara Example */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-red-50 px-3 py-1 rounded-full z-20">
                <span className="text-red-700 text-sm font-medium">Score: C</span>
              </div>
              <div className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/p2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Stretch Short Dress</h3>
              <p className="text-sm text-gray-600 mb-4 font-normal italic">ZARA</p>
              <div className="space-y-2 text-xs text-gray-500">
                <div><strong>Materials:</strong> 100% RCS-certified recycled polyester</div>
                <div><strong>Care:</strong> Hand wash max 30ºC/86ºF</div>
                <div><strong>Durability:</strong> May pill after 3-5 washes</div>
              </div>
            </div>
            
            {/* Aritzia Example */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-green-50 px-3 py-1 rounded-full z-20">
                <span className="text-green-700 text-sm font-medium">Score: A</span>
              </div>
              <div className="w-full h-32 bg-gray-50 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/p3.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">The Agency Blazer</h3>
              <p className="text-sm text-gray-600 mb-4 font-normal italic">ARITZIA</p>
              <div className="space-y-2 text-xs text-gray-500">
                <div><strong>Materials:</strong> 100% cotton; Lining: 100% cupro</div>
                <div><strong>Care:</strong> Dry clean</div>
                <div><strong>Durability:</strong> Timeless, $198</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="max-w-6xl mx-auto px-10 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              They were tired of things falling apart too.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src="/test1.jpg" 
                    alt="Beta user from NYC"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-700 mb-4 font-normal leading-relaxed italic">
                    &quot;I&apos;m sick of my skincare shelf crumbling. Then I found CIRA.&quot;
                  </p>
                  <div className="text-sm text-gray-500 font-normal">
                    — Beta user, 21, NYC
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src="/test2.jpg" 
                    alt="Beta user from LA"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-700 mb-4 font-normal leading-relaxed italic">
                    &quot;Finally stopped buying clothes that pill after 3 washes.&quot;
                  </p>
                  <div className="text-sm text-gray-500 font-normal">
                    — Beta user, 24, LA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="max-w-6xl mx-auto px-10 py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              3 steps to smarter shopping.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal tracking-wide">
              Simple. Direct. No fluff.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-blue-600 text-2xl">1</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Paste a link</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
                Any Sephora, Zara, or Amazon product.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-green-600 text-2xl">2</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Get your score</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
                Quality grade, material breakdown, care tips.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-purple-600 text-2xl">3</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Feel smarter</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
                Know what&apos;s actually worth the hype.
              </p>
            </div>
          </div>
        </div>

        {/* For Users & Brands Section */}
        <div className="max-w-7xl mx-auto px-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Left Column: For You */}
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
                Ditch fast fashion regret.
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-normal tracking-wide">
                Shop smart, not just cute.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
                Sick of clothes that fall apart or skincare that expires too fast? CIRA helps you filter out the fluff and shop for stuff that actually lasts.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">Check clothing tags for instant quality insights</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">Know how long your products last (and how to store them)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">Get real care tips to make them last longer</span>
                </div>
              </div>
              
              <a
                href="https://beta.cirastyle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block"
              >
                Try It Now
              </a>
            </div>
            
            {/* Right Column: For Creators & Brands */}
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
                Show off what makes your products actually good.
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-normal tracking-wide">
                CIRA helps brands and creators prove their pieces aren&apos;t just trendy — they&apos;re built to last. No greenwashing. Just receipts.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
                Build long-term loyalty with conscious consumers who are tired of fast fashion.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">Digital Product Passport ready</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">Real quality data builds trust</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">Show what makes you different</span>
                </div>
              </div>
              
              <a
                href="/brands"
                className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </div>

        {/* Quality Features Section */}
        <div className="max-w-6xl mx-auto px-10 py-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Clothes shouldn&apos;t fall apart after 3 washes.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Verified Fabric Quality */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Verified Fabric Quality</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
                Know if your item pills, warps, or holds up.
              </p>
            </div>
            
            {/* Real Care Insights */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Real Care Insights</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
                How to make it last longer from detergent to drying.
              </p>
            </div>
            
            {/* Transparency You Can Trust */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Transparency You Can Trust</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
                Materials, craftsmanship, and how it was made.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <a
              href="https://beta.cirastyle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block"
            >
              → See how we score items
            </a>
          </div>
        </div>

        {/* Join Us Section - Quality Girls Club */}
        <div className="max-w-4xl mx-auto px-10 py-32 text-center relative mb-32 rounded-xl overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: 'rotate(-90deg) scale(1.7)',
                transformOrigin: 'center center'
              }}
            >
              <source src="/one.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-8 tracking-tight">
              The Quality Girls Club
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-normal tracking-wide">
              No more dupes that don&apos;t work. 800+ products reviewed by girls who are done wasting money. No fluff. Just facts. Join the crew that shops smart.
            </p>
            <div className="mb-8 text-sm text-white/70 font-normal">
              Because your feed shouldn&apos;t be full of products that don&apos;t last.
            </div>
            <a
              href="https://beta.cirastyle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-medium text-lg tracking-wide hover:bg-gray-100 transition-colors inline-block"
            >
              Try Our Beta
            </a>
          </div>
        </div>
      </div>
      
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </>
  );
};