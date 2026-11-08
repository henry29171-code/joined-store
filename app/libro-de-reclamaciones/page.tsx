"use client";
import { useState } from "react";
import Link from "next/link";
import { Container, Typography, Box, Grid, TextField, Button, MenuItem, Alert, CircularProgress, Divider, Paper, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { supabase } from "../../lib/supabase";

export default function LibroReclamaciones() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    nombre_completo: "", documento_identidad: "", email: "", telefono: "",
    direccion: "", tipo: "Reclamo", bien_contratado: "", monto_reclamado: "",
    detalle: "", pedido_cliente: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: dbError } = await supabase.from("claims").insert([formData]);

    if (dbError) {
      setError("Hubo un problema al enviar tu reclamo. Por favor, intenta de nuevo.");
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Alert severity="success" sx={{ mb: 4, justifyContent: "center" }}>¡Reclamo registrado con éxito!</Alert>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 2 }}>Gracias por tu mensaje</Typography>
        <Typography sx={{ color: "#5E6B7E", mb: 4 }}>Hemos recibido tu caso. Nos pondremos en contacto contigo en un plazo máximo de 30 días hábiles.</Typography>
        <Button component={Link} href="/" variant="outlined" size="large" sx={{ borderColor: "#0a0d15", color: "#0a0d15", borderRadius: 999, px: 4, py: 1.5 }}>Volver a la tienda</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: 3 }}>
        <Button component={Link} href="/" startIcon={<ArrowBackIcon />} sx={{ color: "#5E6B7E", textTransform: "none" }}>Volver a la tienda</Button>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 1 }}>Libro de reclamaciones virtual</Typography>
      <Typography sx={{ color: "#666", mb: 2 }}>Conforme a lo establecido en el código de protección y defensa del consumidor (Ley N° 29571).</Typography>
      
      <Alert severity="info" sx={{ mb: 4, fontSize: "0.85rem" }}>
        La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.
      </Alert>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, border: "1px solid #E5E7EB", borderRadius: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            
            {/* SECCIÓN 1 */}
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontWeight: 700, color: "#0a0d15", mb: 1 }}>1. Identificación del consumidor</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Nombre completo" name="nombre_completo" onChange={handleChange} required size="small" /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="DNI / Carné de extranjería" name="documento_identidad" onChange={handleChange} required size="small" /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Correo electrónico" name="email" type="email" onChange={handleChange} required size="small" /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Teléfono" name="telefono" onChange={handleChange} required size="small" /></Grid>
            <Grid size={{ xs: 12 }}><TextField fullWidth label="Domicilio (Dirección completa)" name="direccion" onChange={handleChange} required size="small" /></Grid>

            {/* SECCIÓN 2 */}
            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: 700, color: "#0a0d15", mb: 1 }}>2. Identificación del bien o servicio</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth select label="Tipo" name="tipo" value={formData.tipo} onChange={handleChange} required size="small">
                <MenuItem value="Reclamo">Reclamo (Disconformidad con el producto/servicio)</MenuItem>
                <MenuItem value="Queja">Queja (Malestar con la atención al público)</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Producto o servicio (Ej. Morral Legolas)" name="bien_contratado" onChange={handleChange} required size="small" /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Monto reclamado (Opcional, S/.)" name="monto_reclamado" onChange={handleChange} type="number" size="small" /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Número de pedido (Opcional)" name="numero_pedido" onChange={handleChange} size="small" /></Grid>

            {/* SECCIÓN 3 */}
            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: 700, color: "#0a0d15", mb: 1 }}>3. Detalle de la reclamación</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Detalle del reclamo o queja" name="detalle" onChange={handleChange} required multiline rows={4} size="small" placeholder="Describe lo sucedido con el mayor detalle posible..." />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Pedido del consumidor (¿Qué solución espera?)" name="pedido_cliente" onChange={handleChange} required multiline rows={2} size="small" placeholder="Ej. Cambio del producto, devolución del dinero, etc." />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ bgcolor: "#0a0d15", py: 1.5, px: 5, borderRadius: 2, fontWeight: 700 }}>
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Enviar reclamo"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}