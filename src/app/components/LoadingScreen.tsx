import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const YELLOW = '#FFF233';
const CLOTHING_IMAGES = [
  '/one.jpg',
  '/three.jpg',
  '/four.jpg',
  '/five.jpg',
]; // Replace with your actual PNGs in /public

export const LoadingScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [done, setDone] = useState(false);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    if (loadedCount === CLOTHING_IMAGES.length) {
      // All images loaded/animated, trigger the drop effect after a short delay
      const dropTimer = setTimeout(() => setDrop(true), 600);
      return () => clearTimeout(dropTimer);
    } else if (loadedCount < CLOTHING_IMAGES.length) {
      // Simulate loading/animation time for each image
      const loadTimer = setTimeout(() => {
        setLoadedCount(loadedCount + 1);
      }, 300); // Stagger delay
      return () => clearTimeout(loadTimer);
    }
  }, [loadedCount]);

  useEffect(() => {
    if (drop) {
      // Wait for drop animation, then finish
      const finishTimer = setTimeout(() => {
        setDone(true);
        onFinish();
      }, 900);
      return () => clearTimeout(finishTimer);
    }
  }, [drop, onFinish]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ${drop ? 'translate-y-full' : ''}`}
      style={{ background: YELLOW }}
    >
      <div className="relative w-80 h-80 flex items-center justify-center">
        {CLOTHING_IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Loading clothing"
            width={260}
            height={260}
            className={`absolute left-1/2 top-1/2 rounded-lg shadow-xl transition-all duration-500 ${drop ? 'opacity-0' : ''}`}
            style={{
              transform: `translate(-50%, -50%) scale(${i < loadedCount ? 1 : 0.8})`,
              opacity: i < loadedCount ? 1 : 0,
              zIndex: 10 + i,
              transitionDelay: `${i * 0.1}s`, // Stagger animation start
              transitionDuration: '0.5s', // Animation duration
            }}
            priority={i === CLOTHING_IMAGES.length - 1}
          />
        ))}
      </div>
      {/* No specific keyframes needed for this staggered effect */}
      <style jsx global>{`
        /* Existing global styles if any */
      `}</style>
    </div>
  );
}; 