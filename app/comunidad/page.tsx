"use client";
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Stack, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Datos del Blog con imágenes de Unsplash
const blogPosts = [
  {
    title: "Cómo mantener tu morral de cuero como nuevo",
    excerpt: "Descubre los secretos de limpieza y cuidado para que tu accesorio dure años.",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&h=600&auto=format&fit=crop",
    date: "15 de Octubre, 2026",
  },
  {
    title: "5 combinaciones de relojes para el día a día",
    excerpt: "Desde looks casuales hasta formales. Encuentra el reloj perfecto para cada ocasión.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&h=600&auto=format&fit=crop",
    date: "10 de Octubre, 2026",
  },
  {
    title: "El aroma correcto: Guía de perfumes",
    excerpt: "¿Amaderado, cítrico o floral? Te ayudamos a elegir tu firma olfativa ideal.",
    image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=800&h=600&auto=format&fit=crop",
    date: "05 de Octubre, 2026",
  },
];

export default function ComunidadPage() {
  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", pb: 10 }}>
      
      {/* 1. Encabezado */}
      <Box sx={{ textAlign: "center", pt: 10, pb: 6, px: 2 }}>
        <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em" }}>
          Únete al movimiento
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 800, color: "#0a0d15", mt: 1, mb: 2, fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
          Comunidad Joined
        </Typography>
        <Typography sx={{ color: "#5E6B7E", maxWidth: 600, mx: "auto", fontSize: "1.1rem" }}>
          Más que una tienda, somos un estilo de vida. Descubre consejos de moda, accede a beneficios exclusivos y conecta con personas que comparten tu pasión por los detalles.
        </Typography>
      </Box>

      <Container maxWidth="lg">
        
        {/* 2. Sección VIP / Suscripción */}
        <Box sx={{ 
          bgcolor: "#0a0d15", 
          borderRadius: 4, 
          p: { xs: 4, md: 6 }, 
          mb: 10,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          boxShadow: "0 20px 40px rgba(10,13,21,0.15)"
        }}>
          <Box sx={{ flex: 1 }}>
            <Chip label="Solo para miembros" sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white", fontWeight: 700, mb: 2 }} />
            <Typography variant="h3" sx={{ color: "white", fontWeight: 800, mb: 2, fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Club Joined VIP
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3, fontSize: "1.05rem" }}>
              Únete a nuestro programa de suscripción y eleva tu experiencia. Obtén acceso anticipado a lanzamientos y beneficios únicos.
            </Typography>
            
            {/* Lista de Beneficios Actualizada */}
            <Stack spacing={1.5}>
              {[
                "Envíos gratis en todas tus compras",
                "Acceso anticipado a nuevas colecciones",
                "Descuentos exclusivos para miembros",
                "Servicio de limpieza y mantenimiento de cuero (1 al mes)", // <-- Nuevo beneficio
                "Asesoría personalizada de estilo"
              ].map((benefit, index) => (
                <Stack key={index} direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleIcon sx={{ color: "#4ADE80", fontSize: 20 }} />
                  <Typography sx={{ color: "white", opacity: 0.9 }}>{benefit}</Typography>
                </Stack>
              ))}
            </Stack>
            
          </Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, width: "100%" }}>
            <Button 
              variant="contained" 
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                bgcolor: "white", 
                color: "#0a0d15", 
                fontWeight: 800, 
                px: 4, 
                py: 2,
                borderRadius: 999,
                "&:hover": { bgcolor: "#F0F0F0" }
              }}
            >
              Quiero ser miembro
            </Button>
          </Box>
        </Box>

        {/* 3. Sección del Blog */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Box>
            <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em" }}>
              Nuestro Blog
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mt: 1 }}>
              Estilo y Tendencias
            </Typography>
          </Box>
          <Button sx={{ color: "#0a0d15", fontWeight: 700, display: { xs: "none", sm: "block" } }}>
            Ver todos los artículos
          </Button>
        </Box>

        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Card sx={{ 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                borderRadius: 4, 
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-5px)" },
                overflow: "hidden"
              }}>
                <CardMedia
                  component="img"
                  sx={{ 
                    height: 220, 
                    objectFit: "cover",
                  }}
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontSize: "0.85rem", color: "#5E6B7E", fontWeight: 600, mb: 1 }}>
                    {post.date}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0a0d15", lineHeight: 1.3, mb: 1.5 }}>
                    {post.title}
                  </Typography>
                  <Typography sx={{ color: "#5E6B7E", fontSize: "0.95rem", flexGrow: 1 }}>
                    {post.excerpt}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
      </Container>
    </Box>
  );
}