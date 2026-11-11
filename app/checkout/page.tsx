"use client";
import dynamic from 'next/dynamic';

const CheckoutContent = dynamic(() => import('./CheckoutClient'), {
  ssr: false,
  loading: () => <div style={{ padding: '100px', textAlign: 'center', color: '#0a0d15' }}>Cargando pasarela de pago...</div>
});

export default function CheckoutPage() {
  return <CheckoutContent />;
}