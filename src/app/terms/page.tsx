"use client";

import React from 'react';
import Link from 'next/link';

export default function Terms() {
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
            <span className="text-blue-600">Terms of Service</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
            The terms and conditions governing your use of CIRA.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-10 py-32">
        <div className="space-y-16">
          {/* Acceptance of Terms */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Acceptance of <span className="text-blue-600">Terms</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                By accessing and using CIRA&apos;s services, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our service.
              </p>
              <p>
                These terms apply to all users of the service, including consumers and brands who use 
                our platform for product transparency and quality assessment.
              </p>
            </div>
          </div>

          {/* Description of Service */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Description of <span className="text-green-600">Service</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                CIRA provides a platform for product transparency and quality assessment, including:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>AI-powered quality scoring and analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>Digital Product Passport generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>Material and sustainability insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>Brand transparency reporting</span>
                </li>
              </ul>
            </div>
          </div>

          {/* User Accounts */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              User <span className="text-purple-600">Accounts</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                You are responsible for maintaining the confidentiality of your account credentials 
                and for all activities that occur under your account.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></div>
                  <span>Provide accurate and complete information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></div>
                  <span>Keep your password secure and confidential</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></div>
                  <span>Notify us immediately of any unauthorized use</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></div>
                  <span>You must be at least 13 years old to use our service</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Acceptable Use */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Acceptable <span className="text-blue-600">Use</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                You agree to use our service only for lawful purposes and in accordance with these terms. 
                You agree not to:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Upload false or misleading product information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Attempt to reverse engineer or hack our systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Use our service for any illegal or unauthorized purpose</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                  <span>Interfere with or disrupt our service or servers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Intellectual <span className="text-green-600">Property</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                Our service and its original content, features, and functionality are owned by CIRA 
                and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You retain ownership of any content you upload to our service, but you grant us a 
                license to use, store, and process that content to provide our services.
              </p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Limitation of <span className="text-purple-600">Liability</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                CIRA provides quality assessments and transparency insights, but we cannot guarantee 
                the accuracy of all information or the outcomes of purchasing decisions.
              </p>
              <p>
                To the maximum extent permitted by law, CIRA shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages resulting from your use of our service.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Changes to <span className="text-blue-600">Terms</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes by posting the new terms on our website and updating the effective date.
              </p>
              <p>
                Your continued use of our service after any changes constitutes acceptance of the new terms.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Contact <span className="text-green-600">Us</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-normal tracking-wide">
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 font-medium tracking-wide">Email: legal@trycira.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 