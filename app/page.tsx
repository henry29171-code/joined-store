"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Container, Typography, Button, Stack, Grid, Chip, IconButton, SvgIcon, CircularProgress } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { supabase } from "@/app/lib/supabase";

function TikTokIcon(props: any) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </SvgIcon>
  );
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase.from("products").select("*").limit(3);
      if (!error && data) {
        setFeaturedProducts(data);
      }
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  return (
    <Box sx={{ background: "transparent" }}>
      
      {/* 1. Hero Section */}
      <Box sx={{ display: "flex", alignItems: "center", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Chip label="Joined accesorios" sx={{ width: "fit-content", fontWeight: 700, bgcolor: "#F3F4F6", color: "#0a0d15" }} />
                
                <Typography variant="h2" sx={{ color: "#0a0d15", fontSize: { xs: "2.2rem", sm: "2.6rem", md: "3.2rem" }, lineHeight: 1.2, fontWeight: 500, letterSpacing: "-0.02em", maxWidth: 550 }}>
                  Eleva tu estilo con accesorios que hablan por ti
                </Typography>

                <Typography sx={{ color: "#666", fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.7, maxWidth: 500 }}>
                  Explora nuestra colección de morrales, relojes y perfumes. Piezas seleccionadas para quienes valoran el diseño y la calidad.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
                  <Button component={Link} href="/products" variant="contained" disableElevation sx={{ bgcolor: "#0a0d15", color: "white", "&:hover": { bgcolor: "#1a1d24" }, px: 4, py: 1.5, borderRadius: "8px", fontWeight: 600 }}>
                    Explorar colección
                  </Button>
                  <Button component={Link} href="/comunidad" variant="outlined" sx={{ borderColor: "#0a0d15", color: "#0a0d15", px: 4, py: 1.5, borderRadius: "8px", fontWeight: 600, "&:hover": { bgcolor: "#F9FAFB" } }}>
                    Unirme al club VIP
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box 
                sx={{ 
                  minHeight: { xs: 300, md: 450 }, 
                  borderRadius: "16px", 
                  background: "radial-gradient(circle at 30% 30%, #1a1d24 0%, #0a0d15 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 20px 40px rgba(10, 13, 21, 0.2)",
                  p: { xs: 4, md: 6 }, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <Box sx={{ position: "relative", zIndex: 2, maxWidth: 380, textAlign: "center" }}>
                  <Typography sx={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.2em", color: "#9CA3AF", mb: 2, fontWeight: 600 }}>
                    La esencia de la marca
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600, lineHeight: 1.3, mb: 2, fontSize: { xs: "1.5rem", md: "2rem" }, color: "white" }}>
                    Diseñado para destacar en cada detalle
                  </Typography>
                  <Typography sx={{ color: "#D1D5DB", lineHeight: 1.6, fontSize: { xs: "0.9rem", md: "1rem" } }}>
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
              <Typography variant="overline" sx={{ color: "#666", fontWeight: 600, letterSpacing: "0.16em", fontSize: "0.8rem" }}>Productos destacados</Typography>
              <Typography variant="h4" sx={{ fontWeight: 500, color: "#0a0d15", mt: 0.5, fontSize: { xs: "1.6rem", md: "2rem" } }}>Lo más buscado</Typography>
            </Box>
            <Button component={Link} href="/products" variant="text" sx={{ textTransform: "none", fontWeight: 600, color: "#0a0d15", fontSize: "0.9rem" }}>Ver todos los productos</Button>
          </Stack>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
              <CircularProgress sx={{ color: "#0a0d15" }} />
            </Box>
          ) : (
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {featuredProducts.map((product) => (
                /* AQUI ESTA EL TRUCO: display flex en el Grid para igualar alturas */
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", width: "100%", bgcolor: "transparent" }}>
                    
                    {/* CONTENEDOR DE IMAGEN */}
                    <Box sx={{ position: "relative", overflow: "hidden", mb: 2, width: "100%", aspectRatio: "4/5" }}>
                      <Link href={`/products/${product.id}`} style={{ display: "block", width: "100%", textDecoration: "none" }}>
                        <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 600px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "center" }} />
                      </Link>
                    </Box>
                    
                    {/* CONTENEDOR DE TEXTO: flexGrow 1 empuja el botón hacia abajo */}
                    <Box sx={{ px: 1, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600, 
                            color: "#0a0d15", 
                            fontSize: "1.1rem", 
                            mb: 0.5,
                            display: "-webkit-box", 
                            WebkitLineClamp: 2, 
                            WebkitBoxOrient: "vertical", 
                            overflow: "hidden",
                            minHeight: "2.4em" // Reserva espacio para 2 líneas siempre
                          }}
                        >
                          {product.name}
                        </Typography>
                        
                        <Typography sx={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.5, mb: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {product.description}
                        </Typography>
                        
                        <Typography sx={{ fontSize: "1rem", fontWeight: 500, color: "#333", mb: 2 }}>
                          S/. {Number(product.price).toFixed(2)}
                        </Typography>
                      </Box>
                      
                      {/* BOTÓN */}
                      <Button component={Link} href={`/products/${product.id}`} variant="contained" fullWidth disableElevation disabled={product.stock <= 0} sx={{ bgcolor: product.stock <= 0 ? "#E5E7EB" : "#B0B3B8", color: product.stock <= 0 ? "#9CA3AF" : "#111827", py: 1.2, fontSize: "0.9rem", fontWeight: 700, borderRadius: "8px", boxShadow: product.stock <= 0 ? "none" : "0 4px 14px 0 rgba(0,0,0,0.15)", transition: product.stock <= 0 ? "none" : "all 0.3s ease", "&:hover": product.stock <= 0 ? { bgcolor: "#E5E7EB", color: "#9CA3AF", boxShadow: "none" } : { bgcolor: "#0a0d15", color: "white", boxShadow: "0 6px 20px rgba(10, 13, 21, 0.3)", transform: "translateY(-2px)" } }}>
                        {product.stock <= 0 ? "Agotado" : "Comprar ahora"}
                      </Button>
                    </Box>

                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* 3. Explora por categorías */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "#FAFAFA", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 500, color: "#0a0d15", fontSize: { xs: "1.6rem", md: "2rem" } }}>Explora por categorías</Typography>
          </Box>
          <Grid container spacing={3}>
            {[{name: "Morrales", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop"}, {name: "Relojes", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"}, {name: "Perfumes", img: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=600&auto=format&fit=crop"}].map((cat) => (
              <Grid key={cat.name} size={{ xs: 12, sm: 4 }}>
                <Link href={`/products?category=${encodeURIComponent(cat.name)}`} style={{ textDecoration: "none" }}>
                  <Box sx={{ height: 200, borderRadius: "12px", overflow: "hidden", position: "relative", backgroundImage: `url(${cat.img})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s", "&:hover": { transform: "scale(1.02)" }, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}>
                    <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(10, 13, 21, 0.4)" }} />
                    <Typography variant="h5" sx={{ color: "white", fontWeight: 600, zIndex: 2, letterSpacing: "0.05em" }}>{cat.name}</Typography>
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
            <Grid size={{ xs: 12, md: 4 }}><DiamondIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} /><Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#0a0d15" }}>Calidad premium</Typography><Typography sx={{ color: "#666", fontSize: "0.95rem" }}>Materiales seleccionados para resistir el paso del tiempo.</Typography></Grid>
            <Grid size={{ xs: 12, md: 4 }}><EnergySavingsLeafIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} /><Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#0a0d15" }}>Compromiso ambiental</Typography><Typography sx={{ color: "#666", fontSize: "0.95rem" }}>Diseños atemporales que combaten el consumo desmedido.</Typography></Grid>
            <Grid size={{ xs: 12, md: 4 }}><WorkspacePremiumIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 2 }} /><Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#0a0d15" }}>Estilo excepcional</Typography><Typography sx={{ color: "#666", fontSize: "0.95rem" }}>Piezas versátiles que elevan cualquier outfit en tu día a día.</Typography></Grid>
          </Grid>
        </Container>
      </Box>

      {/* 5. Banner VIP (Mismo gris de los botones #B0B3B8) */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            bgcolor: "#B0B3B8", 
            borderRadius: "16px", 
            boxShadow: "0 15px 35px rgba(0,0,0,0.15), inset 0 -5px 0 rgba(0,0,0,0.1)", 
            p: { xs: 4, md: 8 }, 
            display: "flex", 
            flexDirection: { xs: "column", md: "row" }, 
            alignItems: "center", 
            justifyContent: "space-between", 
            gap: 4 
          }}>
            <Box sx={{ maxWidth: 600 }}>
              <Typography variant="h4" sx={{ color: "#0a0d15", fontWeight: 700, mb: 2, fontSize: { xs: "1.6rem", md: "2rem" } }}>Únete al club Joined VIP</Typography>
              <Typography sx={{ color: "#374151", fontSize: "1rem", lineHeight: 1.6, fontWeight: 500 }}>Obtén envíos gratuitos a todo el Perú, servicio de limpieza de cuero y acceso anticipado a nuestras nuevas colecciones.</Typography>
            </Box>
            <Button component={Link} href="/comunidad" variant="contained" size="large" endIcon={<ArrowForwardIcon />} disableElevation sx={{ bgcolor: "#0a0d15", color: "white", fontWeight: 600, px: 5, py: 1.5, borderRadius: "8px", flexShrink: 0, boxShadow: "0 4px 14px 0 rgba(10, 13, 21, 0.3)", "&:hover": { bgcolor: "#1a1d24", transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(10, 13, 21, 0.5)" } }}>
              Conocer beneficios
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 6. Redes sociales */}
      <Box sx={{ py: { xs: 6, md: 8 }, borderTop: "1px solid #E5E7EB" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#0a0d15", mb: 1 }}>Síguenos en nuestras redes sociales</Typography>
            <Typography sx={{ color: "#666", mb: 3, fontSize: "0.95rem" }}>Descubre novedades, tips de estilo y contenido exclusivo de la marca.</Typography>
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