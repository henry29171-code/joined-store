import Link from "next/link";
import { Box, Container, Typography, Grid, IconButton, Stack, Divider, SvgIcon, SvgIconProps } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Componente personalizado para el ícono de TikTok (con su tipo corregido)
function TikTokIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </SvgIcon>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: { xs: 6, md: 8 },
        bgcolor: "#0a0d15",
        color: "#F8FAF8",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          
          {/* Columna 1: Marca */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.02em" }}>
              Joined | Accesorios de cuero
            </Typography>
            <Typography sx={{ opacity: 0.7, lineHeight: 1.6, mb: 3, maxWidth: 300 }}>
              Accesorios premium diseñados para elevar tu estilo diario, calidad, diseño y durabilidad en cada pieza.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton component="a" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" sx={{ color: "white", "&:hover": { color: "#4267B2" } }} aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton component="a" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" sx={{ color: "white", "&:hover": { color: "#E1306C" } }} aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton component="a" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" sx={{ color: "white", "&:hover": { color: "#00f2ea" } }} aria-label="TikTok">
                <TikTokIcon />
              </IconButton>
              <IconButton component="a" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" sx={{ color: "white", "&:hover": { color: "#FF0000" } }} aria-label="YouTube">
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Columna 2: Enlaces Legales */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Información Legal
            </Typography>
            <Stack spacing={1.5}>
              <Link href="/libro-de-reclamaciones" style={{ color: "#F8FAF8", opacity: 0.7, textDecoration: "none" }}>
                Libro de Reclamaciones
              </Link>
              <Link href="/politicas-de-privacidad" style={{ color: "#F8FAF8", opacity: 0.7, textDecoration: "none" }}>
                Políticas de Privacidad
              </Link>
              <Link href="/terminos-y-condiciones" style={{ color: "#F8FAF8", opacity: 0.7, textDecoration: "none" }}>
                Términos y Condiciones
              </Link>
              <Link href="/politicas-de-devolucion" style={{ color: "#F8FAF8", opacity: 0.7, textDecoration: "none" }}>
                Políticas de Devolución
              </Link>
            </Stack>
          </Grid>

          {/* Columna 3: Contacto */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Atención al Cliente
            </Typography>
            <Stack spacing={1.5} sx={{ opacity: 0.7 }}>
              <Typography>Email: ventas@joined.pe</Typography>
              <Typography>Teléfono: +51 904 192 047</Typography>
              <Typography>Lima, Perú</Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

        <Typography sx={{ textAlign: "center", opacity: 0.5, fontSize: "0.875rem" }}>
          © {year} Joined. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}