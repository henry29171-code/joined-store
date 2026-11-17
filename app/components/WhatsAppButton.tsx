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
        // En móviles (xs), lo subimos a 90px para que no choque con la barra de compra
        // En computadoras (md), vuelve a su posición normal de 24px
        bottom: { xs: 90, md: 24 }, 
        right: { xs: 16, md: 24 },
        zIndex: 1100, // Nos aseguramos de que esté por encima de todo
        transition: "all 0.3s ease",
      }}
    >
      <IconButton
        component="a"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          bgcolor: "#25D366", // Color oficial de WhatsApp
          color: "white",
          width: 56,
          height: 56,
          boxShadow: "0 4px 14px rgba(37, 211, 102, 0.4)",
          "&:hover": {
            bgcolor: "#1EBE5D",
            transform: "scale(1.05)",
          },
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
}