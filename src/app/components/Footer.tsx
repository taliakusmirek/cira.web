"use client";

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-10 py-16">
        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-light text-gray-900 text-center mb-12 tracking-tight">
          Craft your closet with confidence.
        </h2>
        
        {/* Nav links as pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link href="/" className="px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm tracking-wide hover:bg-gray-100 transition-colors border border-gray-200">Home</Link>
          <Link href="/about" className="px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm tracking-wide hover:bg-gray-100 transition-colors border border-gray-200">About</Link>
          <Link href="/brands" className="px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm tracking-wide hover:bg-gray-100 transition-colors border border-gray-200">Brands</Link>
          <Link href="/users" className="px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm tracking-wide hover:bg-gray-100 transition-colors border border-gray-200">Users</Link>
          <Link href="/changelog" className="px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm tracking-wide hover:bg-gray-100 transition-colors border border-gray-200">Changelog</Link>
          <Link href="/privacy" className="px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm tracking-wide hover:bg-gray-100 transition-colors border border-gray-200">Privacy</Link>
          <Link href="/terms" className="px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm tracking-wide hover:bg-gray-100 transition-colors border border-gray-200">Terms</Link>
          <Link href="/contact" className="px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm tracking-wide hover:bg-gray-100 transition-colors border border-gray-200">Contact</Link>
        </div>
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <span className="text-4xl font-light text-gray-900 tracking-wide opacity-30">CIRA</span>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-600 text-sm font-normal tracking-wide mb-8">
          Copyright © 2025
        </div>
        
        {/* Social icons */}
        <div className="flex justify-center gap-6">
          <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 