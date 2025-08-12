'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

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

interface RotatingAdsProps {
  position: number; // Position index to determine which ad to show
  className?: string;
  showOnlyActive?: boolean;
}

export default function RotatingAds({ 
  position = 0, 
  className = "", 
  showOnlyActive = false // Changed default to false to show all ads
}: RotatingAdsProps) {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        console.log('RotatingAds: Fetching advertisements...');
        setLoading(true);
        setError(null);
        
        const response = await axiosInstance.get<ApiResponse>('/api/v1/advertisements');
        console.log('RotatingAds: API Response:', response.data);
        
        if (response.data.statusCode === 200) {
          let ads = response.data.data;
          console.log('RotatingAds: Raw ads:', ads);
          
          // Filter only active ads if requested
          if (showOnlyActive) {
            ads = ads.filter(ad => ad.ad_status === true);
            console.log('RotatingAds: Filtered active ads:', ads);
          }
          
          setAdvertisements(ads);
          console.log('RotatingAds: Final ads set:', ads);
        } else {
          setError('Failed to fetch advertisements');
        }
      } catch (err: any) {
        console.error('RotatingAds: Error fetching advertisements:', err);
        setError(err.response?.data?.message || 'Failed to load advertisements');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, [showOnlyActive]);

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

  if (error) {
    console.log('RotatingAds: Error state:', error);
    return (
      <div className={`w-full max-w-7xl mx-auto px-4 py-4 ${className}`}>
        <div className="w-full h-32 md:h-40 rounded-xl bg-red-100 flex items-center justify-center">
          <div className="text-red-600">Error loading ads: {error}</div>
        </div>
      </div>
    );
  }

  if (advertisements.length === 0) {
    console.log('RotatingAds: No advertisements available');
    return (
      <div className={`w-full max-w-7xl mx-auto px-4 py-4 ${className}`}>
        <div className="w-full h-32 md:h-40 rounded-xl bg-yellow-100 flex items-center justify-center">
          <div className="text-yellow-600">No advertisements available</div>
        </div>
      </div>
    );
  }

  // Get the ad for this position (cycle through available ads)
  const currentAd = advertisements[position % advertisements.length];
  console.log(`RotatingAds: Position ${position}, showing ad:`, currentAd);

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-4 ${className}`}>
      <div 
        className="w-full h-32 md:h-40 rounded-xl relative shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] group"
        onClick={() => handleAdClick(currentAd.target_url)}
      >
        {/* Advertisement Image */}
        <img
          src={currentAd.banner}
          alt={currentAd.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/images/ad-placeholder.png'; // You can add a placeholder image
          }}
        />

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />

        {/* Ad Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-lg font-semibold drop-shadow-lg">
            {currentAd.title}
          </h3>
        </div>

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

        {/* Position indicator (for debugging - you can remove this) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            Ad {(position % advertisements.length) + 1}
          </div>
        )}
      </div>
    </div>
  );
}