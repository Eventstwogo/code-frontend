'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Calendar, MapPin, Grid, List } from 'lucide-react';
import MovieCard from '@/components/movies';
import axiosInstance from '@/lib/axiosInstance';

interface SearchEvent {
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

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<SearchEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'title'>('relevance');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [categories, setCategories] = useState<any[]>([]);

  // Fetch categories for filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/category-events/categories-with-events');
        if (response.data && response.data.data && response.data.data.categories) {
          setCategories(response.data.data.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Search function
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Try dedicated search endpoint first
      try {
        const response = await axiosInstance.get(`/api/v1/events/search?q=${encodeURIComponent(query)}&limit=50`);
        if (response.data && response.data.data && response.data.data.events) {
          setSearchResults(response.data.data.events);
          setIsLoading(false);
          return;
        }
      } catch (searchError) {
        console.log('Search endpoint not available, using fallback');
      }

      // Fallback search
      const response = await axiosInstance.get('/api/v1/category-events/categories-with-events');
      const allEvents: SearchEvent[] = [];
      
      if (response.data && response.data.data && response.data.data.categories) {
        response.data.data.categories.forEach((category: any) => {
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
                  ...event,
                  category_name: category.category_name
                });
              }
            });
          }
        });
      }
      
      // Remove duplicates
      const uniqueEvents = allEvents.filter((event, index, self) => 
        index === self.findIndex(e => e.event_id === event.event_id)
      );
      
      setSearchResults(uniqueEvents);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial search on page load
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  // Filter and sort results
  const filteredAndSortedResults = React.useMemo(() => {
    let filtered = searchResults;

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(event => 
        event.category_name?.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
        case 'title':
          return a.event_title.localeCompare(b.event_title);
        case 'relevance':
        default:
          return 0; // Keep original order for relevance
      }
    });

    return sorted;
  }, [searchResults, filterCategory, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchQuery);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, categories, locations..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Events'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isLoading ? 'Searching...' : `${filteredAndSortedResults.length} events found`}
            </p>
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid/List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Searching events...</span>
          </div>
        ) : filteredAndSortedResults.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `No events match your search for "${searchQuery}"`
                : 'Enter a search term to find events'
              }
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredAndSortedResults.map((event) => (
              <MovieCard
                key={event.event_id}
                title={event.event_title}
                image={event.card_image}
                event_slug={event.event_slug}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedResults.map((event) => (
              <div key={event.event_id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={event.card_image || '/images/placeholder.jpg'}
                      alt={event.event_title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <a href={`/event/${event.event_slug}`} className="hover:text-blue-600">
                        {event.event_title}
                      </a>
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      {event.start_date && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(event.start_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    {event.category_name && (
                      <span className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {event.category_name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search page...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}