"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Contact Modal Component
const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!supabase) {
        setError('Service temporarily unavailable. Please try again later.');
        return;
      }

      const { error } = await supabase
        .from('brand_contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            role: formData.role,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ name: '', email: '', company: '', role: '', message: '' });
      }, 2000);
    } catch {
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl border border-black/5">
        {!isSubmitted ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-gray-900 tracking-tight">
                Contact <span className="text-green-600">CIRA</span>
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-light"
              >
                ×
              </button>
            </div>
            
            <p className="text-gray-600 mb-8 font-normal tracking-wide leading-relaxed">
              Ready to transform your product transparency? Let&apos;s discuss how CIRA can help your brand.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-normal">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-gray-900 placeholder-gray-400 font-normal"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-gray-900 placeholder-gray-400 font-normal"
                  placeholder="your.email@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">Company *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-gray-900 placeholder-gray-400 font-normal"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-gray-900 placeholder-gray-400 font-normal"
                  placeholder="e.g., Sustainability Manager, CEO"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-gray-900 placeholder-gray-400 font-normal"
                  placeholder="Tell us about your transparency goals and how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors border border-gray-900 shadow-sm"
                style={{ color: 'white' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-200">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-4 tracking-tight">Message Sent!</h3>
            <p className="text-gray-600 font-normal tracking-wide mb-6">
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors duration-300 tracking-wide border border-gray-900"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Brands() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
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
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-10 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
              For <span className="text-green-600">Brands</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
              Automate compliance, create <span className="text-blue-600">Digital Product Passports</span>, and boost trust no code required.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-10 py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Generate <span className="text-blue-600">DPPs</span> instantly</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">Create Digital Product Passports in seconds with our automated compliance engine.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Share <span className="text-green-600">regulatory proof</span></h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">Demonstrate compliance with industry standards and regulations effortlessly.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Track with <span className="text-purple-600">analytics</span></h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">Monitor engagement and understand how consumers interact with your product data.</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto px-10 py-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Why brands choose <span className="text-blue-600">CIRA</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-normal tracking-wide max-w-2xl mx-auto">
              Join leading brands that are already using CIRA to build trust and demonstrate their commitment to transparency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
              <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">Compliance Made Simple</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide mb-6">
                Automatically generate Digital Product Passports that meet EU regulations and industry standards. 
                No technical expertise required.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700 font-normal tracking-wide">EU Digital Product Passport compliant</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700 font-normal tracking-wide">Automated compliance checking</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700 font-normal tracking-wide">Real-time regulatory updates</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
              <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">Build Consumer Trust</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide mb-6">
                Show customers exactly what makes your products special. From materials to manufacturing, 
                let your quality speak for itself.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-normal tracking-wide">Detailed product insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-normal tracking-wide">Sustainability metrics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-normal tracking-wide">Quality scoring system</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-10 py-32 text-center">
          <div className="bg-white rounded-2xl p-16 shadow-sm border border-black/5">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Ready to <span className="text-green-600">transform</span> your product transparency?
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-normal tracking-wide max-w-2xl mx-auto">
              Join the brands that are already building trust through transparency.
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
} 