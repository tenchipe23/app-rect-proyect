import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: string;
  imageUrl?: string;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number, variant?: string | undefined) => void;
  removeFromCart: (productId: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getTotalPrice: () => number;
}

type PersistedCartState = {
  items?: CartItem[];
  totalItems?: number;
  totalPrice?: number;
  state?: {
    items?: CartItem[];
    totalItems?: number;
    totalPrice?: number;
  }
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addToCart: (product, quantity = 1, variant) => {
        const state = get();
        const existingItemIndex = state.items.findIndex(
          item => item.id === product.id && 
                  (!variant || item.selectedVariant === variant)
        );

        set(state => {
          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity
            };

            return {
              items: updatedItems,
              totalItems: state.totalItems + quantity,
              totalPrice: state.totalPrice + (product.price * quantity)
            };
          }

          const newItem: CartItem = {
            ...product,
            quantity,
            selectedVariant: variant
          };

          return {
            items: [...state.items, newItem],
            totalItems: state.totalItems + quantity,
            totalPrice: state.totalPrice + (product.price * quantity)
          };
        });
      },
      removeFromCart: (productId) => {
        set(state => {
          const itemToRemove = state.items.find(item => item.id === productId);
          if (!itemToRemove) return state;

          const updatedItems = state.items.filter(item => item.id !== productId);

          return {
            items: updatedItems,
            totalItems: state.totalItems - itemToRemove.quantity,
            totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
          };
        });
      },
      removeItem: (productId) => {
        set(state => {
          const itemToRemove = state.items.find(item => item.id === productId);
          if (!itemToRemove) return state;

          const updatedItems = state.items.filter(item => item.id !== productId);

          return {
            items: updatedItems,
            totalItems: state.totalItems - itemToRemove.quantity,
            totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
          };
        });
      },
      updateQuantity: (productId, quantity) => {
        set(state => {
          const itemIndex = state.items.findIndex(item => item.id === productId);
          if (itemIndex === -1) return state;

          const currentItem = state.items[itemIndex];
          const quantityDiff = quantity - currentItem.quantity;

          const updatedItems = [...state.items];
          updatedItems[itemIndex] = {
            ...currentItem,
            quantity
          };

          return {
            items: updatedItems,
            totalItems: state.totalItems + quantityDiff,
            totalPrice: state.totalPrice + (currentItem.price * quantityDiff)
          };
        });
      },
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0
        });
      },
      isInCart: (productId) => {
        return get().items.some(item => item.id === productId);
      },
      getTotalPrice: () => {
        return get().totalPrice;
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      
      migrate: (persistedState: unknown): CartStore => {
        const createDefaultState = (): CartStore => ({
          items: [],
          totalItems: 0,
          totalPrice: 0,
          addToCart: () => {},
          removeFromCart: () => {},
          removeItem: () => {},
          updateQuantity: () => {},
          clearCart: () => {},
          isInCart: () => false,
          getTotalPrice: () => 0
        });

        if (!persistedState || typeof persistedState !== 'object') {
          console.warn('Invalid persisted state, using default');
          return createDefaultState();
        }

        const state = persistedState as PersistedCartState & CartStore;

        try {
          const migratedState = createDefaultState();

          const sourceState = state.state || state;

          if (Array.isArray(sourceState.items)) {
            migratedState.items = sourceState.items.map(item => ({
              ...item,
              quantity: item.quantity || 1
            }));
          }
          migratedState.totalItems = sourceState.totalItems || 
            migratedState.items.reduce((total, item) => total + (item.quantity || 1), 0);
          
          migratedState.totalPrice = sourceState.totalPrice || 
            migratedState.items.reduce((total, item) => 
              total + ((item.price || 0) * (item.quantity || 1)), 0);

          console.log('Migrated state:', migratedState);
          return migratedState;

        } catch (error) {
          console.error('Migration failed:', error);
          return createDefaultState();
        }
      },
      version: 2,
      
      onRehydrateStorage: (state) => {
        console.log('Rehydration started', state);
        return (error) => {
          if (error) {
            console.error('Rehydration error', error);
          }
        };
      }
    }
  )
);