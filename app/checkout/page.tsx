"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { 
  Container, Typography, Box, Grid, TextField, Button, Card, 
  Divider, Stack, MenuItem, Alert 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const [success, setSuccess] = useState(false);

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica real de pago en el futuro
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Alert severity="success" sx={{ mb: 4, justifyContent: "center" }}>
          ¡Pedido realizado con éxito!
        </Alert>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 2 }}>
          Gracias por tu compra
        </Typography>
        <Typography sx={{ color: "#5E6B7E", mb: 4 }}>
          Hemos recibido tu pedido. Pronto nos pondremos en contacto contigo para coordinar el envío.
        </Typography>
        <Button 
          component={Link} 
          href="/" 
          variant="contained" 
          size="large"
          sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, borderRadius: 999, px: 4, py: 1.5 }}
        >
          Volver a la tienda
        </Button>
      </Container>
    );
  }

  if (state.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 2 }}>
          No hay productos para pagar
        </Typography>
        <Button 
          component={Link} 
          href="/products" 
          variant="contained" 
          sx={{ bgcolor: "#0a0d15", mt: 2, borderRadius: 999 }}
        >
          Ir a la tienda
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Button component={Link} href="/cart" startIcon={<ArrowBackIcon />} sx={{ color: "#5E6B7E", textTransform: "none" }}>
          Volver al carrito
        </Button>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 4 }}>
        Finalizar Compra
      </Typography>

      <Grid container spacing={5}>
        {/* Formulario de Envío */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "#0a0d15" }}>
              1. Datos de Envío
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Nombre" required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Apellidos" required />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Correo electrónico" type="email" required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="DNI / RUC" required />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Teléfono" required />
              </Grid>
              
              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth select label="Departamento" defaultValue="Lima" required>
                  <MenuItem value="Lima">Lima</MenuItem>
                  <MenuItem value="Arequipa">Arequipa</MenuItem>
                  <MenuItem value="La Libertad">La Libertad</MenuItem>
                  <MenuItem value="Cusco">Cusco</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Provincia / Distrito" required />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Dirección completa" required />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="Referencia (opcional)" />
              </Grid>
            </Grid>

            <Typography variant="h6" sx={{ fontWeight: 700, mt: 5, mb: 3, color: "#0a0d15" }}>
              2. Método de Pago
            </Typography>
            
            <Card sx={{ p: 3, borderRadius: 3, border: "1px solid #E0E0E0", boxShadow: "none", bgcolor: "transparent" }}>
              <Typography sx={{ mb: 2, fontWeight: 600, color: "#0a0d15" }}>
                Pago contra entrega o transferencia
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#5E6B7E" }}>
                Al confirmar tu pedido, nos pondremos en contacto contigo vía WhatsApp para coordinar el método de pago y envío.
              </Typography>
            </Card>

            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              fullWidth
              sx={{ 
                mt: 4, 
                bgcolor: "#0a0d15", 
                "&:hover": { bgcolor: "#1a1d24" }, 
                py: 1.8, 
                borderRadius: 999,
                fontSize: "1.1rem"
              }}
            >
              Confirmar Pedido (S/. {total.toFixed(2)})
            </Button>
          </Box>
        </Grid>

        {/* Resumen del Pedido */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ p: 4, borderRadius: 4, bgcolor: "#0a0d15", color: "white", position: "sticky", top: 100 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
              Resumen del Pedido
            </Typography>
            
            <Stack spacing={3} sx={{ mb: 3 }}>
              {state.items.map((item) => (
                <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ position: "relative" }}>
                      <Box 
                        component="img" 
                        src={item.image || "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=100&auto=format&fit=crop"} 
                        sx={{ width: 50, height: 50, borderRadius: 1, objectFit: "cover" }} 
                      />
                      <Box sx={{ 
                        position: "absolute", top: -8, right: -8, bgcolor: "white", color: "#0a0d15", 
                        borderRadius: "50%", width: 20, height: 20, display: "flex", 
                        alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800 
                      }}>
                        {item.quantity}
                      </Box>
                    </Box>
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 700 }}>
                    S/. {(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 3 }} />
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, opacity: 0.8 }}>
              <Typography>Subtotal</Typography>
              <Typography>S/. {total.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, opacity: 0.8 }}>
              <Typography>Envío</Typography>
              <Typography>Gratis</Typography>
            </Box>

            <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 3 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Total</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>S/. {total.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 4, opacity: 0.6 }}>
              <LockIcon fontSize="small" />
              <Typography sx={{ fontSize: "0.8rem" }}>Pago 100% Seguro</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}