import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Rubik_Bubbles } from 'next/font/google';

const rubikBubbles = Rubik_Bubbles({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const PRIMARY = '#F610C1';
const ACCENT = '#F6F640';
const YELLOW_HIGHLIGHT = 'rgba(246, 246, 64, 0.6)'; // Keeping for now, might remove if not used

// Import Rubik Bubbles font and define animations
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap');

  @keyframes drawCircle {
    0% {
      clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
    }
    100% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }

  @keyframes animateScore {
    0% { width: 0%; }
    100% { width: var(--target-width); }
  }

  .animate-draw-circle {
    animation: drawCircle 0.8s ease-out forwards;
  }

  .animate-score {
    animation: animateScore 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
`; // Added animateScore keyframe and class

// Define types for ReportCard props
interface Report {
  id: number;
  name: string;
  quality: string;
  ethics: string;
  durability: string;
  description: string;
  costPerWear?: string; // Optional
  image: string;
  overall_score: number;
  construction: string;
}

interface ReportCardProps {
  report: Report;
  isCentered: boolean;
  animate: boolean;
}

// Placeholder Report Card Component (can be moved to a separate file later)
const ReportCard = ({ report, isCentered, animate }: ReportCardProps) => {
  // Function to split the title and highlight 'Cream' - Removed as highlight is removed
  // const renderHighlightedTitle = (name: string) => {
  //   const parts = name.split(' ');
  //   return (
  //     <>
  //       {parts.map((part, index) => (
  //         <span key={index}>
  //           {part.toLowerCase() === 'cream' ? (
  //             <span style={{ backgroundColor: ACCENT, padding: '0 5px', borderRadius: '5px' }}>{part}</span>
  //           ) : (
  //             part
  //           )}
  //           {index < parts.length - 1 && ' '}
  //         </span>
  //       ))}
  //     </>
  //   );
  // };

  return (
    <div 
      className={`w-full flex flex-col transition-all duration-300 ease-in-out border-2 rounded-lg p-6 ${isCentered ? 'max-w-md scale-105 z-10' : 'max-w-xs opacity-75'}`} // Added border, rounded corners, padding, removed original styling
      style={{ borderColor: PRIMARY }} // Set border color to hot pink
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{report.name}</h3> {/* Reverted to original title */}
          <p className="text-gray-500 text-sm">Analyzed 2 min ago</p> {/* Updated text */}
          
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold ml-2" style={{ backgroundColor: '#FCE5F4', color: PRIMARY }}>
          ✓ Verified from Zara
        </span>
      </div>

      {/* Overall Score with Letter Grade and Progress Bar */}
      <div className="mb-6">
         
          <div className="flex items-center gap-2">
            <div className="w-3/4 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-2 rounded-full ${animate ? 'animate-score' : ''}`}
                style={{ 
                  width: '0%',
                  backgroundColor: PRIMARY,
                  '--target-width': `${report.overall_score}%`
                } as React.CSSProperties}
              ></div>
            </div>
            <span className="text-base font-bold" style={{ color: PRIMARY }}>B+</span>
          </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
        <div>
          <p className="text-gray-600 text-sm mb-1">Quality:</p> {/* Updated label */}
          <p className="text-gray-900 font-bold text-base">Stitched to impress</p> {/* Updated text */}
        </div>
        <div>
          <p className="text-gray-600 text-sm mb-1">Construction:</p> {/* Updated label */}
          <p className="text-gray-900 font-bold text-base">Structured, no shortcuts.</p> {/* Updated text */}
        </div>
        <div>
          <p className="text-gray-600 text-sm mb-1">Durability:</p> {/* Updated label */}
          <p className="text-gray-900 font-bold text-base">Still solid in 2029</p> {/* Updated text */}
        </div>
        <div>
          <p className="text-gray-600 text-sm mb-1">Impact:</p> {/* Updated label */}
          <p className="text-gray-900 font-bold text-base">Fair labor, real values.</p> {/* Updated text */}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 text-gray-500 text-sm flex justify-between">
        <span>Made in Italy · 100% Wool · Fully Lined</span> {/* Combined text */}
      </div>

      {/* Removed description and costPerWear */}
    </div>
  );
};

// New component for interactive FAQ item
const InteractiveFAQItem = ({ faq, isOpen, onMouseEnter, onMouseLeave, leftImage, rightImage }: any) => { // Added image props
  return (
    <div 
      className={`w-full flex flex-col relative overflow-hidden transition-all duration-500 ease-in-out transform ${isOpen ? 'bg-pink-100 scale-[1.01]' : 'scale-100'}`} // Added relative, overflow, and conditional background, increased duration, added scale transform
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Container for the visible content (images and text) */}
      <div className={`flex items-center w-full transition-all duration-500 ease-in-out py-6`}> {/* Increased vertical padding */}
         {/* Left Image Container */}
         <div className={`flex-shrink-0 w-20 h-20 flex justify-center items-center transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}> {/* Fixed size container for image, transition for opacity and transform */}
             <Image 
              src={leftImage} // Use passed in image source
              alt="Decorative shirt image left"
              width={80} 
              height={80} 
              className="rounded-lg rotate-[15deg] object-cover" // Image styling
            />
         </div>

          {/* Text Container (Question and Answer) */}
          <div className="flex-grow relative z-10 px-4 md:px-6 text-left"> {/* Added flex-grow, relative, z-10, horizontal padding, text-left */}
            {/* Question Text */}
            <div className="text-xl font-semibold mb-3" style={{ color: PRIMARY }}> {/* Added bottom margin */}
              ({faq.q})
            </div>

            {/* Answer Text (conditionally visible) */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}> {/* Increased max height and added top margin */}
              <p className="text-base leading-relaxed" style={{ color: PRIMARY }}>{faq.a}</p> {/* Changed text color to hot pink */}
            </div>
          </div>

          {/* Right Image Container */}
           <div className={`flex-shrink-0 w-20 h-20 flex justify-center items-center transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}> {/* Fixed size container for image, transition for opacity and transform */}
               <Image 
                src={rightImage} // Use passed in image source
                alt="Decorative shirt image right"
                width={80} 
                height={80} 
                className="rounded-lg rotate-[-15deg] object-cover" // Image styling
              />
           </div>
        </div>
    </div>
  );
};

export const LandingSections: React.FC<{ onWaitlistClick: () => void }> = ({ onWaitlistClick }) => { // Added prop type and destructured
  // FAQ state
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // State for section animations
  const [animateSection1, setAnimateSection1] = useState(false);
  const [animateSection2, setAnimateSection2] = useState(false);
  const [animateSection3, setAnimateSection3] = useState(false);

  // Add states for About section animations
  const [animateAboutText, setAnimateAboutText] = useState(false);
  const [animateAboutImage, setAnimateAboutImage] = useState(false);
  const [animateAboutEst, setAnimateAboutEst] = useState(false);

  // Refs for sections
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  // Add ref for About section
  const aboutRef = useRef<HTMLDivElement>(null);

  // Add effect for About section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Sequence the animations
          setAnimateAboutText(true);
          setTimeout(() => setAnimateAboutImage(true), 500); // Adjusted delay
          setTimeout(() => setAnimateAboutEst(true), 1000); // Adjusted delay
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  // Existing effect for sections 1, 2, 3
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === section1Ref.current) {
              setAnimateSection1(true);
            } else if (entry.target === section2Ref.current) {
              setAnimateSection2(true);
            } else if (entry.target === section3Ref.current) {
              setAnimateSection3(true);
            }
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (section1Ref.current) observer.observe(section1Ref.current);
    if (section2Ref.current) observer.observe(section2Ref.current);
    if (section3Ref.current) observer.observe(section3Ref.current);

    return () => {
      if (section1Ref.current) observer.unobserve(section1Ref.current);
      if (section2Ref.current) observer.unobserve(section2Ref.current);
      if (section3Ref.current) observer.unobserve(section3Ref.current);
    };
  }, []);

  const faqs = [ // Keeping existing FAQs
    {
      q: 'What is CIRA?',
      a: 'CIRA helps you find clothes you actually like, but built to last and made with real values. We analyze quality, construction, and human impact so you don\'t have to dig through labels or greenwashed claims.\nIt\'s fashion you\'d pick, with receipts we verify.'
    },
    {
      q: 'How does the scan work?',
      a: 'Just paste any shopping link.\nWe check the material, construction, and ethics behind the piece, then match it to our verified reports. Once we\'ve graded it, you\'ll get the full breakdown. Plus, we\'ll show you the closest item with a similar look and better standards in different budgets too.'
    },
    {
      q: 'Is CIRA free?',
      a: 'Totally free.\nYou can scan links and view reports of your favorite finds: no fees, no catch.\nKnowing what you\'re buying shouldn\'t be paywalled.'
    },
    {
      q: 'What makes CIRA different?',
      a: 'We\'re not just a search tool. We\'re your quality filter.\nInstead of endless scrolling or decoding labels, CIRA finds pieces that match your taste and hold up in real life. Ethically made, built to last, and graded by actual standards.\nYou bring the style. We bring the facts.'
    },
  ];

  // Available clothing images for FAQ hover effect
  const clothingImages = [
    '/pink.png',
    '/blazer.png',
    '/trench.png',
    '/floral.png',
  ];

  // Placeholder report data
  const reports: Report[] = [ // Keeping existing reports
    {
      id: 1,
      name: 'Floral Resort Blouse',
      quality: 'Excellent',
      ethics: 'Positive',
      durability: '5+ Years',
      description: '"Excellent materials, premium construction, and positive human impact."',
      costPerWear: '$0.45',
      image: '/floral.png',
      overall_score: 85,
      construction: 'Premium',
    },
    {
      id: 2,
      name: 'Floral Dress',
      quality: 'Good',
      ethics: 'Neutral',
      durability: '2+ Years',
      description: '"Decent materials, standard construction, average human impact."',
      costPerWear: '$1.20',
      image: '/floral.png',
      overall_score: 70,
      construction: 'Standard',
    },
    {
      id: 3,
      name: 'Trench Coat',
      quality: 'Very Good',
      ethics: 'Positive',
      durability: '3+ Years',
      description: '"Durable materials, good construction, positive human impact."',
      costPerWear: '$0.80',
      image: '/trench.png',
      overall_score: 80,
      construction: 'Good',
    },
  ];

  // State to track the centered report index (keeping for now, though not used in new layout)
  const [centeredIndex, setCenteredIndex] = useState(0);

  // State and ref for report section animation
  const [animateReports, setAnimateReports] = useState(false);
  const reportSectionRef = useRef<HTMLDivElement>(null);

  // Scroll-based animation trigger
  useEffect(() => {
    const handleScroll = () => {
      if (!reportSectionRef.current) return;
      
      const rect = reportSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Trigger animation when the section is 30% visible
      if (rect.top < windowHeight * 0.7 && rect.bottom > 0) {
        console.log('Report section in view, triggering animation');
        setAnimateReports(true);
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-white">
      <style>{fontStyle}</style>
      {/* About Section */}
      <section 
        ref={aboutRef}
        className="w-full max-w-6xl mx-auto mt-34 mb-64 flex flex-col md:flex-row items-start gap-12 py-20 px-6 md:px-0 relative mt-20"
      >
        {/* Left: Square image */}
        <div className={`flex justify-center items-start w-full md:w-1/4 md:pt-4 -mt-4 transition-opacity duration-1000 ${animateAboutImage ? 'opacity-100' : 'opacity-0 invisible'}`}> {/* Added transition-opacity */}
          <Image src="/four.jpg" alt="About CIRA" width={180} height={180} className="rounded-lg object-cover" />
        </div>

        {/* Right: Large text block */}
        <div className={`flex flex-col justify-center items-start w-full md:w-[80%] transition-opacity duration-1000 ${animateAboutText ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ color: PRIMARY }}> {/* Added transition-opacity */}
          <div className="text-[1.6rem] md:text-[2rem] leading-tight" style={{ fontFamily: 'Inter, Arial, sans-serif'}}>
            <span className={`${animateAboutText ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ transition: 'opacity 1s ease-out 0.3s' }}>We upgrade your style, not your spending. <br /></span> {/* Added inline transition and delay */}
            <span className={`${animateAboutText ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ transition: 'opacity 1s ease-out 0.5s' }}> Designed & graded</span> in <span className={`${animateAboutText ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ transition: 'opacity 1s ease-out 0.7s', fontFamily: 'Rubik Bubbles, Inter, Arial, sans-serif', fontWeight: 900, letterSpacing: 1, fontSize: '1.1em', display: 'inline-block', color: PRIMARY, padding: '0 6px 0 0', borderRadius: '5px' }}>BOSTON</span> {/* Added inline transition and delay */}
            by a close-knit <br />team of researchers,
            engineers, and creators.
          </div>
          <div className={`text-[1.6rem] md:text-[2rem] leading-tight font-normal mt-4 ${animateAboutText ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ transition: 'opacity 1s ease-out 0.9s', fontFamily: 'Inter, Arial, sans-serif'}}> {/* Added inline transition and delay */}
            No greenwashing. No guesswork.
            Just real, <br />research-backed grades
            for every piece <br />you consider.
          </div>
        </div>

        {/* Bottom right: est date */}
        <div className={`absolute bottom-4 right-4 text-base font-mono transition-opacity duration-1000 ${animateAboutEst ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ color: 'rgba(246, 16, 193, 0.6)', transitionDelay: '0.3s' }}>//est 2025</div> {/* Added transition-opacity and delay */}
      </section>

      {/* Report Section (Styled per Screenshot) */}
      <section 
        id="report-section" 
        className="w-full flex flex-col items-center py-8 overflow-hidden relative space-y-32" // Added vertical spacing
        style={{ background: 'white' }} // White background, removed shadow/blur
        ref={reportSectionRef} // Attach ref here
      >
    
        {/* Step 01 Section */}
        <div 
          ref={section1Ref}
          className={`w-full max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-12 px-6 md:px-0 transition-opacity duration-1000 ${animateSection1 ? 'opacity-100' : 'opacity-0 invisible'}`} // Added transition-opacity
        >
          {/* Scattered Shirt Images */}
          <div className={`w-full md:w-1/2 relative h-96 flex justify-center items-center ${animateSection1 ? 'opacity-100' : 'opacity-0 invisible'}`}> {/* Opacity handled by parent */}
            {/* Top Left Shirt */}
            <Image 
              src="/blazer.png" 
              alt="Blazer sketch" 
              width={230}
              height={230}
              className={`absolute top-0 right-120 rotate-[-10deg] opacity-70 z-0 transition-opacity duration-1000`} style={{ transitionDelay: '0.5s' }} // Added transition and delay
            />

            {/* Middle Left Shirt */}
            <Image 
              src="/pink.png" 
              alt="Pink shirt sketch" 
              width={300}
              height={300}
              className={`absolute top-10 left-2/4 rotate-[10deg] opacity-70 z-0 transition-opacity duration-1000`} style={{ transitionDelay: '0.7s' }} // Added transition and delay
            />

            {/* Bottom Right Shirt */}
            <Image 
              src="/trench.png" 
              alt="Trench coat sketch" 
              width={240}
              height={240}
              className={`absolute top-30 right-65 rotate-[0deg] z-0 transition-opacity duration-1000`} style={{ transitionDelay: '0.9s' }} // Added transition and delay
            />
          </div>

          {/* Step 01 Text Block */}
          <div className={`flex-1 flex flex-col items-start w-full md:w-1/2 ${animateSection1 ? 'opacity-100' : 'opacity-0 invisible'}`}> {/* Opacity handled by parent */}
            <div className={`text-5xl font-bold mb-2 transition-opacity duration-1000`} style={{ color: PRIMARY, transitionDelay: '0.3s' }}>01</div> {/* Added transition and delay */}
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 relative transition-opacity duration-1000`} style={{ color: PRIMARY, transitionDelay: '0.4s' }}> {/* Added transition and delay */}
              <span className="relative z-10">Ditch the Hype</span>
              <span className={`absolute inset-0 top-2 bottom-0 z-0 transform rotate-[-2deg] transition-opacity duration-1000`} style={{ backgroundColor: ACCENT, height: '70%', left: '-5px', right: '-5px', transitionDelay: '0.5s' }}></span> {/* Added transition and delay */}
            </h3>
            <p className={`text-lg max-w-sm transition-opacity duration-1000`} style={{ color: PRIMARY, transitionDelay: '0.6s' }}>Only shop items we've vetted for construction, durability, and impact: no empty claims allowed.</p> {/* Added transition and delay */}
          </div>
        </div>

        {/* Step 02 Section */}
        <div 
          ref={section2Ref}
          className={`w-full max-w-6xl mx-auto flex flex-col items-center gap-12 px-6 mt-40 mb-80 md:px-0 transition-opacity duration-1000 ${animateSection2 ? 'opacity-100' : 'opacity-0 invisible'}`} // Added transition-opacity
        >
          {/* Step 02 Text Block */}
          <div className={`flex-1 flex flex-col items-center text-center w-full ${animateSection2 ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ transitionDelay: '0.3s' }}> {/* Added delay, Opacity handled by parent */}
            <div className={`text-5xl font-bold mb-2 transition-opacity duration-1000`} style={{ color: PRIMARY, transitionDelay: '0.3s' }}>02</div> {/* Added transition and delay */}
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 relative inline-block transition-opacity duration-1000`} style={{ color: PRIMARY, transitionDelay: '0.4s' }}> {/* Added transition and delay */}
              <span className="relative z-10">Check the Tag</span>
              <span className={`absolute inset-0 top-2 bottom-0 z-0 transform rotate-[1deg] transition-opacity duration-1000`} style={{ backgroundColor: ACCENT, height: '70%', left: '-5px', right: '-5px', transitionDelay: '0.5s' }}></span> {/* Added transition and delay */}
            </h3>
            <p className={`text-lg max-w-sm transition-opacity duration-1000 mb-10`} style={{ color: PRIMARY, transitionDelay: '0.6s' }}>We break down construction, durability, and impact so you don't get duped.</p> {/* Added transition and delay */}
          </div>

          {/* Floral Image and Report Card Container */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            {/* Floral Image */}
            <div className={`w-full md:w-1/2 flex justify-center items-center transition-opacity duration-1000 ${animateSection2 ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ transitionDelay: '0.5s' }}> {/* Added transition and delay */}
              <Image src="/floral.png" alt="Floral Resort Blouse" width={400} height={600} className="object-cover ml-auto" /> {/* Added ml-auto to push it right */}
            </div>

            {/* Report Card */}
            <div className={`w-full md:w-1/2 flex justify-center items-center relative transition-opacity duration-1000 ${animateSection2 ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ transitionDelay: '0.7s' }}> {/* Added transition and delay */}
              <ReportCard 
                report={reports[0]} 
                isCentered={true} 
                animate={animateReports} 
                key={animateReports ? 'animate' : 'static'} // Force re-render when animation state changes
              />
            </div>
          </div>
        </div>

        {/* Step 03 Section */}
        <div 
          ref={section3Ref}
          className={`w-full max-w-6xl ml-auto pr-20 md:pr-0 flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-0 transition-opacity duration-1000 ${animateSection3 ? 'opacity-100' : 'opacity-0 invisible'}`} // Added transition-opacity
        >
          {/* Step 03 Text Block */}
          <div className={`flex-1 flex flex-col items-start w-full md:w-1/2 ${animateSection3 ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ transitionDelay: '0.3s' }}> {/* Added delay, Opacity handled by parent */}
            <div className={`text-5xl font-bold mb-2 transition-opacity duration-1000`} style={{ color: PRIMARY, transitionDelay: '0.3s' }}>03</div> {/* Added transition and delay */}
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 relative transition-opacity duration-1000`} style={{ color: PRIMARY, transitionDelay: '0.4s' }}> {/* Added transition and delay */}
              <span className="relative z-10">Shop Smarter, Save Your Wallet</span>
              <span className={`absolute inset-0 top-2 bottom-0 z-0 transform rotate-[-1deg] transition-opacity duration-1000`} style={{ backgroundColor: ACCENT, height: '70%', left: '-5px', right: '-5px', transitionDelay: '0.5s' }}></span> {/* Added transition and delay */}
            </h3>
            <p className={`text-lg max-w-sm transition-opacity duration-1000`} style={{ color: PRIMARY, transitionDelay: '0.6s' }}>Save favorites, earn rewards, and feel confident in what you're buying and why it matters.</p> {/* Added transition and delay */}
          </div>

          {/* Five.jpg Image */}
          <div className={`w-full md:w-1/2 flex items-center -ml-24 md:-ml-48 transition-opacity duration-1000 ${animateSection3 ? 'opacity-100' : 'opacity-0 invisible'}`} style={{ transitionDelay: '0.5s' }}> {/* Added transition and delay */}
            <Image src="/five.jpg" alt="Shopping smarter illustration" width={200} height={200} className="object-cover rounded-lg" />
          </div>
        </div>

      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full max-w-3xl mt-60 py-20 px-4 mx-auto text-center"> {/* Keep max-width and padding, added mx-auto and text-center */}
        <h2 className="text-4xl font-bold mb-8" style={{ color: PRIMARY, fontFamily: 'Rubik Bubbles, cursive' }}>FAQ</h2> {/* Changed title and size, added mb, applied Rubik Bubbles font */}
        {/* Removed subtitle */}
        
        {/* Styled list of FAQ items */}
        <div className="flex flex-col w-full">
          <hr className="border-t w-full mb-4" style={{ borderColor: PRIMARY }} /> {/* Top border */}
          {faqs.map((faq, i) => (
            <React.Fragment key={i}>
              <InteractiveFAQItem // Using the new component
                faq={faq}
                isOpen={hoveredIndex === i} // Pass down hover state
                onMouseEnter={() => setHoveredIndex(i)} // Set hovered index on mouse enter
                onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index on mouse leave
                leftImage={clothingImages[i % clothingImages.length]} // Pass different image based on index
                rightImage={clothingImages[(i + 1) % clothingImages.length]} // Pass different image based on index
              />
              <hr className="border-t w-full" style={{ borderColor: PRIMARY }} /> {/* Border after each item */}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 border-t relative overflow-hidden mt-20" style={{ borderColor: PRIMARY }}> {/* Added border-top, relative, overflow-hidden, and increased top margin */}
         {/* Upward Yellow Gradient Overlay */}
         <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: 'linear-gradient(0deg, rgba(246, 246, 64, 0.3) 0%, rgba(246, 246, 64, 0) 100%)', zIndex: 0 }}></div> {/* Changed height to h-20 */}

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10"> {/* Added relative and z-10 */}
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/transparent.png" alt="CIRA Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold tracking-wide" style={{ color: PRIMARY }}>CIRA</span>
          </div>

          {/* Nav Links */}
          <nav className="flex gap-6 text-base font-medium flex-wrap justify-center">
            <a href="#about" className="hover:underline" style={{ color: PRIMARY }}>About</a>
            <a href="#faq" className="hover:underline" style={{ color: PRIMARY }}>FAQ</a>
            {/* Add Contact and Privacy/Terms links if available, using placeholders for now */}
            {/* Removed Contact, Privacy, and Terms links as requested */}
          </nav>

          {/* Copyright and Built info */}
          <div className="text-sm text-gray-600" style={{ color: 'rgba(246, 16, 193, 0.6)' }}>
            © 2025 CIRA, Built in Boston
          </div>

          {/* Join the Waitlist button in Footer */}
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
        </div>
      </footer>
    </div>
  );
}; 