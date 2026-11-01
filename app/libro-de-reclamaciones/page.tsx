"use client";
import { useState } from "react";
import { Container, Typography, Box, TextField, Button, Alert, Grid, MenuItem } from "@mui/material";

export default function LibroReclamaciones() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en Supabase más adelante
    setEnviado(true);
  };

  if (enviado) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          ¡Reclamo registrado con éxito!
        </Alert>
        <Typography>Nos pondremos en contacto contigo pronto.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: "#0a0d15" }}>
        Libro de Reclamaciones
      </Typography>
      <Typography sx={{ mb: 4, color: "#5E6B7E" }}>
        Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571), ponemos a tu disposición nuestro Libro de Reclamaciones Virtual.
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, bgcolor: "white", borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Nombre completo" required />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="DNI / RUC" required />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Correo electrónico" type="email" required />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Teléfono" />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth select label="Tipo de reclamo" defaultValue="Reclamo" required>
              <MenuItem value="Reclamo">Reclamo (Disconformidad con el producto o servicio)</MenuItem>
              <MenuItem value="Queja">Queja (Malestar con la atención al público)</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth label="Detalle del reclamo o queja" multiline rows={4} required />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth label="Número de pedido (Opcional)" />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button type="submit" variant="contained" size="large" sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, px: 4 }}>
              Enviar Reclamo
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}