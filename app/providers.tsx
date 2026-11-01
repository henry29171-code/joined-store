"use client";

import { ThemeProvider, CssBaseline, createTheme, Box } from "@mui/material";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import { NotificationProvider } from "./context/NotificationContext";
import Footer from "./components/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
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
        primary: "#0a0d15", // Usamos tu azul oscuro para títulos
        secondary: "#5E6B7E", // Gris para párrafos
      },
    },
    shape: {
      borderRadius: 10,
    },
    // 🌟 JERARQUÍA TIPOGRÁFICA GLOBAL
    typography: {
      fontFamily: `"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
      h1: {
        fontWeight: 800,
        fontSize: "3.5rem",
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontWeight: 800,
        fontSize: "2.8rem",
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontWeight: 800,
        fontSize: "2.2rem",
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 800,
        fontSize: "1.8rem", // Estandarizado para títulos de sección
        lineHeight: 1.3,
      },
      h5: {
        fontWeight: 800,
        fontSize: "1.4rem",
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 700,
        fontSize: "1.2rem", // Estandarizado para títulos de tarjetas
        lineHeight: 1.4,
      },
      body1: {
        fontSize: "1.05rem", // Texto normal
        lineHeight: 1.7,
      },
      body2: {
        fontSize: "0.95rem", // Texto pequeño
        lineHeight: 1.6,
      },
      button: {
        textTransform: "none",
        fontWeight: 700,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#F8F9FA",
            color: "#5E6B7E", // Color por defecto para todo el texto
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
      MuiToolbar: {
        styleOverrides: {
          root: {
            justifyContent: "space-between",
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
            backgroundImage: "none", // Evita gradientes raros por defecto
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            borderRadius: 999,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8, // Inputs con bordes ligeramente redondeados
            },
          },
        },
      },
    },
  });

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