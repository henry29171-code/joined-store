"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { Container, Typography, Box, Card, Button, Divider, Stack, CircularProgress, Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login"); // Si no está logueado, lo mandamos al login
      } else {
        setUser(user);
        setLoading(false);
      }
    };
    getUser();
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
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#0a0d15", mb: 4 }}>
        Mi cuenta
      </Typography>

      <Card sx={{ borderRadius: 4, p: { xs: 3, md: 4 }, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", mb: 4 }}>
        <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
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
        
        <Divider sx={{ my: 3 }} />
        
        <Button 
          variant="outlined" 
          color="error" 
          startIcon={<LogoutIcon />} 
          onClick={handleLogout}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Cerrar sesión
        </Button>
      </Card>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "#0a0d15", mb: 3 }}>
        Mis pedidos
      </Typography>
      
      <Card sx={{ borderRadius: 4, p: 6, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", bgcolor: "#F8F9FA" }}>
        <ReceiptIcon sx={{ fontSize: 50, color: "#B0B3B8", mb: 2 }} />
        <Typography sx={{ color: "#666", mb: 3 }}>
          Aún no tienes pedidos registrados.
        </Typography>
        <Button component={Link} href="/products" variant="contained" sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, textTransform: "none", fontWeight: 600 }}>
          Explorar colección
        </Button>
      </Card>
    </Container>
  );
}