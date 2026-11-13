"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { useCart } from "@/app/context/CartContext";
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Badge, Stack, InputBase,
  Drawer, List, ListItem, ListItemText, ListItemButton
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Nuevo ícono
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state } = useCart();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Verificamos el usuario al cargar y cada vez que cambia de ruta
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();
  }, [pathname]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Lógica: ¿Es admin?
  const isAdmin = user?.email === 'henry29171@gmail.com';

  const drawerContent = (
    <Box sx={{ width: 260, bgcolor: "#0a0d15", height: "100%", color: "white" }} role="presentation">
      <Box sx={{ p: 3, display: "flex", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <Image src="/logo.png" alt="Joined" width={120} height={35} style={{ height: "35px", width: "auto", objectFit: "contain" }} />
      </Box>
      <List sx={{ pt: 2 }}>
        {[
          { label: "Inicio", href: "/" },
          { label: "Colección", href: "/products" },
          { label: "Nosotros", href: "/nosotros" },
          { label: "Contacto", href: "/contacto" },
        ].map((link) => (
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
        {user && (
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/profile" onClick={handleDrawerToggle}>
              <ListItemText primary="Mi cuenta" primaryTypographyProps={{ fontWeight: 600, fontSize: "1.1rem" }} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ bgcolor: "#D7E0DA", color: "#0a0d15", py: 0.8, overflow: "hidden", whiteSpace: "nowrap" }}>
        <Box sx={{
            display: "inline-block", animation: "marquee 25s linear infinite",
            "@keyframes marquee": { "0%": { transform: "translateX(100vw)" }, "100%": { transform: "translateX(-100%)" } },
          }}>
          <Typography component="span" sx={{ mx: 4, fontWeight: 700, fontSize: "0.8rem" }}>
            🚚 ¡Envíos 100% gratis a Lima Metropolitana exclusivo para miembros de la Comunidad!
          </Typography>
          <Typography component="span" sx={{ mx: 4, fontWeight: 700, fontSize: "0.8rem" }}>
            ✨ Únete al Club Joined VIP y accede a beneficios exclusivos
          </Typography>
        </Box>
      </Box>

      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#0a0d15", color: "#F8FAF8" }}>
        <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: 60, md: 72 }, px: { xs: 1, md: 3 } }}>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <MenuIcon />
            </IconButton>

            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.5rem" } }}>Joined</Typography>
            </Link>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: "none", md: "flex" }, ml: 4 }}>
              {[
                { label: "Inicio", href: "/" },
                { label: "Colección", href: "/products" },
                { label: "Nosotros", href: "/nosotros" },
                { label: "Contacto", href: "/contacto" },
              ].map((link) => (
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

          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 } }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", bgcolor: "rgba(255,255,255,0.1)", borderRadius: 999, px: 2, py: 0.5, width: 200 }}>
              <SearchIcon sx={{ color: "white", mr: 1, fontSize: 20 }} />
              <InputBase placeholder="Buscar..." 
                 onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                     const value = (e.target as HTMLInputElement).value;
                     router.push(`/search?q=${encodeURIComponent(value)}`);
                   }
                 }}
                 sx={{ color: "white", fontSize: "0.9rem", width: "100%" }} />
            </Box>

            {/* ÍCONO DE USUARIO DINÁMICO */}
            <IconButton component={Link} href={user ? "/profile" : "/login"} sx={{ color: "white" }}>
              {user ? <AccountCircleIcon /> : <PersonIcon />}
            </IconButton>
            
            {/* BOTÓN DE ADMIN (Solo visible para Henry) */}
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