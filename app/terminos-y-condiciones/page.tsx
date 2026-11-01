import { Container, Typography } from "@mui/material";

export default function TerminosCondiciones() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, color: "#0a0d15" }}>
        Términos y Condiciones
      </Typography>
      
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#142038" }}>1. Uso del sitio web</Typography>
      <Typography sx={{ mb: 2, color: "#5E6B7E", lineHeight: 1.7 }}>
        Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones. El uso indebido del sitio, o la reproducción de su contenido sin autorización, está estrictamente prohibido.
      </Typography>
      
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#142038" }}>2. Precios y disponibilidad</Typography>
      <Typography sx={{ mb: 2, color: "#5E6B7E", lineHeight: 1.7 }}>
        Todos los precios están expresados en Soles Peruanos (S/.) e incluyen IGV. Nos reservamos el derecho de modificar los precios, así como de suspender o retirar productos del catálogo sin previo aviso.
      </Typography>
      
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#142038" }}>3. Propiedad intelectual</Typography>
      <Typography sx={{ mb: 2, color: "#5E6B7E", lineHeight: 1.7 }}>
        Todo el contenido de este sitio (logotipos, imágenes, textos y diseño) es propiedad exclusiva de Joined y está protegido por las leyes nacionales de propiedad intelectual.
      </Typography>
    </Container>
  );
}