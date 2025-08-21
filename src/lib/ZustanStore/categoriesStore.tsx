// 'use client'
// import { create } from 'zustand'
// import axiosInstance from '../axiosInstance'

// export const useCategoryStore = create((set) => ({
//   categories: [],
//   loading: false,
//   error: null,

//   fetchCategories: async () => {

//     set({ loading: true, error: null })
//     try {
//         console.log('helloo')
//       const response = await axiosInstance.get('/api/v1/categories/list-categories?status_value=false')
//       set({ categories: response.data.data, loading: false })
//     } catch (error) {
//       set({ error: error.message || 'Error fetching categories', loading: false })
//     }
//   },
// }))

'use client'
import { create } from 'zustand'
import axiosInstance from '../axiosInstance'
import { Category, SubCategory } from '@/types'

interface CategoryStore {
  categories: Category[];
  subCategories: SubCategory[];
  loading: boolean;
  error: string | null;
  notFound: boolean;
  fetchCategories: () => Promise<void>;
  fetchSubCategoriesBySlug: (slug: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  subCategories: [],         // ✅ NEW STATE
  loading: false,
  error: null,
  notFound: false, 

  // ✅ fetch all categories
  fetchCategories: async () => {
    set({ loading: true, error: null })
    try {
      console.log('Fetching all categories')
      const response = await axiosInstance.get('/api/v1/categories/list/event-categories?status_value=false')
      set({ categories: response.data.data, loading: false })
    } catch (error: any) {
      set({ error: error?.message || 'Error fetching categories', loading: false })
    }
  },

  // ✅ fetch subcategories by slug
  fetchSubCategoriesBySlug: async (slug) => {
    set({ loading: true, error: null })
    try {
      console.log('Fetching subcategories for slug:', slug)
      const response = await axiosInstance.get(`/api/v1/categories/slug/${slug}`)
      const subCategories = response.data.data?.subcategories || []

      if (subCategories.length === 0) {
        // If no subcategories found → set notFound flag
        set({ notFound: true, loading: false })
        return
      }

      set({ subCategories, loading: false })
    } catch (error: any) {
       set({ notFound: true, loading: false })
      set({ error: error?.message || 'Error fetching subcategories', loading: false })
    }
  },
}))
