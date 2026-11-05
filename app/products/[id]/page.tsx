"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Container, Typography, Box, Grid, Button, Stack, CircularProgress, Breadcrumbs, 
  Link as MuiLink, Divider, Accordion, AccordionSummary, AccordionDetails, Select, MenuItem, FormControl, Chip 
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

  const [mainImage, setMainImage] = useState(""); 
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      if (!params.id) return;
      setLoading(true);
      const { data: productData } = await supabase.from("products").select("*").eq("id", params.id).single();
      if (productData) {
        setProduct(productData);
        setMainImage(productData.image_url);
        
        if (productData.sizes && productData.sizes.length > 0) setSelectedSize(productData.sizes[0]);
        if (productData.colors && productData.colors.length > 0) setSelectedColor(productData.colors[0]);

        const { data: relatedData } = await supabase.from("products").select("*").eq("category", productData.category).neq("id", productData.id).limit(3);
        if (relatedData) setRelatedProducts(relatedData);
      }
      setLoading(false);
    };
    fetchProductData();
  }, [params.id]);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}><CircularProgress sx={{ color: "#0a0d15" }} /></Box>;
  if (!product) return <Container maxWidth="md" sx={{ py: 15, textAlign: "center" }}><Typography variant="h4">Producto no encontrado</Typography></Container>;

  let characteristicsList = [];
  try {
    if (product.characteristics) characteristicsList = JSON.parse(product.characteristics);
  } catch (e) { characteristicsList = []; }

  const allImages = [product.image_url, ...(product.gallery_images || [])];

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
        
        <Grid size={{ xs: 12, md: 6 }}>
          {/* IMAGEN PRINCIPAL SIN PADDING, SIN FONDO Y SIN BORDES */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <Box component="img" src={mainImage} alt={product.name} sx={{ width: "100%", aspectRatio: "1/1", objectFit: "contain", display: "block" }} />
          </Box>
          
          {allImages.length > 1 && (
            <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: 1 }}>
              {allImages.map((img, idx) => (
                <Box 
                  key={idx} 
                  onClick={() => setMainImage(img)}
                  sx={{ 
                    width: 70, height: 70, 
                    border: mainImage === img ? "2px solid #6B7280" : "1px solid #E5E7EB", 
                    borderRadius: "8px", 
                    overflow: "hidden", cursor: "pointer", flexShrink: 0,
                    opacity: mainImage === img ? 1 : 0.6,
                    transition: "all 0.2s",
                    "&:hover": { opacity: 1 }
                  }}
                >
                  <Box component="img" src={img} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
              ))}
            </Stack>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#0a0d15", fontSize: { xs: "1.8rem", md: "2.2rem" } }}>{product.name}</Typography>
            
            {product.sale_price ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#d32f2f" }}>S/. {Number(product.sale_price).toFixed(2)}</Typography>
                <Typography variant="h6" sx={{ color: "#888", textDecoration: "line-through" }}>S/. {Number(product.price).toFixed(2)}</Typography>
                <Chip label="Oferta" size="small" sx={{ bgcolor: "#d32f2f", color: "white", fontWeight: 600 }} />
              </Box>
            ) : (
              <Typography variant="h6" sx={{ fontWeight: 500, color: "#333" }}>S/. {Number(product.price).toFixed(2)}</Typography>
            )}

            <Typography sx={{ color: "#4A5568", fontSize: "1rem", lineHeight: 1.6, mt: 1 }}>{product.description}</Typography>
            <Divider sx={{ my: 2, borderColor: "#E5E7EB" }} />

            {product.sizes && product.sizes.length > 0 && (
              <Box>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#0a0d15", mb: 1 }}>Seleccionar tamaño</Typography>
                <FormControl fullWidth size="small">
                  <Select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} sx={{ borderRadius: "8px", bgcolor: "#FFF" }}>
                    {product.sizes.map((size: string) => (
                      <MenuItem key={size} value={size}>{size === "O/S" ? "Única (O/S)" : size}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {product.colors && product.colors.length > 0 && (
              <Box>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#0a0d15", mb: 1 }}>Color</Typography>
                <Stack direction="row" spacing={1}>
                  {product.colors.map((color: string) => (
                    <Box key={color} onClick={() => setSelectedColor(color)}
                      sx={{ px: 2, py: 1, border: "1px solid", borderColor: selectedColor === color ? "#0a0d15" : "#E5E7EB", cursor: "pointer", fontSize: "0.85rem", fontWeight: selectedColor === color ? 600 : 400, color: selectedColor === color ? "#0a0d15" : "#718096", bgcolor: selectedColor === color ? "#F3F4F6" : "transparent", borderRadius: "8px" }}
                    >
                      {color}
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            <Button variant="contained" onClick={() => addToCart({ ...product, image: product.image_url })} fullWidth disableElevation sx={{ bgcolor: "#B0B3B8", color: "#111827", py: 1.5, borderRadius: "8px", fontWeight: 700, boxShadow: "0 4px 14px 0 rgba(0,0,0,0.15)", mt: 1, transition: "all 0.3s ease", "&:hover": { bgcolor: "#0a0d15", color: "white", boxShadow: "0 6px 20px rgba(10, 13, 21, 0.3)", transform: "translateY(-2px)" } }}>
              Añadir al carrito
            </Button>
            
            <Button variant="contained" onClick={handleComprarAhora} fullWidth disableElevation sx={{ bgcolor: "#0a0d15", color: "white", py: 1.5, borderRadius: "8px", fontWeight: 700, boxShadow: "0 4px 14px 0 rgba(10, 13, 21, 0.2)", transition: "all 0.3s ease", "&:hover": { bgcolor: "#1a1d24", boxShadow: "0 6px 20px rgba(10, 13, 21, 0.4)", transform: "translateY(-2px)" } }}>
              Comprar ahora
            </Button>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#718096", mt: 1 }}>
              <LocalShippingIcon fontSize="small" />
              <Typography sx={{ fontSize: "0.85rem" }}>Envío gratis a todo el Perú (Miembros VIP)</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8, borderTop: "1px solid #E5E7EB", pt: 4 }}>
        {characteristicsList.length > 0 && (
          <Accordion elevation={0} sx={{ bgcolor: "transparent", "&:before": { display: "none" } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
              <Typography sx={{ fontWeight: 500, fontSize: "1.1rem", color: "#0a0d15" }}>Características</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, color: "#4A5568", fontSize: "0.9rem" }}>
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {characteristicsList.map((char: string, i: number) => <li key={i}>{char}</li>)}
              </ul>
            </AccordionDetails>
          </Accordion>
        )}
        
        {(product.specs_material || product.specs_dimensions || product.specs_weight || product.specs_warranty) && (
          <>
            <Divider sx={{ borderColor: "#E5E7EB" }} />
            <Accordion elevation={0} sx={{ bgcolor: "transparent", "&:before": { display: "none" } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                <Typography sx={{ fontWeight: 500, fontSize: "1.1rem", color: "#0a0d15" }}>Especificaciones</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, color: "#4A5568", fontSize: "0.9rem" }}>
                <Grid container spacing={2}>
                  {product.specs_material && <Grid size={{ xs: 6 }}><strong>Material:</strong> {product.specs_material}</Grid>}
                  {product.specs_dimensions && <Grid size={{ xs: 6 }}><strong>Dimensiones:</strong> {product.specs_dimensions}</Grid>}
                  {product.specs_weight && <Grid size={{ xs: 6 }}><strong>Peso:</strong> {product.specs_weight}</Grid>}
                  {product.specs_warranty && <Grid size={{ xs: 6 }}><strong>Garantía:</strong> {product.specs_warranty}</Grid>}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </Box>

      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 8, pt: 6, borderTop: "1px solid #E5E7EB" }}>
          <Box sx={{ mb: 4 }}><Typography variant="h5" sx={{ fontWeight: 500, color: "#0a0d15" }}>También te puede interesar</Typography></Box>
          <Grid container spacing={3}>
            {relatedProducts.map((relProduct) => (
              <Grid key={relProduct.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ bgcolor: "transparent" }}>
                  {/* SIN CAJA, SIN BORDES */}
                  <Box sx={{ mb: 2, overflow: "hidden" }}>
                    <Link href={`/products/${relProduct.id}`} style={{ display: "block" }}>
                      <Box component="img" src={relProduct.image_url} sx={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", transition: "transform 0.3s", "&:hover": { transform: "scale(1.04)" } }} />
                    </Link>
                  </Box>
                  <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#0a0d15", mb: 0.5 }}>{relProduct.name}</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#333" }}>S/. {Number(relProduct.price).toFixed(2)}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}