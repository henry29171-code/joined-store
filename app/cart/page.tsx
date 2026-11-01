"use client";
import { useCart } from "../context/CartContext";
import { 
  Container, Typography, Box, Card, CardContent, Button, 
  IconButton, Stack, Grid, Divider 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function CartPage() {
  const { state, removeFromCart, clearCart, increment, decrement } = useCart();

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Estado vacío
  if (state.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 2 }}>
          Tu carrito está vacío
        </Typography>
        <Typography sx={{ color: "#5E6B7E", mb: 4 }}>
          Parece que aún no has añadido ningún accesorio a tu colección.
        </Typography>
        <Button 
          component={Link} 
          href="/products" 
          variant="contained" 
          size="large"
          sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, borderRadius: 999, px: 4, py: 1.5 }}
        >
          Explorar Colección
        </Button>
      </Container>
    );
  }

  // Estado con productos
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Button component={Link} href="/products" startIcon={<ArrowBackIcon />} sx={{ color: "#5E6B7E", textTransform: "none" }}>
          Seguir comprando
        </Button>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 4 }}>
        Tu Carrito ({state.items.length} {state.items.length === 1 ? 'artículo' : 'artículos'})
      </Typography>

      <Grid container spacing={4}>
        {/* Lista de Productos */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            {state.items.map((item) => (
              <Card key={item.id} sx={{ display: "flex", p: 2, borderRadius: 3, boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                
                {/* Imagen del producto con el fix para TypeScript */}
                <Box 
                  component="img"
                  src={(item as any).image || "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=200&auto=format&fit=crop"}
                  alt={item.name}
                  sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 2, mr: 3 }}
                />
                
                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#0a0d15" }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ color: "#5E6B7E", fontWeight: 600 }}>
                      S/. {item.price.toFixed(2)}
                    </Typography>
                  </Box>

                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #E0E0E0", borderRadius: 2 }}>
                      <IconButton size="small" onClick={() => decrement(item.id)}><RemoveIcon fontSize="small" /></IconButton>
                      <Typography sx={{ mx: 2, fontWeight: 700 }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => increment(item.id)}><AddIcon fontSize="small" /></IconButton>
                    </Box>
                    
                    <IconButton onClick={() => removeFromCart(item.id)} sx={{ color: "#d32f2f" }}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", minWidth: 100 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#0a0d15" }}>
                    S/. {(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Resumen de Compra */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, borderRadius: 3, bgcolor: "#0a0d15", color: "white", position: "sticky", top: 100 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
              Resumen
            </Typography>
            
            <Stack spacing={2} sx={{ mb: 3, opacity: 0.8 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Subtotal</Typography>
                <Typography>S/. {total.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Envío</Typography>
                <Typography>Gratis</Typography>
              </Box>
            </Stack>
            
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 3 }} />
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>S/. {total.toFixed(2)}</Typography>
            </Box>

            <Button 
              component={Link}
              href="/checkout"
              variant="contained" 
              fullWidth
              size="large"
              sx={{ 
                bgcolor: "white", 
                color: "#0a0d15", 
                fontWeight: 800, 
                py: 1.5,
                borderRadius: 999,
                "&:hover": { bgcolor: "#F0F0F0" }
              }}
            >
              Proceder al Pago
            </Button>
            
            <Button 
              onClick={clearCart}
              fullWidth
              sx={{ color: "rgba(255,255,255,0.6)", mt: 2, textTransform: "none", "&:hover": { color: "white" } }}
            >
              Vaciar Carrito
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}