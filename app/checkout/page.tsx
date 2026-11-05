"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import { 
  Container, Typography, Box, Grid, TextField, Button, Card, 
  Divider, Stack, MenuItem, Alert, CircularProgress 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    dni: "",
    telefono: "",
    departamento: "Lima",
    distrito: "",
    direccion: "",
    referencia: ""
  });

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const subtotal = total / 1.18;
  const igv = total - subtotal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Guardar el pedido en Supabase
      const fullAddress = `${formData.direccion}, ${formData.distrito}, ${formData.departamento}. Ref: ${formData.referencia}`;
      
      const { error: dbError } = await supabase.from("orders").insert([
        {
          customer_name: `${formData.nombre} ${formData.apellidos}`,
          customer_email: formData.email,
          customer_phone: formData.telefono,
          shipping_address: fullAddress,
          total: total,
          items: state.items, // Guardamos el carrito completo como JSON
          status: "Pendiente"
        }
      ]);

      if (dbError) throw dbError;

      // 2. Si todo sale bien, mostramos el éxito y vaciamos el carrito
      setSuccess(true);
      clearCart();
    } catch (err: any) {
      setError("Hubo un problema al procesar tu pedido. Por favor, intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Alert severity="success" sx={{ mb: 4, justifyContent: "center" }}>¡Pedido realizado con éxito!</Alert>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 2 }}>Gracias por tu compra</Typography>
        <Typography sx={{ color: "#5E6B7E", mb: 4 }}>Hemos recibido tu pedido. Pronto nos pondremos en contacto contigo para coordinar el envío.</Typography>
        <Button component={Link} href="/" variant="contained" size="large" sx={{ bgcolor: "#0a0d15", borderRadius: 999, px: 4, py: 1.5 }}>Volver a la tienda</Button>
      </Container>
    );
  }

  if (state.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 2 }}>No hay productos para pagar</Typography>
        <Button component={Link} href="/products" variant="contained" sx={{ bgcolor: "#0a0d15", mt: 2, borderRadius: 999 }}>Ir a la tienda</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Button component={Link} href="/cart" startIcon={<ArrowBackIcon />} sx={{ color: "#5E6B7E", textTransform: "none" }}>Volver al carrito</Button>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 4, fontSize: { xs: "1.5rem", md: "2rem" } }}>Finalizar compra</Typography>

      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "#0a0d15", fontSize: "1.1rem" }}>1. Datos de envío</Typography>
            
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Nombre" name="nombre" onChange={handleChange} required size="small" /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Apellidos" name="apellidos" onChange={handleChange} required size="small" /></Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="Correo electrónico" name="email" type="email" onChange={handleChange} required size="small" /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="DNI / RUC" name="dni" onChange={handleChange} required size="small" /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Teléfono" name="telefono" onChange={handleChange} required size="small" /></Grid>
              
              <Grid size={{ xs: 12 }}><Divider sx={{ my: 1 }} /></Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Departamento" name="departamento" defaultValue="Lima" onChange={handleChange} required size="small">
                  <MenuItem value="Lima">Lima</MenuItem><MenuItem value="Arequipa">Arequipa</MenuItem><MenuItem value="La Libertad">La Libertad</MenuItem><MenuItem value="Cusco">Cusco</MenuItem><MenuItem value="Otro">Otro</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Provincia / Distrito" name="distrito" onChange={handleChange} required size="small" /></Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="Dirección completa" name="direccion" onChange={handleChange} required size="small" /></Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth label="Referencia (opcional)" name="referencia" onChange={handleChange} size="small" /></Grid>
            </Grid>

            <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 3, color: "#0a0d15", fontSize: "1.1rem" }}>2. Método de pago</Typography>
            <Card sx={{ p: 2.5, borderRadius: 2, border: "1px solid #E0E0E0", boxShadow: "none", bgcolor: "transparent" }}>
              <Typography sx={{ mb: 1, fontWeight: 600, color: "#0a0d15", fontSize: "0.95rem" }}>Pago contra entrega o transferencia</Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "#5E6B7E", lineHeight: 1.5 }}>Al confirmar tu pedido, nos pondremos en contacto contigo vía WhatsApp para coordinar el método de pago y envío.</Typography>
            </Card>

            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ mt: 4, bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, py: 1.8, borderRadius: 999, fontSize: { xs: "1rem", md: "1.1rem" } }}>
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : `Confirmar pedido (S/. ${total.toFixed(2)})`}
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, bgcolor: "#0a0d15", color: "white", position: "sticky", top: 100 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontSize: "1.2rem" }}>Resumen del pedido</Typography>
            
            <Stack spacing={2} sx={{ mb: 3 }}>
              {state.items.map((item) => (
                <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ position: "relative" }}>
                      <Box component="img" src={(item as any).image || "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=100&auto=format&fit=crop"} sx={{ width: 45, height: 45, borderRadius: 1, objectFit: "cover" }} />
                      <Box sx={{ position: "absolute", top: -6, right: -6, bgcolor: "white", color: "#0a0d15", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800 }}>
                        {item.quantity}
                      </Box>
                    </Box>
                    <Typography sx={{ fontSize: { xs: "0.85rem", md: "0.95rem" }, fontWeight: 600 }}>{item.name}</Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", md: "0.95rem" } }}>S/. {(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 2 }} />
            
            <Stack spacing={1.5} sx={{ mb: 2, opacity: 0.9 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}><Typography sx={{ fontSize: "0.85rem" }}>Subtotal (sin IGV)</Typography><Typography sx={{ fontSize: "0.85rem" }}>S/. {subtotal.toFixed(2)}</Typography></Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}><Typography sx={{ fontSize: "0.85rem" }}>IGV (18%)</Typography><Typography sx={{ fontSize: "0.85rem" }}>S/. {igv.toFixed(2)}</Typography></Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}><Typography sx={{ fontSize: "0.85rem" }}>Envío</Typography><Typography sx={{ fontWeight: 700, color: "#4ADE80", fontSize: "0.85rem" }}>Gratis (VIP)</Typography></Box>
            </Stack>

            <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: "1.1rem", md: "1.3rem" } }}>Total</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.5rem" } }}>S/. {total.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 3, opacity: 0.6 }}>
              <LockIcon fontSize="small" />
              <Typography sx={{ fontSize: "0.75rem" }}>Pago 100% seguro</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}