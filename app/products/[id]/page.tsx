"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Container, Typography, Box, Grid, Button, Chip, Stack, CircularProgress, Breadcrumbs, Link as MuiLink, Divider } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useCart } from "../../context/CartContext";
import { supabase } from "../../lib/supabase";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("Única");
  const [selectedColor, setSelectedColor] = useState("Negro");

  useEffect(() => {
    const fetchProductData = async () => {
      if (!params.id) return;
      setLoading(true);
      const { data: productData } = await supabase.from("products").select("*").eq("id", params.id).single();
      if (productData) {
        setProduct(productData);
        const { data: relatedData } = await supabase.from("products").select("*").eq("category", productData.category).neq("id", productData.id).limit(3);
        if (relatedData) setRelatedProducts(relatedData);
      }
      setLoading(false);
    };
    fetchProductData();
  }, [params.id]);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}><CircularProgress sx={{ color: "#4A5568" }} /></Box>;
  if (!product) return <Container maxWidth="md" sx={{ py: 15, textAlign: "center" }}><Typography variant="h4">Producto no encontrado</Typography></Container>;

  const specs = product.specifications || {
    material: "Cuero genuino / Acero inoxidable",
    dimensions: "Consultar medidas específicas",
    weight: "Variable según modelo",
    warranty: "1 año de garantía",
    origin: "Perú"
  };

  const handleComprarAhora = () => {
    addToCart({ ...product, image: product.image_url });
    router.push("/checkout");
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Migas de Pan Sutiles */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs separator="›" sx={{ fontSize: "0.8rem", color: "#999" }}>
          <MuiLink component={Link} href="/" underline="hover" color="inherit">Inicio</MuiLink>
          <MuiLink component={Link} href="/products" underline="hover" color="inherit">Colección</MuiLink>
          <MuiLink component={Link} href={`/products?category=${product.category}`} underline="hover" color="inherit">{product.category}</MuiLink>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
        
        {/* Imagen sobre Fondo Gris */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ width: "100%", bgcolor: "#F7F7F7", p: 0 }}>
            <Box component="img" src={product.image_url} alt={product.name} sx={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }} />
          </Box>
        </Grid>

        {/* Info del Producto */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 500, color: "#111", fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
              {product.name}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 400, color: "#333" }}>
              S/. {Number(product.price).toFixed(2)}
            </Typography>

            <Typography sx={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.6, pt: 2 }}>
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Selectores tipo Bellroy (Sutiles) */}
            <Box>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#111", mb: 1 }}>Tamaño</Typography>
              <Stack direction="row" spacing={1}>
                {["Única", "S", "M", "L"].map((size) => (
                  <Box 
                    key={size} onClick={() => setSelectedSize(size)}
                    sx={{ 
                      px: 2, py: 1, border: "1px solid", borderColor: selectedSize === size ? "#111" : "#DDD",
                      cursor: "pointer", fontSize: "0.85rem", fontWeight: selectedSize === size ? 600 : 400,
                      color: selectedSize === size ? "#111" : "#666", bgcolor: "transparent"
                    }}
                  >
                    {size}
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: "#111", mb: 1 }}>Color</Typography>
              <Stack direction="row" spacing={1}>
                {["Negro", "Marrón", "Azul"].map((color) => (
                  <Box 
                    key={color} onClick={() => setSelectedColor(color)}
                    sx={{ 
                      px: 2, py: 1, border: "1px solid", borderColor: selectedColor === color ? "#111" : "#DDD",
                      cursor: "pointer", fontSize: "0.85rem", fontWeight: selectedColor === color ? 600 : 400,
                      color: selectedColor === color ? "#111" : "#666", bgcolor: "transparent"
                    }}
                  >
                    {color}
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* BOTONES ESTILO BELLROY */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 3 }}>
              <Button 
                variant="contained" onClick={handleComprarAhora} fullWidth
                sx={{ bgcolor: "#4A5568", color: "white", py: 1.5, borderRadius: 0, fontWeight: 600, fontSize: "0.9rem", boxShadow: "none", "&:hover": { bgcolor: "#2D3748" } }}
              >
                Comprar ahora
              </Button>
              <Button 
                variant="outlined" onClick={() => addToCart({ ...product, image: product.image_url })} fullWidth
                sx={{ borderColor: "#111", color: "#111", py: 1.5, borderRadius: 0, fontWeight: 600, fontSize: "0.9rem", "&:hover": { bgcolor: "#F5F5F5", borderColor: "#111" } }}
              >
                Añadir a la cesta
              </Button>
            </Stack>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#666", mt: 2 }}>
              <LocalShippingIcon fontSize="small" />
              <Typography sx={{ fontSize: "0.8rem" }}>Envío gratis a todo el Perú (Miembros VIP)</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* Especificaciones al estilo Bellroy (Lista limpia) */}
      <Box sx={{ mt: 10, borderTop: "1px solid #EAEAEA", pt: 6 }}>
        <Typography variant="h6" sx={{ fontWeight: 500, color: "#111", mb: 4 }}>
          Características
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography sx={{ fontSize: "0.85rem", color: "#666", mb: 1 }}><strong>Material:</strong> {specs.material}</Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "#666", mb: 1 }}><strong>Dimensiones:</strong> {specs.dimensions}</Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "#666", mb: 1 }}><strong>Peso:</strong> {specs.weight}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography sx={{ fontSize: "0.85rem", color: "#666", mb: 1 }}><strong>Garantía:</strong> {specs.warranty}</Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "#666", mb: 1 }}><strong>Origen:</strong> {specs.origin}</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Relacionados (Mismo estilo limpio) */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 12, pt: 6, borderTop: "1px solid #EAEAEA" }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 400, color: "#111" }}>También te puede interesar</Typography>
          </Box>
          <Grid container spacing={3}>
            {relatedProducts.map((relProduct) => (
              <Grid key={relProduct.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ bgcolor: "transparent" }}>
                  <Box sx={{ bgcolor: "#F7F7F7", mb: 2, overflow: "hidden" }}>
                    <Link href={`/products/${relProduct.id}`} style={{ display: "block" }}>
                      <Box component="img" src={relProduct.image_url} alt={relProduct.name} sx={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", transition: "transform 0.3s", "&:hover": { transform: "scale(1.03)" } }} />
                    </Link>
                  </Box>
                  <Typography sx={{ fontSize: "1rem", fontWeight: 400, color: "#111", mb: 0.5 }}>{relProduct.name}</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>S/. {Number(relProduct.price).toFixed(2)}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}