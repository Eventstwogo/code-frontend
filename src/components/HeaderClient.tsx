'use client';

import { useEffect } from 'react';
import Header from '@/components/homepage/header';
import { useCategoryStore } from '@/lib/ZustanStore/categoriesStore';

export default function HeaderClient() {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
  
    fetchCategories();
  }, []);

  return (
    <Header categories={categories}  />
  );
}
