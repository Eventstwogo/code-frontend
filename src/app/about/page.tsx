'use client'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axiosInstance'

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading about us information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No about us information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="w-full mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Events2go</h1>
          <p className="text-xl opacity-90">Your one-stop platform for all tickets</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Content from API */}
          <div 
            className="max-w-none
              [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:mb-8 [&_h2]:mt-10
              [&_h3]:text-3xl [&_h3]:font-bold [&_h3]:mb-6 [&_h3]:mt-8
              [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6
              [&_strong]:font-semibold [&_strong]:text-lg
              [&_hr]:border-gray-300 [&_hr]:my-10 [&_hr]:border-t-2
              [&_ul]:my-6 [&_ul]:list-disc [&_ul]:ml-6
              [&_li]:my-3 [&_li]:text-lg
              [&_br]:mb-2"
            dangerouslySetInnerHTML={{ 
              __html: aboutData.about_us_data.additonalprop1 
            }}
          />
          
          {/* Additional Info Section */}
          {/* <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy Booking</h3>
                <p className="text-gray-600">Simple and secure ticket booking process</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">For Everyone</h3>
                <p className="text-gray-600">Perfect for both attendees and organizers</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Trusted Platform</h3>
                <p className="text-gray-600">Reliable and secure event management</p>
              </div>
            </div>
          </div> */}
        </div>
        
        {/* CTA Section */}
        {/* <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6 opacity-90">Join thousands of users who trust Events2go for their ticketing needs</p>
            <div className="space-x-4">
              <a 
                href="/events" 
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Browse Events
              </a>
              <a 
                href="/contact" 
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-block"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AboutPage;
