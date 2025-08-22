'use client'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axiosInstance'
import Image from 'next/image'
import Link from 'next/link';

interface AboutUsData {
  about_us_id: string;
  about_us_data: {
    additonalprop1: string;
  };
  about_us_status: boolean;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  method: string;
  path: string;
  data: AboutUsData;
}

const AboutPage = () => {
  const [aboutData, setAboutData] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get<ApiResponse>('/api/v1/about-us');

        if (response.data.statusCode === 200) {
          setAboutData(response.data.data);
        } else {
          setError('Failed to fetch about us data');
        }
      } catch (err: any) {
        console.error('Error fetching about us data:', err);
        setError(err.response?.data?.message || 'Failed to load about us information');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading about us information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-medium">Error loading content</p>
            <p className="text-sm">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">No about us information available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">About Events2go</h1>
          <p className="text-xl opacity-90">Your one-stop platform for all tickets</p>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-full mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center md:justify-center">
          <div className="w-80 h-80 md:w-96 md:h-96 relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/logo1.png"
              alt="About Events2go"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Who We Are</h2>
          <div
            className="text-gray-700 text-lg [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mb-2"
            dangerouslySetInnerHTML={{ __html: aboutData.about_us_data.additonalprop1 }}
          />
        </div>
      </div>

      {/* Mission / Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We aim to make ticket booking for events seamless, convenient, and accessible to everyone.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 rounded-lg p-6 shadow hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xl mb-2">Reliability</h3>
              <p className="text-gray-600">Providing accurate event info and smooth ticket booking.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 shadow hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xl mb-2">User Experience</h3>
              <p className="text-gray-600">Easy-to-use interface that anyone can navigate.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 shadow hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-xl mb-2">Support</h3>
              <p className="text-gray-600">Dedicated support to help you enjoy your events worry-free.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Events2go Today</h2>
        <p className="text-lg mb-6">Experience hassle-free ticket booking for all your favorite events.</p>
    
<Link
  href="/"
  className="inline-block bg-white text-purple-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors"
>
  Get Started
</Link>


      </div>
    </div>
  );
};

export default AboutPage;
