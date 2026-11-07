"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container, Typography, Box, Grid, Button, CircularProgress } from "@mui/material";
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

      <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "flex-end", mb: 1, pr: 1 }}>
        <Typography sx={{ fontSize: "0.75rem", color: "#9CA3AF", fontWeight: 600 }}>
          Desliza para ver más →
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: { xs: "flex-start", md: "center" }, 
          gap: 3, 
          mb: 6, 
          overflowX: "auto", 
          flexWrap: "nowrap", 
          whiteSpace: "nowrap",
          "&::-webkit-scrollbar": { display: "none" }, 
          scrollbarWidth: "none",
          px: { xs: 2, md: 0 }
        }}
      >
        {categories.map((cat) => (
          <Typography
            key={cat}
            onClick={() => setActiveCategory(cat)}
            sx={{
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeCategory === cat ? 600 : 400,
              color: activeCategory === cat ? "#0a0d15" : "#888",
              borderBottom: activeCategory === cat ? "2px solid #0a0d15" : "2px solid transparent",
              pb: 0.5,
              flexShrink: 0,
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
          /* FLEXBOX PARA IGUALAR ALTURAS EN TODA LA FILA */
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%", bgcolor: "transparent" }}>
              
              {/* IMAGEN SIN CAJA, SIN BORDES NI SOMBRAS */}
              <Box sx={{ position: "relative", overflow: "hidden", mb: 2 }}>
                <Link href={`/products/${product.id}`} style={{ display: "block", width: "100%", textDecoration: "none" }}>
                  <Box component="img" src={product.image_url} alt={product.name} sx={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", transition: "transform 0.4s ease", "&:hover": { transform: "scale(1.04)" } }} />
                </Link>
              </Box>
              
              {/* CONTENEDOR DE TEXTOS Y BOTÓN: flexGrow 1 empuja el botón al fondo */}
              <Box sx={{ px: 1, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: "#0a0d15", 
                      fontSize: "1.1rem", 
                      mb: 0.5,
                      display: "-webkit-box", 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: "vertical", 
                      overflow: "hidden",
                      minHeight: "2.4em" // Reserva espacio para 2 líneas siempre
                    }}
                  >
                    {product.name}
                  </Typography>
                  
                  {product.sale_price ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#d32f2f" }}>
                        S/. {Number(product.sale_price).toFixed(2)}
                      </Typography>
                      <Typography sx={{ fontSize: "0.9rem", color: "#888", textDecoration: "line-through" }}>
                        S/. {Number(product.price).toFixed(2)}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: "1rem", fontWeight: 500, color: "#333", mb: 1 }}>
                      S/. {Number(product.price).toFixed(2)}
                    </Typography>
                  )}

                  <Typography sx={{ color: "#888", fontSize: "0.85rem", mb: 2 }}>
                    {product.category}
                  </Typography>
                </Box>

                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={() => addToCart({ ...product, image: product.image_url })} 
                  disableElevation
                  disabled={product.stock <= 0}
                  sx={{ 
                    bgcolor: product.stock <= 0 ? "#E5E7EB" : "#B0B3B8", 
                    color: product.stock <= 0 ? "#9CA3AF" : "#111827", 
                    border: product.stock <= 0 ? "none" : "none",
                    py: 1.2, 
                    fontSize: "0.9rem", 
                    fontWeight: 700, 
                    borderRadius: "8px",
                    boxShadow: product.stock <= 0 ? "none" : "0 4px 14px 0 rgba(0,0,0,0.15)", 
                    transition: product.stock <= 0 ? "none" : "all 0.3s ease",
                    "&:hover": product.stock <= 0 ? { 
                      bgcolor: "#E5E7EB", 
                      color: "#9CA3AF", 
                      boxShadow: "none",
                      transform: "none"
                    } : { 
                      bgcolor: "#0a0d15", 
                      color: "white", 
                      boxShadow: "0 6px 20px rgba(10, 13, 21, 0.3)",
                      transform: "translateY(-2px)"
                    } 
                  }}
                >
                  {product.stock <= 0 ? "Agotado" : "Añadir al carrito"}
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