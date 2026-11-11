"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { Product } from "../types/Product";

type CartItem = Product & { quantity: number; image?: string };

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: "ADD"; product: Product; quantity?: number }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "INCREMENT"; id: string }
  | { type: "DECREMENT"; id: string }
  | { type: "HYDRATE"; state: CartState };

const CART_KEY = "ecom_cart_v1";

const CartContext = createContext<{
  state: CartState;
  isHydrated: boolean;
  addToCart: (p: Product, quantity?: number) => void;
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
      const qty = action.quantity ?? 1;
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        const newQuantity = existing.quantity + qty;
        const stock = action.product.stock ?? Infinity;
        const finalQuantity = Math.min(newQuantity, stock);
        return {
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, quantity: finalQuantity } : i
          ),
        };
      }
      const stock = action.product.stock ?? Infinity;
      const finalQuantity = Math.min(qty, stock);
      return {
        items: [...state.items, { ...action.product, quantity: finalQuantity }],
      };
    }
    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREMENT":
      return {
        items: state.items
          .map((i) =>
            i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
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
    if (!parsed || !Array.isArray(parsed.items)) return initialState;
    return parsed;
  } catch {
    return initialState;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false); // <-- NUEVO
  const hasHydrated = useRef(false);

  useEffect(() => {
    const saved = readCartFromStorage();
    dispatch({ type: "HYDRATE", state: saved });
    setIsHydrated(true); // <-- NUEVO
    hasHydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hasHydrated.current) return;
    localStorage.setItem(CART_KEY, JSON.stringify(state));
  }, [state]);

  // Usamos useMemo para evitar re-renders innecesarios
  const value = useMemo(() => ({
    state,
    isHydrated, // <-- NUEVO
    addToCart: (product: Product, quantity?: number) => {
      const availableStock = product.stock ?? Infinity;
      if (availableStock <= 0) {
        alert("Este producto está agotado y no se puede agregar al carrito.");
        return;
      }
      const requestedQty = quantity ?? 1;
      const existing = state.items.find((i) => i.id === product.id);
      const currentQty = existing?.quantity ?? 0;
      const newTotal = currentQty + requestedQty;
      if (newTotal > availableStock) {
        alert(`Solo hay ${availableStock} unidades disponibles de "${product.name}". Se agregará la cantidad máxima posible.`);
        dispatch({ type: "ADD", product, quantity: availableStock - currentQty });
        return;
      }
      dispatch({ type: "ADD", product, quantity: requestedQty });
    },
    removeFromCart: (id: string) => dispatch({ type: "REMOVE", id }),
    clearCart: () => dispatch({ type: "CLEAR" }),
    increment: (id: string) => dispatch({ type: "INCREMENT", id }),
    decrement: (id: string) => dispatch({ type: "DECREMENT", id }),
  }), [state, isHydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}