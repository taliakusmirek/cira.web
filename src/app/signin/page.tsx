"use client";

import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/navigation';

const PRIMARY = '#F610C1';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation
        showAuth={true}
        showWaitlist={true}
        onLoginClick={() => router.push('/signin')}
        onSignUpClick={() => router.push('/signup')}
        onWaitlistClick={() => router.push('/waitlist')}
      />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 border-2 border-pink-100">
          <h1 className="text-3xl font-extrabold text-center mb-2" style={{ color: PRIMARY }}>Sign In</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              className="px-5 py-3 rounded-lg border-2 border-pink-200 focus:outline-none text-lg text-[#F610C1]"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="px-5 py-3 rounded-lg border-2 border-pink-200 focus:outline-none text-lg text-[#F610C1]"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-500 text-center text-sm font-medium">{error}</div>}
            <button
              type="submit"
              className="mt-2 px-6 py-3 rounded-full font-bold text-lg shadow-lg transition bg-[#F610C1] text-white hover:bg-pink-700"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="text-center mt-2 text-base text-pink-300">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="font-bold hover:underline" style={{ color: '#F610C1' }}>Sign Up</a>
          </div>
        </div>
      </main>
      <Footer
        showAuth={true}
        showWaitlist={true}
        onLoginClick={() => router.push('/signin')}
        onSignUpClick={() => router.push('/signup')}
        onWaitlistClick={() => router.push('/waitlist')}
      />
    </div>
  );
} 