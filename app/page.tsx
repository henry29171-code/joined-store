"use client";
import Link from "next/link";
import { Box, Container, Typography, Button, Stack, Grid, Card, CardContent, Chip } from "@mui/material";

const featuredProducts = [
  { name: "Morral Urban Explorer", price: "S/. 159.90", description: "Resistente al agua y con un diseño minimalista ideal para la ciudad.", badge: "Best Seller", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop" },
  { name: "Reloj Minimalist Classic", price: "S/. 289.00", description: "Malla de acero inoxidable y movimiento de precisión para un look elegante.", badge: "Premium", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop" },
  { name: "Perfume Dark Wood", price: "S/. 199.90", description: "Notas amaderadas y especiadas que dejan una huella sofisticada.", badge: "New Arrival", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop" },
];

export default function HomePage() {
  return (
    <Box sx={{ background: "transparent" }}>
      
      {/* 1. Hero Section */}
      <Box sx={{ display: "flex", alignItems: "center", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                {/* RAE: Adjetivo/sustantivo común en minúscula */}
                <Chip label="Joined accesorios" sx={{ width: "fit-content", fontWeight: 700, bgcolor: "rgba(20, 32, 56, 0.08)", color: "#1E2A3A" }} />
                
                {/* Título ajustado: menor tamaño y más espacio para respirar */}
                <Typography 
                  variant="h2" 
                  sx={{ 
                    color: "#142038", 
                    fontSize: { xs: "2.2rem", sm: "2.6rem", md: "3.2rem" }, 
                    lineHeight: 1.2, 
                    fontWeight: 800,
                    maxWidth: 550 // Evita que se apriete demasiado
                  }}
                >
                  Eleva tu estilo con accesorios que hablan por ti.
                </Typography>

                {/* Párrafo más directo */}
                <Typography sx={{ color: "#5E6B7E", fontSize: { xs: "1rem", md: "1.05rem" }, lineHeight: 1.7, maxWidth: 500 }}>
                  Explora nuestra colección de morrales, relojes y perfumes. Piezas seleccionadas para quienes valoran el diseño y la calidad.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
                  <Button component={Link} href="/products" variant="contained" sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, px: 4, py: 1.5 }}>
                    Explorar colección
                  </Button>
                  <Button component={Link} href="/products" variant="outlined" sx={{ borderColor: "rgba(20, 32, 56, 0.2)", color: "#0a0d15", px: 4, py: 1.5 }}>
                    Ver novedades
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            {/* Cuadrado Negro */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  minHeight: { xs: 300, md: 450 }, 
                  borderRadius: 6, 
                  background: "linear-gradient(145deg, #0a0d15 0%, #1a1d24 100%)", 
                  boxShadow: "0 24px 60px rgba(10, 13, 21, 0.2)", 
                  position: "relative", 
                  overflow: "hidden", 
                  p: { xs: 4, md: 6 }, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center" 
                }}
              >
                <Box sx={{ position: "absolute", top: -50, right: -50, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />
                
                <Box sx={{ position: "relative", zIndex: 2, maxWidth: 380, color: "white", textAlign: "center" }}>
                  {/* RAE aplicada en el texto del cuadrado */}
                  <Typography sx={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.2em", opacity: 0.7, mb: 2, fontWeight: 600 }}>
                    La esencia de la marca
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.3, mb: 2, fontSize: { xs: "1.5rem", md: "2rem" } }}>
                    Diseñado para destacar en cada detalle
                  </Typography>
                  <Typography sx={{ opacity: 0.8, lineHeight: 1.6, fontSize: { xs: "0.9rem", md: "1rem" } }}>
                    Calidad, textura y durabilidad en una sola pieza.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. Productos Destacados */}
      <Box sx={{ pb: { xs: 8, md: 12 }, pt: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "flex-end" }} spacing={1} sx={{ mb: 4 }}>
            <Box>
              {/* RAE: Minúsculas en palabras comunes */}
              <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em", fontSize: "0.8rem" }}>Productos destacados</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#142038", mt: 0.5, fontSize: { xs: "1.6rem", md: "2rem" } }}>Lo más buscado</Typography>
            </Box>
            <Button component={Link} href="/products" variant="text" sx={{ textTransform: "none", fontWeight: 700, color: "#0a0d15", fontSize: "0.9rem" }}>Ver todos los productos</Button>
          </Stack>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {featuredProducts.map((product) => (
              <Grid key={product.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card elevation={0} sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4, overflow: "hidden", bgcolor: "#FFFFFF", border: "1px solid rgba(20, 32, 56, 0.06)", transition: "transform 0.3s", "&:hover": { transform: "translateY(-5px)" } }}>
                  
                  <Box sx={{ height: 220, backgroundImage: `url(${product.image})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative", p: 2 }}>
                    <Chip label={product.badge} sx={{ bgcolor: "rgba(255,255,255,0.9)", color: "#1E2A3A", fontWeight: 700, fontSize: "0.75rem" }} />
                  </Box>
                  
                  <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#142038", fontSize: "1.1rem", mb: 1 }}>
                      {product.name}
                    </Typography>
                    
                    <Typography sx={{ color: "#5E6B7E", fontSize: "0.9rem", lineHeight: 1.5, mb: 2, flexGrow: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {product.description}
                    </Typography>
                    
                    <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#142038", mb: 2 }}>
                      {product.price}
                    </Typography>
                    
                    <Button component={Link} href="/products" variant="contained" fullWidth sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, py: 1, fontSize: "0.9rem" }}>
                      Comprar ahora
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
    </Box>
  );
}