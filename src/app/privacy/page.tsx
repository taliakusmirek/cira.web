"use client";

import React from 'react';
import Link from 'next/link';

export default function Privacy() {
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
            <span className="text-blue-600">Privacy Policy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
            How we protect and handle your data at CIRA.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-10 py-32">
        <div className="space-y-16">
          {/* Information We Collect */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Information We <span className="text-blue-600">Collect</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                join our waitlist, or contact us for support.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Email address and contact information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Name and company information (for brand accounts)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Product images and data you upload for analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Usage data and analytics to improve our service</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              How We <span className="text-green-600">Use</span> Information
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                We use the information we collect to provide, maintain, and improve our services, 
                and to develop new features and functionality.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>Provide quality scoring and transparency insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>Send you updates about our service and new features</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>Improve our AI models and analysis accuracy</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>Provide customer support and respond to inquiries</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Information <span className="text-purple-600">Sharing</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></div>
                  <span>Service providers who assist in operating our platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></div>
                  <span>Legal requirements and law enforcement requests</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></div>
                  <span>Business transfers in the event of a merger or acquisition</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Data <span className="text-blue-600">Security</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Encryption of data in transit and at rest</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Regular security assessments and updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Access controls and authentication measures</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Your <span className="text-green-600">Rights</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                You have certain rights regarding your personal information, including the right to 
                access, correct, or delete your data.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>Access and review your personal information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>Correct inaccurate or incomplete information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>Request deletion of your personal information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>Opt out of marketing communications</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Contact <span className="text-purple-600">Us</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@trycira.com. You can also try our beta, or contact us for support.
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 font-medium tracking-wide">Email: privacy@trycira.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 