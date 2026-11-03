"use client";
import { Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

export default function NosotrosPage() {
  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", pb: 10 }}>
      
      {/* 1. Encabezado Principal */}
      <Box sx={{ textAlign: "center", pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 8 }, px: 2 }}>
        <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em", fontSize: "0.85rem" }}>
          Nuestra historia
        </Typography>
        
        <Typography 
          variant="h3" 
          sx={{ 
            color: "#0a0d15", 
            mt: 1, 
            mb: 3, 
            fontSize: { xs: "1.8rem", md: "2.5rem" }, // Tamaño unificado para el título principal
            fontWeight: 800, 
            lineHeight: 1.2 
          }}
        >
          Diseñados para durar, creados con propósito
        </Typography>
        
        <Typography 
          sx={{ 
            color: "#5E6B7E", 
            maxWidth: 750, 
            mx: "auto", 
            fontSize: { xs: "0.95rem", md: "1.05rem" }, // Tamaño de texto estándar
            lineHeight: 1.7,
            textAlign: { xs: "left", md: "justify" } // Justificado en PC, izquierda en móvil para evitar huecos
          }}
        >
          Joined nace de una inconformidad con el mundo actual. Estamos cansados de la moda rápida y de la contaminación que genera el consumo desmedido. Decidimos crear una marca que ofrezca accesorios atemporales, resistentes y con un fuerte compromiso ético.
        </Typography>
      </Box>

      <Container maxWidth="lg">
        
        {/* 2. Sección de Filosofía (Imagen + Texto) */}
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box 
              component="img" 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop" 
              sx={{ 
                width: "100%", 
                height: { xs: 300, md: 450 }, 
                objectFit: "cover", 
                borderRadius: 4,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }} 
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: "#0a0d15", 
                mb: 3, 
                fontSize: { xs: "1.5rem", md: "1.8rem" }, // Un poco más pequeño que el título principal
                fontWeight: 800,
                lineHeight: 1.3
              }}
            >
              Contra la moda rápida, a favor de lo eterno
            </Typography>
            
            <Typography sx={{ color: "#5E6B7E", mb: 2, fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.7, textAlign: { xs: "left", md: "justify" } }}>
              No creemos en lo desechable. Creemos en piezas que envejecen bien. Al elegir materiales de alta calidad, garantizamos que cada producto soporte el paso del tiempo, reduciendo la necesidad de reemplazarlos.
            </Typography>
            
            <Typography sx={{ color: "#5E6B7E", fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.7, textAlign: { xs: "left", md: "justify" } }}>
              Asumimos una profunda responsabilidad social, trabajando de la mano con artesanos locales y garantizando condiciones laborales justas.
            </Typography>
          </Grid>
        </Grid>

        {/* 3. Los Pilares */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: "#0a0d15", 
              fontSize: { xs: "1.5rem", md: "1.8rem" }, // Mismo tamaño que el título de arriba
              fontWeight: 800 
            }}
          >
            Los pilares de Joined
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Pilar 1 */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: "100%", textAlign: "center", p: { xs: 2, md: 3 }, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <CardContent>
                <DiamondIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, fontSize: "1.1rem" }}>
                  Diseño atemporal
                </Typography>
                <Typography sx={{ color: "#5E6B7E", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Evitamos tendencias pasajeras. Nuestros diseños son funcionales y elegantes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pilar 2 */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: "100%", textAlign: "center", p: { xs: 2, md: 3 }, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <CardContent>
                <EnergySavingsLeafIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, fontSize: "1.1rem" }}>
                  Compromiso ambiental
                </Typography>
                <Typography sx={{ color: "#5E6B7E", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Promovemos el consumo consciente fabricando productos ultra duraderos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pilar 3 */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: "100%", textAlign: "center", p: { xs: 2, md: 3 }, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <CardContent>
                <VolunteerActivismIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, fontSize: "1.1rem" }}>
                  Responsabilidad social
                </Typography>
                <Typography sx={{ color: "#5E6B7E", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Apoyamos el talento local y fomentamos prácticas éticas en cada pieza.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}