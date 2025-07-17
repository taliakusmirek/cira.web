"use client";

import React, { useState } from 'react';
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {!isSubmitted ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0439C1]">Join the <span className="underline decoration-[#4ED193]/60 decoration-2">Waitlist</span></h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <p className="text-[#0439C1] mb-6">
              Be the first to experience product transparency that actually works.
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0439C1] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ED193] focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#0439C1] mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ED193] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#0439C1] mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ED193] focus:border-transparent"
                  placeholder="Your company (optional)"
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-[#0439C1] mb-1">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ED193] focus:border-transparent"
                  placeholder="Your role (optional)"
                />
              </div>
              
              <div>
                <label htmlFor="useCase" className="block text-sm font-medium text-[#0439C1] mb-1">
                  I&apos;m interested in using CIRA for:
                </label>
                <select
                  id="useCase"
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ED193] focus:border-transparent"
                >
                  <option value="brand">Brand/Company (Create DPPs)</option>
                  <option value="consumer">Consumer (Discover transparent products)</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-[#0439C1] text-white font-semibold rounded-md hover:bg-[#4ED193] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-[#4ED193] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0439C1] mb-2">Welcome to the waitlist!</h3>
            <p className="text-[#0439C1]">We&apos;ll notify you when we launch.</p>
          </div>
        )}
      </div>
    </div>
  );
}; 