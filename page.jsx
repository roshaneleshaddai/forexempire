"use client";

import { useState, useRef } from 'react';
import axios from 'axios';

export default function UploadPage() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Sample list of 27 categories - replace with your actual categories
  const categories = [
    'Art', 'Automotive', 'Business', 'Crafts', 'Design', 
    'Education', 'Entertainment', 'Fashion', 'Food', 'Gaming',
    'Health', 'Holidays', 'Home', 'Lifestyle', 'Music',
    'Nature', 'Pets', 'Photography', 'Science', 'Sports',
    'Technology', 'Travel', 'Wedding', 'Wildlife', 'Work',
    'Architecture', 'Events'
  ];

  const filteredCategories = categories.filter(cat => 
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage('Please select an image.');
      return;
    }

    if (!category) {
      setMessage('Please select a category.');
      return;
    }

    if (!date) {
      setMessage('Please select a date.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('category', category);
    formData.append('date', date);

    try {
      const response = await axios.post('/api/upload', formData);
      console.log('Upload response:', response.data);
      if (response.data) {
        setMessage('Image uploaded successfully!');
        setImage(null);
        setImagePreview(null);
        setCategory('');
        setDate('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Upload failed:', error.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-white text-xl font-semibold">Upload Image</h1>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleUpload}>
            {/* Image Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div 
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                  imagePreview ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                } cursor-pointer`}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="space-y-2 text-center">
                  {imagePreview ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-40 object-contain mb-3"
                      />
                      <p className="text-sm text-gray-500">Click to change image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <svg 
                        className="mx-auto h-12 w-12 text-gray-400" 
                        stroke="currentColor" 
                        fill="none" 
                        viewBox="0 0 48 48" 
                        aria-hidden="true"
                      >
                        <path 
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                        />
                      </svg>
                      <p className="text-sm text-gray-500 mt-2">
                        Click to select an image, or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* Category Dropdown with Search */}
            <div className="mb-6 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={category || "Search for a category..."}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (!isDropdownOpen) setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                />
                <div 
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((cat, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 ${
                            category === cat ? 'bg-blue-100' : ''
                          }`}
                          onClick={() => handleCategorySelect(cat)}
                        >
                          {cat}
                          {category === cat && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="py-2 px-4 text-sm text-gray-500">
                        No categories found
                      </div>
                    )}
                  </div>
                )}
              </div>
              {category && (
                <div className="mt-2 flex">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {category}
                    <button
                      type="button"
                      className="ml-1 inline-flex text-blue-500 focus:outline-none"
                      onClick={() => setCategory('')}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              )}
            </div>

            {/* Date Picker */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Upload Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  'Upload Image'
                )}
              </button>
            </div>
          </form>

          {/* Status Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}