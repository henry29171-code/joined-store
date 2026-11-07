"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Container, Typography, Box, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, CircularProgress, Chip, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider, Stack,
  Select, MenuItem, Tooltip
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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

  // Lógica de WhatsApp (Manual y Automática)
  const sendWhatsAppNotification = (order: any, newStatus?: string) => {
    let phone = order.customer_phone.replace(/\s+/g, '').replace(/-/g, '');
    if (!phone.startsWith('51')) {
      phone = `51${phone}`;
    }
    const shortId = order.id.slice(0, 8).toUpperCase();
    const statusToSend = newStatus || order.status;
    
    const message = `Hola ${order.customer_name}, te saludamos de *Joined* 🛍️.\n\nTe informamos que el estado de tu pedido *#${shortId}* ha sido actualizado a: *${statusToSend}*.\n\nGracias por tu compra.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleStatusChange = async (order: any, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", order.id);
    if (!error) {
      fetchOrders(); 
      // SI EL CLIENTE AUTORIZÓ, ENVIAMOS EL WHATSAPP AUTOMÁTICAMENTE
      if (order.whatsapp_opt_in) {
        sendWhatsAppNotification(order, newStatus);
      }
    } else {
      alert("Error al actualizar el estado");
    }
  };

  const handleCancelOrder = async (order: any) => {
    if (confirm("¿Estás seguro de cancelar este pedido?")) {
      await handleStatusChange(order, "Cancelado");
    }
  };

  // PALETA DE COLORES: Solo Azul Noche, Grises y Rojo
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pendiente": return { bg: "#F3F4F6", text: "#4B5563" }; // Gris claro / Texto gris oscuro
      case "Procesando": return { bg: "#E5E7EB", text: "#1F2937" }; // Gris medio / Texto casi negro
      case "Enviado": return { bg: "#0a0d15", text: "#FFFFFF" };   // Azul noche / Texto blanco
      case "Entregado": return { bg: "#1a1d24", text: "#FFFFFF" }; // Azul noche más claro / Texto blanco
      case "Cancelado": return { bg: "#FEE2E2", text: "#DC2626" }; // Rojo suave / Texto rojo
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
                <TableCell sx={{ fontWeight: 700 }}>WhatsApp</TableCell>
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
                    <Select
                      size="small"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                      sx={{
                        bgcolor: getStatusStyle(order.status).bg,
                        color: getStatusStyle(order.status).text,
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        "& .MuiSvgIcon-root": { color: getStatusStyle(order.status).text }
                      }}
                    >
                      <MenuItem value="Pendiente">Pendiente</MenuItem>
                      <MenuItem value="Procesando">Procesando</MenuItem>
                      <MenuItem value="Enviado">Enviado</MenuItem>
                      <MenuItem value="Entregado">Entregado</MenuItem>
                      <MenuItem value="Cancelado">Cancelado</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {/* Indicador de permiso sutil */}
                    {order.whatsapp_opt_in ? (
                      <Tooltip title="Cliente aceptó notificaciones automáticas">
                        <CheckCircleIcon sx={{ color: "#0a0d15", fontSize: 20 }} />
                      </Tooltip>
                    ) : (
                      <Typography sx={{ fontSize: "0.75rem", color: "#9CA3AF" }}>Sin permiso</Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {/* BOTÓN DE WHATSAPP MANUAL RESTAURADO */}
                    <Tooltip title="Enviar mensaje manual por WhatsApp">
                      <IconButton 
                        onClick={() => sendWhatsAppNotification(order)} 
                        sx={{ color: "#0a0d15", mr: 1, "&:hover": { bgcolor: "#F3F4F6" } }}
                      >
                        <WhatsAppIcon />
                      </IconButton>
                    </Tooltip>

                    <IconButton color="primary" onClick={() => setSelectedOrder(order)}>
                      <VisibilityIcon />
                    </IconButton>
                    
                    {order.status !== "Cancelado" && order.status !== "Entregado" && (
                      <IconButton color="error" onClick={() => handleCancelOrder(order)} title="Cancelar pedido">
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

      {/* MODAL DE DETALLE */}
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