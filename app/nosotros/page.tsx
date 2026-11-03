"use client";
import { Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

export default function NosotrosPage() {
  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", pb: 10 }}>
      <Box sx={{ textAlign: "center", pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 8 }, px: 2 }}>
        <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700 }}>Nuestra Historia</Typography>
        <Typography variant="h3" sx={{ color: "#0a0d15", mt: 1, mb: 3, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
          Diseñados para durar, creados con propósito
        </Typography>
        <Typography sx={{ color: "#5E6B7E", maxWidth: 750, mx: "auto", fontSize: { xs: "0.95rem", md: "1.05rem" }, textAlign: { xs: "left", md: "justify" } }}>
          Joined nace de una inconformidad con el mundo actual. Estamos cansados de la moda rápida y de la contaminación que genera el consumo desmedido. Decidimos crear una marca que ofrezca accesorios atemporales, resistentes y con un fuerte compromiso ético.
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box component="img" src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop" sx={{ width: "100%", height: { xs: 250, md: 400 }, objectFit: "cover", borderRadius: 4 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ color: "#0a0d15", mb: 2, fontSize: { xs: "1.5rem", md: "2rem" } }}>
              Contra la moda rápida, a favor de lo eterno
            </Typography>
            <Typography sx={{ color: "#5E6B7E", mb: 2, fontSize: { xs: "0.95rem", md: "1.05rem" }, textAlign: { xs: "left", md: "justify" } }}>
              No creemos en lo desechable. Creemos en piezas que envejecen bien. Al elegir materiales de alta calidad, garantizamos que cada producto soporte el paso del tiempo, reduciendo la necesidad de reemplazarlos.
            </Typography>
            <Typography sx={{ color: "#5E6B7E", fontSize: { xs: "0.95rem", md: "1.05rem" }, textAlign: { xs: "left", md: "justify" } }}>
              Asumimos una profunda responsabilidad social, trabajando de la mano con artesanos locales y garantizando condiciones laborales justas.
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" sx={{ color: "#0a0d15", fontSize: { xs: "1.5rem", md: "2rem" } }}>Los pilares de Joined</Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            { icon: <DiamondIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} />, title: "Diseño Atemporal", text: "Evitamos tendencias pasajeras. Nuestros diseños son funcionales y elegantes." },
            { icon: <EnergySavingsLeafIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} />, title: "Compromiso Ambiental", text: "Promovemos el consumo consciente fabricando productos ultra duraderos." },
            { icon: <VolunteerActivismIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} />, title: "Responsabilidad Social", text: "Apoyamos el talento local y fomentamos prácticas éticas en cada pieza." }
          ].map((pilar) => (
            <Grid key={pilar.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: "100%", textAlign: "center", borderRadius: 4 }}>
                <CardContent>
                  {pilar.icon}
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontSize: "1.1rem" }}>{pilar.title}</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#5E6B7E" }}>{pilar.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}