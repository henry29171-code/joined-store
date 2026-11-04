"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Chip, CircularProgress } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useCart } from "../context/CartContext"; 
import { supabase } from "../lib/supabase"; // Importamos Supabase

const categories = ["Todos", "Morrales", "Billeteras", "Correas", "Pulseras", "Relojes", "Perfumes"];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || "Todos";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  
  // Estados para los productos de la base de datos
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  // Cargar productos desde Supabase al iniciar
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // Consultamos la tabla 'products'
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error cargando productos:", error);
      } else if (data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Filtrar productos por categoría
  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress sx={{ color: "#0a0d15" }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      
      {/* Encabezado */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em" }}>
          Colección Joined
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "#0a0d15", mt: 1, mb: 2, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
          Nuestros productos
        </Typography>
        <Typography sx={{ color: "#5E6B7E", fontSize: { xs: "0.95rem", md: "1.05rem" }, maxWidth: 600, mx: "auto" }}>
          Explora nuestra colección de accesorios diseñados para elevar tu estilo y durar toda la vida.
        </Typography>
      </Box>

      {/* Indicador móvil */}
      <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "flex-end", alignItems: "center", mb: 1, pr: 1 }}>
        <Typography sx={{ fontSize: "0.75rem", color: "#9CA3AF", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
          Desliza para ver más →
        </Typography>
      </Box>

      {/* Filtro de Categorías */}
      <Box sx={{ position: "relative", mb: 6 }}>
        <Box sx={{ bgcolor: "white", p: 1.5, borderRadius: 3, display: "flex", gap: 1, overflowX: "auto", flexWrap: "nowrap", justifyContent: { xs: "flex-start", md: "center" }, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setActiveCategory(cat)}
              sx={{ fontWeight: 600, px: 2, py: 2.5, fontSize: "0.9rem", flexShrink: 0, bgcolor: activeCategory === cat ? "#0a0d15" : "#F8F9FA", color: activeCategory === cat ? "white" : "#5E6B7E", "&:hover": { bgcolor: activeCategory === cat ? "#1a1d24" : "#EAEAEA" }, transition: "all 0.3s" }}
            />
          ))}
        </Box>
        <Box sx={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)", pointerEvents: "none", display: { xs: "block", md: "none" }, borderTopRightRadius: 12, borderBottomRightRadius: 12 }} />
      </Box>

      {/* Cuadrícula de Productos */}
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {filteredProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card elevation={0} sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4, overflow: "hidden", bgcolor: "#FFFFFF", border: "1px solid rgba(20, 32, 56, 0.06)", transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "translateY(-8px)", boxShadow: "0 20px 40px rgba(10, 13, 21, 0.1)" } }}>
              
              {/* Imagen vertical clickeable */}
              <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
                <Link href={`/products/${product.id}`} style={{ display: "block", width: "100%", textDecoration: "none" }}>
                  <CardMedia 
                    component="img" 
                    // Usamos product.image_url que es como lo definimos en SQL
                    image={product.image_url || "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"} 
                    alt={product.name} 
                    sx={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", transition: "transform 0.4s ease", "&:hover": { transform: "scale(1.05)" } }} 
                  />
                </Link>
                <Chip label={product.category} size="small" sx={{ position: "absolute", top: 16, left: 16, bgcolor: "rgba(255,255,255,0.9)", fontWeight: 700, color: "#0a0d15", zIndex: 2 }} />
              </Box>
              
              <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#142038", fontSize: "1.1rem", mb: 1 }}>{product.name}</Typography>
                <Typography sx={{ color: "#5E6B7E", fontSize: "0.9rem", lineHeight: 1.5, mb: 2, flexGrow: 1 }}>{product.description}</Typography>
                <Typography sx={{ fontSize: "1.2rem", fontWeight: 800, color: "#142038", mb: 2 }}>S/. {Number(product.price).toFixed(2)}</Typography>
                
                <Button 
                  variant="outlined" 
                  fullWidth 
                  startIcon={<ShoppingBagIcon />} 
                  onClick={() => addToCart({ ...product, image: product.image_url })} 
                  sx={{ bgcolor: "white", color: "#0a0d15", borderColor: "#0a0d15", py: 1.2, fontSize: "0.95rem", borderRadius: 2, textTransform: "none", fontWeight: 700, transition: "all 0.3s", "&:hover": { bgcolor: "#0a0d15", color: "white", borderColor: "#0a0d15" } }}
                >
                  Añadir al carrito
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: "center", py: 10, bgcolor: "#F8F9FA", borderRadius: 4, border: "1px dashed #CBD5E1" }}>
          <Typography variant="h6" sx={{ color: "#5E6B7E", fontWeight: 600 }}>No hay productos disponibles en esta categoría.</Typography>
          <Typography sx={{ color: "#9CA3AF", mt: 1, fontSize: "0.9rem" }}>Agrega productos desde el panel de administración.</Typography>
        </Box>
      )}
    </Container>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}>Cargando...</div>}>
      <ProductsContent />
    </Suspense>
  );
}