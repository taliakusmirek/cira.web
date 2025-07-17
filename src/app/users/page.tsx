"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Users() {
  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Header */}
      <div className="w-full relative flex items-center justify-between px-12 py-1 border-b border-gray-100/50 backdrop-blur-sm bg-white/80">
        <div className="flex items-center gap-3 z-10">
          <div className="relative">
            <Image src="/logo.png" alt="CIRA Logo" width={128} height={128} className="h-32 w-32 hover-lift" />
          </div>
        </div>
        
        <nav className="hidden md:flex gap-8 text-base font-medium text-[#0439C1] absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="hover:text-[#4ED193] transition-colors duration-300 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4ED193] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="hover:text-[#4ED193] transition-colors duration-300 relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4ED193] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/brands" className="hover:text-[#4ED193] transition-colors duration-300 relative group">
            Brands
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4ED193] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/users" className="hover:text-[#4ED193] transition-colors duration-300 relative group">
            Users
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4ED193] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        
        <a
          href="#waitlist"
          className="px-6 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-semibold text-base transition-all duration-300 hover:bg-[#0439C1] hover:text-white hover:scale-105 hover:shadow-lg hover-lift"
        >
          Try our Beta
        </a>
      </div>

      {/* Hero Section */}
      <div className="w-full px-12 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-black text-[#0439C1] mb-6 leading-tight">
            For <span className="underline decoration-[#4ED193]/60 decoration-2">Fashion Girls</span>
          </h1>
          <p className="text-xl text-[#0439C1] mb-8 leading-relaxed">
            Validate what&apos;s in your closet and discover <span className="underline decoration-[#4ED193]/60 decoration-2">ethically stunning</span> finds.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full px-12 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-[#4ED193] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0439C1] mb-4">Check <span className="underline decoration-[#4ED193]/60 decoration-2">receipts</span> for brands</h3>
              <p className="text-[#0439C1]">Scan your receipts to discover the transparency score of your favorite brands.</p>
            </div>
            
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-[#4ED193] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0439C1] mb-4">See store <span className="underline decoration-[#4ED193]/60 decoration-2">DPP scores</span></h3>
              <p className="text-[#0439C1]">Compare transparency scores across different stores and brands.</p>
            </div>
            
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-[#4ED193] rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0439C1] mb-4">Find <span className="underline decoration-[#4ED193]/60 decoration-2">fashion matches</span></h3>
              <p className="text-[#0439C1]">Discover new brands and products that align with your values.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-12 py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0439C1] mb-6">
            Ready to <span className="underline decoration-[#4ED193]/60 decoration-2">discover</span> transparent fashion?
          </h2>
          <a
            href="#waitlist"
            className="px-8 py-4 rounded-full bg-[#0439C1] text-white font-bold text-lg transition-all duration-300 hover:bg-[#4ED193] hover:scale-105 hover:shadow-xl hover-lift inline-block"
          >
            Join the Waitlist
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full py-16 px-12 bg-[#0439C1]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-6 text-white text-sm">
            <a href="#privacy" className="hover:text-[#4ED193] transition-colors duration-300">Privacy</a>
            <a href="#terms" className="hover:text-[#4ED193] transition-colors duration-300">Terms</a>
            <a href="#contact" className="hover:text-[#4ED193] transition-colors duration-300">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
} 