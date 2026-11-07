"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import { 
  Container, Typography, Box, Grid, TextField, Button, Card, 
  Divider, Stack, MenuItem, Alert, CircularProgress, Checkbox, FormControlLabel 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(false); // <-- NUEVO ESTADO

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

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "";
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setFormData(prev => ({
          ...prev,
          nombre: firstName,
          apellidos: lastName,
          email: user.email || ""
        }));
      }
    };
    getUserData();
  }, []);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

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
      const fullAddress = `${formData.direccion}, ${formData.distrito}, ${formData.departamento}. Ref: ${formData.referencia}`;
      
      const { error: dbError } = await supabase.from("orders").insert([
        {
          customer_name: `${formData.nombre} ${formData.apellidos}`,
          customer_email: formData.email,
          customer_phone: formData.telefono,
          shipping_address: fullAddress,
          total: total,
          items: state.items,
          status: "Pendiente",
          whatsapp_opt_in: whatsappOptIn // <-- GUARDAMOS LA AUTORIZACIÓN
        }
      ]);

      if (dbError) throw dbError;

      setSuccess(true);
      clearCart();
    } catch (err: any) {
      setError("Hubo un problema al procesar tu pedido. Por favor, intenta de nuevo.");
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
        <Card sx={{ p: 4, mb: 4, borderRadius: 3, bgcolor: "#F8F9FA", border: "1px solid #E5E7EB", maxWidth: 500, mx: "auto" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#0a0d15" }}>¡Haz tu compra más rápida la próxima vez!</Typography>
          <Typography sx={{ color: "#666", mb: 3, fontSize: "0.9rem" }}>Crea tu cuenta en 1 clic para guardar tus datos, hacer seguimiento a tu pedido y obtener envío gratis.</Typography>
          <Button variant="contained" sx={{ bgcolor: "#0a0d15", textTransform: "none", fontWeight: 600, borderRadius: "8px" }}>Crear mi cuenta</Button>
        </Card>
        <Button component={Link} href="/" variant="outlined" size="large" sx={{ borderColor: "#0a0d15", color: "#0a0d15", borderRadius: 999, px: 4, py: 1.5 }}>Volver a la tienda</Button>
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
          <Box sx={{ mb: 4, p: 3, bgcolor: "#F8F9FA", borderRadius: 3, border: "1px solid #E5E7EB" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#0a0d15", fontSize: "1rem" }}>Compra más rápido</Typography>
            <Typography sx={{ color: "#666", mb: 2, fontSize: "0.85rem" }}>Autocompleta tus datos con tu cuenta de Google.</Typography>
            <Button variant="outlined" fullWidth startIcon={<GoogleIcon />} onClick={handleGoogleLogin} sx={{ borderColor: "#D1D5DB", color: "#374151", textTransform: "none", fontWeight: 600, py: 1.2, "&:hover": { bgcolor: "#F3F4F6" } }}>
              Continuar con Google
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }}>
            <Typography sx={{ color: "#9CA3AF", fontSize: "0.85rem", px: 2 }}>o llena tus datos manualmente</Typography>
          </Divider>

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "#0a0d15", fontSize: "1.1rem" }}>1. Datos de envío</Typography>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required size="small" autoComplete="given-name" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required size="small" autoComplete="family-name" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} required size="small" autoComplete="email" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="DNI / RUC" name="dni" onChange={handleChange} required size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Teléfono" name="telefono" onChange={handleChange} required size="small" autoComplete="tel" />
              </Grid>
              
              <Grid size={{ xs: 12 }}><Divider sx={{ my: 1 }} /></Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Departamento" name="departamento" defaultValue="Lima" onChange={handleChange} required size="small">
                  <MenuItem value="Lima">Lima</MenuItem>
                  <MenuItem value="Arequipa">Arequipa</MenuItem>
                  <MenuItem value="La Libertad">La Libertad</MenuItem>
                  <MenuItem value="Cusco">Cusco</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Provincia / Distrito" name="distrito" onChange={handleChange} required size="small" autoComplete="address-level2" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Dirección completa" name="direccion" onChange={handleChange} required size="small" autoComplete="street-address" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Referencia (opcional)" name="referencia" onChange={handleChange} size="small" />
              </Grid>
            </Grid>

            {/* CHECKBOX DE AUTORIZACIÓN WHATSAPP */}
            <Box sx={{ mt: 3, p: 2, bgcolor: "#F0FDF4", borderRadius: 2, border: "1px solid #BBF7D0" }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={whatsappOptIn} 
                    onChange={(e) => setWhatsappOptIn(e.target.checked)} 
                    sx={{ color: "#16A34A", "&.Mui-checked": { color: "#16A34A" } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "0.85rem", color: "#166534" }}>
                    Acepto recibir notificaciones sobre el estado de mi pedido vía WhatsApp.
                  </Typography>
                }
              />
            </Box>

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
                      <Box sx={{ position: "absolute", top: -6, right: -6, bgcolor: "white", color: "#0a0d15", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800 }}>{item.quantity}</Box>
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