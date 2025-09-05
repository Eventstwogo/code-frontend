'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Search, User, Menu, X, ChevronDown, Phone, Info, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useProfileStore } from '@/lib/ZustanStore/usermanagement';
import useStore from '@/lib/Zustand';
import { useSearch } from '@/hooks/useSearch';
import SearchDropdown from '@/components/SearchDropdown';
import CategoriesDropdown from '@/components/CategoriesDropdown';
import LogoWithText from '@/components/logowithtext'
type HeaderProps = {
  categories: { category_id: number; category_name: string;category_slug: string }[];
};

export default function Header({ categories }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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

  // Close search dropdown when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      setIsOpen(false);
      setSelectedIndex(-1);
      setCategoriesDropdownOpen(false);
    }
  }, [mobileMenuOpen, setIsOpen]);

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInsideButton = categoriesRef.current && categoriesRef.current.contains(target);
      const isClickInsideDropdown = (target as Element)?.closest('[data-categories-dropdown]');
      
      if (!isClickInsideButton && !isClickInsideDropdown) {
        setCategoriesDropdownOpen(false);
      }
    };

    if (categoriesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [categoriesDropdownOpen]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInsideSearch = searchRef.current && searchRef.current.contains(target);
      const isClickInsideDropdown = (target as Element)?.closest('[data-search-dropdown]');
      
      if (!isClickInsideSearch && !isClickInsideDropdown) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

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
console.log(profile)
  return (
    <header className="header-container border-b shadow-sm bg-white w-full sticky top-0 z-[9999]">
      <div className="w-full max-w-full overflow-hidden">
        {/* Main Header Row */}
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-10 py-2 sm:py-3 md:py-4 gap-2 sm:gap-3 md:gap-4 w-full">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
           <LogoWithText/>
            </Link>
          </div>

          {/* Search Bar - Moved to second position */}
          {!mobileMenuOpen &&(
          <div 
            ref={searchRef}
            className="relative flex items-center border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm border-gray-300 flex-1 min-w-0 mx-2 sm:mx-3 md:mx-4 max-w-md z-[9998]"
          >
            <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none px-1 sm:px-2 py-1 text-xs sm:text-sm min-w-0 placeholder:text-xs sm:placeholder:text-sm"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  clearSearch();
                  setSelectedIndex(-1);
                }}
                className="ml-1 p-0.5 sm:p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
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
              searchRef={searchRef}
              mobileMenuOpen={mobileMenuOpen}
              searchQuery={searchQuery}
            />
          </div>
)}
          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {/* Categories Dropdown */}
            <div ref={categoriesRef} className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="flex items-center gap-1 text-sm 2xl:text-base font-medium hover:text-purple-600 transition-colors whitespace-nowrap"
              >
                Categories
                <ChevronDown className={`h-4 w-4 transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Navigation Links */}
            <Link href="/contact" className="text-sm 2xl:text-base font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
              Contact Us
            </Link>
            <Link href="/about" className="text-sm 2xl:text-base font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
              About Us
            </Link>
            <Link href="https://organizer.events2go.com.au/" className="text-sm 2xl:text-base font-medium hover:text-purple-600 transition-colors whitespace-nowrap">
              Become an Organizer
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
            {/* User Profile */}
            <Link 
              href={userId ? '/Profile' : '/login'} 
              className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-600 hover:text-purple-600 transition-colors" />
              {userId && profile?.username && (
                <span className="text-xs sm:text-sm font-medium text-gray-800 hidden lg:inline max-w-20 xl:max-w-none truncate">
                  {profile.username}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-1 sm:p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Dropdown Component */}
      <CategoriesDropdown
        categories={categories}
        categoriesRef={categoriesRef}
        categoriesDropdownOpen={categoriesDropdownOpen}
        setCategoriesDropdownOpen={setCategoriesDropdownOpen}
      />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-black bg-opacity-50 flex xl:hidden animate-in fade-in duration-200">
          <div className="bg-white w-4/5 max-w-sm h-full shadow-xl flex flex-col animate-in slide-in-from-left duration-300">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
              </button>
            </div>

            {/* User Profile Section */}
            <div className="p-4 border-b border-gray-100">
              <Link 
                href={userId ? '/Profile' : '/login'} 
                className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="p-2 bg-purple-100 rounded-full">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {userId && profile?.first_name ? profile.first_name : 'Sign In'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {userId ? 'View Profile' : 'Login to your account'}
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-2">
                {/* Categories Section */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.category_id}
                        href={`/${cat.category_slug}`}
                        className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        {cat.category_name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Main Navigation */}
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                    Navigation
                  </h3>
                  
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Phone className="h-5 w-5 text-gray-400" />
                    Contact Us
                  </Link>
                  
                  <Link
                    href="/about"
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Info className="h-5 w-5 text-gray-400" />
                    About Us
                  </Link>
                  
                  <Link
                    href="https://organizer.events2go.com.au/"
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserPlus className="h-5 w-5 text-gray-400" />
                    Become an Organizer
                  </Link>
                </div>
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Events2go © 2024
              </p>
            </div>
          </div>
          
          {/* Backdrop */}
          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
