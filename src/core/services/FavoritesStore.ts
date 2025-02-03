import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../../shared/types/ProductTypes';

interface FavoritesStore {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (product) => {
        set((state) => {
          const isAlreadyFavorite = state.favorites.some(p => p.id === product.id);
          
          if (isAlreadyFavorite) {
            return state;
          }
          
          return {
            favorites: [...state.favorites, product]
          };
        });
      },
      removeFromFavorites: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter(p => p.id !== productId)
        }));
      },
      isFavorite: (productId) => {
        return get().favorites.some(p => p.id === productId);
      }
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1
    }
  )
);