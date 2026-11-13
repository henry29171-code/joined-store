"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { useRouter } from "next/navigation";
import {
  AppBar, Toolbar, Typography, Box, IconButton, Badge, InputBase,
  Drawer, List, ListItem, ListItemText, Stack, Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContext";

const navLinks = [
  { name: "Inicio", path: "/" },
  { name: "Colección", path: "/products" },
  { name: "Nosotros", path: "/nosotros" },
  { name: "Contacto", path: "/contacto" },
  { name: "Comunidad", path: "/comunidad" },
];

export default function Navbar() {
  const { state, openCart } = useCart(); 
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const cartItemCount = state?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      if (mobileOpen) setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ width: 250, height: "100%", bgcolor: "#0a0d15", color: "white" }} role="presentation">
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.name} component={Link} href={link.path} onClick={handleDrawerToggle} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
            <ListItemText primary={link.name} sx={{ "& .MuiTypography-root": { fontWeight: 600, fontSize: "1.1rem" } }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* CINTA SUPERIOR EN MOVIMIENTO (Fondo claro, texto oscuro, sin colores) */}
      <Box 
        sx={{ 
          bgcolor: "#F3F4F6", // Gris muy claro
          color: "#0a0d15", // Azul noche
          py: 1, 
          overflow: "hidden", 
          whiteSpace: "nowrap",
          borderBottom: "1px solid #E5E7EB"
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            animation: "marquee 30s linear infinite",
            "@keyframes marquee": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" }
            },
            "&:hover": { animationPlayState: "paused" } 
          }}
        >
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" }}>
            Envíos 100% gratis a nivel nacional exclusivo para miembros de la comunidad. &nbsp;•&nbsp; Únete a la comunidad y accede a beneficios exclusivos. &nbsp;•&nbsp; Envíos 100% gratis a nivel nacional exclusivo para miembros de la comunidad. &nbsp;•&nbsp; Únete a la comunidad y accede a beneficios exclusivos.
          </Typography>
        </Box>
      </Box>

      {/* NAVBAR PRINCIPAL */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#0a0d15", color: "white", top: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 }, minHeight: "70px !important" }}>
          
          {/* LADO IZQUIERDO: Menú móvil + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Image 
                src="/logo.png" 
                alt="Joined Logo" 
                width={110} 
                height={35} 
                style={{ objectFit: "contain" }}
                priority
              />
            </Link>
          </Box>

          {/* CENTRO: Enlaces de navegación */}
          <Stack direction="row" spacing={2} sx={{ display: { xs: "none", md: "flex" } }}>
            {navLinks.map((link) => (
              <Button
                key={link.name}
                component={Link}
                href={link.path}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  px: 1.5,
                  "&:hover": { color: "#9CA3AF", bgcolor: "transparent" },
                }}
              >
                {link.name}
              </Button>
            ))}
          </Stack>

          {/* LADO DERECHO: Buscador + Iconos */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
            
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 99,
                px: 2,
                py: 0.5,
                width: { sm: "200px", md: "250px" },
              }}
            >
              <SearchIcon sx={{ color: "#9CA3AF", fontSize: 20, mr: 1 }} />
              <InputBase
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                sx={{ color: "white", width: "100%", "& input::placeholder": { color: "#9CA3AF", opacity: 1 } }}
              />
            </Box>

            <IconButton component={Link} href="/profile" sx={{ color: "white" }}>
              <PersonIcon />
            </IconButton>

            <IconButton component={Link} href="/admin" sx={{ color: "white", display: { xs: "none", sm: "inline-flex" } }}>
              <SettingsIcon />
            </IconButton>

            <IconButton onClick={openCart} sx={{ color: "white" }}>
              <Badge badgeContent={cartItemCount} color="primary" sx={{ "& .MuiBadge-badge": { bgcolor: "#d32f2f", color: "white" } }}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>

        {/* DRAWER PARA MÓVILES */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", border: "none" } }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </>
  );
}