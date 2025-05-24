"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PRIMARY = '#F610C1';

interface FooterProps {
  onWaitlistClick?: () => void;
  showWaitlist?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onWaitlistClick, showWaitlist = true }) => {
  const router = useRouter();

  return (
    <footer className="w-full py-8 px-4 border-t relative overflow-hidden mt-20" style={{ borderColor: PRIMARY }}>
      {/* Upward Yellow Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: 'linear-gradient(0deg, rgba(246, 246, 64, 0.3) 0%, rgba(246, 246, 64, 0) 100%)', zIndex: 0 }}></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/transparent.png" alt="CIRA Logo" width={40} height={40} className="rounded-full" />
          <span className="text-xl font-bold tracking-wide" style={{ color: PRIMARY }}>CIRA</span>
        </div>

        {/* Nav Links */}
        <nav className="flex gap-6 text-base font-medium flex-wrap justify-center">
          <a href="/#about" className="hover:underline" style={{ color: PRIMARY }}>About</a>
          <a href="/#faq" className="hover:underline" style={{ color: PRIMARY }}>FAQ</a>
        </nav>

        {/* Copyright and Built info */}
        <div className="text-sm text-gray-600" style={{ color: 'rgba(246, 16, 193, 0.6)' }}>
          © 2025 CIRA, Built in Boston
        </div>

        {/* Join the Waitlist button in Footer */}
        {showWaitlist && onWaitlistClick && (
          <button
            className="px-6 py-3 rounded-full text-base font-bold shadow-lg border-2 transition"
            style={{ borderColor: PRIMARY, color: PRIMARY }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = PRIMARY;
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = PRIMARY;
            }}
            onClick={onWaitlistClick}
          >
            Join the Waitlist →
          </button>
        )}
      </div>
    </footer>
  );
}; 