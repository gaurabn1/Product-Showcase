import { create } from "zustand";

interface CategoryStore {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategory: '',
  isLoading: false,
  setSelectedCategory: (category: string) => set({ selectedCategory: category }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}))
