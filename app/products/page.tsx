"use client";
import { useState } from "react";
import { Container, Typography, Box, Grid, Button, Chip } from "@mui/material";

const categories = ["Todos", "Morrales", "Billeteras", "Correas", "Pulseras", "Relojes", "Perfumes"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em" }}>
          
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "#0a0d15", mt: 1, mb: 2 }}>
          Nuestros Productos
        </Typography>
        <Typography sx={{ color: "#5E6B7E" }}>
          Explora nuestra colección de accesorios diseñados para elevar tu estilo.
        </Typography>
      </Box>

      {/* Filtro de Categorías */}
      <Box sx={{ bgcolor: "white", p: 2, borderRadius: 3, mb: 4, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => setActiveCategory(cat)}
            sx={{
              fontWeight: 600,
              px: 2,
              py: 1,
              bgcolor: activeCategory === cat ? "#0a0d15" : "transparent",
              color: activeCategory === cat ? "white" : "#5E6B7E",
              "&:hover": { bgcolor: activeCategory === cat ? "#1a1d24" : "#F0F0F0" },
            }}
          />
        ))}
      </Box>

      {/* Mensaje por ahora (Mañana conectamos Supabase aquí) */}
      <Box sx={{ textAlign: "center", py: 10, bgcolor: "#F8F9FA", borderRadius: 4, border: "1px dashed #CBD5E1" }}>
        <Typography variant="h6" sx={{ color: "#5E6B7E", fontWeight: 600 }}>
          No hay productos disponibles en esta categoría.
        </Typography>
        <Typography sx={{ color: "#9CA3AF", mt: 1 }}>
          (Pronto podrás agregar productos desde el Panel de Administración)
        </Typography>
      </Box>
    </Container>
  );
}