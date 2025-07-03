import { create } from 'zustand';

const useCompareStore = create((set) => ({
  compareItems: [],
  addToCompare: (product) => set((state) => {
    if (state.compareItems.length >= 3) {
      alert("Maximum compare limit reached");
      return state;
    }
    return { compareItems: [...state.compareItems, product] };
  }),
  removeFromCompare: (productId) => set((state) => ({
    compareItems: state.compareItems.filter(item => item.id !== productId)
  })),
}));

export default useCompareStore;