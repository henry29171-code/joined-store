"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Container, Typography, Box, Button, TextField, CircularProgress, 
  MenuItem, Select, FormControl, InputLabel, Alert, Snackbar 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { supabase } from "../../lib/supabase";

export default function AdminPaginasLegales() {
  const [pages, setPages] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchPages = async () => {
      const { data, error } = await supabase.from("legal_pages").select("*").order("title");
      if (!error && data) {
        setPages(data);
        if (data.length > 0) {
          setSelectedSlug(data[0].slug);
          setTitle(data[0].title);
          setContent(data[0].content);
        }
      }
      setLoading(false);
    };
    fetchPages();
  }, []);

  const handlePageChange = (slug: string) => {
    setSelectedSlug(slug);
    const page = pages.find(p => p.slug === slug);
    if (page) {
      setTitle(page.title);
      setContent(page.content);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("legal_pages")
      .update({ title, content, updated_at: new Date() })
      .eq("slug", selectedSlug);

    setSaving(false);
    if (!error) {
      setSuccessMsg("Página actualizada correctamente.");
      setPages(pages.map(p => p.slug === selectedSlug ? { ...p, title, content } : p));
    } else {
      alert("Error al guardar: " + error.message);
    }
  };

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}><CircularProgress sx={{ color: "#0a0d15" }} /></Box>;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 3 }}>
        <Button component={Link} href="/admin" startIcon={<ArrowBackIcon />} sx={{ color: "#5E6B7E", textTransform: "none" }}>
          Volver al panel principal
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#0a0d15" }}>Editar páginas legales</Typography>
          <Typography sx={{ color: "#666" }}>Actualiza los textos que ven tus clientes en el pie de página.</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={saving ? <CircularProgress size={20} sx={{ color: "white" }} /> : <SaveIcon />} 
          onClick={handleSave} 
          disabled={saving}
          sx={{ bgcolor: "#0a0d15", "&:hover": { bgcolor: "#1a1d24" }, textTransform: "none", borderRadius: 2, px: 3 }}
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, bgcolor: "#FFF", p: 4, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <FormControl fullWidth size="small">
          <InputLabel>Seleccionar página</InputLabel>
          <Select value={selectedSlug} label="Seleccionar página" onChange={(e) => handlePageChange(e.target.value)}>
            {pages.map((p) => (
              <MenuItem key={p.slug} value={p.slug}>{p.title}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField 
          label="Título de la página" 
          fullWidth 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          size="small"
        />

        <TextField 
          label="Contenido (Puedes usar etiquetas HTML como <p>, <b>, <ul>, <li>)" 
          fullWidth 
          multiline 
          rows={15} 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          sx={{ "& textarea": { fontFamily: "monospace", fontSize: "0.9rem" } }}
        />
      </Box>

      <Snackbar open={!!successMsg} autoHideDuration={4000} onClose={() => setSuccessMsg("")}>
        <Alert severity="success" sx={{ width: '100%' }}>{successMsg}</Alert>
      </Snackbar>
    </Container>
  );
}