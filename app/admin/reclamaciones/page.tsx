"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { supabase } from "../../lib/supabase";

export default function AdminReclamaciones() {
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);

  useEffect(() => {
    const fetchClaims = async () => {
      const { data, error } = await supabase.from("claims").select("*").order("created_at", { ascending: false });
      if (!error && data) setClaims(data);
      setLoading(false);
    };
    fetchClaims();
  }, []);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}><CircularProgress sx={{ color: "#0a0d15" }} /></Box>;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 3 }}>
        <Button component={Link} href="/admin" startIcon={<ArrowBackIcon />} sx={{ color: "#5E6B7E", textTransform: "none" }}>Volver al panel principal</Button>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 700, color: "#0a0d15", mb: 4 }}>Libro de reclamaciones</Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#F8F9FA" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Ver detalle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell sx={{ fontSize: "0.85rem" }}>{new Date(claim.created_at).toLocaleDateString()}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{claim.nombre_completo}</TableCell>
                <TableCell>
                  <Chip label={claim.tipo} size="small" sx={{ bgcolor: claim.tipo === "Reclamo" ? "#FEE2E2" : "#F3F4F6", color: claim.tipo === "Reclamo" ? "#DC2626" : "#4B5563", fontWeight: 600 }} />
                </TableCell>
                <TableCell>{claim.estado}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => setSelectedClaim(claim)} color="primary"><VisibilityIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {claims.length === 0 && (
              <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4, color: "#666" }}>No hay reclamos registrados.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL DE DETALLE */}
      <Dialog open={!!selectedClaim} onClose={() => setSelectedClaim(null)} fullWidth maxWidth="sm">
        {selectedClaim && (
          <>
            <DialogTitle sx={{ fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
              Detalle del {selectedClaim.tipo.toLowerCase()}
              <IconButton onClick={() => setSelectedClaim(null)}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={1.5}>
                <Typography sx={{ fontSize: "0.9rem" }}><strong>Fecha:</strong> {new Date(selectedClaim.created_at).toLocaleString()}</Typography>
                <Typography sx={{ fontSize: "0.9rem" }}><strong>Cliente:</strong> {selectedClaim.nombre_completo}</Typography>
                <Typography sx={{ fontSize: "0.9rem" }}><strong>Documento:</strong> {selectedClaim.documento_identidad}</Typography>
                <Typography sx={{ fontSize: "0.9rem" }}><strong>Email:</strong> {selectedClaim.email}</Typography>
                <Typography sx={{ fontSize: "0.9rem" }}><strong>Teléfono:</strong> {selectedClaim.telefono}</Typography>
                <Typography sx={{ fontSize: "0.9rem" }}><strong>Domicilio:</strong> {selectedClaim.direccion}</Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Typography sx={{ fontSize: "0.9rem" }}><strong>Producto/Servicio:</strong> {selectedClaim.bien_contratado}</Typography>
                <Typography sx={{ fontSize: "0.9rem" }}><strong>Monto reclamado:</strong> S/. {selectedClaim.monto_reclamado || "0.00"}</Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>Detalle de los hechos:</Typography>
                <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 2, fontSize: "0.9rem" }}>{selectedClaim.detalle}</Typography>
                
                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>Pedido del cliente:</Typography>
                <Typography sx={{ bgcolor: "#F8F9FA", p: 2, borderRadius: 2, fontSize: "0.9rem" }}>{selectedClaim.pedido_cliente}</Typography>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedClaim(null)} sx={{ color: "#0a0d15", fontWeight: 700 }}>Cerrar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}