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
        className="w-full bg-[#FEFEFE] min-h-screen flex flex-col relative"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Blue Ombre Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, rgba(4, 57, 193, 0.1) 0%, rgba(4, 57, 193, 0.05) 50%, transparent 100%)',
            height: '100%'
          }}
        />
        
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
      `}</style>
      
      {/* Header / Navigation */}
      <div className="w-full relative flex items-center justify-between px-12 py-1 border-b border-gray-100/50 backdrop-blur-sm bg-white/80 z-20">
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
      <div className="w-full px-12 py-48 -mt-24 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
              <h1 className="text-5xl lg:text-6xl font-black text-[#0439C1] mb-6 leading-tight">
                Buy Better.<br /> Wear Longer.
              </h1>
              <p className="text-lg text-[#0439C1] mb-8 leading-relaxed">
                CIRA helps you shop clothes that are built to last: with real quality scores, material breakdowns, and care insights that actually matter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#generate"
                  className="px-8 py-4 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg transition-all duration-300 hover:bg-[#0439C1] hover:text-white hover:scale-105 hover:shadow-xl hover-lift inline-block text-center"
                >
                  Scan Item Score
                </a>
                <button
                  onClick={handleWaitlistClick}
                  className="px-8 py-4 rounded-full bg-[#0439C1] text-white font-bold text-lg transition-all duration-300 hover:bg-[#4ED193] hover:scale-105 hover:shadow-xl hover-lift inline-block"
                >
                  Join Waitlist
                </button>
              </div>
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

      {/* For Users & Brands Section - Side by Side */}
      <div className="w-full px-12 py-48 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left Column: For Users */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-[#0439C1] mb-6">
                For <span className="underline decoration-[#4ED193]/60 decoration-2">Users</span> 
              </h2>
              <p className="text-lg text-[#0439C1] mb-8 leading-relaxed">
                Shop with confidence knowing what truly matters: quality.
              </p>
              <p className="text-lg text-[#0439C1] mb-8 leading-relaxed">
                CIRA helps you discover brands that prioritize craftsmanship, transparency, and longevity — so you can build a wardrobe that lasts.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">🔍</span>
                  <span className="text-[#0439C1]"> See any clothing tag for instant quality insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">📊</span>
                  <span className="text-[#0439C1]">Compare durability scores across brands</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">💡</span>
                  <span className="text-[#0439C1]">Get care tips to make your clothes last longer</span>
                </div>
              </div>
              
              <div className="mt-8">
                <a
                  href="#demo"
                  className="px-8 py-4 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg transition-all duration-300 hover:bg-[#0439C1] hover:text-white hover:scale-105 hover:shadow-xl hover-lift inline-block"
                >
                  → Try It Now
                </a>
              </div>
            </div>
            
            {/* Right Column: For Brands */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-[#0439C1] mb-6">
                For <span className="underline decoration-[#4ED193]/60 decoration-2">Brands</span> 
              </h2>
              <p className="text-lg text-[#0439C1] mb-8 leading-relaxed">
                Stand out for what truly matters: quality.
              </p>
              <p className="text-lg text-[#0439C1] mb-8 leading-relaxed">
                CIRA helps brands showcase their craftsmanship, get DPP-ready, and build long-term loyalty with conscious consumers.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">🌿</span>
                  <span className="text-[#0439C1]">Digital Product Passport compliant</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">📈</span>
                  <span className="text-[#0439C1]">Quality data drives purchase confidence</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#4ED193] text-xl font-bold">💬</span>
                  <span className="text-[#0439C1]">Let customers <em>see</em> what makes you different</span>
                </div>
              </div>
              
              <div className="mt-8">
                <a
                  href="/brands"
                  className="px-8 py-4 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg transition-all duration-300 hover:bg-[#0439C1] hover:text-white hover:scale-105 hover:shadow-xl hover-lift inline-block"
                >
                  → Partner With Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Features Section */}
      <div className="w-full px-12 py-48 bg-white relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0439C1] mb-6">
              Clothes shouldn&apos;t fall apart after 3 washes.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Verified Fabric Quality */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4ED193] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0439C1] mb-4">🧵 Verified Fabric Quality</h3>
              <p className="text-[#0439C1] leading-relaxed">
                Know if your item pills, warps, or holds up.
              </p>
            </div>
            
            {/* Real Care Insights */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4ED193] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0439C1] mb-4">🧼 Real Care Insights</h3>
              <p className="text-[#0439C1] leading-relaxed">
                How to make it last longer — from detergent to drying.
              </p>
            </div>
            
            {/* Transparency You Can Trust */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4ED193] rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0439C1] mb-4">🧷 Transparency You Can Trust</h3>
              <p className="text-[#0439C1] leading-relaxed">
                Materials, craftsmanship, and how it was made.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a
              href="#demo"
              className="px-8 py-4 rounded-full border-2 border-[#0439C1] text-[#0439C1] font-bold text-lg transition-all duration-300 hover:bg-[#0439C1] hover:text-white hover:scale-105 hover:shadow-xl hover-lift inline-block"
            >
              → See how we score items
            </a>
          </div>
        </div>
      </div>

      {/* Join Us Section - Quality Girls Club */}
      <div className="w-full px-12 py-48 bg-white relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0439C1] mb-6">
            Quality Girls Club 💬
          </h2>
          <p className="text-lg text-[#0439C1] mb-8 max-w-2xl mx-auto">
            Join thousands ditching fast fashion and finding pieces that <em>actually last</em>. No fluff — just facts.
          </p>
          <button
            onClick={handleWaitlistClick}
            className="px-8 py-4 rounded-full bg-[#0439C1] text-white font-bold text-lg transition-all duration-300 hover:bg-[#4ED193] hover:scale-105 hover:shadow-xl hover-lift inline-block"
          >
            Join the waitlist
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