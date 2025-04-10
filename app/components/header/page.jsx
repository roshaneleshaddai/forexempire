'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const router = useRouter();

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  return (
    <div className="relative">
      {/* Blinking Register Banner */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-2 z-50">
        <p className="font-bold text-sm sm:text-base animate-pulse px-2">
          Register Now for Forex Training - 10,000 per trainee
        </p>
      </div>

      {/* Main Header */}
      <header className="fixed top-8 left-0 right-0 bg-white shadow-sm z-40">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tighter">
              <span className="text-blue-500">THE</span>
              <span className='text-red-600 text-2xl sm:text-4xl'>FOREX</span>
              <span className="text-blue-600 text-2xl sm:text-4xl">EMPIRE</span>
            </span>
          </Link>

          {/* Register Button */}
          <button
            onClick={handleRegisterClick}
            className="bg-red-600 text-white px-3 py-1.5 sm:px-6 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-lg hover:bg-red-700 transition-colors"
          >
            Register Now
          </button>
        </div>
      </header>
    </div>
  );
}
