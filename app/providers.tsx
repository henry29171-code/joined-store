"use client";

import { ThemeProvider, CssBaseline, createTheme, Box } from "@mui/material";
import { responsiveFontSizes } from "@mui/material/styles"; // <-- Importamos esto
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import { NotificationProvider } from "./context/NotificationContext";
import Footer from "./components/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  let theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#0a0d15",
        dark: "#1a1d24",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#D7E0DA",
        contrastText: "#223127",
      },
      background: {
        default: "#F8F9FA",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#0a0d15",
        secondary: "#5E6B7E",
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: `"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
      h1: { fontWeight: 800, letterSpacing: "-0.02em" },
      h2: { fontWeight: 800, letterSpacing: "-0.02em" },
      h3: { fontWeight: 800, letterSpacing: "-0.01em" },
      h4: { fontWeight: 800 },
      h5: { fontWeight: 800 },
      h6: { fontWeight: 700 },
      button: { textTransform: "none", fontWeight: 700 },
      body1: { lineHeight: 1.7 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#F8F9FA",
            color: "#5E6B7E",
            overflowX: "hidden", // Evita scroll horizontal accidental
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#0a0d15",
            color: "#FFFFFF",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            boxShadow: "none",
            padding: "10px 24px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0 10px 30px rgba(10, 13, 21, 0.05)",
            backgroundImage: "none",
          },
        },
      },
    },
  });

  // Esta función ajusta automáticamente los h1-h6 para móviles
  theme = responsiveFontSizes(theme, { factor: 2.5 });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <CartProvider>
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              background: "#F8F9FA",
            }}
          >
            <Navbar />
            <Box component="main" sx={{ flex: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </CartProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}