'use client';

import { useEffect } from 'react';
import Header from '@/components/homepage/header';
import { useCategoryStore } from '@/lib/ZustanStore/categoriesStore';
import useStore from '@/lib/Zustand';

export default function HeaderClient() {
  const { categories, fetchCategories } = useCategoryStore();
  const { checkAuth, refreshTokenIfNeeded, isAuthenticated } = useStore();

  useEffect(() => {
    // Check authentication status on app load
    const initializeAuth = async () => {
      console.log('🚀 Initializing authentication check in HeaderClient...');
      await checkAuth();
    };
    
    initializeAuth();
    fetchCategories();
  }, []);

  // Set up periodic token refresh for authenticated users
  useEffect(() => {
    if (!isAuthenticated) return;

    console.log('🔄 Setting up periodic token refresh...');
    
    // Check and refresh token every 4 minutes (240 seconds)
    const refreshInterval = setInterval(async () => {
      console.log('⏰ Periodic token refresh check...');
      await refreshTokenIfNeeded();
    }, 240000); // 4 minutes

    return () => {
      console.log('🛑 Clearing token refresh interval');
      clearInterval(refreshInterval);
    };
  }, [isAuthenticated, refreshTokenIfNeeded]);

  return (
    <Header categories={categories}  />
  );
}
