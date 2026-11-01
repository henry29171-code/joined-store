"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { useCart } from "@/app/context/CartContext";
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Badge, Stack, InputBase,
  Drawer, List, ListItem, ListItemText, ListItemButton, Divider
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Colección", href: "/products" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box sx={{ width: 260, bgcolor: "#0a0d15", height: "100%", color: "white" }} role="presentation">
      <Box sx={{ p: 3, display: "flex", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>Joined</Typography>
      </Box>
      <List sx={{ pt: 2 }}>
        {navLinks.map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton component={Link} href={link.href} onClick={handleDrawerToggle}>
              <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600, fontSize: "1.1rem" }} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/comunidad" onClick={handleDrawerToggle}>
            <ListItemText primary="Comunidad" primaryTypographyProps={{ fontWeight: 800, color: "#D7E0DA", fontSize: "1.1rem" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Cinta de Anuncios */}
      <Box sx={{ bgcolor: "#D7E0DA", color: "#0a0d15", py: 0.8, overflow: "hidden", whiteSpace: "nowrap" }}>
        <Box sx={{
            display: "inline-block", animation: "marquee 25s linear infinite",
            "@keyframes marquee": { "0%": { transform: "translateX(100vw)" }, "100%": { transform: "translateX(-100%)" } },
          }}>
          <Typography component="span" sx={{ mx: 4, fontWeight: 700, fontSize: "0.8rem" }}>🚚 ¡Envíos gratis a Lima Metropolitana por compras mayores a S/. 150!</Typography>
          <Typography component="span" sx={{ mx: 4, fontWeight: 700, fontSize: "0.8rem" }}>✨ Nueva colección de morrales disponible</Typography>
        </Box>
      </Box>

      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#0a0d15", color: "#F8FAF8" }}>
        <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: 60, md: 72 }, px: { xs: 1, md: 3 } }}>
          
          {/* Lado Izquierdo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Botón Hamburguesa - Forzado a mostrarse en móvil */}
            <IconButton 
              color="inherit" 
              onClick={handleDrawerToggle} 
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            >
              <MenuIcon />
            </IconButton>

            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.5rem" } }}>Joined</Typography>
            </Link>

            {/* Links Escritorio */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: "none", md: "flex" }, ml: 4 }}>
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} style={{ textDecoration: "none" }}>
                  <Typography sx={{ color: "white", opacity: 0.8, fontWeight: 600, fontSize: "0.9rem", "&:hover": { opacity: 1 } }}>{link.label}</Typography>
                </Link>
              ))}
              <Link href="/comunidad" style={{ textDecoration: "none" }}>
                <Button variant="contained" startIcon={<GroupIcon />} sx={{ bgcolor: "white", color: "#0a0d15", fontWeight: 800, textTransform: "none", borderRadius: 999, px: 2, py: 0.5, "&:hover": { bgcolor: "#F0F0F0" } }}>
                  Comunidad
                </Button>
              </Link>
            </Stack>
          </Box>

          {/* Lado Derecho */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 } }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", bgcolor: "rgba(255,255,255,0.1)", borderRadius: 999, px: 2, py: 0.5, width: 200 }}>
              <SearchIcon sx={{ color: "white", mr: 1, fontSize: 20 }} />
              <InputBase placeholder="Buscar..." sx={{ color: "white", fontSize: "0.9rem", width: "100%" }} />
            </Box>

            <IconButton component={Link} href="/login" sx={{ color: "white" }}><PersonIcon /></IconButton>
            
            {isAdmin && (
              <Link href="/admin" style={{ textDecoration: "none" }}>
                <IconButton sx={{ color: "white" }}><SettingsIcon /></IconButton>
              </Link>
            )}
            
            <IconButton component={Link} href="/cart" sx={{ color: "white" }}>
              <Badge badgeContent={totalItems} color="error"><ShoppingCartIcon /></Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: "block", md: "none" } }}>
        {drawerContent}
      </Drawer>
    </>
  );
}