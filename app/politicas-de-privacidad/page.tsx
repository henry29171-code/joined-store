import { Container, Typography } from "@mui/material";

export default function PoliticasPrivacidad() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, color: "#0a0d15" }}>
        Políticas de Privacidad
      </Typography>
      
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#142038" }}>1. Información que recopilamos</Typography>
      <Typography sx={{ mb: 2, color: "#5E6B7E", lineHeight: 1.7 }}>
        En Joined, recopilamos información personal como tu nombre, correo electrónico, dirección de envío y número de teléfono cuando realizas una compra o te registras en nuestro sitio. Esta información es estrictamente necesaria para procesar tus pedidos.
      </Typography>
      
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#142038" }}>2. Uso de la información (Ley N° 29733)</Typography>
      <Typography sx={{ mb: 2, color: "#5E6B7E", lineHeight: 1.7 }}>
        De conformidad con la Ley de Protección de Datos Personales (Ley N° 29733), tus datos serán utilizados únicamente para gestionar tus compras, enviar actualizaciones sobre tu pedido y, si lo autorizas, enviarte promociones. No compartimos tu información con terceros no afiliados.
      </Typography>
      
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#142038" }}>3. Tus derechos (Derechos ARCO)</Typography>
      <Typography sx={{ mb: 2, color: "#5E6B7E", lineHeight: 1.7 }}>
        Tienes derecho a acceder, rectificar, cancelar u oponerse al tratamiento de tu información personal. Puedes ejercer estos derechos contactándonos directamente a ventas@Joined.pe.
      </Typography>
    </Container>
  );
}