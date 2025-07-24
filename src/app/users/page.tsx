"use client";

import React from 'react';
import Link from 'next/link';

export default function Users() {
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
            For <span className="text-blue-600">Fashion Girls</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
            Validate what&apos;s in your closet and discover <span className="text-green-600">ethically stunning</span> finds.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-10 py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Check <span className="text-blue-600">receipts</span> for brands</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">Scan your receipts to discover the transparency score of your favorite brands.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">See store <span className="text-green-600">DPP scores</span></h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">Compare transparency scores across different stores and brands.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Find <span className="text-purple-600">fashion matches</span></h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">Discover new brands and products that align with your values.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-10 py-32">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
            How it <span className="text-blue-600">works</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-normal tracking-wide max-w-2xl mx-auto">
            Get instant insights about any clothing item in just a few seconds.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <span className="text-blue-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Scan or Upload</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
              Take a photo of any clothing tag or upload a receipt from your purchase.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <span className="text-green-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Get Instant Results</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
              Receive a comprehensive quality score and transparency breakdown in seconds.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <span className="text-purple-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Discover Alternatives</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
              Find similar items with better quality scores and sustainability practices.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-10 py-32 text-center">
        <div className="bg-white rounded-2xl p-16 shadow-sm border border-black/5">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
            Ready to <span className="text-blue-600">discover</span> transparent fashion?
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed font-normal tracking-wide max-w-2xl mx-auto">
            Join thousands of fashion-conscious consumers who are already using CIRA to make better shopping decisions.
          </p>
          <Link
            href="#waitlist"
            className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block"
          >
            Join the Waitlist
          </Link>
        </div>
      </div>
    </div>
  );
} 