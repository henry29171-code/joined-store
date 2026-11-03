"use client";
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Stack, Chip, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const blogPosts = [
  { title: "Cómo mantener tu morral de cuero", excerpt: "Descubre los secretos de limpieza para que dure años.", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&h=600&auto=format&fit=crop", date: "15 de octubre, 2026" },
  { title: "5 combinaciones de relojes", excerpt: "Encuentra el reloj perfecto para cada ocasión.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&h=600&auto=format&fit=crop", date: "10 de octubre, 2026" },
  { title: "El aroma correcto: guía de perfumes", excerpt: "Te ayudamos a elegir tu firma olfativa ideal.", image: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=800&h=600&auto=format&fit=crop", date: "5 de octubre, 2026" },
];

export default function ComunidadPage() {
  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", pb: 10 }}>
      <Box sx={{ textAlign: "center", pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 6 }, px: 2 }}>
        <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700 }}>Únete al movimiento</Typography>
        <Typography variant="h3" sx={{ color: "#0a0d15", mt: 1, mb: 2, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>Comunidad Joined</Typography>
        <Typography sx={{ color: "#5E6B7E", maxWidth: 600, mx: "auto", fontSize: { xs: "0.95rem", md: "1.1rem" }, textAlign: { xs: "left", md: "center" } }}>
          Elige el nivel de experiencia que mejor se adapte a ti. Desde beneficios gratuitos hasta un servicio de cuidado de lujo para tus accesorios.
        </Typography>
      </Box>

      <Container maxWidth="lg">
        {/* SECCIÓN DE 3 NIVELES (PRICING CARDS) */}
        <Grid container spacing={4} alignItems="stretch" sx={{ mb: 10 }}>
          
          {/* NIVEL 1: GRATIS */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4, border: "1px solid rgba(10,13,21,0.1)", boxShadow: "none" }}>
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#5E6B7E", mb: 1 }}>Miembro Joined</Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#0a0d15", mb: 2 }}>Gratis</Typography>
                <Typography sx={{ color: "#5E6B7E", fontSize: "0.9rem", mb: 3 }}>Solo por registrarte en la tienda.</Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2}>
                  {["Envíos gratis en Lima Metropolitana", "Seguimiento de pedido (tracking)", "Asesoría de vestimenta básica vía WhatsApp", "Acceso a guías de estilo (blog)"].map((item) => (
                    <Stack key={item} direction="row" spacing={1.5} alignItems="flex-start">
                      <CheckCircleIcon sx={{ color: "#5E6B7E", fontSize: 20, mt: 0.2 }} />
                      <Typography sx={{ color: "#0a0d15", fontSize: "0.9rem" }}>{item}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
              <Box sx={{ p: 4, pt: 0 }}>
                <Button fullWidth variant="outlined" sx={{ borderColor: "#0a0d15", color: "#0a0d15", fontWeight: 700, py: 1.2 }}>
                  Registrarse
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* NIVEL 2: PREMIUM */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4, border: "2px solid #0a0d15", position: "relative" }}>
              <Chip label="Recomendado" sx={{ position: "absolute", top: 16, right: 16, bgcolor: "#D7E0DA", color: "#0a0d15", fontWeight: 800 }} />
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#0a0d15", mb: 1 }}>Joined Premium</Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: "#0a0d15" }}>S/ 19</Typography>
                  <Typography sx={{ color: "#5E6B7E", ml: 1 }}>/ mes</Typography>
                </Box>
                <Typography sx={{ color: "#5E6B7E", fontSize: "0.9rem", mb: 3 }}>El equilibrio perfecto entre cuidado y estilo.</Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2}>
                  {["Todo lo del plan Miembro", "Limpieza de cuero (hasta 2 prendas al mes)", "Envíos gratis a todo el Perú", "10% de descuento en toda la tienda"].map((item) => (
                    <Stack key={item} direction="row" spacing={1.5} alignItems="flex-start">
                      <CheckCircleIcon sx={{ color: "#0a0d15", fontSize: 20, mt: 0.2 }} />
                      <Typography sx={{ color: "#0a0d15", fontSize: "0.9rem", fontWeight: 500 }}>{item}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
              <Box sx={{ p: 4, pt: 0 }}>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#0a0d15", color: "white", fontWeight: 700, py: 1.2 }}>
                  Suscribirme
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* NIVEL 3: ELITE (Destacado) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4, bgcolor: "#0a0d15", color: "white", boxShadow: "0 20px 40px rgba(10,13,21,0.2)" }}>
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <WorkspacePremiumIcon sx={{ color: "#D7E0DA" }} />
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#D7E0DA" }}>Joined Elite</Typography>
                </Stack>
                <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: "white" }}>S/ 49</Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.6)", ml: 1 }}>/ mes</Typography>
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", mb: 3 }}>La experiencia definitiva para tu colección.</Typography>
                <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.2)" }} />
                <Stack spacing={2}>
                  {["Todo lo del plan Premium", "Kit de limpieza premium a domicilio (mensual)", "20% de descuento en toda la tienda", "Acceso anticipado a ediciones limitadas"].map((item) => (
                    <Stack key={item} direction="row" spacing={1.5} alignItems="flex-start">
                      <StarIcon sx={{ color: "#4ADE80", fontSize: 20, mt: 0.2 }} />
                      <Typography sx={{ color: "white", fontSize: "0.9rem", fontWeight: 500 }}>{item}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
              <Box sx={{ p: 4, pt: 0 }}>
                <Button fullWidth variant="contained" sx={{ bgcolor: "white", color: "#0a0d15", fontWeight: 800, py: 1.2, "&:hover": { bgcolor: "#F0F0F0" } }}>
                  Hacerme Elite
                </Button>
              </Box>
            </Card>
          </Grid>

        </Grid>

        {/* Sección del Blog */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: "#0a0d15", fontSize: { xs: "1.5rem", md: "2rem" } }}>Estilo y tendencias</Typography>
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