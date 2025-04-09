'use client';
'use client';

import { useState, useRef, useEffect } from 'react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import axios from 'axios';

export default function ProfilePage() {
  // Forex trainer profile data
  const profile = {
    name: "Dr.AshHoCk",
    title: "Senior Forex Trader & Instructor",
    bio: "Professional forex trader with over 10 years of experience in the financial markets. Specializing in technical analysis, risk management, and developing profitable trading strategies. Helped over 500 students become confident and successful traders.",
    skills: ["Technical Analysis", "Price Action", "Risk Management", "Swing Trading", "Market Psychology", "Fundamental Analysis"],
    contact: {
      email: "ashok@theforexempire.in",
      Phone: "+91 9885292991",
    }
  };

  // State for API images
  const [apiImages, setApiImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs for each scroller
  const scrollerRefs = useRef({});
  
  // State for each group's active image
  const [activeIndices, setActiveIndices] = useState({});

  // Fetch images from database
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/images');
        setApiImages(response.data);
        
        // Initialize active indices for each category
        const groupedImages = groupImagesByCategory(response.data);
        const initialActiveIndices = Object.keys(groupedImages).reduce((acc, cat) => {
          acc[cat] = 0;
          return acc;
        }, {});
        
        setActiveIndices(initialActiveIndices);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch images:', error);
        setIsLoading(false);
      }
    };
    
    fetchImages();
  }, []);
  // State for API images
  const [apiImages, setApiImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs for each scroller
  const scrollerRefs = useRef({});
  
  // State for each group's active image
  const [activeIndices, setActiveIndices] = useState({});

  // Fetch images from database
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/images');
        setApiImages(response.data);
        
        // Initialize active indices for each category
        const groupedImages = groupImagesByCategory(response.data);
        const initialActiveIndices = Object.keys(groupedImages).reduce((acc, cat) => {
          acc[cat] = 0;
          return acc;
        }, {});
        
        setActiveIndices(initialActiveIndices);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch images:', error);
        setIsLoading(false);
      }
    };
    
    fetchImages();
  }, []);

  // Group images by category
  const groupImagesByCategory = (imageList) => {
    const grouped = {};
    imageList.forEach(img => {
      if (!grouped[img.category]) {
        grouped[img.category] = [];
      }
      grouped[img.category].push(img);
    });
    return grouped;
  };
  
  // Group images by category
  const groupImagesByCategory = (imageList) => {
    const grouped = {};
    imageList.forEach(img => {
      if (!grouped[img.category]) {
        grouped[img.category] = [];
      }
      grouped[img.category].push(img);
    });
    return grouped;
  };
  
  // Convert to array of groups
  const imageGroups = Object.entries(groupImagesByCategory(apiImages)).map(([title, images]) => ({
  const imageGroups = Object.entries(groupImagesByCategory(apiImages)).map(([title, images]) => ({
    title,
    images
    images
  }));
  
  
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 mt-24 sm:mt-20">
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
                  className="rounded transition-transform duration-300 hover:scale-105 shadow-lg"  
                  className="rounded transition-transform duration-300 hover:scale-105 shadow-lg"  
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
              <h2 className="text-2xl font-semibold text-blue-600 mb-6">Senior Forex Trader,<span className="text-red-600">Trainer</span>  and Building expert Advisor</h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-4">{profile.bio}</p>
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">Contact</h3>
                <p className="text-gray-600 my-2">Email: {profile.contact.email}</p>
                <p className="text-gray-600 my-2">Phone: {profile.contact.Phone}</p>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-800 mb-3 mt-4">Expertise</h3>
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

          {/* API Image Gallery */}
          {/* API Image Gallery */}
          <section className="w-full bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Image Gallery</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : imageGroups.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No images found.
              </div>
            ) : (
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
                            key={image._id || index} 
                            className={`flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer ${
                              (activeIndices[group.title] || 0) === index ? 'transform -translate-y-1 shadow-lg' : ''
                            }`}
                            onClick={() => scrollToImage(group.title, index)}
                          >
                            <div className="relative overflow-hidden">
                              <img
                                src={image.imageUrl}
                                alt={`${group.title} image ${index + 1}`}
                                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            <div className="p-3 bg-white">
                              <p className="text-sm text-gray-500">
                                {new Date(image.date.$date || image.date).toLocaleDateString()}
                              </p>
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
                              (activeIndices[group.title] || 0) === index ? 'bg-blue-600' : 'bg-gray-300'
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
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
