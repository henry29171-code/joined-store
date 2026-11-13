"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // Asegúrate de que la ruta sea correcta
import { 
  Container, Typography, Box, TextField, Button, Card, Divider, Alert, 
  CircularProgress, Stack, Avatar 
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

export default function ProfilePage() {
  const router = useRouter();
  
  // Estados de autenticación
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Registro
  
  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    // 1. Verificar si ya hay una sesión activa
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkSession();

    // 2. Escuchar cambios en la autenticación (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setBtnLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/profile` }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Error al conectar con Google");
      setBtnLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    setBtnLoading(true);

    try {
      if (isLogin) {
        // Iniciar Sesión
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        // Registrarse
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: { data: { full_name: nombre } }
        });
        if (error) throw error;
        setMensaje("Registro exitoso. Revisa tu correo para confirmar tu cuenta (o inicia sesión si no requiere confirmación).");
        setIsLogin(true); // Cambiamos a la vista de login
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error en la autenticación");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // --- RENDERIZADO ---

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 15, textAlign: "center" }}>
        <CircularProgress sx={{ color: "#0a0d15" }} />
        <Typography sx={{ mt: 2, color: "#5E6B7E" }}>Verificando sesión...</Typography>
      </Container>
    );
  }

  // Si NO hay usuario, mostramos el Login/Registro
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
        <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", textAlign: "center", mb: 1 }}>
            {isLogin ? "Iniciar sesión" : "Crear cuenta"}
          </Typography>
          <Typography sx={{ color: "#5E6B7E", textAlign: "center", mb: 4, fontSize: "0.9rem" }}>
            {isLogin ? "Bienvenido de vuelta a Joined. Ingresa para agilizar tus compras." : "Únete a la Comunidad Joined y obtén beneficios exclusivos."}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {mensaje && <Alert severity="success" sx={{ mb: 3 }}>{mensaje}</Alert>}

          {/* BOTÓN DE GOOGLE */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={btnLoading}
            sx={{ py: 1.5, mb: 3, color: "#0a0d15", borderColor: "#E5E7EB", textTransform: "none", fontWeight: 600, "&:hover": { bgcolor: "#F9FAFB", borderColor: "#D1D5DB" } }}
          >
            Continuar con Google
          </Button>

          <Divider sx={{ mb: 3, color: "#9CA3AF", fontSize: "0.85rem" }}>o usa tu correo</Divider>

          {/* FORMULARIO DE CORREO */}
          <Box component="form" onSubmit={handleEmailAuth}>
            <Stack spacing={2.5}>
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  size="small"
                />
              )}
              <TextField
                fullWidth
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                size="small"
              />
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                size="small"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={btnLoading}
                sx={{ bgcolor: "#0a0d15", color: "white", py: 1.5, borderRadius: 2, fontWeight: 700, "&:hover": { bgcolor: "#1a1d24" } }}
              >
                {btnLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : (isLogin ? "Ingresar" : "Registrarme")}
              </Button>
            </Stack>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography sx={{ fontSize: "0.9rem", color: "#5E6B7E" }}>
              {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
              <span 
                onClick={() => { setIsLogin(!isLogin); setError(""); setMensaje(""); }} 
                style={{ color: "#0a0d15", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
              >
                {isLogin ? "Regístrate aquí" : "Inicia sesión"}
              </span>
            </Typography>
          </Box>
        </Card>
      </Container>
    );
  }

  // Si SÍ hay usuario, mostramos su Perfil
  const userMetadata = user.user_metadata || {};
  const userName = userMetadata.full_name || userMetadata.name || "Cliente Joined";

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#0a0d15", width: 60, height: 60 }}>
              <PersonIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#0a0d15" }}>
                Hola, {userName}
              </Typography>
              <Typography sx={{ color: "#5E6B7E", fontSize: "0.9rem" }}>
                {user.email}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}
          >
            Cerrar sesión
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h6" sx={{ fontWeight: 700, color: "#0a0d15", mb: 2 }}>
          Mi historial de pedidos
        </Typography>
        
        <Box sx={{ p: 4, bgcolor: "#F8F9FA", borderRadius: 2, textAlign: "center" }}>
          <Typography sx={{ color: "#5E6B7E", mb: 2 }}>
            Aún no tienes pedidos registrados.
          </Typography>
          <Button component={Link} href="/products" variant="contained" sx={{ bgcolor: "#0a0d15", color: "white", textTransform: "none", borderRadius: 2 }}>
            Explorar la colección
          </Button>
        </Box>
      </Card>
    </Container>
  );
}