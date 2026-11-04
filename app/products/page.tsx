"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Chip, CircularProgress } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useCart } from "../context/CartContext"; 
import { supabase } from "../lib/supabase";

const categories = ["Todos", "Morrales", "Billeteras", "Correas", "Pulseras", "Relojes", "Perfumes"];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || "Todos";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (!error && data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

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
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 500, color: "#0a0d15", mb: 2, fontSize: { xs: "1.8rem", md: "2.5rem" }, letterSpacing: "-0.02em" }}>
          Nuestros productos
        </Typography>
        <Typography sx={{ color: "#666", fontSize: { xs: "0.95rem", md: "1.05rem" }, maxWidth: 600, mx: "auto", fontWeight: 400 }}>
          Explora nuestra colección de accesorios diseñados para elevar tu estilo y durar toda la vida.
        </Typography>
      </Box>

      {/* Filtros Simples */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 6, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <Typography
            key={cat}
            onClick={() => setActiveCategory(cat)}
            sx={{
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeCategory === cat ? 600 : 400,
              color: activeCategory === cat ? "#0a0d15" : "#666",
              borderBottom: activeCategory === cat ? "2px solid #0a0d15" : "2px solid transparent",
              pb: 0.5,
              transition: "all 0.2s",
              "&:hover": { color: "#0a0d15" }
            }}
          >
            {cat}
          </Typography>
        ))}
      </Box>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {filteredProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "transparent" }}>
              
              {/* Contenedor de la Imagen con Gris que combina con el Azul Oscuro */}
              <Box sx={{ bgcolor: "#EAEAEA", position: "relative", overflow: "hidden", mb: 2, borderRadius: "8px" }}>
                <Link href={`/products/${product.id}`} style={{ display: "block", width: "100%", textDecoration: "none" }}>
                  <CardMedia 
                    component="img" 
                    image={product.image_url} 
                    alt={product.name} 
                    sx={{ 
                      width: "100%", 
                      aspectRatio: "4/5", 
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                      "&:hover": { transform: "scale(1.03)" }
                    }} 
                  />
                </Link>
              </Box>
              
              {/* Información */}
              <Box sx={{ px: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 500, color: "#0a0d15", fontSize: "1.1rem", mb: 0.5 }}>
                  {product.name}
                </Typography>
                <Typography sx={{ fontSize: "1rem", fontWeight: 500, color: "#0a0d15", mb: 1 }}>
                  S/. {Number(product.price).toFixed(2)}
                </Typography>
                <Typography sx={{ color: "#666", fontSize: "0.85rem", mb: 2 }}>
                  {product.category}
                </Typography>

                {/* Botón con curva sutil */}
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={() => addToCart({ ...product, image: product.image_url })} 
                  sx={{ 
                    bgcolor: "#0a0d15", 
                    color: "white", 
                    py: 1.2, 
                    fontSize: "0.9rem", 
                    fontWeight: 600,
                    borderRadius: "8px",
                    boxShadow: "none",
                    transition: "background 0.3s",
                    "&:hover": { bgcolor: "#1a1d24", boxShadow: "none" } 
                  }}
                >
                  Añadir a la cesta
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography sx={{ color: "#666", fontSize: "1rem" }}>No hay productos disponibles en esta categoría.</Typography>
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