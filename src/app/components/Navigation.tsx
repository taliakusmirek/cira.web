"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PRIMARY = '#F610C1';

interface NavigationProps {
  onWaitlistClick?: () => void;
  showWaitlist?: boolean;
  onSignUpClick?: () => void;
  onLoginClick?: () => void;
  showAuth?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ onWaitlistClick, showWaitlist = true, onSignUpClick, onLoginClick, showAuth = true }) => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between w-full px-8 pt-8 pb-4 md:px-12 relative z-20" 
      style={{ background: 'linear-gradient(180deg, rgba(255, 242, 51, 0.3) 0%, rgba(255, 242, 51, 0) 100%)' }}>
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
        <Image src="/transparent.png" alt="CIRA Logo" width={48} height={48} className="rounded-full" />
        <span className="text-2xl font-bold tracking-wide" style={{ color: PRIMARY }}>CIRA</span>
      </div>
      <nav className="flex gap-6 text-base font-medium items-center">
        <a href="/#about" className="relative group" style={{ color: PRIMARY }}>
          About
          <span className="absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: PRIMARY }}></span>
        </a>
        <a href="/#faq" className="relative group" style={{ color: PRIMARY }}>
          FAQ
          <span className="absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: PRIMARY }}></span>
        </a>
        {showAuth && <>
          {onLoginClick && (
            <button onClick={onLoginClick} className="relative group text-base font-medium" style={{ color: PRIMARY }}>
              Login
              <span className="absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: PRIMARY }}></span>
            </button>
          )}
          {onSignUpClick && (
            <button onClick={onSignUpClick} className="relative group text-base font-medium" style={{ color: PRIMARY }}>
              Sign Up
              <span className="absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: PRIMARY }}></span>
            </button>
          )}
          {showWaitlist && onWaitlistClick && (
            <button
              onClick={onWaitlistClick}
              className="px-6 py-2 rounded-full font-bold text-base shadow-lg transition bg-[#F610C1] text-white hover:bg-pink-700"
              style={{ boxShadow: '0 2px 12px 0 rgba(246,16,193,0.15)' }}
            >
              Join the waitlist
            </button>
          )}
        </>}
      </nav>
    </header>
  );
};

export default Navigation; 