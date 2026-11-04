"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Container, Typography, Box, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, 
  DialogContent, TextField, DialogActions, IconButton, Chip, CircularProgress, 
  MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { supabase } from "../../lib/supabase";

export default function AdminProductos() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Morrales",
    description: "",
    image_url: ""
  });

  const categories = ["Morrales", "Billeteras", "Correas", "Pulseras", "Relojes", "Perfumes"];

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (!error && data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image_url) {
      alert("Por favor, completa los campos obligatorios (nombre, precio e imagen).");
      return;
    }

    const { error } = await supabase.from("products").insert([
      {
        name: form.name,
        price: parseFloat(form.price),
        category: form.category,
        description: form.description,
        image_url: form.image_url,
      }
    ]);

    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      setForm({ name: "", price: "", category: "Morrales", description: "", image_url: "" });
      setOpen(false);
      fetchProducts();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) alert("Error al eliminar: " + error.message);
      else fetchProducts();
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
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#0a0d15" }}>
            Gestión de productos
          </Typography>
          <Typography sx={{ color: "#666" }}>
            Administra el catálogo de tu tienda
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setOpen(true)}
          sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, textTransform: "none", fontWeight: 600, borderRadius: "8px", px: 3, py: 1 }}
        >
          Agregar producto
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress sx={{ color: "#0a0d15" }} />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <Table>
            <TableHead sx={{ bgcolor: "#F8F9FA" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Imagen</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Categoría</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Precio</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Box component="img" src={product.image_url} alt={product.name} sx={{ width: 50, height: 60, objectFit: "cover", borderRadius: 1 }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{product.name}</TableCell>
                  <TableCell><Chip label={product.category} size="small" sx={{ bgcolor: "#F0F2F5", fontWeight: 600 }} /></TableCell>
                  <TableCell>S/. {Number(product.price).toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => handleDelete(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, color: "#666" }}>
                    No hay productos registrados. ¡Agrega el primero!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* MODAL PARA AGREGAR PRODUCTO */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700 }}>Nuevo producto</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField 
            fullWidth label="Nombre del producto" margin="dense" required
            value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} 
          />
          <TextField 
            fullWidth label="Precio (S/.)" type="number" margin="dense" required
            value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} 
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Categoría</InputLabel>
            <Select
              value={form.category}
              label="Categoría"
              onChange={(e) => setForm({...form, category: e.target.value})}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField 
            fullWidth label="URL de la imagen" margin="dense" required
            placeholder="https://..."
            value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} 
          />
          <TextField 
            fullWidth label="Descripción corta" margin="dense" multiline rows={3}
            value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} 
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: "#5E6B7E" }}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: "#0a0d15" }}>Guardar producto</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}