"use client";
import { Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

export default function NosotrosPage() {
  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", pb: 10 }}>
      
      {/* 1. Encabezado Principal */}
      <Box sx={{ textAlign: "center", pt: 10, pb: 8, px: 2 }}>
        <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em" }}>
          Nuestra Historia
        </Typography>
        <Typography 
          variant="h4" // <-- Cambiado de h3 a h4
          sx={{ 
            fontWeight: 800, 
            color: "#0a0d15", 
            mt: 1, 
            mb: 3, 
            fontSize: { xs: "1.8rem", md: "2rem" }, // <-- Mismo tamaño que los otros títulos
            lineHeight: 1.2 
          }}
        >
          Diseñados para durar, <br /> creados con propósito.
        </Typography>
        <Typography 
          sx={{ 
            color: "#5E6B7E", 
            maxWidth: 800, 
            mx: "auto", 
            fontSize: "1.05rem", 
            lineHeight: 1.8,
            textAlign: "justify"
          }}
        >
          Joined nace de una inconformidad con el mundo actual, estamos cansados de la moda rápida, de los productos que se rompen en meses y de la contaminación que genera el consumo desmedido. Decidimos crear una marca que vaya en contra de esa corriente, ofreciendo accesorios atemporales, resistentes y con un fuerte compromiso ético.
        </Typography>
      </Box>

      <Container maxWidth="lg">
        
        {/* 2. Sección de Filosofía */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box 
              component="img"
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"
              alt="Artesano trabajando el cuero"
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
              sx={{ fontWeight: 800, color: "#0a0d15", mb: 3, fontSize: { xs: "1.8rem", md: "2rem" } }}
            >
              Contra la moda rápida a favor de lo eterno.
            </Typography>
            <Typography 
              sx={{ color: "#5E6B7E", mb: 2, fontSize: "1.05rem", lineHeight: 1.8, textAlign: "justify" }}
            >
              No creemos en lo desechable, creemos en piezas que envejecen bien, que cuentan una historia y que se convierten en parte de tu día a día por años. Al elegir materiales de la más alta calidad, garantizamos que cada morral, billetera o correa soporte el paso del tiempo, reduciendo drásticamente la necesidad de reemplazarlos y por ende, disminuyendo la contaminación y el desperdicio.
            </Typography>
            <Typography 
              sx={{ color: "#5E6B7E", mb: 4, fontSize: "1.05rem", lineHeight: 1.8, textAlign: "justify" }}
            >
              Pero nuestro compromiso no termina en el producto, como marca; asumimos una profunda responsabilidad social. Trabajamos de la mano con artesanos locales, garantizando condiciones laborales justas y apoyando el talento de nuestra comunidad. 
            </Typography>
            <Box sx={{ p: 3, borderLeft: "4px solid #0a0d15", bgcolor: "white", borderRadius: "0 8px 8px 0" }}>
              <Typography sx={{ fontStyle: "italic", color: "#0a0d15", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.8, textAlign: "justify" }}>
                "Un accesorio Joined no es una compra impulsiva; es una inversión en calidad, ética y diseño atemporal."
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* 3. Los Pilares */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography 
            variant="h4" 
            sx={{ fontWeight: 800, color: "#0a0d15", fontSize: { xs: "1.8rem", md: "2rem" } }} 
          >
            Los pilares de la marca
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Pilar 1 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", textAlign: "center", p: 3, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <CardContent>
                <DiamondIcon sx={{ fontSize: 50, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: "#0a0d15", fontSize: "1.2rem" }}>
                  Diseño Atemporal
                </Typography>
                <Typography sx={{ color: "#5E6B7E", fontSize: "1.05rem", lineHeight: 1.7, textAlign: "justify" }}>
                  Evitamos las tendencias pasajeras, nuestros diseños son limpios, funcionales y elegantes, pensados para durar y combinar con cualquier estilo de vida.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pilar 2 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", textAlign: "center", p: 3, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <CardContent>
                <EnergySavingsLeafIcon sx={{ fontSize: 50, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: "#0a0d15", fontSize: "1.2rem" }}>
                  Compromiso Ambiental
                </Typography>
                <Typography sx={{ color: "#5E6B7E", fontSize: "1.05rem", lineHeight: 1.7, textAlign: "justify" }}>
                  Luchamos contra la contaminación promoviendo el consumo consciente, al fabricar productos ultra duraderos, reducimos la huella de carbono y el desperdicio del fast fashion.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pilar 3 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", textAlign: "center", p: 3, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <CardContent>
                <VolunteerActivismIcon sx={{ fontSize: 50, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: "#0a0d15", fontSize: "1.2rem" }}>
                  Responsabilidad Social
                </Typography>
                <Typography sx={{ color: "#5E6B7E", fontSize: "1.05rem", lineHeight: 1.7, textAlign: "justify" }}>
                  Generamos un impacto positivo, apoyamos el trabajo de artesanos locales, fomentamos prácticas éticas y nos aseguramos de que cada pieza sea creada respetando a las personas.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}