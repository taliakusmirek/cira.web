"use client";

import React from 'react';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full relative pt-0 pb-0 overflow-hidden bg-white"
      style={{
        fontFamily: "'Nordique Pro Cyrillic SemiBold', sans-serif",
        minHeight: 100,
        background: 'white',
        position: 'relative',
      }}
    >
      {/* Content above gradient */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full pt-11 pb-2">
        {/* Headline (short, not all caps) */}
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-[#0439C1] text-center mb-6 mt-8" style={{ letterSpacing: '-0.5px' }}>
          Craft your closet with confidence.
        </h2>
        {/* Nav links as pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-1">
          <a href="#" className="px-5 py-2 rounded-full bg-white text-[#0439C1] font-semibold text-base shadow border border-[#4ED193] hover:bg-[#4ED193] hover:text-[#0439C1] transition-all" style={{ marginBottom: 4 }}>Home</a>
          <a href="#" className="px-5 py-2 rounded-full bg-white text-[#0439C1] font-semibold text-base shadow border border-[#4ED193] hover:bg-[#4ED193] hover:text-[#0439C1] transition-all" style={{ marginBottom: 4 }}>About</a>
          <a href="#" className="px-5 py-2 rounded-full bg-white text-[#0439C1] font-semibold text-base shadow border border-[#4ED193] hover:bg-[#4ED193] hover:text-[#0439C1] transition-all" style={{ marginBottom: 4 }}>Brands</a>
          <a href="#" className="px-5 py-2 rounded-full bg-white text-[#0439C1] font-semibold text-base shadow border border-[#4ED193] hover:bg-[#4ED193] hover:text-[#0439C1] transition-all" style={{ marginBottom: 4 }}>Users</a>
          <a href="#" className="px-5 py-2 rounded-full bg-white text-[#0439C1] font-semibold text-base shadow border border-[#4ED193] hover:bg-[#4ED193] hover:text-[#0439C1] transition-all" style={{ marginBottom: 4 }}>Changelog</a>
          <a href="#" className="px-5 py-2 rounded-full bg-white text-[#0439C1] font-semibold text-base shadow border border-[#4ED193] hover:bg-[#4ED193] hover:text-[#0439C1] transition-all" style={{ marginBottom: 4 }}>Privacy</a>
          <a href="#" className="px-5 py-2 rounded-full bg-white text-[#0439C1] font-semibold text-base shadow border border-[#4ED193] hover:bg-[#4ED193] hover:text-[#0439C1] transition-all" style={{ marginBottom: 4 }}>Terms</a>
          <a href="#" className="px-5 py-2 rounded-full bg-white text-[#0439C1] font-semibold text-base shadow border border-[#4ED193] hover:bg-[#4ED193] hover:text-[#0439C1] transition-all" style={{ marginBottom: 4 }}>Contact</a>
        </div>
        {/* Watermark logo directly under nav buttons, above copyright */}
        <div className="w-full flex justify-center mb-0 mt-10 pb-30">
          <Image src="/logotransparent.png" alt="Logo watermark" width={800} height={120} style={{ width: '50%', height: 'auto', objectFit: 'contain', display: 'block', opacity: 0.3 }} />
        </div>
        {/* Copyright directly under logo */}
        <div className="flex flex-row justify-center items-center w-full max-w-6xl mx-auto text-[#0439C1] text-sm opacity-90 z-10 -mt-30">
          <span>Copyright © 2025</span>
        </div>
        {/* Social icons below copyright */}
        <div className="flex flex-row justify-center gap-4 mb-4">
          <a href="#" className="text-[#0439C1] hover:text-[#4ED193] transition"><i className="fab fa-instagram" /></a>
          <a href="#" className="text-[#0439C1] hover:text-[#4ED193] transition"><i className="fab fa-facebook-f" /></a>
          <a href="#" className="text-[#4ED193] hover:text-[#4ED193] transition"><i className="fab fa-linkedin-in" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 