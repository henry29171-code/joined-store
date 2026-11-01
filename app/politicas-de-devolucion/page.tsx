import { Container, Typography } from "@mui/material";

export default function PoliticasDevolucion() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, color: "#0a0d15" }}>
        Políticas de Devolución
      </Typography>
      
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#142038" }}>1. Plazo para devoluciones</Typography>
      <Typography sx={{ mb: 2, color: "#5E6B7E", lineHeight: 1.7 }}>
        Aceptamos devoluciones dentro de los 30 días calendario posteriores a la recepción del producto. Para ser elegible, el artículo debe estar en su empaque original, sin uso, con todas sus etiquetas y en las mismas condiciones en que lo recibiste.
      </Typography>
      
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#142038" }}>2. Proceso de devolución</Typography>
      <Typography sx={{ mb: 2, color: "#5E6B7E", lineHeight: 1.7 }}>
        Para iniciar una devolución, escríbenos a ventas@Joined.pe indicando tu número de orden, el producto a devolver y el motivo. Nuestro equipo te brindará las instrucciones para el envío de retorno.
      </Typography>
      
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 1, color: "#142038" }}>3. Reembolsos</Typography>
      <Typography sx={{ mb: 2, color: "#5E6B7E", lineHeight: 1.7 }}>
        Una vez recibido y verificado el producto, procesaremos el reembolso al mismo método de pago utilizado en la compra. El plazo máximo para reflejar el reembolso es de 10 días hábiles. Los costos de envío originales no son reembolsables.
      </Typography>
    </Container>
  );
}