"use client";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

// Importamos el CartProvider original de forma dinámica, sin SSR
const CartProvider = dynamic(
  () => import("./CartContext").then((mod) => mod.CartProvider),
  { ssr: false }
);

export default function CartProviderClient({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}