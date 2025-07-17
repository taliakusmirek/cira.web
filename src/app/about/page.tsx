"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
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
            About <span className="underline decoration-[#4ED193]/60 decoration-2">CIRA</span>
          </h1>
          <p className="text-xl text-[#0439C1] mb-8 leading-relaxed">
            We&apos;re building the future of <span className="underline decoration-[#4ED193]/60 decoration-2">product transparency</span>.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="w-full px-12 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="card-hover">
              <h2 className="text-3xl lg:text-4xl font-black text-[#0439C1] mb-6">
                Our <span className="underline decoration-[#4ED193]/60 decoration-2">Mission</span>
              </h2>
              <p className="text-lg text-[#0439C1] mb-8 leading-relaxed">
                To make product transparency beautiful, accessible, and actionable for everyone in the supply chain.
              </p>
            </div>
            
            <div className="card-hover">
              <h2 className="text-3xl lg:text-4xl font-black text-[#0439C1] mb-6">
                Our <span className="underline decoration-[#4ED193]/60 decoration-2">Vision</span>
              </h2>
              <p className="text-lg text-[#0439C1] mb-8 leading-relaxed">
                A world where every product tells its story, and every consumer can make informed choices.
              </p>
            </div>
          </div>
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