import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/lib/axiosInstance';

export interface SearchResult {
  event_id: number;
  event_title: string;
  event_slug: string;
  card_image: string;
  start_date: string;
  end_date: string;
  location: string;
  category_name?: string;
  subcategory_name?: string;
}

export interface SearchResponse {
  events: SearchResult[];
  total: number;
}

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchEvents = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Try dedicated search endpoint first
      try {
        const response = await axiosInstance.get(`/api/v1/events/search?q=${encodeURIComponent(query)}&limit=10`);
        if (response.data && response.data.data && response.data.data.events) {
          setSearchResults(response.data.data.events);
          setIsOpen(true);
          setIsLoading(false);
          return;
        }
      } catch (searchError) {
        // Search endpoint doesn't exist, continue with fallback
        console.log('Search endpoint not available, using fallback');
      }

      // Fallback: search through categories with events
      const fallbackResponse = await axiosInstance.get('/api/v1/category-events/categories-with-events');
      const allEvents: SearchResult[] = [];
      
      if (fallbackResponse.data && fallbackResponse.data.data && fallbackResponse.data.data.categories) {
        fallbackResponse.data.data.categories.forEach((category: any) => {
          if (category.events && Array.isArray(category.events)) {
            category.events.forEach((event: any) => {
              const searchTerm = query.toLowerCase();
              const eventTitle = event.event_title?.toLowerCase() || '';
              const eventLocation = event.location?.toLowerCase() || '';
              const categoryName = category.category_name?.toLowerCase() || '';
              
              if (eventTitle.includes(searchTerm) ||
                  eventLocation.includes(searchTerm) ||
                  categoryName.includes(searchTerm)) {
                allEvents.push({
                  event_id: event.event_id,
                  event_title: event.event_title,
                  event_slug: event.event_slug,
                  card_image: event.card_image,
                  start_date: event.start_date,
                  end_date: event.end_date,
                  location: event.location,
                  category_name: category.category_name,
                  subcategory_name: event.subcategory_name
                });
              }
            });
          }
        });
      }
      
      // Remove duplicates and limit results
      const uniqueEvents = allEvents.filter((event, index, self) => 
        index === self.findIndex(e => e.event_id === event.event_id)
      );
      
      setSearchResults(uniqueEvents.slice(0, 10));
      setIsOpen(uniqueEvents.length > 0);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search events');
      setSearchResults([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchEvents(searchQuery);
      } else {
        setSearchResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchEvents]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsOpen(false);
    setError(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    isOpen,
    setIsOpen,
    error,
    clearSearch
  };
};