"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { Box, Container, Typography, Grid, Card, CardContent, Button, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ArticleIcon from "@mui/icons-material/Article";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificamos que el usuario esté logueado
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) return <Typography sx={{ p: 5 }}>Cargando panel...</Typography>;

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Encabezado del Panel */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15" }}>
              Panel de Control
            </Typography>
            <Typography sx={{ color: "#5E6B7E" }}>
              Bienvenido de vuelta, Henry.
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<LogoutIcon />} 
            onClick={handleLogout}
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Cerrar Sesión
          </Button>
        </Stack>

        {/* Tarjetas de Acceso Rápido */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <InventoryIcon sx={{ fontSize: 50, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Productos</Typography>
                <Typography sx={{ color: "#5E6B7E", mb: 3, fontSize: "0.9rem" }}>
                  Agrega, edita o elimina los productos de tu tienda.
                </Typography>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, textTransform: "none" }}>
                  Gestionar Productos
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <ReceiptIcon sx={{ fontSize: 50, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Pedidos</Typography>
                <Typography sx={{ color: "#5E6B7E", mb: 3, fontSize: "0.9rem" }}>
                  Revisa las compras y estados de envío de tus clientes.
                </Typography>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, textTransform: "none" }}>
                  Ver Pedidos
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <ArticleIcon sx={{ fontSize: 50, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Páginas Legales</Typography>
                <Typography sx={{ color: "#5E6B7E", mb: 3, fontSize: "0.9rem" }}>
                  Actualiza las políticas y términos de tu tienda sin tocar código.
                </Typography>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, textTransform: "none" }}>
                  Editar Páginas
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}