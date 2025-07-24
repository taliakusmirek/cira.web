"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    role: '',
    useCase: 'brand' // 'brand' or 'consumer'
  });
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
      // Insert email into Supabase
      const { error } = await supabase
        .from('email')
        .insert([
          { email: formData.email }
        ]);

      if (error) {
        console.error('Error submitting to Supabase:', error);
        setError('Failed to join waitlist. Please try again.');
        return;
      }

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({ email: '', name: '', company: '', role: '', useCase: 'brand' });
        setError('');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting waitlist:', error);
      setError('Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl border border-black/5 transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        {!isSubmitted ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-light text-gray-900 tracking-tight">Join the <span className="text-blue-600">Waitlist</span></h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors duration-200"
              >
                ×
              </button>
            </div>
            
            <p className="text-gray-600 mb-8 font-normal tracking-wide leading-relaxed">
              Be the first to experience product transparency that actually works.
            </p>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-normal">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-900 placeholder-gray-400 font-normal transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-900 placeholder-gray-400 font-normal transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-900 placeholder-gray-400 font-normal transition-all duration-300"
                  placeholder="Your company (optional)"
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-900 placeholder-gray-400 font-normal transition-all duration-300"
                  placeholder="Your role (optional)"
                />
              </div>
              
              <div>
                <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-2 tracking-wide">
                  I&apos;m interested in using CIRA for:
                </label>
                <select
                  id="useCase"
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-900 font-normal transition-all duration-300"
                >
                  <option value="brand">Brand/Company (Create DPPs)</option>
                  <option value="consumer">Consumer (Discover transparent products)</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide border border-gray-900 shadow-sm"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-200">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-4 tracking-tight">Welcome to the waitlist!</h3>
            <p className="text-gray-600 font-normal tracking-wide mb-6">We&apos;ll notify you when we launch.</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-900 text-black font-medium rounded-xl hover:bg-gray-800 transition-colors duration-300 tracking-wide border border-gray-900"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 