"use client";
import { Container, Typography, Box, Grid, Card, CardContent, Button, TextField } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";

export default function ContactoPage() {
  // Estilos compartidos para los 3 botones para mantener la consistencia
  const buttonStyles = {
    color: "#0a0d15",
    borderColor: "#0a0d15",
    fontWeight: 700,
    textTransform: "none",
    borderRadius: 999,
    py: 1.2,
    transition: "all 0.3s ease",
    "&:hover": {
      bgcolor: "#0a0d15",
      color: "white",
      borderColor: "#0a0d15",
    },
  };

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", pb: 10 }}>
      
      {/* 1. Encabezado */}
      <Box sx={{ textAlign: "center", pt: 10, pb: 6, px: 2 }}>
        <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em" }}>
          Servicio al Cliente
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15", mt: 1, mb: 2, fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
          Estamos aquí para ti
        </Typography>
        <Typography sx={{ color: "#5E6B7E", maxWidth: 600, mx: "auto", fontSize: "1.05rem", lineHeight: 1.7 }}>
          ¿Tienes dudas sobre nuestros productos, tu pedido o quieres asesoría personalizada? Elige el canal que prefieras, estamos listos para ayudarte.
        </Typography>
      </Box>

      <Container maxWidth="lg">
        
        {/* 2. Canales Directos */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          
          {/* WhatsApp */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ 
              height: "100%", borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", 
              transition: "all 0.3s ease", 
              "&:hover": { transform: "translateY(-5px)", boxShadow: "0 15px 40px rgba(0,0,0,0.1)" },
              border: "1px solid rgba(10,13,21,0.1)"
            }}>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <WhatsAppIcon sx={{ fontSize: 60, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "#0a0d15" }}>
                  WhatsApp Directo
                </Typography>
                <Typography sx={{ color: "#5E6B7E", mb: 3, fontSize: "0.95rem" }}>
                  Chatea con un asesor en tiempo real. Respuesta inmediata.
                </Typography>
                <Button 
                  variant="outlined" 
                  fullWidth
                  href="https://wa.me/51904192047?text=Hola%20Joined,%20estoy%20en%20la%20web%20y%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20personalizada."
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={buttonStyles}
                >
                  Enviar Mensaje
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Instagram */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ 
              height: "100%", borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", 
              transition: "all 0.3s ease", 
              "&:hover": { transform: "translateY(-5px)", boxShadow: "0 15px 40px rgba(0,0,0,0.1)" },
              border: "1px solid rgba(10,13,21,0.1)"
            }}>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <InstagramIcon sx={{ fontSize: 60, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "#0a0d15" }}>
                  Instagram DM
                </Typography>
                <Typography sx={{ color: "#5E6B7E", mb: 3, fontSize: "0.95rem" }}>
                  Síguenos y envíanos un mensaje directo con tus dudas.
                </Typography>
                <Button 
                  variant="outlined" 
                  fullWidth
                  href="https://ig.me/m/joined.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={buttonStyles}
                >
                  Enviar DM
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Messenger */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ 
              height: "100%", borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", 
              transition: "all 0.3s ease", 
              "&:hover": { transform: "translateY(-5px)", boxShadow: "0 15px 40px rgba(0,0,0,0.1)" },
              border: "1px solid rgba(10,13,21,0.1)"
            }}>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <FacebookIcon sx={{ fontSize: 60, color: "#0a0d15", mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "#0a0d15" }}>
                  Facebook Messenger
                </Typography>
                <Typography sx={{ color: "#5E6B7E", mb: 3, fontSize: "0.95rem" }}>
                  Conéctate con nosotros a través de nuestra página de Facebook.
                </Typography>
                <Button 
                  variant="outlined" 
                  fullWidth
                  href="https://m.me/joined.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={buttonStyles}
                >
                  Abrir Messenger
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 3. Formulario de Consulta */}
        <Grid container spacing={6} justifyContent="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", bgcolor: "white" }}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <EmailIcon sx={{ fontSize: 40, color: "#0a0d15", mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#0a0d15" }}>
                  Déjanos un mensaje
                </Typography>
                <Typography sx={{ color: "#5E6B7E", mt: 1 }}>
                  ¿Prefieres escribirnos? Llena el formulario y te responderemos a la brevedad.
                </Typography>
              </Box>
              
              <Box component="form" onSubmit={(e) => e.preventDefault()}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Nombre completo" variant="outlined" required />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Correo electrónico" type="email" variant="outlined" required />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth label="Mensaje o consulta" multiline rows={4} variant="outlined" required />
                  </Grid>
                  <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large"
                      sx={{ 
                        bgcolor: "#0a0d15", 
                        color: "white", 
                        fontWeight: 700, 
                        px: 6, 
                        py: 1.5,
                        textTransform: "none",
                        borderRadius: 999,
                        "&:hover": { bgcolor: "#1a1d24" }
                      }}
                    >
                      Enviar Mensaje
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}