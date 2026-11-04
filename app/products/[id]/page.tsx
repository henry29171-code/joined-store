"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Container, Typography, Box, Grid, Button, Stack, CircularProgress, Breadcrumbs, 
  Link as MuiLink, Divider, Accordion, AccordionSummary, AccordionDetails, Select, MenuItem, FormControl 
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useCart } from "../../context/CartContext";
import { supabase } from "../../lib/supabase";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("Única");
  const [selectedColor, setSelectedColor] = useState("Negro");

  useEffect(() => {
    const fetchProductData = async () => {
      if (!params.id) return;
      setLoading(true);
      const { data: productData } = await supabase.from("products").select("*").eq("id", params.id).single();
      if (productData) {
        setProduct(productData);
        const { data: relatedData } = await supabase.from("products").select("*").eq("category", productData.category).neq("id", productData.id).limit(3);
        if (relatedData) setRelatedProducts(relatedData);
      }
      setLoading(false);
    };
    fetchProductData();
  }, [params.id]);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}><CircularProgress sx={{ color: "#DB6B2C" }} /></Box>;
  if (!product) return <Container maxWidth="md" sx={{ py: 15, textAlign: "center" }}><Typography variant="h4">Producto no encontrado</Typography></Container>;

  const hideVariants = ["Perfumes", "Relojes"].includes(product.category);
  
  const getSizeOptions = () => {
    if (product.category === "Morrales" || product.category === "Billeteras" || product.category === "Correas") return ["Única"];
    if (product.category === "Pulseras") return ["S", "M", "L"];
    return ["Única"];
  };

  const handleComprarAhora = () => {
    addToCart({ ...product, image: product.image_url });
    router.push("/checkout");
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs separator="›" sx={{ fontSize: "0.8rem", color: "#A0AEC0" }}>
          <MuiLink component={Link} href="/" underline="hover" color="inherit">Inicio</MuiLink>
          <MuiLink component={Link} href="/products" underline="hover" color="inherit">Colección</MuiLink>
          <MuiLink component={Link} href={`/products?category=${product.category}`} underline="hover" color="inherit">{product.category}</MuiLink>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
        
        {/* Lado Izquierdo: Imagen */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ width: "100%", bgcolor: "#F7FAFC", borderRadius: "12px", p: 2, mb: 2 }}>
            <Box component="img" src={product.image_url} alt={product.name} sx={{ width: "100%", aspectRatio: "1/1", objectFit: "contain", display: "block" }} />
          </Box>
          <Stack direction="row" spacing={1}>
            {[1, 2, 3, 4].map((i) => (
              <Box key={i} sx={{ width: 60, height: 60, bgcolor: "#F7FAFC", borderRadius: "4px", border: i === 1 ? "2px solid #DB6B2C" : "1px solid #E2E8F0", overflow: "hidden", cursor: "pointer" }}>
                <Box component="img" src={product.image_url} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Lado Derecho: Información */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2.5}>
            <Typography variant="h4" sx={{ fontWeight: 500, color: "#2D3748", fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
              {product.name}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 400, color: "#4A5568" }}>
              S/. {Number(product.price).toFixed(2)}
            </Typography>

            <Divider sx={{ my: 1, borderColor: "#E2E8F0" }} />

            {!hideVariants && (
              <>
                <Box>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#2D3748", mb: 1 }}>Seleccionar tamaño</Typography>
                  <FormControl fullWidth size="small">
                    <Select 
                      value={selectedSize} 
                      onChange={(e) => setSelectedSize(e.target.value)}
                      sx={{ borderRadius: "8px", bgcolor: "#FFF", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E0" } }}
                    >
                      {getSizeOptions().map((size) => (
                        <MenuItem key={size} value={size}>{size === "Única" ? "Única (Ajuste estándar)" : `Talla ${size}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#2D3748", mb: 1 }}>Color</Typography>
                  <Stack direction="row" spacing={1}>
                    {["Negro", "Marrón", "Azul"].map((color) => (
                      <Box 
                        key={color} onClick={() => setSelectedColor(color)}
                        sx={{ 
                          px: 2, py: 1, border: "1px solid", borderColor: selectedColor === color ? "#DB6B2C" : "#CBD5E0",
                          cursor: "pointer", fontSize: "0.85rem", fontWeight: selectedColor === color ? 600 : 400,
                          color: selectedColor === color ? "#2D3748" : "#718096", bgcolor: selectedColor === color ? "#FFF5F0" : "transparent",
                          borderRadius: "8px"
                        }}
                      >
                        {color}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </>
            )}

            {/* BOTONES NARANJA */}
            <Button 
              variant="contained" onClick={handleComprarAhora} fullWidth
              sx={{ bgcolor: "#DB6B2C", color: "white", py: 1.5, borderRadius: "8px", fontWeight: 600, fontSize: "1rem", boxShadow: "0 4px 10px rgba(219, 107, 44, 0.2)", mt: 2, "&:hover": { bgcolor: "#B7551D", boxShadow: "0 6px 15px rgba(219, 107, 44, 0.3)" } }}
            >
              Añadir a la cesta
            </Button>
            
            <Button 
              variant="outlined" onClick={() => addToCart({ ...product, image: product.image_url })} fullWidth
              sx={{ borderColor: "#DB6B2C", color: "#DB6B2C", py: 1.5, borderRadius: "8px", fontWeight: 600, fontSize: "1rem", "&:hover": { bgcolor: "#FFF5F0", borderColor: "#B7551D" } }}
            >
              Comprar ahora
            </Button>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#718096", mt: 1 }}>
              <LocalShippingIcon fontSize="small" />
              <Typography sx={{ fontSize: "0.85rem" }}>Envío gratis a todo el Perú (Miembros VIP)</Typography>
            </Box>

            <Typography sx={{ color: "#4A5568", fontSize: "0.95rem", lineHeight: 1.6, pt: 2 }}>
              {product.description}
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      {/* Acordeones */}
      <Box sx={{ mt: 8, borderTop: "1px solid #E2E8F0", pt: 4 }}>
        <Accordion elevation={0} sx={{ bgcolor: "transparent", "&:before": { display: "none" } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
            <Typography sx={{ fontWeight: 500, fontSize: "1.1rem", color: "#2D3748" }}>Características</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, color: "#4A5568", fontSize: "0.9rem" }}>
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              <li>Diseño minimalista y atemporal.</li>
              <li>Materiales de alta durabilidad.</li>
              <li>Garantía de 1 año incluida.</li>
            </ul>
          </AccordionDetails>
        </Accordion>
        <Divider sx={{ borderColor: "#E2E8F0" }} />
        <Accordion elevation={0} sx={{ bgcolor: "transparent", "&:before": { display: "none" } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
            <Typography sx={{ fontWeight: 500, fontSize: "1.1rem", color: "#2D3748" }}>Especificaciones</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, color: "#4A5568", fontSize: "0.9rem" }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}><strong>Material:</strong> Cuero / Acero</Grid>
              <Grid size={{ xs: 6 }}><strong>Peso:</strong> Variable</Grid>
              <Grid size={{ xs: 6 }}><strong>Garantía:</strong> 1 año</Grid>
              <Grid size={{ xs: 6 }}><strong>Origen:</strong> Perú</Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Relacionados */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 8, pt: 6, borderTop: "1px solid #E2E8F0" }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 400, color: "#2D3748" }}>También te puede interesar</Typography>
          </Box>
          <Grid container spacing={3}>
            {relatedProducts.map((relProduct) => (
              <Grid key={relProduct.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ bgcolor: "transparent" }}>
                  <Box sx={{ bgcolor: "#F7FAFC", mb: 2, overflow: "hidden", borderRadius: "8px" }}>
                    <Link href={`/products/${relProduct.id}`} style={{ display: "block" }}>
                      <Box component="img" src={relProduct.image_url} alt={relProduct.name} sx={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", transition: "transform 0.3s", "&:hover": { transform: "scale(1.03)" } }} />
                    </Link>
                  </Box>
                  <Typography sx={{ fontSize: "1rem", fontWeight: 500, color: "#2D3748", mb: 0.5 }}>{relProduct.name}</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#4A5568" }}>S/. {Number(relProduct.price).toFixed(2)}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}