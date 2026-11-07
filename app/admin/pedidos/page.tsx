"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Container, Typography, Box, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, CircularProgress, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider, Stack,
  Select, MenuItem
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import { supabase } from "../../lib/supabase";

export default function AdminPedidos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (!error && data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    if (!error) {
      fetchOrders(); // Recargar para ver el cambio
    } else {
      alert("Error al actualizar el estado");
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (confirm("¿Estás seguro de cancelar este pedido?")) {
      await handleStatusChange(orderId, "Cancelado");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente": return { bg: "#FEF3C7", text: "#D97706" };
      case "Procesando": return { bg: "#DBEAFE", text: "#2563EB" };
      case "Enviado": return { bg: "#E0E7FF", text: "#4F46E5" };
      case "Entregado": return { bg: "#D1FAE5", text: "#059669" };
      case "Cancelado": return { bg: "#FEE2E2", text: "#DC2626" };
      default: return { bg: "#F3F4F6", text: "#374151" };
    }
  };

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
          <Typography sx={{ color: "#666" }}>Administra los estados y revisa las compras</Typography>
        </Box>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchOrders} sx={{ textTransform: "none", borderColor: "#0a0d15", color: "#0a0d15" }}>
          Actualizar
        </Button>
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
                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell sx={{ fontSize: "0.85rem", color: "#666" }}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{order.customer_name}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>S/. {Number(order.total).toFixed(2)}</TableCell>
                  <TableCell>
                    {/* Selector para cambiar el estado */}
                    <Select
                      size="small"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      sx={{
                        bgcolor: getStatusColor(order.status).bg,
                        color: getStatusColor(order.status).text,
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" }
                      }}
                    >
                      <MenuItem value="Pendiente">Pendiente</MenuItem>
                      <MenuItem value="Procesando">Procesando</MenuItem>
                      <MenuItem value="Enviado">Enviado</MenuItem>
                      <MenuItem value="Entregado">Entregado</MenuItem>
                      <MenuItem value="Cancelado">Cancelado</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => setSelectedOrder(order)}>
                      <VisibilityIcon />
                    </IconButton>
                    {order.status !== "Cancelado" && order.status !== "Entregado" && (
                      <IconButton color="error" onClick={() => handleCancelOrder(order.id)} title="Cancelar pedido">
                        <CancelIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* MODAL (Se mantiene igual) */}
      <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)} fullWidth maxWidth="sm">
        {selectedOrder && (
          <>
            <DialogTitle sx={{ fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Detalle del Pedido
              <IconButton onClick={() => setSelectedOrder(null)}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Información del Cliente</Typography>
              <Typography sx={{ fontSize: "0.9rem", mb: 0.5 }}><strong>Nombre:</strong> {selectedOrder.customer_name}</Typography>
              <Typography sx={{ fontSize: "0.9rem", mb: 0.5 }}><strong>Email:</strong> {selectedOrder.customer_email}</Typography>
              <Typography sx={{ fontSize: "0.9rem", mb: 0.5 }}><strong>Teléfono:</strong> {selectedOrder.customer_phone}</Typography>
              <Typography sx={{ fontSize: "0.9rem", mb: 2 }}><strong>Dirección:</strong> {selectedOrder.shipping_address}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Productos Comprados</Typography>
              <Stack spacing={2}>
                {selectedOrder.items?.map((item: any, index: number) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2, p: 1.5, bgcolor: "#F8F9FA", borderRadius: 2 }}>
                    <Box component="img" src={item.image || "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=100&auto=format&fit=crop"} sx={{ width: 50, height: 50, borderRadius: 1, objectFit: "cover" }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>{item.name}</Typography>
                      <Typography sx={{ fontSize: "0.85rem", color: "#666" }}>Cantidad: {item.quantity}</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 700 }}>S/. {(item.price * item.quantity).toFixed(2)}</Typography>
                  </Box>
                ))}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#0a0d15" }}>S/. {Number(selectedOrder.total).toFixed(2)}</Typography>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
}