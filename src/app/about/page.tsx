"use client";

import React from 'react';
import Link from 'next/link';

export default function About() {
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
      <div className="max-w-7xl mx-auto px-10 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
            About <span className="text-blue-600">CIRA</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
            We&apos;re building the future of <span className="text-green-600">product transparency</span>.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-10 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Our <span className="text-blue-600">Mission</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-normal tracking-wide">
              To make product transparency beautiful, accessible, and actionable for everyone in the supply chain.
            </p>
            <p className="text-base text-gray-600 leading-relaxed font-normal tracking-wide">
              We believe that every product has a story worth telling. From the materials used to the people who made it, 
              consumers deserve to know what they&apos;re buying and brands deserve to showcase their values.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Our <span className="text-green-600">Vision</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-normal tracking-wide">
              A world where every product tells its story, and every consumer can make informed choices.
            </p>
            <p className="text-base text-gray-600 leading-relaxed font-normal tracking-wide">
              We envision a future where transparency isn&apos;t just a buzzword, but a fundamental part of how we shop. 
              Where quality and sustainability are visible at a glance, not hidden in fine print.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-10 py-32">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
            Built by <span className="text-purple-600">experts</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-normal tracking-wide max-w-2xl mx-auto">
            Our team combines decades of experience in fashion, technology, and sustainability to create 
            the most comprehensive product transparency platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <span className="text-blue-600 text-2xl">👗</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Fashion Experts</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
              Deep understanding of materials, construction, and quality standards across the industry.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <span className="text-green-600 text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Sustainability Leaders</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
              Pioneering new standards for environmental and social responsibility in fashion.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <span className="text-purple-600 text-2xl">💻</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Tech Innovators</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
              Building the most advanced AI-powered transparency and quality assessment platform.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-10 py-32 text-center">
        <div className="bg-white rounded-2xl p-16 shadow-sm border border-black/5">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
            Ready to join the <span className="text-blue-600">transparency revolution</span>?
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed font-normal tracking-wide max-w-2xl mx-auto">
            Be part of the movement that&apos;s changing how we think about what we buy and wear.
          </p>
          <a
            href="https://beta.cirastyle.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block"
          >
            Try our Beta
          </a>
        </div>
      </div>
    </div>
  );
} 