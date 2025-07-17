import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { WaitlistModal } from './WaitlistModal';

// Product data for rotating items
const clothingItems = [
  {
    id: 1,
    image: '/abercrombie.png',
    brand: 'ABERCROMBIE',
    productName: 'Short-Sleeve Collared Cardigan',
    description: 'Body-skimming short sleeve cardigan in our soft textural sweater yarn fabric, featuring novelty button-up front, on-trend collared neckline, and rib trims at the cuffs and hem.',
    materials: 'Body: 90% Cotton, 9% Nylon, 1% Elastane',
    care: 'Machine wash cold, with like colors. Do not dry clean. Low iron if needed.',
    sustainability: 'Better Cotton certified - supporting cotton communities and environmental protection.',
    price: null,
    colors: null,
    qualityGrade: 'B',
    qualityStatus: 'unsure' // 'good', 'unsure', 'poor'
  },
  {
    id: 2,
    image: '/zara.png',
    brand: 'ZARA',
    productName: 'Stretch Short Dress',
    description: 'Short dress made in stretch fabric. Round neckline and wide straps. Mock welt pockets with button detail on the front.',
    materials: '100% RCS-certified recycled polyester',
    care: 'Hand wash max 30ºC/86ºF. Do not use bleach. Iron maximum 110ºC/230ºF. Do not dry clean. Do not tumble dry.',
    sustainability: 'RCS CERTIFIED RECYCLED POLYESTER - Made from PET plastic waste, helping limit virgin polyester production.',
    price: '$49.90',
    colors: ['Strawberry', 'Light yellow', 'Ecru / Black'],
    qualityGrade: 'C',
    qualityStatus: 'poor'
  },
  {
    id: 3,
    image: '/ar.png', // Using abercrombie as fallback for artizia
    brand: 'ARITZIA',
    productName: 'The Esquire Trench Coat',
    description: 'Double-breasted trench coat with welt hand pockets, epaulettes and a classic fit. Expertly tailored from City Twill — slick, water-repellent cotton twill with a smooth yet soft feel.',
    materials: '100% cotton; Lining: 100% cupro',
    care: 'Dry clean',
    sustainability: 'Fabric sourced from premier Italian mill',
    price: '$198',
    colors: ['Atlas Olive', 'Oyster', 'Wicker Tan', 'Cola Taupe'],
    qualityGrade: 'A',
    qualityStatus: 'good'
  }
];

export const LandingHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  // Activity messages for auto-scroll
  const activityMessages = [
    {
      id: 1,
      name: "Sarah M.",
      initial: "S",
      avatar: "from-pink-400 to-purple-500",
      message: "just found a sustainable silk blouse",
      time: "2 minutes ago"
    },
    {
      id: 2,
      name: "Emma L.",
      initial: "E",
      avatar: "from-blue-400 to-cyan-500",
      message: "scanned Aritzia's Babaton coat",
      time: "4 minutes ago"
    },
    {
      id: 3,
      name: "Maya K.",
      initial: "M",
      avatar: "from-green-400 to-emerald-500",
      message: "graded Zara top to a C-...yikes",
      time: "6 minutes ago",
      highlight: "C-...yikes"
    },
    {
      id: 4,
      name: "Alex R.",
      initial: "A",
      avatar: "from-orange-400 to-red-500",
      message: "discovered organic cotton basics",
      time: "8 minutes ago"
    },
    {
      id: 5,
      name: "Jess T.",
      initial: "J",
      avatar: "from-purple-400 to-pink-500",
      message: "found recycled denim with A+ rating",
      time: "10 minutes ago"
    },
    {
      id: 6,
      name: "Lily C.",
      initial: "L",
      avatar: "from-indigo-400 to-blue-500",
      message: "checked Abercrombie's transparency score",
      time: "12 minutes ago"
    },
    {
      id: 7,
      name: "Sophie H.",
      initial: "S",
      avatar: "from-teal-400 to-green-500",
      message: "found sustainable alternatives to fast fashion",
      time: "14 minutes ago"
    },
    {
      id: 8,
      name: "Zoe M.",
      initial: "Z",
      avatar: "from-rose-400 to-pink-500",
      message: "discovered a brand with perfect DPP score",
      time: "16 minutes ago"
    }
  ];

  // Create duplicated messages for seamless loop
  const duplicatedMessages = [...activityMessages, ...activityMessages, ...activityMessages];

  useEffect(() => {
    setIsVisible(true);
    
    // Preload all images
    const preloadImages = () => {
      let loadedCount = 0;
      const totalImages = clothingItems.length;
      
      clothingItems.forEach((item) => {
        const img = new window.Image();
        img.onload = () => {
          console.log(`✅ Loaded: ${item.image}`);
          setLoadedImages(prev => new Set(prev).add(item.image));
          loadedCount++;
          
          // Start rotation if all images loaded or after 5 seconds
          if (loadedCount === totalImages) {
            setAllImagesLoaded(true);
          }
        };
        img.onerror = () => {
          console.warn(`❌ Failed to preload: ${item.image}`);
          loadedCount++;
          
          // Start rotation even if some images failed (after 5 seconds timeout)
          if (loadedCount === totalImages) {
            setAllImagesLoaded(true);
          }
        };
        img.src = item.image;
      });
      
      // Fallback: start rotation after 5 seconds regardless
      setTimeout(() => {
        console.log('⏰ Starting rotation after timeout');
        setAllImagesLoaded(true);
      }, 5000);
    };
    
    preloadImages();
  }, []);

  // Handle image loading
  const handleImageLoad = (imageSrc: string) => {
    console.log(`🖼️ Image loaded in component: ${imageSrc}`);
    setLoadedImages(prev => new Set(prev).add(imageSrc));
  };

  // Rotate through clothing items every 2 seconds (shorter rotation)
  useEffect(() => {
    if (!allImagesLoaded) {
      console.log('⏳ Waiting for images to load...');
      return;
    }
    
    console.log('🚀 Starting rotation!');
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentItemIndex((prevIndex) => (prevIndex + 1) % clothingItems.length);
        setIsTransitioning(false);
      }, 400); // Slightly longer transition duration
    }, 2000); // Changed to 2 seconds for shorter rotation

    return () => clearInterval(interval);
  }, [allImagesLoaded]);

  const currentItem = clothingItems[currentItemIndex];

  // Function to get quality indicator icon
  const getQualityIcon = (status: string) => {
    switch (status) {
      case 'good':
        return (
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'unsure':
        return (
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'poor':
        return (
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Function to get quality indicator background color
  const getQualityBgColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100';
      case 'unsure':
        return 'bg-yellow-100';
      case 'poor':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWaitlistModalOpen(true);
  };

  return (
    <>
      <section
        className="w-full bg-[#FEFEFE] min-h-screen flex flex-col"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .soft-shadow {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
        }

        .image-transition {
          transition: opacity 0.3s ease-in-out;
        }

        .product-card-transition {
          transition: all 0.3s ease-in-out;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-66.666%);
          }
        }

        .animate-scroll {
          animation: scroll 24s linear infinite;
        }
      `}</style>
      
      {/* Header / Navigation */}
      <div className="w-full relative flex items-center justify-between px-12 py-1 border-b border-gray-100/50 backdrop-blur-sm bg-white/80">
        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="relative">
            <Image src="/logo.png" alt="CIRA Logo" width={128} height={128} className="h-32 w-32 hover-lift" />
          </div>
        </div>
        
        {/* Navigation - Centered (hidden on mobile) */}
        <nav className="hidden md:flex gap-8 text-base font-medium text-[#0439C1] absolute left-1/2 transform -translate-x-1/2">
          <a href="/about" className="hover:text-[#4ED193] transition-colors duration-300 relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4ED193] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/brands" className="hover:text-[#4ED193] transition-colors duration-300 relative group">
            Brands
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4ED193] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/users" className="hover:text-[#4ED193] transition-colors duration-300 relative group">
            Users
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4ED193] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/changelog" className="hover:text-[#4ED193] transition-colors duration-300 relative group">
            Changelog
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4ED193] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>
        
        {/* Waitlist Button */}
        <button
          onClick={handleWaitlistClick}
          className="px-6 py-3 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-semibold text-base transition-all duration-300 hover:bg-[#0439C1] hover:text-white hover:scale-105 hover:shadow-lg hover-lift"
        >
          Join Waitlist
        </button>
      </div>

      {/* Hero Section */}
      <div className="w-full px-12 py-48 -mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
              <h1 className="text-5xl lg:text-6xl font-black text-[#0439C1] mb-6 leading-tight">
                We make product transparency beautiful.
              </h1>
              <p className="text-lg text-[#0439C1] mb-8 leading-relaxed">
                For <span className="underline decoration-[#4ED193]/60 decoration-2">brands</span> who need to <span className="underline decoration-[#4ED193]/60 decoration-2">comply</span>, for <span className="underline decoration-[#4ED193]/60 decoration-2">consumers</span> who want to <span className="underline decoration-[#4ED193]/60 decoration-2">know</span>.
              </p>
              <a
                href="#generate"
                className="px-8 py-4 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg transition-all duration-300 hover:bg-[#0439C1] hover:text-white hover:scale-105 hover:shadow-xl hover-lift inline-block"
              >
                Try our Beta
              </a>
            </div>
            
            {/* Right Side - Product Card */}
            <div className={`relative ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                {/* Clothing Item Background */}
                <div className="w-[420px] h-96 bg-[#F5F5DC] rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F5F5DC] to-[#E8E8D0]"></div>
                  
                  {/* Clothing Image */}
                  <div className={`absolute inset-0 image-transition ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <Image 
                      src={currentItem.image} 
                      alt={currentItem.productName}
                      width={400}
                      height={350}
                      className="w-full h-full object-contain p-2"
                      onLoad={() => handleImageLoad(currentItem.image)}
                      onError={() => {
                        console.warn(`Failed to load image: ${currentItem.image}`);
                      }}
                    />
                  </div>
                  
                  {/* Loading indicator - only show if image hasn't loaded yet */}
                  {!loadedImages.has(currentItem.image) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                      <div className="text-gray-500 text-sm">Loading {currentItem.brand}...</div>
                    </div>
                  )}
                  
                  {/* Fallback pattern if image doesn't load */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
                    }}></div>
                  </div>
                </div>
                
                {/* Product Card Overlay */}
                <div className={`absolute top-6 right-6 w-72 bg-white rounded-lg p-6 soft-shadow transform rotate-3 product-card-transition ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-black mb-1">{currentItem.qualityGrade}</div>
                      <div className="text-sm font-medium text-gray-600">Quality Grade</div>
                    </div>
                    <div className={`w-12 h-12 ${getQualityBgColor(currentItem.qualityStatus)} rounded-lg flex items-center justify-center`}>
                      {getQualityIcon(currentItem.qualityStatus)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold text-sm text-black mb-1">{currentItem.productName}</div>
                      <div className="text-xs text-gray-600 mb-1">{currentItem.brand}</div>
                      {currentItem.price && (
                        <div className="text-sm font-bold text-[#0439C1] mb-1">{currentItem.price}</div>
                      )}
                      <div className="text-xs text-gray-600 mb-2">{currentItem.description.substring(0, 80)}...</div>
                    </div>
                    
                    <div>
                      <div className="font-semibold text-xs text-black mb-1">Materials</div>
                      <div className="text-xs text-gray-500 mb-2">{currentItem.materials}</div>
                    </div>
                    
                    <div>
                      <div className="font-semibold text-xs text-black mb-1">Care</div>
                      <div className="text-xs text-gray-500">{currentItem.care.substring(0, 60)}...</div>
                    </div>
                    
                    {currentItem.colors && (
                      <div>
                        <div className="font-semibold text-xs text-black mb-1">Colors</div>
                        <div className="text-xs text-gray-500">{currentItem.colors.slice(0, 2).join(', ')}...</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Rotation Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {clothingItems.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentItemIndex 
                        ? 'bg-[#0439C1] w-6' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="w-full px-12 py-48 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-[#0439C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#0439C1]">Upload Your <span className="underline decoration-[#4ED193]/60 decoration-2">Docs</span></h3>
            </div>
            
            {/* Arrow */}
            <div className="hidden lg:block">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-[#0439C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#0439C1]">Verify <span className="underline decoration-[#4ED193]/60 decoration-2">Compliance</span></h3>
            </div>
            
            {/* Arrow */}
            <div className="hidden lg:block">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-[#0439C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#0439C1]">Share <span className="underline decoration-[#4ED193]/60 decoration-2">Anywhere</span></h3>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Narrative Section */}
      <div className="w-full px-12 py-48 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column: For Brands & Creators */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-[#0439C1] mb-6">
                For <span className="underline decoration-[#4ED193]/60 decoration-2">Brands</span> & <span className="underline decoration-[#4ED193]/60 decoration-2">Creators</span>
              </h2>
              <p className="text-lg text-[#0439C1] mb-8 leading-relaxed">
                <span className="underline decoration-[#4ED193]/60 decoration-2">Automate</span> compliance, create <span className="underline decoration-[#4ED193]/60 decoration-2">Digital Product Passports</span>, and boost <span className="underline decoration-[#4ED193]/60 decoration-2">trust</span>—no code required.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">✓</span>
                  <span className="text-[#0439C1]">Generate <span className="underline decoration-[#4ED193]/60 decoration-2">DPPs</span> instantly</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">✓</span>
                  <span className="text-[#0439C1]">Share <span className="underline decoration-[#4ED193]/60 decoration-2">regulatory proof</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">✓</span>
                  <span className="text-[#0439C1]">Track with <span className="underline decoration-[#4ED193]/60 decoration-2">analytics</span></span>
                </div>
              </div>
            </div>
            
            {/* Right Column: For Fashion Girls */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-[#0439C1] mb-6">
                For <span className="underline decoration-[#4ED193]/60 decoration-2">Fashion Girls</span>
              </h2>
              <p className="text-lg text-[#0439C1] mb-8 leading-relaxed">
                <span className="underline decoration-[#4ED193]/60 decoration-2">Validate</span> what&apos;s in your closet and discover <span className="underline decoration-[#4ED193]/60 decoration-2">ethically stunning</span> finds.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">✓</span>
                  <span className="text-[#0439C1]">Check <span className="underline decoration-[#4ED193]/60 decoration-2">receipts</span> for brands</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">✓</span>
                  <span className="text-[#0439C1]">See store <span className="underline decoration-[#4ED193]/60 decoration-2">DPP scores</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">✓</span>
                  <span className="text-[#0439C1]">Find <span className="underline decoration-[#4ED193]/60 decoration-2">fashion matches</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Explorer Section */}
      <div className="w-full px-12 py-48 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0439C1] mb-12 text-center">
            It&apos;s <span className="underline decoration-[#4ED193]/60 decoration-2">happening now.</span>
          </h2>
          
          {/* Live Activity Feed */}
          <div className="bg-gray-50 rounded-lg p-8 max-w-6xl mx-auto overflow-hidden">
            <div className="flex space-x-6 animate-scroll">
              {duplicatedMessages.map((activity, index) => (
                <div key={`${activity.id}-${index}`} className="bg-white rounded-lg p-6 shadow-sm min-w-[300px] flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${activity.avatar} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                      {activity.initial}
                    </div>
                    <div className="flex-1">
                      <p className="text-base text-[#0439C1]">
                        <span className="font-semibold">{activity.name}</span> {activity.message.includes('C-...yikes') ? 
                          <span>graded Zara top to a <span className="text-red-500 font-semibold">C-...yikes</span></span> :
                          <span>{activity.message}</span>
                        }
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Join Waitlist Section */}
      <div className="w-full px-12 py-48 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0439C1] mb-6">
            Join the <span className="underline decoration-[#4ED193]/60 decoration-2">Waitlist</span>
          </h2>
          <p className="text-lg text-[#0439C1] mb-8 max-w-2xl mx-auto">
            Be the first to experience <span className="underline decoration-[#4ED193]/60 decoration-2">product transparency</span> that actually works.
          </p>
          <button
            onClick={handleWaitlistClick}
            className="px-8 py-4 rounded-full bg-[#0439C1] text-white font-bold text-lg transition-all duration-300 hover:bg-[#4ED193] hover:scale-105 hover:shadow-xl hover-lift inline-block"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </section>

    {/* Waitlist Modal */}
    <WaitlistModal 
      isOpen={isWaitlistModalOpen} 
      onClose={() => setIsWaitlistModalOpen(false)} 
    />
  </>
);
}; 