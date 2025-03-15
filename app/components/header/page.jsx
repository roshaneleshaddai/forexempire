'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b  bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tighter ">
            <span className="text-blue-500">THE</span>
            <span   className='text-red-600 text-4xl'>FOREX</span>
            <span className="text-blue-600 text-4xl">EMPIRE</span>
          </span>
        </Link>
        
        </div>
     
      
    </header>
  );
}