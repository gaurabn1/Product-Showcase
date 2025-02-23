import { create } from 'zustand';

interface ProductStore {
  products: [];
  setProducts: (products: []) => void;
}

const useProductsStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));

export default useProductsStore;
