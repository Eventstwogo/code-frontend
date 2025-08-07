'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Loader2 } from 'lucide-react';
import Portal from './Portal';
import { SearchResult } from '@/hooks/useSearch';

interface SearchDropdownProps {
  results: SearchResult[];
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  error: string | null;
  selectedIndex?: number;
  searchRef: React.RefObject<HTMLDivElement>;
  mobileMenuOpen?: boolean;
  searchQuery?: string;
}

export default function SearchDropdown({ 
  results, 
  isLoading, 
  isOpen, 
  onClose, 
  error,
  selectedIndex = -1,
  searchRef,
  mobileMenuOpen = false,
  searchQuery = ''
}: SearchDropdownProps) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !searchRef.current) return;

    const updatePosition = () => {
      const rect = searchRef.current?.getBoundingClientRect();
      if (rect) {
        setPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: rect.width
        });
      }
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, searchRef]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, searchRef]);

  if (!isOpen || mobileMenuOpen) return null;
  console.log(results)
  return (
    <Portal>
      <div 
        ref={dropdownRef}
        data-search-dropdown
        className="fixed bg-white border border-gray-200 rounded-lg shadow-2xl max-h-96 overflow-y-auto"
        style={{ 
          zIndex: 999999,
          top: position.top,
          left: position.left,
          width: Math.max(position.width, 300),
          maxWidth: 'calc(100vw - 32px)'
        }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            <span className="ml-2 text-sm text-gray-500">Searching...</span>
          </div>
        ) : error ? (
          <div className="px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : results.length === 0 ? (
          searchQuery.trim() !== "" ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              no events found
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              Start typing to search events...
            </div>
          )
        ) : (
          <div className="py-2">
            {results.map((event, index) => (
              <Link
                key={event.event_id}
                href={`/event/${event.event_slug}`}
                onClick={onClose}
                className={`block px-4 py-3 transition-colors ${
                  index === selectedIndex 
                    ? 'bg-blue-50 border-l-2 border-blue-500' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Event Image */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 relative rounded-md overflow-hidden bg-gray-200">
                      {event.card_image ? (
                        <Image
                          src={event.card_image}
                          alt={event.event_title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {event.event_title}
                    </h3>
                    
                    <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                      {event.start_date && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(event.start_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>

                    {event.category_name && (
                      <div className="mt-1">
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {event.category_name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
            
            {results.length >= 10 && (
              <div className="px-4 py-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  Showing first 10 results
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Portal>
  );
}