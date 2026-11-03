"use client";
import { Fab, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function WhatsAppButton() {
  const phoneNumber = "51904192047"; // Tu número con código de país
  const message = "Hola Joined, estoy en su página web y me gustaría recibir más información sobre sus productos.";
  
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Tooltip title="¿Necesitas ayuda? Escríbenos" placement="left" arrow>
      <Fab
        aria-label="whatsapp"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: 30 },
          right: { xs: 20, md: 30 },
          bgcolor: "#0a0d15", // Color de tu marca
          color: "white",
          zIndex: 9999,
          width: { xs: 56, md: 64 },
          height: { xs: 56, md: 64 },
          boxShadow: "0 10px 25px rgba(10, 13, 21, 0.4)",
          transition: "all 0.3s ease",
          border: "1px solid rgba(255,255,255,0.1)", 
          "&:hover": {
            bgcolor: "#1a1d24",
            transform: "scale(1.1) translateY(-5px)",
            boxShadow: "0 15px 30px rgba(10, 13, 21, 0.6)",
          },
        }}
      >
        <WhatsAppIcon sx={{ fontSize: { xs: 30, md: 36 } }} />
      </Fab>
    </Tooltip>
  );
}