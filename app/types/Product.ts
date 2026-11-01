export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;       // Para el carrito
  image_url?: string;   // Para la página de detalle
}