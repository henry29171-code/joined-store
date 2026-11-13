"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { supabase } from "@/app/lib/supabase";
import { Container, Typography, Box, Grid, Button, CircularProgress } from "@mui/material";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // SOLUCIÓN: Creamos una función asíncrona interna para poder usar 'await'
    const fetchProducts = async () => {
      if (query) {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .filter("name", "ilike", `%${query}%`)
          .order("name")
          .limit(20);

        if (!error && data) setProducts(data);
        setLoading(false);
      } else {
        setProducts([]);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

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
          Resultados de búsqueda
        </Typography>
        <Typography sx={{ color: "#666", fontSize: { xs: "0.95rem", md: "1.05rem" }, maxWidth: 600, mx: "auto", fontWeight: 400 }}>
          {query ? (
            <>
              Encontramos resultados para <strong>&quot;{query}&quot;</strong>
            </>
          ) : (
            "Busca en nuestra colección de accesorios"
          )}
        </Typography>
      </Box>

      {products.length === 0 && (
        <Box sx={{ textAlign: "center", py: 10, color: "#666" }}>
          <Typography sx={{ color: "#666", fontSize: "1rem" }}>No encontramos productos que coincidan con tu búsqueda.</Typography>
        </Box>
      )}

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%", bgcolor: "transparent" }}>
              {/* IMAGEN SIN CAJA, SIN BORDES NI SOMBRAS */}
              <Box sx={{ position: "relative", overflow: "hidden", mb: 2, width: "100%", aspectRatio: "4/5" }}>
                <Link href={`/products/${product.id}`} style={{ display: "block", width: "100%", textDecoration: "none" }}>
                  <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 600px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "center", transition: "transform 0.4s ease" }} />
                </Link>
              </Box>

              {/* CONTENEDOR DE TEXTOS Y BOTÓN */}
              <Box sx={{ px: 1, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#0a0d15", fontSize: "1.1rem", mb: 0.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "2.4em" }}>
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
                    border: "none",
                    py: 1.2,
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    borderRadius: "8px",
                    boxShadow: product.stock <= 0 ? "none" : "0 4px 14px 0 rgba(0,0,0,0.15)",
                    transition: product.stock <= 0 ? "none" : "all 0.3s ease",
                    "&:hover": product.stock <= 0 ? { bgcolor: "#E5E7EB", color: "#9CA3AF", boxShadow: "none", transform: "none" } : { bgcolor: "#0a0d15", color: "white", boxShadow: "0 6px 20px rgba(10, 13, 21, 0.3)", transform: "translateY(-2px)" }
                  }}>
                  {product.stock <= 0 ? "Agotado" : "Añadir al carrito"}
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default function SearchPage() {
  return <SearchResults />;
}