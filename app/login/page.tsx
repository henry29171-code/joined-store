"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { 
  Box, Container, Typography, TextField, Button, 
  Alert, Divider, Stack, InputAdornment, IconButton 
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";

export default function LoginPage() {
  const router = useRouter();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/");
        router.refresh();
      } else {
        const { error, data } = await supabase.auth.signUp({ 
          email, password, options: { data: { full_name: name } }
        });
        if (error) throw error;
        
        if (data.user && data.session === null) {
          setSuccess("¡Cuenta creada! Revisa tu correo para confirmar tu cuenta.");
        } else {
          router.push("/");
          router.refresh();
        }
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(`Error al conectar con ${provider}: Asegúrate de tenerlo configurado en Supabase.`);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8F9FA" }}>
      
      {/* Imagen Limpia, Masculina y sin Logos */}
      <Box 
        sx={{ 
          flex: 1, 
          display: { xs: "none", md: "block" },
          // Nueva imagen: Reloj de hombre sobre cuero, sin logos
          backgroundImage: "url('https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(10, 13, 21, 0.7)" }} />
        <Box sx={{ position: "absolute", bottom: 60, left: 60, right: 60, color: "white" }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2 }}>
            Únete a la <br /> comunidad Joined.
          </Typography>
          <Typography sx={{ fontSize: "1.1rem", opacity: 0.9, maxWidth: 400 }}>
            Crea tu cuenta para guardar tus favoritos, ver tu historial de pedidos y acceder a beneficios exclusivos.
          </Typography>
        </Box>
      </Box>

      {/* Formulario */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", p: { xs: 3, md: 8 } }}>
        <Container maxWidth="xs">
          
          <Button 
            component={Link} href="/" startIcon={<ArrowBackIcon />} 
            sx={{ mb: 3, color: "#5E6B7E", textTransform: "none", fontWeight: 600 }}
          >
            Volver a la tienda
          </Button>

          <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mb: 1 }}>
            {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta"}
          </Typography>
          <Typography sx={{ color: "#5E6B7E", mb: 3 }}>
            {isLogin ? "Ingresa tus credenciales para acceder." : "Completa tus datos para empezar a comprar."}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

          <Stack spacing={2} sx={{ mb: 3 }}>
            <Button 
              variant="outlined" fullWidth startIcon={<GoogleIcon />} 
              onClick={() => handleSocialLogin('google')}
              sx={{ color: "#0a0d15", borderColor: "#E0E0E0", justifyContent: "flex-start", py: 1, textTransform: "none", fontWeight: 600 }}
            >
              Continuar con Google
            </Button>
            <Button 
              variant="outlined" fullWidth startIcon={<FacebookIcon />} 
              onClick={() => handleSocialLogin('facebook')}
              sx={{ color: "#0a0d15", borderColor: "#E0E0E0", justifyContent: "flex-start", py: 1, textTransform: "none", fontWeight: 600 }}
            >
              Continuar con Facebook
            </Button>
            <Button 
              variant="outlined" fullWidth startIcon={<AppleIcon />} 
              onClick={() => handleSocialLogin('apple')}
              sx={{ color: "#0a0d15", borderColor: "#E0E0E0", justifyContent: "flex-start", py: 1, textTransform: "none", fontWeight: 600 }}
            >
              Continuar con Apple
            </Button>
          </Stack>

          <Divider sx={{ mb: 3 }}>
            <Typography sx={{ color: "#9CA3AF", fontSize: "0.85rem", px: 2 }}>o usa tu correo</Typography>
          </Divider>

          <Box component="form" onSubmit={handleAuth}>
            <Stack spacing={2}>
              
              {!isLogin && (
                <TextField 
                  fullWidth label="Nombre completo" variant="outlined" 
                  value={name} onChange={(e) => setName(e.target.value)} required 
                />
              )}

              <TextField 
                fullWidth label="Correo electrónico" type="email" variant="outlined" 
                value={email} onChange={(e) => setEmail(e.target.value)} required 
              />

              <TextField 
                fullWidth label="Contraseña" type={showPassword ? "text" : "password"} variant="outlined" 
                value={password} onChange={(e) => setPassword(e.target.value)} required 
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

              <Button 
                type="submit" variant="contained" size="large" fullWidth disabled={loading}
                sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, py: 1.5, borderRadius: 999, fontSize: "1rem", fontWeight: 700 }}
              >
                {loading ? "Procesando..." : (isLogin ? "Iniciar Sesión" : "Crear Cuenta")}
              </Button>
            </Stack>
          </Box>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography sx={{ color: "#5E6B7E", fontSize: "0.9rem" }}>
              {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
            </Typography>
            <Button 
              onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
              sx={{ color: "#0a0d15", fontWeight: 700, textTransform: "none", mt: 0.5, "&:hover": { bgcolor: "transparent", textDecoration: "underline" } }}
            >
              {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
            </Button>
          </Box>

        </Container>
      </Box>
    </Box>
  );
}