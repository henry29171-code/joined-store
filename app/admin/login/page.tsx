"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { Box, Button, Container, TextField, Typography, Alert, CircularProgress } from "@mui/material";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Si ya está logueado como admin, lo pasamos directo
      if (user && user.email === 'henry29171@gmail.com') {
        window.location.href = "/admin"; // Recarga completa
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message === "Invalid login credentials" ? "Correo o contraseña incorrectos." : error.message);
      setLoading(false);
    } else {
      // FORZAMOS LA RECARGA COMPLETA PARA QUE EL MIDDLEWARE LEA LA COOKIE
      window.location.href = "/admin";
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#0a0d15" }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xs" sx={{ py: 15 }}>
      <Box component="form" onSubmit={handleLogin} sx={{ p: 4, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, textAlign: "center", color: "#0a0d15" }}>
          Acceso Administrador
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField fullWidth label="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} required />
        <TextField fullWidth label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} required />
        
        <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, py: 1.5, fontWeight: 700 }}>
          {loading ? "Verificando..." : "Ingresar al Panel"}
        </Button>
      </Box>
    </Container>
  );
}