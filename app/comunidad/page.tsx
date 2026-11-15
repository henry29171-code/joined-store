"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import { 
  Container, Typography, Box, Grid, Button, Card, CardContent, 
  Stack, Divider, CircularProgress, Alert, Chip 
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarsIcon from "@mui/icons-material/Stars";
import DiamondIcon from "@mui/icons-material/Diamond";

export default function ClubJoinedPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUser(session.user);
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleSubscribe = async (plan: "silver" | "black") => {
    if (!user) {
      // Si no está logueado, lo enviamos al perfil para que se registre
      router.push("/profile");
      return;
    }

    setBtnLoading(plan);
    setError("");

    try {
      const response = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          userEmail: user.email,
          userName: user.user_metadata?.full_name || "Cliente Joined"
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al crear la suscripción");

      // Redirigimos a Mercado Pago para que ingrese la tarjeta
      window.location.href = data.init_point;

    } catch (err: any) {
      setError(err.message);
      setBtnLoading("");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 15 }}>
        <CircularProgress sx={{ color: "#0a0d15" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        
        {/* HEADER */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip label="Beneficios Exclusivos" sx={{ mb: 3, fontWeight: 700, bgcolor: "#0a0d15", color: "white" }} />
          <Typography variant="h2" sx={{ fontWeight: 800, color: "#0a0d15", mb: 2, fontSize: { xs: "2.2rem", md: "3.5rem" }, letterSpacing: "-0.02em" }}>
            Únete al Club Joined
          </Typography>
          <Typography sx={{ color: "#5E6B7E", maxWidth: 600, mx: "auto", fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.6 }}>
            Eleva tu experiencia con acceso a ediciones limitadas, mantenimiento de cuero y nuestra exclusiva óveda de crédito acumulable.
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>{error}</Alert>}

        {/* TARJETAS DE PRECIOS */}
        <Grid container spacing={4} alignItems="stretch" justifyContent="center">
          
          {/* PLAN 1: MIEMBRO JOINED (GRATIS) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #E5E7EB", bgcolor: "#FFFFFF" }}>
              <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#5E6B7E", mb: 1 }}>Miembro Joined</Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#0a0d15", mb: 2 }}>Gratis</Typography>
                <Typography sx={{ color: "#5E6B7E", fontSize: "0.9rem", mb: 3 }}>El primer paso para pertenecer a la comunidad.</Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2} sx={{ mb: 4, flexGrow: 1 }}>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "#0a0d15", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>Registro gratuito</Typography></Box>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "#0a0d15", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>Envío de cortesía en Lima y Callao</Typography></Box>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "#0a0d15", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>Notificaciones por WhatsApp</Typography></Box>
                </Stack>
                <Button fullWidth variant="outlined" disabled sx={{ borderColor: "#E5E7EB", color: "#9CA3AF", py: 1.5, borderRadius: 2, fontWeight: 700 }}>
                  {user ? "Ya eres miembro" : "Nivel actual"}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* PLAN 2: JOINED SILVER */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", borderRadius: 4, boxShadow: "0 20px 40px rgba(0,0,0,0.08)", border: "2px solid #9CA3AF", position: "relative", bgcolor: "#FFFFFF" }}>
              <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <StarsIcon sx={{ color: "#9CA3AF" }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0a0d15" }}>Joined silver</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#0a0d15", mb: 1 }}>S/ 24.90<span style={{ fontSize: "1rem", color: "#5E6B7E", fontWeight: 500 }}>/mes</span></Typography>
                <Typography sx={{ color: "#5E6B7E", fontSize: "0.9rem", mb: 3 }}>Para quienes buscan mantenimiento y beneficios constantes.</Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2} sx={{ mb: 4, flexGrow: 1 }}>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "#9CA3AF", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>Todo lo de Miembro Joined</Typography></Box>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "#9CA3AF", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>S/ 15.00 de crédito mensual en tu Bóveda</Typography></Box>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "#9CA3AF", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>Envíos ilimitados gratis en Lima</Typography></Box>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "#9CA3AF", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>1 limpieza trimestral de cuero</Typography></Box>
                </Stack>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => handleSubscribe("silver")}
                  disabled={btnLoading !== ""}
                  sx={{ bgcolor: "#0a0d15", color: "white", py: 1.5, borderRadius: 2, fontWeight: 700, "&:hover": { bgcolor: "#1a1d24" } }}
                >
                  {btnLoading === "silver" ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Suscribirme a silver"}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* PLAN 3: JOINED BLACK */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: "100%", borderRadius: 4, boxShadow: "0 20px 40px rgba(10, 13, 21, 0.2)", bgcolor: "#0a0d15", color: "white", position: "relative" }}>
              <Chip label="Recomendado" size="small" sx={{ position: "absolute", top: 16, right: 16, bgcolor: "white", color: "#0a0d15", fontWeight: 700 }} />
              <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <DiamondIcon sx={{ color: "white" }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>Joined black</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "white", mb: 1 }}>S/ 49.90<span style={{ fontSize: "1rem", color: "#9CA3AF", fontWeight: 500 }}>/mes</span></Typography>
                <Typography sx={{ color: "#9CA3AF", fontSize: "0.9rem", mb: 3 }}>El máximo nivel de estatus y privilegios de la marca.</Typography>
                <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.1)" }} />
                <Stack spacing={2} sx={{ mb: 4, flexGrow: 1 }}>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "white", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>Todo lo de Joined silver</Typography></Box>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "white", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>S/ 35.00 de crédito mensual en tu bóveda</Typography></Box>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "white", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>Envío priority gratis a todo el Perú</Typography></Box>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "white", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>Kit Leather care box de bienvenida</Typography></Box>
                  <Box sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon sx={{ color: "white", fontSize: 20 }} /><Typography sx={{ fontSize: "0.9rem" }}>Garantía vitalicia y acceso a ediciones limitadas</Typography></Box>
                </Stack>
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => handleSubscribe("black")}
                  disabled={btnLoading !== ""}
                  sx={{ bgcolor: "white", color: "#0a0d15", py: 1.5, borderRadius: 2, fontWeight: 700, "&:hover": { bgcolor: "#F3F4F6" } }}
                >
                  {btnLoading === "black" ? <CircularProgress size={24} sx={{ color: "#0a0d15" }} /> : "Suscribirme a black"}
                </Button>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}