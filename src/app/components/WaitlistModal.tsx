"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const { error } = await supabase
        .from('email')
        .insert([{ email }]);

      if (error) {
        console.error('Error submitting to Supabase:', error);
        setError('Something went wrong. Try again?');
        return;
      }

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setEmail('');
        setError('');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting waitlist:', error);
      setError('Something went wrong. Try again?');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-2xl p-8 max-w-md w-full shadow-xl border border-black/5 transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        {!isSubmitted ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-gray-900 tracking-tight">Join the waitlist</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors duration-200"
              >
                ×
              </button>
            </div>
            
            <p className="text-gray-600 mb-6 text-center">
              No spam, just quality updates.
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-normal">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-900 placeholder-gray-400 font-normal transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
              >
                {isSubmitting ? 'Joining...' : 'Join waitlist'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-light text-gray-900 mb-2 tracking-tight">You&apos;re in!</h3>
            <p className="text-gray-600 font-normal tracking-wide text-sm">You&apos;re in! We&apos;ll let you know when we launch.</p>
          </div>
        )}
      </div>
    </div>
  );
}; 