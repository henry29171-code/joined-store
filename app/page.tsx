"use client";
import Link from "next/link";
import { Box, Container, Typography, Button, Stack, Grid, Card, CardContent, CardMedia, Chip, IconButton, SvgIcon } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function TikTokIcon(props: any) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </SvgIcon>
  );
}

const featuredProducts = [
  { id: "1", name: "Morral Urban Explorer", price: "S/. 159.90", description: "Resistente al agua y con un diseño minimalista ideal para la ciudad.", badge: "Best seller", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop" },
  { id: "2", name: "Reloj Minimalist Classic", price: "S/. 289.00", description: "Malla de acero inoxidable y movimiento de precisión para un look elegante.", badge: "Premium", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop" },
  { id: "3", name: "Perfume Dark Wood", price: "S/. 199.90", description: "Notas amaderadas y especiadas que dejan una huella sofisticada.", badge: "New arrival", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop" },
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
                <Chip label="Joined accesorios" sx={{ width: "fit-content", fontWeight: 700, bgcolor: "#F2F4F7", color: "#0a0d15" }} />
                
                <Typography variant="h2" sx={{ color: "#0a0d15", fontSize: { xs: "2.2rem", sm: "2.6rem", md: "3.2rem" }, lineHeight: 1.2, fontWeight: 800, maxWidth: 550 }}>
                  Eleva tu estilo con accesorios que hablan por ti
                </Typography>

                <Typography sx={{ color: "#5E6B7E", fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.7, maxWidth: 500 }}>
                  Explora nuestra colección de morrales, relojes y perfumes. Piezas seleccionadas para quienes valoran el diseño y la calidad.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
                  <Button component={Link} href="/products" variant="contained" sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, px: 4, py: 1.5 }}>
                    Explorar colección
                  </Button>
                  <Button component={Link} href="/comunidad" variant="outlined" sx={{ borderColor: "#0a0d15", color: "#0a0d15", px: 4, py: 1.5, "&:hover": { bgcolor: "#F5F5F5" } }}>
                    Unirme al club VIP
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            {/* Cuadrado del Hero - Gris Perla con Sombra */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  minHeight: { xs: 300, md: 450 }, 
                  borderRadius: 6, 
                  bgcolor: "#F0F2F5", // Gris perla (más visible que el anterior)
                  boxShadow: "0 20px 40px rgba(0,0,0,0.03)", // Sombra sutil
                  p: { xs: 4, md: 6 }, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <Box sx={{ position: "relative", zIndex: 2, maxWidth: 380, textAlign: "center" }}>
                  <Typography sx={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.2em", color: "#5E6B7E", mb: 2, fontWeight: 700 }}>
                    La esencia de la marca
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.3, mb: 2, fontSize: { xs: "1.5rem", md: "2rem" }, color: "#0a0d15" }}>
                    Diseñado para destacar en cada detalle
                  </Typography>
                  <Typography sx={{ color: "#5E6B7E", lineHeight: 1.6, fontSize: { xs: "0.9rem", md: "1rem" } }}>
                    Calidad, textura y durabilidad en una sola pieza.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. Productos Destacados */}
      <Box sx={{ pb: { xs: 8, md: 10 }, pt: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "flex-end" }} spacing={1} sx={{ mb: 4 }}>
            <Box>
              <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em", fontSize: "0.8rem" }}>Productos destacados</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mt: 0.5, fontSize: { xs: "1.6rem", md: "2rem" } }}>Lo más buscado</Typography>
            </Box>
            <Button component={Link} href="/products" variant="text" sx={{ textTransform: "none", fontWeight: 700, color: "#0a0d15", fontSize: "0.9rem" }}>Ver todos los productos</Button>
          </Stack>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {featuredProducts.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card elevation={0} sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4, overflow: "hidden", bgcolor: "#FFFFFF", border: "1px solid #EAEAEA", transition: "transform 0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" } }}>
                  
                  <Box sx={{ position: "relative" }}>
                    <Link href={`/products/${product.id}`} style={{ display: "block", width: "100%", textDecoration: "none" }}>
                      <CardMedia component="img" image={product.image} alt={product.name} sx={{ width: "100%", aspectRatio: "4/5", objectFit: "cover" }} />
                    </Link>
                    <Chip label={product.badge} sx={{ position: "absolute", top: 16, left: 16, bgcolor: "rgba(255,255,255,0.9)", color: "#0a0d15", fontWeight: 700, fontSize: "0.75rem", zIndex: 2 }} />
                  </Box>
                  
                  <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#0a0d15", fontSize: "1.1rem", mb: 1 }}>{product.name}</Typography>
                    <Typography sx={{ color: "#5E6B7E", fontSize: "0.9rem", lineHeight: 1.5, mb: 2, flexGrow: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{product.description}</Typography>
                    <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#0a0d15", mb: 2 }}>{product.price}</Typography>
                    
                    <Button component={Link} href={`/products/${product.id}`} variant="outlined" fullWidth sx={{ bgcolor: "white", color: "#0a0d15", borderColor: "#0a0d15", py: 1, fontSize: "0.9rem", transition: "all 0.3s", "&:hover": { bgcolor: "#0a0d15", color: "white", borderColor: "#0a0d15" } }}>
                      Comprar ahora
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 3. Explora por categorías */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "#FAFAFA", borderTop: "1px solid #EAEAEA", borderBottom: "1px solid #EAEAEA" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", fontSize: { xs: "1.6rem", md: "2rem" } }}>Explora por categorías</Typography>
          </Box>
          <Grid container spacing={3}>
            {[{name: "Morrales", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop"}, {name: "Relojes", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"}, {name: "Perfumes", img: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=600&auto=format&fit=crop"}].map((cat) => (
              <Grid key={cat.name} size={{ xs: 12, sm: 4 }}>
                <Link href={`/products?category=${encodeURIComponent(cat.name)}`} style={{ textDecoration: "none" }}>
                  <Box sx={{ height: 200, borderRadius: 4, overflow: "hidden", position: "relative", backgroundImage: `url(${cat.img})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s", "&:hover": { transform: "scale(1.02)" } }}>
                    <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(10, 13, 21, 0.3)" }} />
                    <Typography variant="h5" sx={{ color: "white", fontWeight: 800, zIndex: 2, letterSpacing: "0.05em" }}>{cat.name}</Typography>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. Nuestra promesa */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid size={{ xs: 12, md: 4 }}><DiamondIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} /><Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Calidad premium</Typography><Typography sx={{ color: "#5E6B7E", fontSize: "0.95rem" }}>Materiales seleccionados para resistir el paso del tiempo.</Typography></Grid>
            <Grid size={{ xs: 12, md: 4 }}><EnergySavingsLeafIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} /><Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Compromiso ambiental</Typography><Typography sx={{ color: "#5E6B7E", fontSize: "0.95rem" }}>Diseños atemporales que combaten el consumo desmedido.</Typography></Grid>
            <Grid size={{ xs: 12, md: 4 }}><WorkspacePremiumIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} /><Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Estilo excepcional</Typography><Typography sx={{ color: "#5E6B7E", fontSize: "0.95rem" }}>Piezas versátiles que elevan cualquier outfit en tu día a día.</Typography></Grid>
          </Grid>
        </Container>
      </Box>

      {/* 5. Banner VIP - Gris Perla */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              bgcolor: "#F0F2F5", // Gris perla
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              borderRadius: 6, 
              p: { xs: 4, md: 8 }, 
              display: "flex", 
              flexDirection: { xs: "column", md: "row" }, 
              alignItems: "center", 
              justifyContent: "space-between", 
              gap: 4 
            }}
          >
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h4" sx={{ color: "#0a0d15", fontWeight: 800, mb: 2, fontSize: { xs: "1.6rem", md: "2rem" } }}>
                Únete al club Joined VIP
              </Typography>
              <Typography sx={{ color: "#5E6B7E", fontSize: "1rem", lineHeight: 1.6 }}>
                Obtén envíos gratuitos a todo el Perú, servicio de limpieza de cuero y acceso anticipado a nuestras nuevas colecciones.
              </Typography>
            </Box>
            <Button 
              component={Link} href="/comunidad" variant="contained" size="large" endIcon={<ArrowForwardIcon />}
              sx={{ bgcolor: "#0a0d15", color: "white", fontWeight: 800, px: 5, py: 1.5, borderRadius: 999, flexShrink: 0, "&:hover": { bgcolor: "#1a1d24" } }}
            >
              Conocer beneficios
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 6. Redes sociales */}
      <Box sx={{ py: { xs: 6, md: 8 }, borderTop: "1px solid #EAEAEA" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#0a0d15", mb: 1 }}>Síguenos en nuestras redes sociales</Typography>
            <Typography sx={{ color: "#5E6B7E", mb: 3, fontSize: "0.95rem" }}>Descubre novedades, tips de estilo y contenido exclusivo de la marca.</Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <IconButton component="a" href="https://www.facebook.com/Joined.pe/" target="_blank" sx={{ bgcolor: "#0a0d15", color: "white", "&:hover": { bgcolor: "#1a1d24" } }}><FacebookIcon /></IconButton>
              <IconButton component="a" href="https://www.instagram.com/joinedperu" target="_blank" sx={{ bgcolor: "#0a0d15", color: "white", "&:hover": { bgcolor: "#1a1d24" } }}><InstagramIcon /></IconButton>
              <IconButton component="a" href="https://www.tiktok.com/@joined_pe" target="_blank" sx={{ bgcolor: "#0a0d15", color: "white", "&:hover": { bgcolor: "#1a1d24" } }}><TikTokIcon /></IconButton>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}