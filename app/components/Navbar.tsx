"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { useCart } from "@/app/context/CartContext";
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Badge, Stack, InputBase 
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { state } = useCart();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAdmin(!!user);
    };
    checkUser();
  }, [pathname]);

  return (
    <>
      {/* Cinta de Anuncios */}
      <Box 
        sx={{ 
          bgcolor: "#D7E0DA", 
          color: "#0a0d15", 
          py: 0.8, 
          overflow: "hidden", 
          whiteSpace: "nowrap",
          borderBottom: "1px solid rgba(10,13,21,0.1)"
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            animation: "marquee 25s linear infinite",
            "@keyframes marquee": {
              "0%": { transform: "translateX(100vw)" },
              "100%": { transform: "translateX(-100%)" },
            },
          }}
        >
          <Typography component="span" sx={{ mx: 4, fontWeight: 700, fontSize: "0.85rem" }}>
            🚚 ¡Envíos gratis a toda Lima Metropolitana por compras mayores a S/. 150!
          </Typography>
          <Typography component="span" sx={{ mx: 4, fontWeight: 700, fontSize: "0.85rem" }}>
            ✨ Nueva colección de morrales de cuero disponible
          </Typography>
          <Typography component="span" sx={{ mx: 4, fontWeight: 700, fontSize: "0.85rem" }}>
            🛍️ Compra 100% segura
          </Typography>
        </Box>
      </Box>

      {/* Barra de Navegación Principal */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#0a0d15", color: "#F8FAF8", top: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between", minHeight: 72 }}>
          
          {/* Lado Izquierdo: Logo y Navegación */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, md: 3 } }}>
            
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: "-0.02em", color: "white", mr: 2 }}>
                Joined
              </Typography>
            </Link>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "white", opacity: 0.8, fontWeight: 600, fontSize: "0.9rem", "&:hover": { opacity: 1 } }}>Inicio</Typography>
              </Link>
              <Link href="/products" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "white", opacity: 0.8, fontWeight: 600, fontSize: "0.9rem", "&:hover": { opacity: 1 } }}>Colección</Typography>
              </Link>
              <Link href="/nosotros" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "white", opacity: 0.8, fontWeight: 600, fontSize: "0.9rem", "&:hover": { opacity: 1 } }}>Nosotros</Typography>
              </Link>
              <Link href="/contacto" style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "white", opacity: 0.8, fontWeight: 600, fontSize: "0.9rem", "&:hover": { opacity: 1 } }}>Contacto</Typography>
              </Link>
              
              {/* Botón de Comunidad Resaltado */}
              <Link href="/comunidad" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  startIcon={<GroupIcon />}
                  sx={{
                    bgcolor: "white",
                    color: "#0a0d15",
                    fontWeight: 800,
                    textTransform: "none",
                    borderRadius: 999,
                    px: 2.5,
                    py: 0.6,
                    boxShadow: "none",
                    "&:hover": { 
                      bgcolor: "#F0F0F0", 
                      boxShadow: "0 4px 10px rgba(255,255,255,0.2)" 
                    },
                  }}
                >
                  Comunidad
                </Button>
              </Link>
            </Stack>
          </Box>

          {/* Lado Derecho: Buscador e Iconos */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
            
            <Box 
              sx={{ 
                display: { xs: "none", md: "flex" }, 
                alignItems: "center", 
                bgcolor: "rgba(255,255,255,0.1)", 
                borderRadius: 999, 
                px: 2, 
                py: 0.5,
                width: 200,
                transition: "all 0.3s",
                "&:focus-within": { bgcolor: "rgba(255,255,255,0.15)", width: 240 }
              }}
            >
              <SearchIcon sx={{ color: "white", mr: 1, fontSize: 20 }} />
              <InputBase 
                placeholder="Buscar..." 
                sx={{ color: "white", fontSize: "0.9rem", width: "100%", "& input::placeholder": { color: "rgba(255,255,255,0.6)", opacity: 1 } }} 
              />
            </Box>

            <IconButton sx={{ color: "white", display: { xs: "flex", md: "none" } }}>
              <SearchIcon />
            </IconButton>

            <IconButton component={Link} href="/login" sx={{ color: "white" }}>
              <PersonIcon />
            </IconButton>

            {isAdmin && (
              <Link href="/admin" style={{ textDecoration: "none" }}>
                <IconButton sx={{ color: "white", display: { xs: "flex", md: "none" } }}>
                  <SettingsIcon />
                </IconButton>
                <Button startIcon={<SettingsIcon />} sx={{ color: "white", fontWeight: 700, display: { xs: "none", md: "flex" } }}>
                  Admin
                </Button>
              </Link>
            )}
            
            <IconButton component={Link} href="/cart" sx={{ color: "white" }}>
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}