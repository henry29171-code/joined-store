"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Typography, IconButton, Button, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContext"; // <-- Ruta corregida para la carpeta components

export default function CartNotification() {
  const { lastAddedItem, clearLastAddedItem, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (lastAddedItem) {
      setOpen(true);
      // Se cierra automáticamente después de 5 segundos
      const timer = setTimeout(() => {
        setOpen(false);
        setTimeout(clearLastAddedItem, 300); // Limpia el estado después de la animación
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem, clearLastAddedItem]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(clearLastAddedItem, 300);
  };

  const handleRemove = () => {
    if (lastAddedItem) {
      removeFromCart(lastAddedItem.id);
      handleClose();
    }
  };

  if (!lastAddedItem) return null;

  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: { xs: "none", sm: "flex" }, // Se oculta en móviles, se muestra en tablets y PC
          alignItems: "center",
          gap: 2,
          bgcolor: "#FFFFFF",
          p: 2,
          pr: 5, // Espacio extra para la "X"
          borderRadius: 3,
          boxShadow: "0 10px 40px rgba(10, 13, 21, 0.15)",
          border: "1px solid #E5E7EB",
          width: "380px",
        }}
      >
        {/* BOTÓN DE CERRAR SUTIL (LA X) */}
        <IconButton
          onClick={handleRemove} 
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#9CA3AF",
            opacity: 0.6,
            transition: "all 0.2s",
            "&:hover": { opacity: 1, color: "#d32f2f", bgcolor: "transparent" },
          }}
          title="Quitar del carrito"
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* IMAGEN DEL PRODUCTO */}
        <Box sx={{ position: "relative", width: 60, height: 60, borderRadius: 2, overflow: "hidden", flexShrink: 0, bgcolor: "#F3F4F6" }}>
          <Image src={lastAddedItem.image || ""} alt={lastAddedItem.name} fill style={{ objectFit: "cover" }} />
        </Box>

        {/* DETALLES */}
        <Box sx={{ flexGrow: 1, pr: 1 }}>
          <Typography sx={{ fontSize: "0.75rem", color: "#22C55E", fontWeight: 700, mb: 0.5 }}>
            ¡Añadido al carrito!
          </Typography>
          <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: "#0a0d15", lineHeight: 1.2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {lastAddedItem.name}
          </Typography>
          <Typography sx={{ fontSize: "0.85rem", color: "#666", mt: 0.5 }}>
            {lastAddedItem.quantity} x S/. {Number(lastAddedItem.price).toFixed(2)}
          </Typography>
        </Box>

        {/* BOTÓN VER CARRITO */}
        <Button
          component={Link}
          href="/cart"
          onClick={handleClose}
          variant="contained"
          size="small"
          sx={{ bgcolor: "#0a0d15", color: "white", textTransform: "none", fontWeight: 600, borderRadius: 2, px: 2, whiteSpace: "nowrap", "&:hover": { bgcolor: "#1a1d24" } }}
        >
          Ver carrito
        </Button>
      </Box>
    </Slide>
  );
}