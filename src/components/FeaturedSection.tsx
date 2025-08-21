'use client';

import { useState, useEffect } from 'react';
import FeaturedCards from './FeaturedCards';
import axiosInstance from '@/lib/axiosInstance';

interface FeaturedSectionProps {
  limit?: number;
  categoryFilter?: string;
  showTitle?: boolean;
  customTitle?: string;
}

export default function FeaturedSection({ 
  limit = 6, 
  categoryFilter,
  showTitle = true,
  customTitle = "Featured Events"
}: FeaturedSectionProps) {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedEvents();
  }, [limit, categoryFilter]);

  const fetchFeaturedEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // You can modify this API endpoint based on your backend structure
      let url = `/api/v1/featured-events/`;
      if (categoryFilter) {
        url += `&category=${categoryFilter}`;
      }
      
      const response = await axiosInstance.get(url);
      
      // If your API doesn't have a featured endpoint, you can use the regular events endpoint
      // and filter or mark certain events as featured
      if (response.data && response.data.data) {
        setFeaturedEvents(response.data.data.events || response.data.data);
      } else {
        // Fallback: use regular events and mark some as featured
        const fallbackResponse = await axiosInstance.get('/api/v1/new-events/latest/category-or-subcategory/events');
        const events = fallbackResponse.data.data || [];
        
        // Mark first few events as featured for demo purposes
        const featuredEvents = events.slice(0, limit).map((event: any, index: number) => ({
          ...event,
          is_featured: true
        }));
        
        setFeaturedEvents(featuredEvents);
      }
    } catch (error) {
      console.error('Failed to fetch featured events:', error);
      setError('Failed to load featured events');
      
      // Fallback to sample data for development
    
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto py-8 px-4">
        <div className="animate-pulse">
          {showTitle && (
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="h-8 bg-gray-300 rounded w-64 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-96"></div>
              </div>
              <div className="h-12 bg-gray-300 rounded w-32"></div>
            </div>
          )}
          <div className="flex gap-8 overflow-hidden">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="bg-gray-200 rounded-2xl" style={{ width: '320px', height: '480px' }}>
                  <div className="p-6">
                    <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>
                      <div className="flex gap-3">
                        <div className="flex-1 h-12 bg-gray-300 rounded-xl"></div>
                        <div className="flex-1 h-12 bg-gray-300 rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && featuredEvents.length === 0) {
    return (
      <section className="w-full max-w-7xl mx-auto py-8 px-4">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button 
            onClick={fetchFeaturedEvents}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <FeaturedCards 
      events={featuredEvents}
      title={showTitle ? customTitle : undefined}
      showViewAll={true}
      viewAllLink="/featured"
    />
  );
}