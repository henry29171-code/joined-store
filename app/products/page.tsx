"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Container, Typography, Box, Grid, Button, Chip, Stack, Card, CardContent, CardMedia } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useCart } from "../../context/CartContext";

// Datos de prueba (deben coincidir con los de Supabase por ahora)
const mockProducts = [
  { id: "1", name: "Morral Urban Explorer", price: 159.90, category: "Morrales", description: "Resistente al agua, compartimentos inteligentes para organizar tus cosas. Diseño minimalista y elegante.", image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop" },
  { id: "2", name: "Reloj Minimalist Classic", price: 289.00, category: "Relojes", description: "Malla de acero inoxidable, cristal de zafiro y un movimiento de precisión. Un accesorio que nunca pasa de moda.", image_url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop" },
  { id: "3", name: "Perfume Dark Wood", price: 199.90, category: "Perfumes", description: "Notas amaderadas y especiadas que dejan una huella sofisticada y duradera. Ideal para el día a día o la noche.", image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const product = mockProducts.find((p) => p.id === params.id);
  const relatedProducts = mockProducts.filter(p => p.id !== params.id);

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 15, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Producto no encontrado</Typography>
        <Typography sx={{ color: "#5E6B7E", mb: 4 }}>El producto que buscas no existe o ha sido removido.</Typography>
        <Button component={Link} href="/products" variant="contained" sx={{ bgcolor: "#0a0d15" }}>Volver a la colección</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Box sx={{ mb: 4 }}>
        <Button onClick={() => router.back()} startIcon={<ArrowBackIcon />} sx={{ color: "#5E6B7E", textTransform: "none", fontWeight: 600, "&:hover": { color: "#0a0d15" } }}>
          Volver a la colección
        </Button>
      </Box>

      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
        
        {/* Imagen del producto - Ajustada */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box 
            sx={{ 
              position: "relative",
              width: "100%", 
              maxWidth: 500, 
              mx: "auto", 
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
          >
            <Box 
              component="img"
              src={product.image_url}
              alt={product.name}
              sx={{ 
                width: "100%", 
                aspectRatio: "4/5", 
                objectFit: "cover", 
                display: "block"
              }}
            />
          </Box>
        </Grid>

        {/* Información del producto */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Chip label={product.category} sx={{ width: "fit-content", bgcolor: "#F8F9FA", fontWeight: 700, color: "#0a0d15" }} />
            
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#0a0d15", fontSize: { xs: "2rem", md: "2.8rem" }, lineHeight: 1.1 }}>
              {product.name}
            </Typography>

            {/* PRECIO EN SOLES */}
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15" }}>
              S/. {product.price.toFixed(2)}
            </Typography>

            <Typography sx={{ color: "#5E6B7E", fontSize: "1.05rem", lineHeight: 1.7 }}>
              {product.description}
            </Typography>

            <Box sx={{ py: 2 }}>
              {/* BOTÓN BLANCO CON BORDE NEGRO */}
              <Button 
                variant="outlined" 
                size="large"
                startIcon={<ShoppingBagIcon />} 
                onClick={() => addToCart({ ...product, image: product.image_url })} 
                fullWidth
                sx={{ 
                  bgcolor: "white", 
                  color: "#0a0d15", 
                  borderColor: "#0a0d15", 
                  py: 2, 
                  fontSize: "1.1rem",
                  borderRadius: 999,
                  fontWeight: 700,
                  transition: "all 0.3s",
                  "&:hover": { bgcolor: "#0a0d15", color: "white", borderColor: "#0a0d15" } 
                }}
              >
                Añadir al carrito
              </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#5E6B7E", mt: 2 }}>
              <LocalShippingIcon />
              <Typography sx={{ fontSize: "0.9rem" }}>Envío gratis a todo el Perú (Miembros VIP)</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* Sección de productos relacionados */}
      <Box sx={{ mt: 12, pt: 6, borderTop: "1px solid rgba(10, 13, 21, 0.05)" }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          {/* TEXTOS EN ESPAÑOL */}
          <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em" }}>Productos relacionados</Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#142038", mt: 0.5 }}>También te puede interesar</Typography>
        </Box>

        <Grid container spacing={3}>
          {relatedProducts.map((relProduct) => (
            <Grid key={relProduct.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card elevation={0} sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4, overflow: "hidden", bgcolor: "#FFFFFF", border: "1px solid rgba(20, 32, 56, 0.06)", transition: "transform 0.3s", "&:hover": { transform: "translateY(-5px)" } }}>
                <Link href={`/products/${relProduct.id}`} style={{ display: "block", overflow: "hidden" }}>
                  <CardMedia 
                    component="img" 
                    image={relProduct.image_url} 
                    alt={relProduct.name} 
                    sx={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", transition: "transform 0.4s ease", "&:hover": { transform: "scale(1.05)" } }} 
                  />
                </Link>
                <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#142038", fontSize: "1.1rem", mb: 1 }}>{relProduct.name}</Typography>
                  <Typography sx={{ color: "#5E6B7E", fontSize: "0.9rem", lineHeight: 1.5, mb: 2, flexGrow: 1 }}>{relProduct.description}</Typography>
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#142038", mb: 2 }}>S/. {relProduct.price.toFixed(2)}</Typography>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    onClick={() => addToCart({ ...relProduct, image: relProduct.image_url })} 
                    sx={{ bgcolor: "white", color: "#0a0d15", borderColor: "#0a0d15", py: 1, fontSize: "0.9rem", transition: "all 0.3s", "&:hover": { bgcolor: "#0a0d15", color: "white", borderColor: "#0a0d15" } }}
                  >
                    Añadir al carrito
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}