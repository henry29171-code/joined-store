"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { Box, Button, Container, TextField, Typography, Alert, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(`Error: ${error.message}`);
        setLoading(false);
      } else {
        // Recarga completa para asegurar que el Middleware reciba la cookie
        window.location.href = "/admin";
      }
    } catch (err) {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
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

        <TextField 
          fullWidth label="Contraseña" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} required 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ bgcolor: "#0a0d15", py: 1.5, fontWeight: 700 }}>
          {loading ? "Verificando..." : "Ingresar al Panel"}
        </Button>
      </Box>
    </Container>
  );
}