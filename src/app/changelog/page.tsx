"use client";

import React from 'react';
import Link from 'next/link';

export default function Changelog() {
  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link href="/" className="hover:text-gray-900 transition-colors duration-300">Home</Link>
              <Link href="/about" className="hover:text-gray-900 transition-colors duration-300">About</Link>
              <Link href="/brands" className="hover:text-gray-900 transition-colors duration-300">Brands</Link>
              <Link href="/users" className="hover:text-gray-900 transition-colors duration-300">Users</Link>
              <Link href="/changelog" className="hover:text-gray-900 transition-colors duration-300">Changelog</Link>
            </nav>
            
            {/* CTA Button */}
            <Link
              href="#waitlist"
              className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors"
            >
              Try our Beta
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-10 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
            <span className="text-blue-600">Changelog</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
            See what&apos;s new and what we&apos;re building at CIRA.
          </p>
        </div>
      </div>

      {/* Changelog Entries */}
      <div className="max-w-4xl mx-auto px-10 py-32">
        <div className="space-y-16">
          {/* MVP Release */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="px-4 py-2 bg-blue-50 rounded-xl">
                <span className="text-blue-600 text-sm font-medium tracking-wide">v1.0.0</span>
              </div>
              <span className="text-gray-500 text-sm font-normal tracking-wide">July 28, 2025</span>
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              MVP Release
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                The first public release of CIRA&apos;s user-facing app, bringing transparency and quality insights to fashion consumers.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Basic quality scoring system</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Material analysis and breakdown</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Brand transparency insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="max-w-4xl mx-auto px-10 py-32">
        <div className="bg-white rounded-2xl p-16 shadow-sm border border-black/5 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
            What&apos;s <span className="text-blue-600">coming next</span>?
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed font-normal tracking-wide max-w-2xl mx-auto">
            We&apos;re constantly working on new features to make fashion more transparent and sustainable. 
            Here&apos;s what we&apos;re building next.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-wide">AI-Powered Recommendations</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide text-sm">
                Get personalized suggestions for sustainable alternatives based on your style preferences.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-wide">Community Features</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide text-sm">
                Share your finds and discover new brands through our growing community of conscious consumers.
              </p>
            </div>
          </div>
          
          <div className="mt-10">
            <Link
              href="#waitlist"
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 