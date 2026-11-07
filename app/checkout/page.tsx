"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import {
  Container, Typography, Box, Grid, TextField, Button, Card,
  Divider, Stack, MenuItem, Alert, CircularProgress, Checkbox, FormControlLabel,
  ToggleButton, ToggleButtonGroup
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BusinessIcon from "@mui/icons-material/Business";

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);

  // Estados para Facturación
  const [tipoComprobante, setTipoComprobante] = useState("Boleta");
  const [documento, setDocumento] = useState("");
  const [razonSocial, setRazonSocial] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
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
        setFormData(prev => ({
          ...prev,
          nombre: nameParts[0] || "",
          apellidos: nameParts.slice(1).join(" ") || "",
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

    if (!documento) {
      setError(`Por favor, ingresa tu ${tipoComprobante === "Boleta" ? "DNI" : "RUC"}.`);
      return;
    }
    if (tipoComprobante === "Boleta" && documento.length !== 8) {
      setError("El DNI debe tener 8 dígitos.");
      return;
    }
    if (tipoComprobante === "Factura" && documento.length !== 11) {
      setError("El RUC debe tener 11 dígitos.");
      return;
    }

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
          whatsapp_opt_in: whatsappOptIn,
          tipo_comprobante: tipoComprobante,
          documento_cliente: documento,
          razon_social: razonSocial
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
        <Typography sx={{ color: "#5E6B7E", mb: 4 }}>Hemos recibido tu pedido. Pronto nos pondremos en contacto contigo.</Typography>
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

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "#0a0d15", fontSize: "1.1rem" }}>1. Datos de envío</Typography>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required size="small" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} required size="small" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Teléfono / WhatsApp" name="telefono" onChange={handleChange} required size="small" />
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
                <TextField fullWidth label="Provincia / Distrito" name="distrito" onChange={handleChange} required size="small" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Dirección completa" name="direccion" onChange={handleChange} required size="small" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Referencia (opcional)" name="referencia" onChange={handleChange} size="small" />
              </Grid>
            </Grid>

            {/* SECCIÓN DE COMPROBANTE (Boleta / Factura) */}
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 2, color: "#0a0d15", fontSize: "1.1rem" }}>2. Comprobante de Pago</Typography>

            <ToggleButtonGroup
              color="primary"
              value={tipoComprobante}
              exclusive
              onChange={(e, newVal) => {
                if (newVal !== null) {
                  setTipoComprobante(newVal);
                  setDocumento("");
                  if (newVal === "Boleta") setRazonSocial("");
                }
              }}
              sx={{ mb: 2, width: "100%" }}
            >
              <ToggleButton value="Boleta" sx={{ flex: 1, gap: 1, textTransform: "none", fontWeight: 600 }}>
                <ReceiptLongIcon /> Boleta (DNI)
              </ToggleButton>
              <ToggleButton value="Factura" sx={{ flex: 1, gap: 1, textTransform: "none", fontWeight: 600 }}>
                <BusinessIcon /> Factura (RUC)
              </ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: tipoComprobante === "Factura" ? 6 : 12 }}>
                <TextField
                  fullWidth
                  label={tipoComprobante === "Boleta" ? "DNI (8 dígitos)" : "RUC (11 dígitos)"}
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value.replace(/\D/g, ""))}
                  type="text"
                  inputMode="numeric"
                  inputProps={{ maxLength: tipoComprobante === "Boleta" ? 8 : 11 }}
                  required
                  size="small"
                />
              </Grid>

              {tipoComprobante === "Factura" && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Razón Social"
                    placeholder="Nombre de la empresa"
                    value={razonSocial}
                    onChange={(e) => setRazonSocial(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
              )}
            </Grid>

            {/* CHECKBOX DE AUTORIZACIÓN WHATSAPP */}
            <Box sx={{ mt: 3, p: 2, bgcolor: "#F3F4F6", borderRadius: 2, border: "1px solid #E5E7EB" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={whatsappOptIn}
                    onChange={(e) => setWhatsappOptIn(e.target.checked)}
                    sx={{ color: "#0a0d15", "&.Mui-checked": { color: "#0a0d15" } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "0.85rem", color: "#374151" }}>
                    Acepto recibir notificaciones sobre el estado de mi pedido vía WhatsApp.
                  </Typography>
                }
              />
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, mb: 3, color: "#0a0d15", fontSize: "1.1rem" }}>3. Método de pago</Typography>
            <Card sx={{ p: 2.5, borderRadius: 2, border: "1px solid #E0E0E0", boxShadow: "none", bgcolor: "transparent" }}>
              <Typography sx={{ mb: 1, fontWeight: 600, color: "#0a0d15", fontSize: "0.95rem" }}>Pago contra entrega o transferencia</Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "#5E6B7E", lineHeight: 1.5 }}>Al confirmar tu pedido, coordinaremos contigo el método de pago y envío.</Typography>
            </Card>

            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ mt: 4, bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, py: 1.8, borderRadius: 999, fontSize: { xs: "1rem", md: "1.1rem" } }}>
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : `Confirmar pedido (S/. ${total.toFixed(2)})`}
            </Button>
          </Box>
        </Grid>

        {/* RESUMEN DEL PEDIDO */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, bgcolor: "#0a0d15", color: "white", position: "sticky", top: 100 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontSize: "1.2rem" }}>Resumen del pedido</Typography>
            <Stack spacing={2} sx={{ mb: 3 }}>
              {state.items.map((item) => (
                <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box component="img" src={(item as any).image} sx={{ width: 45, height: 45, borderRadius: 1, objectFit: "cover" }} />
                    <Typography sx={{ fontSize: { xs: "0.85rem", md: "0.95rem" }, fontWeight: 600 }}>{item.name}</Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 700 }}>S/. {(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
            </Stack>
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 2 }} />
            <Stack spacing={1.5} sx={{ mb: 2, opacity: 0.9 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}><Typography sx={{ fontSize: "0.85rem" }}>Subtotal</Typography><Typography sx={{ fontSize: "0.85rem" }}>S/. {subtotal.toFixed(2)}</Typography></Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}><Typography sx={{ fontSize: "0.85rem" }}>IGV (18%)</Typography><Typography sx={{ fontSize: "0.85rem" }}>S/. {igv.toFixed(2)}</Typography></Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}><Typography sx={{ fontSize: "0.85rem" }}>Envío</Typography><Typography sx={{ fontWeight: 700, color: "#4ADE80", fontSize: "0.85rem" }}>Gratis</Typography></Box>
            </Stack>
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Total</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>S/. {total.toFixed(2)}</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}