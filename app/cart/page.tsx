"use client";
import { useCart } from "../context/CartContext";
import { Container, Typography, Box, Card, Button, IconButton, Stack, Grid, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";

export default function CartPage() {
  const { state, removeFromCart, clearCart, increment, decrement } = useCart();

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (state.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 2, fontSize: { xs: "1.5rem", md: "2rem" } }}>
          Tu carrito está vacío
        </Typography>
        <Typography sx={{ color: "#5E6B7E", mb: 4, fontSize: { xs: "0.95rem", md: "1rem" } }}>
          Parece que aún no has añadido ningún accesorio a tu colección.
        </Typography>
        <Button component={Link} href="/products" variant="contained" size="large" sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, borderRadius: 999, px: 4, py: 1.5 }}>
          Explorar colección
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Button component={Link} href="/products" startIcon={<ArrowBackIcon />} sx={{ color: "#5E6B7E", textTransform: "none" }}>
          Seguir comprando
        </Button>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 4, fontSize: { xs: "1.5rem", md: "2rem" } }}>
        Tu carrito ({state.items.length} {state.items.length === 1 ? 'artículo' : 'artículos'})
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            {state.items.map((item) => (
              <Card key={item.id} sx={{ display: "flex", p: 2, borderRadius: 3, boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                <Box component="img" src={(item as any).image || "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=200&auto=format&fit=crop"} alt={item.name} sx={{ width: 80, height: 100, objectFit: "cover", borderRadius: 2, mr: 2 }} />
                
                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#0a0d15", fontSize: { xs: "1rem", md: "1.1rem" } }}>{item.name}</Typography>
                    <Typography sx={{ color: "#9CA3AF", fontSize: "0.85rem", mb: 0.5 }}>Color: Negro | Talla: Única</Typography>
                    <Typography sx={{ color: "#5E6B7E", fontWeight: 600, fontSize: "0.9rem" }}>S/. {item.price.toFixed(2)}</Typography>
                  </Box>

                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #E0E0E0", borderRadius: 2 }}>
                      <IconButton size="small" onClick={() => decrement(item.id)}><RemoveIcon fontSize="small" /></IconButton>
                      <Typography sx={{ mx: 1.5, fontWeight: 700, fontSize: "0.9rem" }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => increment(item.id)}><AddIcon fontSize="small" /></IconButton>
                    </Box>
                    <Button size="small" startIcon={<DeleteIcon fontSize="small" />} onClick={() => removeFromCart(item.id)} sx={{ color: "#d32f2f", textTransform: "none", fontSize: "0.8rem", fontWeight: 600 }}>
                      Eliminar
                    </Button>
                  </Stack>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", minWidth: 80 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: "1rem", md: "1.2rem" }, color: "#0a0d15" }}>
                    S/. {(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Stack>

          <Box sx={{ mt: 4, p: 2, bgcolor: "#F8F9FA", borderRadius: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <LocalShippingIcon sx={{ color: "#5E6B7E" }} />
            <Typography sx={{ fontSize: "0.85rem", color: "#5E6B7E" }}>
              Tu pedido califica para <strong>envío gratis</strong> por ser miembro VIP.
            </Typography>
          </Box>
        </Grid>

        {/* RESUMEN CLARO */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 3, bgcolor: "#F8F9FA", border: "1px solid #E0E0E0", position: "sticky", top: 100 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontSize: "1.3rem", color: "#0a0d15" }}>Resumen</Typography>
            
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", color: "#5E6B7E" }}>
                <Typography>Subtotal</Typography>
                <Typography>S/. {total.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", color: "#5E6B7E" }}>
                <Typography>Envío</Typography>
                <Typography sx={{ fontWeight: 700, color: "#0a0d15" }}>Gratis (Miembro VIP)</Typography>
              </Box>
            </Stack>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, color: "#0a0d15" }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>S/. {total.toFixed(2)}</Typography>
            </Box>

            <Button component={Link} href="/checkout" variant="contained" fullWidth size="large" sx={{ bgcolor: "#0a0d15", color: "white", fontWeight: 800, py: 1.5, borderRadius: 999, "&:hover": { bgcolor: "#1a1d24" } }}>
              Proceder al pago
            </Button>
            
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 3, color: "#5E6B7E" }}>
              <LockIcon fontSize="small" />
              <Typography sx={{ fontSize: "0.8rem" }}>Compra 100% segura</Typography>
            </Box>

            <Button onClick={clearCart} fullWidth sx={{ color: "#9CA3AF", mt: 1, textTransform: "none", "&:hover": { color: "#0a0d15" } }}>
              Vaciar carrito
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}