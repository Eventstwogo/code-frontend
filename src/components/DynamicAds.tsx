'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import AdImage from './AdImage';

interface Advertisement {
  ad_id: string;
  title: string;
  banner: string;
  target_url: string;
  ad_status: boolean;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  method: string;
  path: string;
  data: Advertisement[];
}

interface DynamicAdsProps {
  className?: string;
  maxAds?: number; // Maximum number of ads to show
  showOnlyActive?: boolean; // Whether to show only active ads
}

export default function DynamicAds({ 
  className = "", 
  maxAds = 1, 
  showOnlyActive = true 
}: DynamicAdsProps) {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axiosInstance.get<ApiResponse>('/api/v1/advertisements/active/all');
        
        if (response.data.statusCode === 200) {
          let ads = response.data.data;
          
          // Filter only active ads if requested
          if (showOnlyActive) {
            ads = ads.filter(ad => ad.ad_status === true);
          }
          
          // Limit the number of ads
          if (maxAds > 0) {
            ads = ads.slice(0, maxAds);
          }
          
          setAdvertisements(ads);
        } else {
          setError('Failed to fetch advertisements');
        }
      } catch (err: any) {
        console.error('Error fetching advertisements:', err);
        setError(err.response?.data?.message || 'Failed to load advertisements');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, [maxAds, showOnlyActive]);

  // Auto-rotate ads if there are multiple
  useEffect(() => {
    if (advertisements.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prevIndex) => 
          (prevIndex + 1) % advertisements.length
        );
      }, 5000); // Change ad every 5 seconds

      return () => clearInterval(interval);
    }
  }, [advertisements.length]);

  const handleAdClick = (targetUrl: string) => {
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Don't render anything if loading or no ads
  if (loading) {
    return (
      <div className={`w-full max-w-7xl mx-auto px-4 py-4 ${className}`}>
        <div className="w-full h-32 md:h-40 rounded-xl bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-500">Loading advertisement...</div>
        </div>
      </div>
    );
  }

  if (error || advertisements.length === 0) {
    return null; // Don't show anything if there's an error or no ads
  }

  const currentAd = advertisements[currentAdIndex];

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-4 ${className}`}>
      <div 
        className="w-full h-32 md:h-40 rounded-xl relative shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] group"
        onClick={() => handleAdClick(currentAd.target_url)}
      >
        {/* Advertisement Image */}
        <AdImage src={currentAd.banner} alt={currentAd.title} />
        {/* <img
          src={currentAd.banner}
          alt={currentAd.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/images/ad-placeholder.png'; // You can add a placeholder image
          }}
        /> */}

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />

        {/* Ad Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-lg font-semibold drop-shadow-lg">
            {currentAd.title}
          </h3>
        </div>

        {/* Indicators for multiple ads */}
        {advertisements.length > 1 && (
          <div className="absolute top-4 right-4 flex space-x-1">
            {advertisements.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentAdIndex 
                    ? 'bg-white' 
                    : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}

        {/* External link indicator */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg 
            className="w-5 h-5 text-white drop-shadow-lg" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
}