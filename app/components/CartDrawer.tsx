"use client";
import Link from "next/link";
import Image from "next/image";
import { 
  Drawer, Box, Typography, IconButton, Button, Divider, 
  Stack, CircularProgress 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { 
    state, isHydrated, isCartOpen, closeCart, 
    removeFromCart, increment, decrement 
  } = useCart();

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={closeCart}
      sx={{ "& .MuiDrawer-paper": { width: { xs: "100%", sm: 400 }, bgcolor: "#FFFFFF" } }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        
        {/* HEADER */}
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E5E7EB" }}>
          <Typography sx={{ fontWeight: 700, color: "#0a0d15", fontSize: "1.1rem" }}>
            Tu carrito
          </Typography>
          <IconButton onClick={closeCart} sx={{ color: "#5E6B7E" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* CONTENIDO */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          {!isHydrated ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress sx={{ color: "#0a0d15" }} size={30} />
            </Box>
          ) : state.items.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography sx={{ color: "#5E6B7E", mb: 2 }}>Tu carrito está vacío.</Typography>
              <Button component={Link} href="/products" onClick={closeCart} variant="contained" sx={{ bgcolor: "#0a0d15", color: "white" }}>
                Ir a la tienda
              </Button>
            </Box>
          ) : (
            <Stack spacing={3}>
              {state.items.map((item) => (
                <Box key={item.id} sx={{ display: "flex", gap: 2 }}>
                  {/* IMAGEN */}
                  <Box sx={{ position: "relative", width: 80, height: 100, borderRadius: 1, overflow: "hidden", flexShrink: 0, bgcolor: "#F3F4F6" }}>
                    <Image src={item.image || ""} alt={item.name} fill style={{ objectFit: "cover" }} />
                  </Box>
                  
                  {/* DETALLES */}
                  <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Typography sx={{ fontWeight: 600, color: "#0a0d15", fontSize: "0.95rem", lineHeight: 1.2 }}>
                        {item.name}
                      </Typography>
                      <IconButton size="small" onClick={() => removeFromCart(item.id)} sx={{ color: "#9CA3AF", ml: 1, "&:hover": { color: "#d32f2f" } }}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    <Typography sx={{ fontSize: "0.85rem", color: "#5E6B7E", mt: 0.5 }}>
                      S/. {Number(item.price).toFixed(2)}
                    </Typography>

                    {/* CONTROLES DE CANTIDAD */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: "auto", pt: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #E5E7EB", borderRadius: 1 }}>
                        <IconButton size="small" onClick={() => decrement(item.id)} sx={{ p: 0.5, color: "#5E6B7E" }}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ px: 2, fontSize: "0.9rem", fontWeight: 600 }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => increment(item.id)} sx={{ p: 0.5, color: "#5E6B7E" }}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        {/* FOOTER (SUBTOTAL Y BOTONES) */}
        {state.items.length > 0 && (
          <Box sx={{ p: 3, borderTop: "1px solid #E5E7EB", bgcolor: "#F8F9FA" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography sx={{ fontWeight: 600, color: "#0a0d15" }}>Subtotal</Typography>
              <Typography sx={{ fontWeight: 800, color: "#0a0d15", fontSize: "1.2rem" }}>
                S/. {total.toFixed(2)}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.75rem", color: "#5E6B7E", mb: 2, textAlign: "center" }}>
              Los impuestos y el envío se calculan en el checkout.
            </Typography>
            <Button 
              component={Link} 
              href="/checkout" 
              onClick={closeCart}
              fullWidth 
              variant="contained" 
              sx={{ bgcolor: "#0a0d15", color: "white", py: 1.5, borderRadius: 2, fontWeight: 700, mb: 1.5, "&:hover": { bgcolor: "#1a1d24" } }}
            >
              Ir a pagar
            </Button>
            <Button 
              component={Link} 
              href="/cart" 
              onClick={closeCart}
              fullWidth 
              variant="outlined" 
              sx={{ color: "#0a0d15", borderColor: "#0a0d15", py: 1.5, borderRadius: 2, fontWeight: 600, "&:hover": { bgcolor: "rgba(10,13,21,0.05)" } }}
            >
              Ver carrito completo
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}