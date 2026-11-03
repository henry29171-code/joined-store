"use client";
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Stack, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const blogPosts = [
  { title: "Cómo mantener tu morral de cuero", excerpt: "Descubre los secretos de limpieza para que dure años.", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&h=600&auto=format&fit=crop", date: "15 de Octubre, 2026" },
  { title: "5 combinaciones de relojes", excerpt: "Encuentra el reloj perfecto para cada ocasión.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&h=600&auto=format&fit=crop", date: "10 de Octubre, 2026" },
  { title: "El aroma correcto: Guía de perfumes", excerpt: "Te ayudamos a elegir tu firma olfativa ideal.", image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=800&h=600&auto=format&fit=crop", date: "05 de Octubre, 2026" },
];

export default function ComunidadPage() {
  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", pb: 10 }}>
      <Box sx={{ textAlign: "center", pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 6 }, px: 2 }}>
        <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700 }}>Únete al movimiento</Typography>
        <Typography variant="h3" sx={{ color: "#0a0d15", mt: 1, mb: 2, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>Comunidad Joined</Typography>
        <Typography sx={{ color: "#5E6B7E", maxWidth: 600, mx: "auto", fontSize: { xs: "0.95rem", md: "1.1rem" }, textAlign: { xs: "left", md: "center" } }}>
          Más que una tienda, somos un estilo de vida. Descubre consejos y accede a beneficios exclusivos.
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#0a0d15", borderRadius: 4, p: { xs: 3, md: 6 }, mb: 10, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-between", gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Chip label="Solo para miembros" sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white", fontWeight: 700, mb: 2 }} />
            <Typography variant="h4" sx={{ color: "white", fontWeight: 800, mb: 2, fontSize: { xs: "1.5rem", md: "2rem" } }}>Club Joined VIP</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3, fontSize: { xs: "0.9rem", md: "1rem" } }}>Obtén acceso anticipado a lanzamientos y beneficios únicos.</Typography>
            <Stack spacing={1}>
              {["Envíos gratis", "Acceso anticipado", "Limpieza de cuero anual"].map((benefit) => (
                <Stack key={benefit} direction="row" spacing={1.5} alignItems="center">
                  <CheckCircleIcon sx={{ color: "#4ADE80", fontSize: 20 }} />
                  <Typography sx={{ color: "white", opacity: 0.9, fontSize: { xs: "0.85rem", md: "1rem" } }}>{benefit}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
          <Button variant="contained" endIcon={<ArrowForwardIcon />} sx={{ bgcolor: "white", color: "#0a0d15", width: { xs: "100%", md: "auto" }, "&:hover": { bgcolor: "#F0F0F0" } }}>Quiero ser miembro</Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: "#0a0d15", fontSize: { xs: "1.5rem", md: "2rem" } }}>Estilo y Tendencias</Typography>
        </Box>

        <Grid container spacing={3}>
          {blogPosts.map((post, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4 }}>
                <CardMedia component="img" sx={{ height: 200, objectFit: "cover" }} image={post.image} alt={post.title} />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography sx={{ fontSize: "0.8rem", color: "#5E6B7E", mb: 1 }}>{post.date}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1rem", mb: 1 }}>{post.title}</Typography>
                  <Typography sx={{ color: "#5E6B7E", fontSize: "0.85rem" }}>{post.excerpt}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}