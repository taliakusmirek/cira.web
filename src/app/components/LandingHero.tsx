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
    description: 'Double-breasted trench coat with welt hand pockets, epaulettes and a classic fit. Expertly tailored from City Twill, slick, water-repellent cotton twill with a smooth yet soft feel.',
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

  useEffect(() => {
    if (!allImagesLoaded) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentItemIndex((prev) => (prev + 1) % clothingItems.length);
        setIsTransitioning(false);
      }, 300);
    }, 2000); // Changed from 4000 to 3000 for faster rotation
    
    return () => clearInterval(interval);
  }, [allImagesLoaded]);

  const currentItem = clothingItems[currentItemIndex];

  const handleImageLoad = (imageSrc: string) => {
    console.log(`✅ Image loaded in component: ${imageSrc}`);
    setLoadedImages(prev => new Set(prev).add(imageSrc));
  };

  const getQualityIcon = (status: string) => {
    switch (status) {
      case 'good':
        return (
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'poor':
        return (
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
    }
  };

  const getQualityBgColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-50 border-green-200';
      case 'poor':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWaitlistModalOpen(true);
  };

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
                <a href="/about" className="hover:text-gray-900 transition-colors duration-300">About</a>
                <a href="/brands" className="hover:text-gray-900 transition-colors duration-300">Brands</a>
                <a href="/users" className="hover:text-gray-900 transition-colors duration-300">Users</a>
                <a href="/changelog" className="hover:text-gray-900 transition-colors duration-300">Changelog</a>
              </nav>
              
              {/* Waitlist Button */}
              <button
                onClick={handleWaitlistClick}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Side - Text Content */}
            <div className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
              <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
                Buy Better.<br /> Wear Longer.
              </h1>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
                CIRA helps you shop clothes that are built to last: with real quality scores, material breakdowns, and care insights that actually matter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#generate"
                  className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block text-center"
                >
                  Scan Item Score
                </a>
                <button
                  onClick={handleWaitlistClick}
                  className="px-8 py-4 bg-transparent text-gray-600 border border-gray-200 rounded-xl font-medium text-lg tracking-wide hover:border-gray-900 hover:text-gray-900 transition-colors inline-block"
                >
                  Join Waitlist
                </button>
              </div>
            </div>
            
            {/* Right Side - Product Card - Moved more to the left */}
            <div className={`relative -ml-20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`} style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                {/* Clothing Item Background */}
                <div className="w-full h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl relative overflow-hidden border border-black/5">
                  {/* Clothing Image */}
                  <div className={`absolute inset-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <Image 
                      src={currentItem.image} 
                      alt={currentItem.productName}
                      width={400}
                      height={350}
                      className="w-full h-full object-contain p-8"
                      onLoad={() => handleImageLoad(currentItem.image)}
                      onError={() => {
                        console.warn(`Failed to load image: ${currentItem.image}`);
                      }}
                    />
                  </div>
                  
                  {/* Loading indicator - only show if image hasn't loaded yet */}
                  {!loadedImages.has(currentItem.image) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                      <div className="text-gray-500 text-sm font-normal">Loading {currentItem.brand}...</div>
                    </div>
                  )}
                </div>
                
                {/* Product Card Overlay - Moved further right */}
                <div className={`absolute top-8 -right-16 w-72 bg-white rounded-2xl p-8 shadow-sm border border-black/5 transform rotate-3 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-3xl font-light text-gray-900 mb-2 tracking-tight">{currentItem.qualityGrade}</div>
                      <div className="text-sm font-normal text-gray-600 tracking-wide">Quality Grade</div>
                    </div>
                    <div className={`w-12 h-12 ${getQualityBgColor(currentItem.qualityStatus)} rounded-xl flex items-center justify-center border`}>
                      {getQualityIcon(currentItem.qualityStatus)}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium text-sm text-gray-900 mb-2 tracking-wide">{currentItem.productName}</div>
                      <div className="text-xs text-gray-600 mb-2 font-normal">{currentItem.brand}</div>
                      {currentItem.price && (
                        <div className="text-sm font-medium text-gray-900 mb-2">{currentItem.price}</div>
                      )}
                      <div className="text-xs text-gray-500 mb-3 font-normal leading-relaxed">{currentItem.description.substring(0, 80)}...</div>
                    </div>
                    
                    <div>
                      <div className="font-medium text-xs text-gray-900 mb-2 tracking-wide">Materials</div>
                      <div className="text-xs text-gray-500 mb-3 font-normal">{currentItem.materials}</div>
                    </div>
                    
                    <div>
                      <div className="font-medium text-xs text-gray-900 mb-2 tracking-wide">Care</div>
                      <div className="text-xs text-gray-500 font-normal">{currentItem.care.substring(0, 60)}...</div>
                    </div>
                    
                    {currentItem.colors && (
                      <div>
                        <div className="font-medium text-xs text-gray-900 mb-2 tracking-wide">Colors</div>
                        <div className="text-xs text-gray-500 font-normal">{currentItem.colors.slice(0, 2).join(', ')}...</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Rotation Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {clothingItems.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentItemIndex 
                        ? 'bg-gray-900 w-8' 
                        : 'bg-gray-300 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* For Users & Brands Section */}
        <div className="max-w-7xl mx-auto px-10 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Left Column: For Users */}
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
                For <span className="text-blue-600">Users</span> 
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-normal tracking-wide">
                Shop with confidence knowing what truly matters: quality.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
                CIRA helps you discover brands that prioritize craftsmanship, transparency, and longevity so you can build a wardrobe that lasts.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 text-lg">🔍</span>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">See any clothing tag for instant quality insights</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📊</span>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">Compare durability scores across brands</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 text-lg">💡</span>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">Get care tips to make your clothes last longer</span>
                </div>
              </div>
              
              <a
                href="#demo"
                className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block"
              >
                → Try It Now
              </a>
            </div>
            
            {/* Right Column: For Brands */}
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-black/5">
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
                For <span className="text-green-600">Brands</span> 
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-normal tracking-wide">
                Stand out for what truly matters: quality.
              </p>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-normal tracking-wide">
                CIRA helps brands showcase their craftsmanship, get DPP-ready, and build long-term loyalty with conscious consumers.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 text-lg">🌿</span>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">Digital Product Passport compliant</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 text-lg">📈</span>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">Quality data drives purchase confidence</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 text-lg">💬</span>
                  </div>
                  <span className="text-gray-700 font-normal tracking-wide">Let customers <em>see</em> what makes you different</span>
                </div>
              </div>
              
              <a
                href="/brands"
                className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block"
              >
                → Partner With Us
              </a>
            </div>
          </div>
        </div>

        {/* Quality Features Section */}
        <div className="max-w-6xl mx-auto px-10 py-32">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Clothes shouldn&apos;t fall apart after 3 washes.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Verified Fabric Quality */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">🧵 Verified Fabric Quality</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
                Know if your item pills, warps, or holds up.
              </p>
            </div>
            
            {/* Real Care Insights */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">🧼 Real Care Insights</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
                How to make it last longer from detergent to drying.
              </p>
            </div>
            
            {/* Transparency You Can Trust */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">🧷 Transparency You Can Trust</h3>
              <p className="text-gray-600 leading-relaxed font-normal tracking-wide">
                Materials, craftsmanship, and how it was made.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <a
              href="#demo"
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block"
            >
              → See how we score items
            </a>
          </div>
        </div>

        {/* Join Us Section - Quality Girls Club */}
        <div className="max-w-4xl mx-auto px-10 py-32 text-center">
          <div className="bg-white rounded-2xl p-16 shadow-sm border border-black/5">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Quality Girls Club 💬
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-normal tracking-wide">
              Join thousands ditching fast fashion and finding pieces that <em>actually last</em>. No fluff just facts.
            </p>
            <button
              onClick={handleWaitlistClick}
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg tracking-wide hover:bg-gray-800 transition-colors inline-block"
            >
              Join the waitlist
            </button>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={() => setIsWaitlistModalOpen(false)} 
      />
    </>
  );
};