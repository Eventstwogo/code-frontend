'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Search, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useProfileStore } from '@/lib/ZustanStore/usermanagement';
import useStore from '@/lib/Zustand';
import { useSearch } from '@/hooks/useSearch';
import SearchDropdown from '@/components/SearchDropdown';
type HeaderProps = {
  categories: { category_id: number; category_name: string;category_slug: string }[];
};

export default function Header({ categories }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  const { profile, fetchProfile } = useProfileStore();
  const { userId } = useStore();
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    isLoading, 
    isOpen, 
    setIsOpen, 
    error, 
    clearSearch 
  } = useSearch();

  useEffect(() => {
    if (userId) {
      fetchProfile(); // Fetch profile only if user is logged in
    }
  }, [userId, fetchProfile]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  // Reset selected index when search results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchResults]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          const selectedEvent = searchResults[selectedIndex];
          window.location.href = `/event/${selectedEvent.event_slug}`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };
  return (
    <header className="border-b shadow-sm bg-white w-full">
      {/* Top Row: Logo + Search + Icons/Menu */}
      <div
        className="
          flex items-center
          justify-between
          px-4 md:px-6 lg:px-10
          py-3 md:py-4
          space-x-2
        "
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="EventsNego Logo"
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div 
          ref={searchRef}
          className="
            relative
            flex items-center
            border rounded-xl
            px-2 py-1
            shadow-sm border-gray-300
            flex-1
            mx-2
            max-w-[140px] sm:max-w-[200px] md:max-w-md lg:max-w-lg
          "
        >
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events, categories, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none px-2 py-1 text-xs sm:text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => {
                clearSearch();
                setSelectedIndex(-1);
              }}
              className="ml-1 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3 w-3 text-gray-400" />
            </button>
          )}
          
          {/* Search Results Dropdown */}
          <SearchDropdown
            results={searchResults}
            isLoading={isLoading}
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
              setSelectedIndex(-1);
            }}
            error={error}
            selectedIndex={selectedIndex}
          />
        </div>

        {/* Right Side: User + Menu */}
        <div className="flex items-center space-x-8 flex-shrink-0">
         

          {/* Desktop Categories (hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-6 ml-4">
            {categories.map((cat) => (
              <Link
                key={cat.category_id}
                href={`/${cat.category_slug}`}
                className="text-sm 2xl:text-xl font-medium hover:text-blue-600"
              >
                {cat.category_name}
              </Link>
            ))}
          </div>
        <div className="flex items-center space-x-2">
  <Link href={userId ? '/Profile' : '/login'} className="flex items-center space-x-1">
    <User className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:text-blue-600 transition-colors" />
    {userId && profile?.first_name && (
      <span className="text-sm font-medium text-gray-800 hidden sm:inline">
        {profile.first_name}
      </span>
    )}
  </Link>
</div>

          {/* Mobile Menu Icon (shown on small screens) */}
          <button
            className="lg:hidden p-1"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          <div className="bg-white w-3/4 max-w-xs h-full shadow-xl p-4 flex flex-col space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg font-semibold">Menu</p>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <nav className="flex flex-col space-y-3">
              {categories.map((cat) => (
                <Link
                  key={cat.category_id}
                  href={`/${cat.category_name.toLowerCase()}`}
                  className="text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.category_name}
                </Link>
              ))}
            </nav>
          </div>
          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
