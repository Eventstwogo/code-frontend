import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/lib/axiosInstance';

export interface SearchResult {
  event_id: string; // updated: your API returns string IDs
  event_title: string;
  event_slug: string;
  card_image: string;
  location: string | null;
  category_title: string;
  subcategory_title?: string | null;
  next_event_date: string | null;
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
      const response = await axiosInstance.get(`/api/v1/new-events/search`, {
        params: { q: query },
      });

      const events: SearchResult[] = response.data || [];
      setSearchResults(events.slice(0, 10)); // show only first 10
      setIsOpen(events.length > 0);
    } catch (err: any) {
      console.error('Search error:', err);

      if (err.response && err.response.status === 404) {
        // backend "no events found" error
        const data = err.response.data;
        setError(data.message || 'No events found matching your search query.');
      } else {
        setError('Failed to search events');
      }

      setSearchResults([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchEvents(searchQuery);
      } else {
        setSearchResults([]);
        setError(null);
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
    clearSearch,
  };
};
