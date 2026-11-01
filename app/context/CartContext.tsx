"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Product } from "../types/Product";

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "INCREMENT"; id: string }
  | { type: "DECREMENT"; id: string }
  | { type: "HYDRATE"; state: CartState };

const CART_KEY = "ecom_cart_v1";

const CartContext = createContext<{
  state: CartState;
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
} | null>(null);

const initialState: CartState = { items: [] };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      };

    case "DECREMENT":
      return {
        items: state.items
          .map((i) =>
            i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i,
          )
          .filter((i) => i.quantity > 0), // remove if hits 0
      };
    case "REMOVE":
      return {
        items: state.items.filter((i) => i.id !== action.id),
      };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

function readCartFromStorage(): CartState {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return initialState;

    const parsed = JSON.parse(raw) as CartState;

    // tiny safety check (prevents crashes if storage is corrupted)
    if (!parsed || !Array.isArray(parsed.items)) return initialState;

    return parsed;
  } catch {
    return initialState;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // prevents first render from overwriting localStorage with empty cart
  const hasHydrated = useRef(false);

  // 1) Hydrate once (client only)
  useEffect(() => {
    const saved = readCartFromStorage();
    dispatch({ type: "HYDRATE", state: saved });
    hasHydrated.current = true;
  }, []);

  // 2) Persist whenever state changes (after hydration)
  useEffect(() => {
    if (!hasHydrated.current) return;
    localStorage.setItem(CART_KEY, JSON.stringify(state));
  }, [state]);
  const value = {
    state,
    addToCart: (product: Product) => dispatch({ type: "ADD", product }),
    removeFromCart: (id: string) => dispatch({ type: "REMOVE", id }),
    clearCart: () => dispatch({ type: "CLEAR" }),
    increment: (id: string) => dispatch({ type: "INCREMENT", id }),
    decrement: (id: string) => dispatch({ type: "DECREMENT", id }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
