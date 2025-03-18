'use client'

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ProfilePage() {
  // Forex trainer profile data
  const profile = {
    name: "Dr.AshHoCk",
    title: "Senior Forex Trader, Trainer and Building Expert Advisor",
    bio: "Professional forex trader with over 10 years of experience in the financial markets. Specializing in technical analysis, risk management, and developing profitable trading strategies. Helped over 500 students become confident and successful traders.",
    skills: ["Technical Analysis", "Price Action", "Risk Management", "Swing Trading", "Market Psychology", "Fundamental Analysis"],
    contact: {
      email: "ashok@theforexempire.in",
      Phone: "+91 9885292991",
    }
  };

  // All trading images
  const allImages = [
    { id: 1, src: "/images/USDJPY1.jpg", alt: "USD/JPY Trade", title: "USD/JPY" },
    { id: 2, src: "/images/USDJPY2.jpg", alt: "USD/JPY Trade", title: "USD/JPY" },
    { id: 3, src: "/images/USDJPY3.jpg", alt: "USD/JPY Trade", title: "USD/JPY" },
    { id: 4, src: "/images/USDJPY4.jpg", alt: "USD/JPY Trade", title: "USD/JPY" },
    { id: 5, src: "/images/USDJPY5.jpg", alt: "USD/JPY Trade", title: "USD/JPY" },
    { id: 6, src: "/images/USDJPY6.jpg", alt: "USD/JPY Trade", title: "USD/JPY" },
    { id: 7, src: "/images/USDJPY7.jpg", alt: "USD/JPY Trade", title: "USD/JPY" },
    { id: 8, src: "/images/AUDJPY1.jpg", alt: "AUD/JPY Trade", title: "AUD/JPY" },
    { id: 9, src: "/images/AUDJPY2.jpg", alt: "AUD/JPY Trade", title: "AUD/JPY" },
    { id: 10, src: "/images/CADJPY1.jpg", alt: "CAD/JPY Trade", title: "CAD/JPY" },
    { id: 11, src: "/images/GBPAUD1.jpg", alt: "GBP/AUD Trade", title: "GBP/AUD" },
    { id: 12, src: "/images/GBPAUD2.jpg", alt: "GBP/AUD Trade", title: "GBP/AUD" },
    { id: 13, src: "/images/GBPAUD3.jpg", alt: "GBP/AUD Trade", title: "GBP/AUD" },
    { id: 14, src: "/images/USDCAD1.jpg", alt: "USD/CAD Trade", title: "USD/CAD" },
    { id: 15, src: "/images/USDCAD2.jpg", alt: "USD/CAD Trade", title: "USD/CAD" },
    { id: 16, src: "/images/USDCAD3.jpg", alt: "USD/CAD Trade", title: "USD/CAD" },
    { id: 17, src: "/images/EURUSD1.jpg", alt: "EUR/USD Trade", title: "EUR/USD" },
    { id: 18, src: "/images/AUDCHF1.jpg", alt: "AUD/CHF Trade", title: "AUD/CHF" },
    { id: 19, src: "/images/GBPJPY1.jpg", alt: "GBP/JPY Trade", title: "GBP/JPY" },
    { id: 20, src: "/images/GBPJPY2.jpg", alt: "GBP/JPY Trade", title: "GBP/JPY" },
    { id: 21, src: "/images/GBPJPY3.jpg", alt: "GBP/JPY Trade", title: "GBP/JPY" },
    { id: 22, src: "/images/GBPJPY4.jpg", alt: "GBP/JPY Trade", title: "GBP/JPY" },
    { id: 23, src: "/images/GBPJPY5.jpg", alt: "GBP/JPY Trade", title: "GBP/JPY" },
    { id: 24, src: "/images/CHFJPY1.jpg", alt: "CHF/JPY Trade", title: "CHF/JPY" },
    { id: 25, src: "/images/CHFJPY2.jpg", alt: "CHF/JPY Trade", title: "CHF/JPY" },
    { id: 26, src: "/images/CHFJPY3.jpg", alt: "CHF/JPY Trade", title: "CHF/JPY" },
    { id: 27, src: "/images/CHFJPY4.jpg", alt: "CHF/JPY Trade", title: "CHF/JPY" },
    { id: 28, src: "/images/EURJPY1.jpg", alt: "EUR/JPY Trade", title: "EUR/JPY" },
    { id: 29, src: "/images/EURJPY2.jpg", alt: "EUR/JPY Trade", title: "EUR/JPY" },
    { id: 30, src: "/images/EURJPY3.jpg", alt: "EUR/JPY Trade", title: "EUR/JPY" },
    { id: 31, src: "/images/EURJPY4.jpg", alt: "EUR/JPY Trade", title: "EUR/JPY" },
    { id: 32, src: "/images/EURJPY5.jpg", alt: "EUR/JPY Trade", title: "EUR/JPY" },
    { id: 33, src: "/images/EURJPY6.jpg", alt: "EUR/JPY Trade", title: "EUR/JPY" },
    { id: 34, src: "/images/EURJPY7.jpg", alt: "EUR/JPY Trade", title: "EUR/JPY" },
    { id: 35, src: "/images/USDCHF1.jpg", alt: "USD/CHF Trade", title: "USD/CHF" },
    { id: 36, src: "/images/GBPJPYm1.jpg", alt: "GBP/JPYm Trade", title: "GBP/JPYm" },
    { id: 37, src: "/images/CHFJPYm1.jpg", alt: "CHF/JPYm Trade", title: "CHF/JPYm" },
  ];

  // Group images by title
  const groupedImages = {};
  allImages.forEach(image => {
    if (!groupedImages[image.title]) {
      groupedImages[image.title] = [];
    }
    groupedImages[image.title].push(image);
  });

  // Convert to array of groups
  const imageGroups = Object.keys(groupedImages).map(title => ({
    title,
    images: groupedImages[title]
  }));

  // State for each group's active image
  const [activeIndices, setActiveIndices] = useState(
    Object.keys(groupedImages).reduce((acc, title) => {
      acc[title] = 0;
      return acc;
    }, {})
  );

  // Refs for each scroller
  const scrollerRefs = useRef({});

  // Function to scroll to a specific image in a group
  const scrollToImage = (title, index) => {
    setActiveIndices(prev => ({
      ...prev,
      [title]: index
    }));

    if (scrollerRefs.current[title]) {
      scrollerRefs.current[title].scrollTo({
        left: index * 280,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 mt-4">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <main className="flex flex-col gap-16">
          {/* Profile Section */}
          <section className="flex flex-col md:flex-row gap-8 md:gap-12 bg-white rounded-xl shadow-md p-8">
            {/* Photo (Left Side) */}
            <div className="w-full md:w-80 flex-shrink-0">
              <div className="rounded-lg overflow-hidden shadow-sm flex justify-center p-4">
                <Image 
                  src="/images/ashok.jpg" 
                  alt={profile.name}
                  width={250}
                  height={200}
                  className="rounded  transition-transform duration-300 hover:scale-105 shadow-lg "  
                />
              </div>
              
              {/* Trading credentials */}
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">Credentials</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Certified Market Analyst
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    10+ Years Trading Experience
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    500+ Students Mentored
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                     Building Expert Advisor
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Details (Right Side) */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{profile.name}</h1>
              <h2 className="text-2xl font-semibold text-blue-600 mb-6">Senior Forex Trader,<span className="text-red-600">Trainer </span> and Building Expert Advisor</h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">{profile.bio}</p>
                <div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">Contact</h3>
                <p className="text-gray-600 my-2">Email: {profile.contact.email}</p>
                <p className="text-gray-600 my-2">Phone: {profile.contact.Phone}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-800 mb-3">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-800 mb-3">Trading Approach</h3>
                <p className="text-gray-700">
                  My trading methodology focuses on identifying high-probability setups using price action and key technical levels. 
                  I prioritize risk management above all else, with a structured approach to position sizing and capital preservation.
                  Success in forex comes from consistency, discipline, and emotional control.
                </p>
              </div>
              
            
            </div>
          </section>

          {/* Trade History Sections */}
          <section className="w-full bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Trade History</h2>
            
            <div className="flex flex-col gap-12">
              {imageGroups.map((group) => (
                <div key={group.title} className="w-full">
                  <h3 className="text-xl font-bold text-blue-700 mb-4 pb-2 border-b border-gray-200">
                    {group.title}
                  </h3>
                  
                  <div className="relative w-full overflow-hidden">
                    <div 
                      ref={el => scrollerRefs.current[group.title] = el}
                      className="flex gap-6 overflow-x-auto pb-4 snap-x"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {group.images.map((image, index) => (
                        <div 
                          key={image.id} 
                          className={`flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer ${
                            activeIndices[group.title] === index ? 'transform -translate-y-1 shadow-lg' : ''
                          }`}
                          onClick={() => scrollToImage(group.title, index)}
                        >
                          <div className="relative h-86 overflow-hidden">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={250}
                              height={320}
                              className="w-full h-full  transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Navigation dots */}
                  {group.images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {group.images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            activeIndices[group.title] === index ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                          onClick={() => scrollToImage(group.title, index)}
                          aria-label={`View ${group.title} image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
