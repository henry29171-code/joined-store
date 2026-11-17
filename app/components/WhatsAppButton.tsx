"use client";
import { Box, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function WhatsAppButton() {
  const phoneNumber = "51904192047"; // Tu número de contacto
  const message = "Hola Joined, vengo de la web y quisiera hacer una consulta.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Box
      sx={{
        position: "fixed",
        // En móviles (xs) se sube para no tapar el botón de añadir al carrito
        // En computadoras (md) vuelve a su posición normal
        bottom: { xs: 90, md: 24 }, 
        right: { xs: 16, md: 24 },
        zIndex: 1100,
        transition: "all 0.3s ease",
      }}
    >
      <IconButton
        component="a"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          bgcolor: "#0a0d15", // <-- Azul Noche de la marca
          color: "white",
          width: 56,
          height: 56,
          boxShadow: "0 4px 14px rgba(10, 13, 21, 0.3)", // Sombra sutil azul noche
          "&:hover": {
            bgcolor: "#1a1d24", // Un tono ligeramente más claro al pasar el cursor
            transform: "scale(1.05)",
          },
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
}