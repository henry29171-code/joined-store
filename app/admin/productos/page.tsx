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
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { supabase } from "../../lib/supabase";

export default function AdminProductos() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    sale_price: "",
    category: "Morrales",
    description: "",
    image_url: "",
    gallery_images: [] as string[], // <-- GALERÍA DE IMÁGENES
    stock: "0",
    sizes: "", 
    colors: "", 
    characteristics: "", 
    specs_material: "",
    specs_dimensions: "",
    specs_weight: "",
    specs_warranty: ""
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

  // Subir imagen principal
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-main.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('products').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('products').getPublicUrl(filePath);
      setForm({ ...form, image_url: data.publicUrl });
    } catch (error: any) {
      alert('Error subiendo imagen: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Subir galería de imágenes múltiples
  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const files = event.target.files;
      if (!files || files.length === 0) return;
      
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${i}.${fileExt}`;
        
        const { error } = await supabase.storage.from('products').upload(fileName, file);
        if (!error) {
          const { data } = supabase.storage.from('products').getPublicUrl(fileName);
          newUrls.push(data.publicUrl);
        }
      }
      setForm(prev => ({ ...prev, gallery_images: [...prev.gallery_images, ...newUrls] }));
    } catch (error: any) {
      alert('Error subiendo galería: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (urlToRemove: string) => {
    setForm(prev => ({ ...prev, gallery_images: prev.gallery_images.filter(url => url !== urlToRemove) }));
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    
    const sizesString = product.sizes ? product.sizes.join(', ') : "";
    const colorsString = product.colors ? product.colors.join(', ') : "";
    
    let charString = "";
    if (product.characteristics) {
      try { charString = JSON.parse(product.characteristics).join('\n'); } 
      catch (e) { charString = product.characteristics; }
    }

    setForm({
      name: product.name,
      price: product.price.toString(),
      sale_price: product.sale_price ? product.sale_price.toString() : "",
      category: product.category,
      description: product.description || "",
      image_url: product.image_url || "",
      gallery_images: product.gallery_images || [],
      stock: (product.stock || 0).toString(),
      sizes: sizesString,
      colors: colorsString,
      characteristics: charString,
      specs_material: product.specs_material || "",
      specs_dimensions: product.specs_dimensions || "",
      specs_weight: product.specs_weight || "",
      specs_warranty: product.specs_warranty || ""
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setForm({ name: "", price: "", sale_price: "", category: "Morrales", description: "", image_url: "", gallery_images: [], stock: "0", sizes: "", colors: "", characteristics: "", specs_material: "", specs_dimensions: "", specs_weight: "", specs_warranty: "" });
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image_url) {
      alert("Por favor, completa los campos obligatorios (nombre, precio e imagen principal).");
      return;
    }

    const sizesArray = form.sizes ? form.sizes.split(',').map(s => s.trim()) : [];
    const colorsArray = form.colors ? form.colors.split(',').map(c => c.trim()) : [];
    const charArray = form.characteristics ? form.characteristics.split('\n').filter(c => c.trim() !== '') : [];

    const productData = {
      name: form.name,
      price: parseFloat(form.price),
      sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
      category: form.category,
      description: form.description,
      image_url: form.image_url,
      gallery_images: form.gallery_images, // <-- GUARDAR GALERÍA
      stock: parseInt(form.stock),
      sizes: sizesArray,
      colors: colorsArray,
      characteristics: JSON.stringify(charArray), 
      specs_material: form.specs_material,
      specs_dimensions: form.specs_dimensions,
      specs_weight: form.specs_weight,
      specs_warranty: form.specs_warranty,
    };

    if (editingId) {
      const { error } = await supabase.from("products").update(productData).eq("id", editingId);
      if (error) alert("Error al actualizar: " + error.message);
      else { handleClose(); fetchProducts(); }
    } else {
      const { error } = await supabase.from("products").insert([productData]);
      if (error) alert("Error al guardar: " + error.message);
      else { handleClose(); fetchProducts(); }
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
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#0a0d15" }}>Gestión de productos</Typography>
          <Typography sx={{ color: "#666" }}>Administra el catálogo de tu tienda</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, textTransform: "none", fontWeight: 600, borderRadius: "8px", px: 3, py: 1 }}>
          Agregar producto
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}><CircularProgress sx={{ color: "#0a0d15" }} /></Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <Table>
            <TableHead sx={{ bgcolor: "#F8F9FA" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Imagen</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Precio</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Oferta</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Stock</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell><Box component="img" src={product.image_url} sx={{ width: 50, height: 60, objectFit: "cover", borderRadius: 1 }} /></TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{product.name}</TableCell>
                  <TableCell>S/. {Number(product.price).toFixed(2)}</TableCell>
                  <TableCell sx={{ color: "#d32f2f", fontWeight: 600 }}>
                    {product.sale_price ? `S/. ${Number(product.sale_price).toFixed(2)}` : "-"}
                  </TableCell>
                  <TableCell>{product.stock || 0}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEdit(product)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(product.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 700 }}>{editingId ? "Editar producto" : "Nuevo producto"}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mt: 1 }}>
            <TextField fullWidth label="Nombre" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField fullWidth label="Precio Normal (S/.)" type="number" required value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
              <TextField fullWidth label="Precio Oferta (S/.)" type="number" value={form.sale_price} onChange={(e) => setForm({...form, sale_price: e.target.value})} placeholder="Opcional" />
            </Box>
            
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select value={form.category} label="Categoría" onChange={(e) => setForm({...form, category: e.target.value})}>
                {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField fullWidth label="Stock" type="number" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} />

            {/* IMAGEN PRINCIPAL */}
            <Box sx={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 2 }}>
              <Button variant="outlined" component="label" sx={{ textTransform: "none", minWidth: 120 }}>
                {uploading ? "Subiendo..." : "Subir principal"}
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
              {form.image_url && <Box component="img" src={form.image_url} sx={{ width: 40, height: 40, objectFit: "cover", borderRadius: 1 }} />}
              <TextField fullWidth size="small" label="O pega URL principal" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} />
            </Box>

            {/* GALERÍA DE IMÁGENES */}
            <Box sx={{ gridColumn: "1 / -1" }}>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, mb: 1 }}>Galería de imágenes (Fotos adicionales)</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {form.gallery_images.map((img, idx) => (
                  <Box key={idx} sx={{ position: "relative" }}>
                    <Box component="img" src={img} sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: 1 }} />
                    <IconButton size="small" onClick={() => removeGalleryImage(img)} sx={{ position: "absolute", top: -5, right: -5, bgcolor: "white", boxShadow: 1, "&:hover": { bgcolor: "#eee" } }}>
                      <CloseIcon fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                ))}
                <Button variant="outlined" component="label" sx={{ width: 60, height: 60, minWidth: 0, borderRadius: 1 }}>
                  <AddIcon />
                  <input type="file" hidden multiple accept="image/*" onChange={handleGalleryUpload} />
                </Button>
              </Box>
            </Box>

            <TextField fullWidth label="Descripción corta" multiline rows={2} value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} sx={{ gridColumn: "1 / -1" }} />
            
            <TextField fullWidth label="Tallas (separadas por coma)" placeholder="Ej: O/S o 28, 30, 32" value={form.sizes} onChange={(e) => setForm({...form, sizes: e.target.value})} />
            <TextField fullWidth label="Colores (separados por coma)" placeholder="Ej: Negro, Marrón" value={form.colors} onChange={(e) => setForm({...form, colors: e.target.value})} />

            <TextField fullWidth label="Características (una por línea)" multiline rows={3} value={form.characteristics} onChange={(e) => setForm({...form, characteristics: e.target.value})} sx={{ gridColumn: "1 / -1" }} />
            
            <TextField fullWidth label="Material" value={form.specs_material} onChange={(e) => setForm({...form, specs_material: e.target.value})} />
            <TextField fullWidth label="Dimensiones" value={form.specs_dimensions} onChange={(e) => setForm({...form, specs_dimensions: e.target.value})} />
            <TextField fullWidth label="Peso" value={form.specs_weight} onChange={(e) => setForm({...form, specs_weight: e.target.value})} />
            <TextField fullWidth label="Garantía" value={form.specs_warranty} onChange={(e) => setForm({...form, specs_warranty: e.target.value})} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: "#5E6B7E" }}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" disabled={uploading} sx={{ bgcolor: "#0a0d15" }}>
            {editingId ? "Actualizar producto" : "Guardar producto"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}