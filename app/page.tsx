"use client";
import Link from "next/link";
import { Box, Container, Typography, Button, Stack, Grid, Card, CardContent, Chip } from "@mui/material";

const featuredProducts = [
  { name: "Morral Urban Explorer", price: "S/. 159.90", description: "Resistente al agua, compartimentos inteligentes y un diseño minimalista ideal para la ciudad.", badge: "Best Seller", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop" },
  { name: "Reloj Minimalist Classic", price: "S/. 289.00", description: "Malla de acero inoxidable, cristal de zafiro y un movimiento de precisión para un look elegante.", badge: "Premium", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop" },
  { name: "Perfume Dark Wood", price: "S/. 199.90", description: "Notas amaderadas y especiadas que dejan una huella sofisticada y duradera.", badge: "New Arrival", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop" },
];

const brandPoints = [
  { title: "Materiales de alta calidad", text: "Accesorios diseñados para durar, utilizando cuero genuino, acero inoxidable y textiles técnicos." },
  { title: "Diseño atemporal", text: "Piezas versátiles que combinan con cualquier estilo, desde lo casual hasta lo formal, sin pasar de moda." },
  { title: "Detalles que importan", text: "Cada correa, billetera o reloj está pensado para elevar tu día a día con funcionalidad y estilo." },
];

export default function HomePage() {
  return (
    <Box sx={{ background: "transparent" }}>
      {/* Hero Section */}
      <Box sx={{ minHeight: { xs: "auto", md: "78vh" }, display: "flex", alignItems: "center", py: { xs: 6, md: 14 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2.5}>
                <Chip label="Joined Accessories" sx={{ width: "fit-content", fontWeight: 700, bgcolor: "rgba(20, 32, 56, 0.08)", color: "#1E2A3A" }} />

                {/* Título adaptado para móvil */}
                <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.15, color: "#142038", fontSize: { xs: "2rem", sm: "2.5rem", md: "3.8rem" }, letterSpacing: "-0.02em" }}>
                  Eleva tu estilo con accesorios que hablan por ti.
                </Typography>

                <Typography sx={{ color: "rgba(20, 32, 56, 0.72)", fontWeight: 400, lineHeight: 1.6, fontSize: { xs: "0.95rem", md: "1.1rem" }, maxWidth: 540 }}>
                  Descubre nuestra colección de morrales, relojes, perfumes y más. Piezas seleccionadas para quienes valoran el diseño, la calidad y los detalles.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 2 }}>
                  <Button component={Link} href="/products" variant="contained" sx={{ px: 4, py: 1.5, borderRadius: 999, textTransform: "none", fontWeight: 700, bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" } }}>
                    Explorar Colección
                  </Button>
                  <Button component={Link} href="/products" variant="outlined" sx={{ px: 4, py: 1.5, borderRadius: 999, textTransform: "none", fontWeight: 700, borderColor: "rgba(20, 32, 56, 0.2)", color: "#0a0d15" }}>
                    Ver Novedades
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            {/* Tarjeta Oscura */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ minHeight: { xs: 280, md: 500 }, borderRadius: 6, background: "#0a0d15", boxShadow: "0 24px 60px rgba(25, 35, 52, 0.16)", position: "relative", overflow: "hidden", p: { xs: 3, md: 4 }, display: "flex", alignItems: "flex-end" }}>
                <Box sx={{ position: "absolute", top: 32, right: 32, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.08)", filter: "blur(8px)" }} />
                
                <Box sx={{ position: "relative", zIndex: 2, maxWidth: 340, color: "white" }}>
                  <Typography sx={{ fontSize: { xs: 10, md: 12 }, textTransform: "uppercase", letterSpacing: "0.18em", opacity: 0.8, mb: 1.5, fontWeight: 600 }}>
                    La esencia de la marca
                  </Typography>
                  {/* Título tarjeta oscura adaptado */}
                  <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 1.5, fontSize: { xs: "1.3rem", md: "1.9rem" } }}>
                    Diseñado para destacar en cada detalle.
                  </Typography>
                  <Typography sx={{ opacity: 0.86, lineHeight: 1.6, fontSize: { xs: "0.85rem", md: "0.95rem" } }}>
                    Creemos que los accesorios adecuados transforman un outfit. Calidad, textura y durabilidad en una sola pieza.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Productos Destacados */}
      <Box sx={{ pb: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "flex-end" }} spacing={1} sx={{ mb: 4 }}>
            <Box>
              <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em", fontSize: { xs: "0.75rem", md: "0.85rem" } }}>Productos Destacados</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#142038", mt: 0.5, fontSize: { xs: "1.6rem", md: "2rem" } }}>Lo más buscado.</Typography>
            </Box>
            <Button component={Link} href="/products" variant="text" sx={{ textTransform: "none", fontWeight: 700, color: "#0a0d15", fontSize: "0.9rem" }}>Ver todos los productos</Button>
          </Stack>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {featuredProducts.map((product) => (
              <Grid key={product.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card elevation={0} sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4, overflow: "hidden", bgcolor: "#FFFFFF", border: "1px solid rgba(20, 32, 56, 0.06)", boxShadow: "0 18px 40px rgba(25, 35, 52, 0.06)" }}>
                  <Box sx={{ height: { xs: 180, md: 220 }, backgroundImage: `url(${product.image})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative", display: "flex", p: 2 }}>
                    <Chip label={product.badge} sx={{ position: "relative", zIndex: 2, bgcolor: "rgba(255,255,255,0.88)", color: "#1E2A3A", fontWeight: 700, fontSize: "0.75rem" }} />
                  </Box>
                  <CardContent sx={{ p: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <Stack spacing={1} sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#142038", fontSize: "1.1rem" }}>{product.name}</Typography>
                      <Typography sx={{ color: "#5E6B7E", lineHeight: 1.5, fontSize: "0.9rem" }}>{product.description}</Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#142038", pt: 1 }}>{product.price}</Typography>
                      <Button component={Link} href="/products" variant="contained" sx={{ mt: 1, borderRadius: 999, textTransform: "none", fontWeight: 700, bgcolor: "#0a0d15", py: 1, "&:hover": { bgcolor: "#1a1d24" } }}>Comprar ahora</Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Brand Points */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "#F8F9FA" }}>
        <Container maxWidth="lg">
          <Stack spacing={1} sx={{ mb: 4 }}>
            <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em", fontSize: "0.75rem" }}>Por qué Joined</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#142038", lineHeight: 1.2, fontSize: { xs: "1.6rem", md: "2rem" } }}>Más que accesorios, una extensión de tu personalidad.</Typography>
          </Stack>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {brandPoints.map((point) => (
              <Grid key={point.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card elevation={0} sx={{ height: "100%", borderRadius: 4, bgcolor: "rgba(255,255,255,0.72)", border: "1px solid rgba(20, 32, 56, 0.06)", p: { xs: 2, md: 3 } }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#142038", mb: 1, fontSize: "1.1rem" }}>{point.title}</Typography>
                    <Typography sx={{ color: "#5E6B7E", lineHeight: 1.6, fontSize: "0.9rem" }}>{point.text}</Typography>
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