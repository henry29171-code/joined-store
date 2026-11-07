"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { 
  Container, Typography, Box, Card, Button, Divider, 
  Stack, CircularProgress, Avatar, Chip, Grid 
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login"); // Si no está logueado, lo mandamos al login
      } else {
        setUser(user);
        // Buscamos los pedidos que coincidan con el correo del usuario
        const { data: userOrders, error } = await supabase
          .from("orders")
          .select("*")
          .eq("customer_email", user.email)
          .order("created_at", { ascending: false });
        
        if (!error && userOrders) {
          setOrders(userOrders);
        }
      }
      setLoading(false);
    };
    getUserData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#0a0d15" }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 4 }}>
        Mi cuenta
      </Typography>

      {/* Tarjeta de Información del Usuario */}
      <Card sx={{ borderRadius: 4, p: { xs: 3, md: 4 }, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", mb: 4 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between">
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar sx={{ width: 64, height: 64, bgcolor: "#0a0d15", fontSize: 24 }}>
              {user.email.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {user.user_metadata?.full_name || "Cliente de Joined"}
              </Typography>
              <Typography sx={{ color: "#666" }}>{user.email}</Typography>
            </Box>
          </Stack>
          
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<LogoutIcon />} 
            onClick={handleLogout}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Cerrar sesión
          </Button>
        </Stack>
      </Card>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "#0a0d15", mb: 3 }}>
        Mis pedidos
      </Typography>
      
      {/* Lista de Pedidos */}
      {orders.length > 0 ? (
        <Stack spacing={3}>
          {orders.map((order) => (
            <Card key={order.id} sx={{ borderRadius: 4, boxShadow: "0 4px 15px rgba(0,0,0,0.05)", overflow: "hidden" }}>
              <Box sx={{ p: 3, bgcolor: "#F8F9FA", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, color: "#0a0d15" }}>
                    Pedido #{order.id.slice(0, 8).toUpperCase()}
                  </Typography>
                  <Typography sx={{ fontSize: "0.85rem", color: "#666" }}>
                    {new Date(order.created_at).toLocaleDateString()} a las {new Date(order.created_at).toLocaleTimeString()}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#0a0d15" }}>
                    Total: S/. {Number(order.total).toFixed(2)}
                  </Typography>
                  <Chip 
                    label={order.status} 
                    size="small" 
                    sx={{ 
                      mt: 1, 
                      bgcolor: order.status === "Pendiente" ? "#FEF3C7" : "#D1FAE5", 
                      color: order.status === "Pendiente" ? "#D97706" : "#059669", 
                      fontWeight: 700 
                    }} 
                  />
                </Box>
              </Box>

              <Divider />

              <Box sx={{ p: 3 }}>
                <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, mb: 2, color: "#5E6B7E" }}>Productos:</Typography>
                <Grid container spacing={2}>
                  {order.items?.map((item: any, idx: number) => (
                    <Grid key={idx} size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box component="img" src={item.image} sx={{ width: 50, height: 50, borderRadius: 1, objectFit: "cover" }} />
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.name}</Typography>
                          <Typography sx={{ fontSize: "0.85rem", color: "#666" }}>
                            {item.quantity} x S/. {item.price.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Card>
          ))}
        </Stack>
      ) : (
        /* Estado vacío si no hay pedidos */
        <Card sx={{ borderRadius: 4, p: 6, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", bgcolor: "#F8F9FA" }}>
          <ShoppingBagIcon sx={{ fontSize: 50, color: "#B0B3B8", mb: 2 }} />
          <Typography sx={{ color: "#666", mb: 3 }}>
            Aún no tienes pedidos registrados con este correo.
          </Typography>
          <Button component={Link} href="/products" variant="contained" sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, textTransform: "none", fontWeight: 600, px: 4, py: 1.5, borderRadius: 999 }}>
            Explorar colección
          </Button>
        </Card>
      )}
    </Container>
  );
}