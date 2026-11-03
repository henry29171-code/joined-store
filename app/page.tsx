"use client";
import Link from "next/link";
import { Box, Container, Typography, Button, Stack, Grid, Card, CardContent, Chip } from "@mui/material";

const featuredProducts = [
  { name: "Morral Urban Explorer", price: "S/. 159.90", description: "Resistente al agua, compartimentos inteligentes y un diseño minimalista ideal para la ciudad.", badge: "Best Seller", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop" },
  { name: "Reloj Minimalist Classic", price: "S/. 289.00", description: "Malla de acero inoxidable, cristal de zafiro y un movimiento de precisión para un look elegante.", badge: "Premium", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop" },
  { name: "Perfume Dark Wood", price: "S/. 199.90", description: "Notas amaderadas y especiadas que dejan una huella sofisticada y duradera.", badge: "New Arrival", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop" },
];

export default function HomePage() {
  return (
    <Box sx={{ background: "transparent" }}>
      <Box sx={{ display: "flex", alignItems: "center", py: { xs: 6, md: 14 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2.5}>
                <Chip label="Joined Accessories" sx={{ width: "fit-content", fontWeight: 700, bgcolor: "rgba(20, 32, 56, 0.08)", color: "#1E2A3A" }} />
                
                {/* Título principal */}
                <Typography variant="h2" sx={{ color: "#142038", fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.8rem" }, lineHeight: 1.15 }}>
                  Eleva tu estilo con accesorios que hablan por ti.
                </Typography>

                <Typography sx={{ color: "rgba(20, 32, 56, 0.72)", fontSize: { xs: "0.95rem", md: "1.1rem" }, textAlign: { xs: "left", md: "justify" } }}>
                  Descubre nuestra colección de morrales, relojes, perfumes y más. Piezas seleccionadas para quienes valoran el diseño, la calidad y los detalles.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 2 }}>
                  <Button component={Link} href="/products" variant="contained" sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" } }}>Explorar Colección</Button>
                  <Button component={Link} href="/products" variant="outlined" sx={{ borderColor: "rgba(20, 32, 56, 0.2)", color: "#0a0d15" }}>Ver Novedades</Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ minHeight: { xs: 250, md: 500 }, borderRadius: 6, background: "#0a0d15", p: { xs: 3, md: 4 }, display: "flex", alignItems: "flex-end", position: "relative", overflow: "hidden" }}>
                <Box sx={{ position: "relative", zIndex: 2, color: "white" }}>
                  <Typography sx={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", mb: 1 }}>La esencia de la marca</Typography>
                  <Typography variant="h4" sx={{ fontSize: { xs: "1.3rem", md: "1.9rem" }, mb: 1.5, lineHeight: 1.3 }}>Diseñado para destacar en cada detalle.</Typography>
                  <Typography sx={{ fontSize: { xs: "0.85rem", md: "0.95rem" }, opacity: 0.8, textAlign: { xs: "left", md: "justify" } }}>Creemos que los accesorios adecuados transforman un outfit. Calidad, textura y durabilidad en una sola pieza.</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ pb: 8 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ color: "#142038", fontSize: { xs: "1.5rem", md: "2rem" } }}>Lo más buscado.</Typography>
            <Button component={Link} href="/products" sx={{ color: "#0a0d15", fontWeight: 700 }}>Ver todos los productos</Button>
          </Stack>
          <Grid container spacing={2}>
            {featuredProducts.map((product) => (
              <Grid key={product.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card elevation={0} sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4 }}>
                  <Box sx={{ height: 180, backgroundImage: `url(${product.image})`, backgroundSize: "cover", backgroundPosition: "center", p: 2 }}>
                    <Chip label={product.badge} size="small" sx={{ bgcolor: "white", fontWeight: 700 }} />
                  </Box>
                  <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 700 }}>{product.name}</Typography>
                    <Typography sx={{ fontSize: "0.85rem", mb: 2, flexGrow: 1 }}>{product.description}</Typography>
                    <Typography sx={{ fontWeight: 800, mb: 1 }}>{product.price}</Typography>
                    <Button variant="contained" fullWidth sx={{ bgcolor: "#0a0d15", fontSize: "0.85rem" }}>Comprar ahora</Button>
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