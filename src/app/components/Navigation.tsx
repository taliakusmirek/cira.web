"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const YELLOW = '#FFF233';

interface NavigationProps {
  onWaitlistClick?: () => void;
  showWaitlist?: boolean;
  onSignUpClick?: () => void;
  onLoginClick?: () => void;
  showAuth?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({}) => {
  const router = useRouter();
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);
  const [resourcesOpen, setResourcesOpen] = React.useState(false);

  // Close dropdowns on outside click
  React.useEffect(() => {
    const handleClick = () => {
      setSolutionsOpen(false);
      setResourcesOpen(false);
    };
    if (solutionsOpen || resourcesOpen) {
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, [solutionsOpen, resourcesOpen]);

  return (
    <header className="flex items-center justify-between w-full px-8 pt-8 pb-4 md:px-12 relative z-20" style={{ background: 'transparent' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}> 
        <Image src="/transparent.png" alt="CIRA Logo" width={48} height={48} className="rounded-full" />
        <span className="text-2xl font-bold tracking-wide" style={{ color: YELLOW }}>CIRA</span>
      </div>
      {/* Center Menu */}
      <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-10 text-lg font-semibold">
        <a href="#" className="text-white hover:text-[#FFF233] transition relative px-2">Features</a>
        <a href="#" className="text-white hover:text-[#FFF233] transition relative px-2">Services</a>
      </nav>
      {/* Mobile Center Menu */}
      <nav className="flex md:hidden flex-1 justify-center gap-6 text-lg font-semibold">
        <a href="#" className="text-white hover:text-[#FFF233] transition relative px-2">Features</a>
        <a href="#" className="text-white hover:text-[#FFF233] transition relative px-2">Services</a>
      </nav>
      {/* Auth Buttons */}
      <div className="flex gap-4 items-center">
        <button className="px-6 py-2 rounded-full font-bold text-base border-2 border-[#F610C1] text-white bg-transparent hover:bg-[#F610C1] hover:text-white transition">Login</button>
        <button className="px-6 py-2 rounded-full font-bold text-base shadow-lg transition bg-[#FFF233] text-black hover:bg-yellow-300">Register - It&apos;s free</button>
      </div>
    </header>
  );
};

export default Navigation; 