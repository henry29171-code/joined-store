"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Container, Typography, Box, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, CircularProgress, Chip, IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { supabase } from "../../lib/supabase";

export default function AdminPedidos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (!error && data) setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 3 }}>
        <Button component={Link} href="/admin" startIcon={<ArrowBackIcon />} sx={{ color: "#5E6B7E", textTransform: "none" }}>
          Volver al panel principal
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#0a0d15" }}>Gestión de pedidos</Typography>
          <Typography sx={{ color: "#666" }}>Revisa las compras de tus clientes</Typography>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}><CircularProgress sx={{ color: "#0a0d15" }} /></Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <Table>
            <TableHead sx={{ bgcolor: "#F8F9FA" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Cliente</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Contacto</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell sx={{ fontSize: "0.85rem", color: "#666" }}>
                    {new Date(order.created_at).toLocaleDateString()} <br/>
                    {new Date(order.created_at).toLocaleTimeString()}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{order.customer_name}</TableCell>
                  <TableCell sx={{ fontSize: "0.85rem" }}>
                    {order.customer_email} <br/> {order.customer_phone}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>S/. {Number(order.total).toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip label={order.status} size="small" sx={{ bgcolor: "#FEF3C7", color: "#D97706", fontWeight: 700 }} />
                  </TableCell>
                  <TableCell align="right">
                    {/* Aquí a futuro podremos ver el detalle de los productos comprados */}
                    <IconButton color="primary"><VisibilityIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#666" }}>
                    Aún no hay pedidos registrados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}