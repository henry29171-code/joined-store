"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase"; // Asegúrate que esta ruta sea correcta
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
    } else {
      router.push("/admin"); // Si es correcto, entra al panel
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 15 }}>
      <Box component="form" onSubmit={handleLogin} sx={{ p: 4, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, textAlign: "center", color: "#0a0d15" }}>
          Acceso Administrador
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField fullWidth label="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} required />
        <TextField fullWidth label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} required />
        
        <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, py: 1.5, fontWeight: 700 }}>
          Ingresar al Panel
        </Button>
      </Box>
    </Container>
  );
}