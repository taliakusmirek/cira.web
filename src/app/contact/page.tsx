"use client";

import React from 'react';
import Link from 'next/link';

export default function Contact() {
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
            <span className="text-blue-600">Contact</span> Us
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
            Have questions about CIRA? Want to partner with us? Just want to say hello? 
            We&apos;re here to help.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-6xl mx-auto px-10 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5">
              <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
                Get in <span className="text-blue-600">Touch</span>
              </h2>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide mb-8">
                Have questions about CIRA? Want to partner with us? Just want to say hello? 
                We&apos;re here to help.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium tracking-wide">Email</p>
                    <p className="text-gray-600 text-sm">hello@trycira.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium tracking-wide">Response Time</p>
                    <p className="text-gray-600 text-sm">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5">
              <h3 className="text-xl font-light text-gray-900 mb-6 tracking-tight">
                Common <span className="text-green-600">Questions</span>
              </h3>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm font-normal tracking-wide">
                  • How does CIRA&apos;s quality scoring work?
                </p>
                <p className="text-gray-600 text-sm font-normal tracking-wide">
                  • Can I integrate CIRA with my existing systems?
                </p>
                <p className="text-gray-600 text-sm font-normal tracking-wide">
                  • What data do you need to analyze my products?
                </p>
                <p className="text-gray-600 text-sm font-normal tracking-wide">
                  • How much does CIRA cost for brands?
                </p>
                <p className="text-gray-600 text-sm font-normal tracking-wide">
                  • How does CIRA help with Digital Product Passports?
                </p>
                <p className="text-gray-600 text-sm font-normal tracking-wide">
                  • Is CIRA available internationally?
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              Send us a <span className="text-purple-600">Message</span>
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">Company (Optional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">Subject</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>General Inquiry</option>
                  <option>Partnership Opportunity</option>
                  <option>Technical Support</option>
                  <option>Pricing Information</option>
                  <option>Feature Request</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto px-10 py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-normal tracking-wide max-w-2xl mx-auto">
            Quick answers to common questions about CIRA.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5">
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">How accurate is CIRA&apos;s quality scoring?</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide mb-4">
              Our AI models are trained on millions of product data points and achieve over 90% accuracy 
              in quality assessment across various clothing categories. We analyze multiple factors including 
              material composition, construction techniques, care instructions, and brand transparency practices 
              to provide comprehensive quality scores.
            </p>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
              Our scoring system is continuously improved based on user feedback and real-world testing, 
              ensuring the most accurate assessments possible for informed purchasing decisions.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5">
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">What information do you need to analyze a product?</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide mb-4">
              We can analyze products from just a photo of the care tag, but more detailed information 
              like materials, construction details, and care instructions provides better accuracy. 
              Our system can extract information from:
            </p>
            <ul className="text-gray-600 leading-relaxed font-normal tracking-wide ml-6 space-y-2">
              <li>• Care tags and labels</li>
              <li>• Product descriptions</li>
              <li>• Material composition lists</li>
              <li>• Brand transparency reports</li>
              <li>• Manufacturing information</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5">
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Is CIRA available internationally?</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide mb-4">
              Currently, we&apos;re focused on the US and EU markets, but we&apos;re expanding globally. 
              Our platform supports multiple languages and regulatory frameworks to serve international users.
            </p>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
              Contact us to learn about availability in your region and upcoming expansion plans. 
              We&apos;re actively working to make CIRA accessible to fashion-conscious consumers worldwide.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5">
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">How much does CIRA cost for brands?</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide mb-4">
              Pricing varies based on your needs and volume. We offer flexible plans for brands of all sizes, 
              from startups to established fashion houses. Our pricing model is designed to be accessible 
              while providing comprehensive transparency solutions.
            </p>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
              We offer custom enterprise solutions for larger brands and competitive pricing for smaller 
              sustainable fashion companies. Contact us for a custom quote tailored to your specific needs.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5">
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">How does CIRA help with Digital Product Passports?</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide mb-4">
              CIRA automates the creation of EU Digital Product Passport compliant documentation. 
              Our platform generates all required information including material composition, 
              sustainability metrics, and supply chain transparency data.
            </p>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
              We ensure your products meet current and upcoming regulatory requirements, 
              helping you stay ahead of compliance deadlines and demonstrate your commitment to transparency.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-black/5">
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">Can I integrate CIRA with my existing systems?</h3>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide mb-4">
              Yes! CIRA offers comprehensive API integration capabilities that work with most 
              e-commerce platforms, inventory management systems, and product information management tools.
            </p>
            <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
              Our technical team works closely with your developers to ensure seamless integration, 
              minimal disruption to your existing workflows, and maximum value from our transparency platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 