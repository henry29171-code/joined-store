"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addToCart({ ...product, image: product.image_url });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, pb: { xs: 12, md: 8 } }}>
      
      {/* BREADCRUMBS */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs separator="›" sx={{ fontSize: "0.8rem", color: "#A0AEC0" }}>
          <MuiLink component={Link} href="/" underline="hover" color="inherit">Inicio</MuiLink>
          <MuiLink component={Link} href="/products" underline="hover" color="inherit">Colección</MuiLink>
          <MuiLink component={Link} href={`/products?category=${product.category}`} underline="hover" color="inherit">{product.category}</MuiLink>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={{ xs: 4, md: 6 }}>
        
        {/* COLUMNA IZQUIERDA: IMÁGENES */}
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Imagen Principal */}
          <Box sx={{ position: "relative", width: "100%", aspectRatio: "4/5", mb: 2, borderRadius: 2, overflow: "hidden", bgcolor: "#F8F9FA" }}>
            <Image 
              src={mainImage} 
              alt={product.name} 
              fill 
              sizes="(max-width: 600px) 100vw, 50vw" 
              style={{ objectFit: "cover", objectPosition: "center" }} 
              priority 
            />
          </Box>
          
          {/* Miniaturas debajo de la imagen principal */}
          {allImages.length > 1 && (
            <Stack direction="row" spacing={1.5} sx={{ overflowX: "auto", pb: 1 }}>
              {allImages.map((img, idx) => (
                <Box 
                  key={idx} 
                  onClick={() => setMainImage(img)}
                  sx={{ 
                    position: "relative",
                    width: 80, 
                    height: 100, 
                    borderRadius: "8px", 
                    overflow: "hidden", 
                    cursor: "pointer", 
                    flexShrink: 0,
                    border: mainImage === img ? "2px solid #0a0d15" : "1px solid #E5E7EB",
                    opacity: mainImage === img ? 1 : 0.6,
                    transition: "all 0.2s",
                    "&:hover": { opacity: 1 }
                  }}
                >
                  <Image src={img} alt={`Miniatura ${idx}`} fill style={{ objectFit: "cover" }} />
                </Box>
              ))}
            </Stack>
          )}
        </Grid>

        {/* COLUMNA DERECHA: INFORMACIÓN (STICKY EN PC) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ position: { md: "sticky" }, top: { md: 100 } }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#0a0d15", mb: 1, fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
              {product.name}
            </Typography>
            
            {/* Precio */}
            {product.sale_price ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#d32f2f" }}>S/. {Number(product.sale_price).toFixed(2)}</Typography>
                <Typography variant="h6" sx={{ color: "#888", textDecoration: "line-through" }}>S/. {Number(product.price).toFixed(2)}</Typography>
                <Chip label="Oferta" size="small" sx={{ bgcolor: "#d32f2f", color: "white", fontWeight: 600 }} />
              </Box>
            ) : (
              <Typography variant="h5" sx={{ fontWeight: 600, color: "#333", mb: 2 }}>S/. {Number(product.price).toFixed(2)}</Typography>
            )}

            <Typography sx={{ color: "#4A5568", fontSize: "0.95rem", lineHeight: 1.6, mb: 3 }}>
              {product.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Selectores */}
            {product.sizes && product.sizes.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#0a0d15", mb: 1 }}>Talla</Typography>
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
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#0a0d15", mb: 1 }}>Color: <span style={{ fontWeight: 400, color: "#5E6B7E" }}>{selectedColor}</span></Typography>
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

            {/* BOTÓN AÑADIR AL CARRITO (Escritorio) */}
            <Box sx={{ display: { xs: "none", md: "block" }, mb: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleAddToCart} 
                fullWidth 
                disableElevation 
                disabled={product.stock <= 0} 
                sx={{ 
                  bgcolor: product.stock <= 0 ? "#E5E7EB" : "#0a0d15", 
                  color: product.stock <= 0 ? "#9CA3AF" : "white", 
                  py: 1.8, 
                  borderRadius: "8px", 
                  fontWeight: 700, 
                  fontSize: "1rem",
                  boxShadow: product.stock <= 0 ? "none" : "0 4px 14px 0 rgba(10, 13, 21, 0.2)", 
                  "&:hover": { 
                    bgcolor: product.stock <= 0 ? "#E5E7EB" : "#1a1d24", 
                    transform: product.stock <= 0 ? "none" : "translateY(-2px)" 
                  } 
                }}
              >
                {product.stock <= 0 ? "Agotado" : "Añadir al carrito"}
              </Button>
            </Box>
            
            {/* Estado de stock */}
            <Box sx={{ mb: 3 }}>
              {product.stock > 0 ? (
                <Typography sx={{ fontSize: "0.85rem", color: "#5E6B7E", fontWeight: 500 }}>
                  Disponible
                </Typography>
              ) : (
                <Typography sx={{ fontSize: "0.85rem", color: "#d32f2f", fontWeight: 600 }}>
                  Agotado temporalmente
                </Typography>
              )}
            </Box>

            {/* Info de Envío Actualizada según el Plan de Negocio */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#5E6B7E", bgcolor: "#F8F9FA", p: 2, borderRadius: 2 }}>
              <LocalShippingIcon fontSize="small" />
              <Typography sx={{ fontSize: "0.85rem" }}>
                Envío de cortesía en Lima y Callao exclusivo para miembros del <strong>Club Joined</strong>.
              </Typography>
            </Box>

            {/* ACORDEONES */}
            <Box sx={{ mt: 4 }}>
              {characteristicsList.length > 0 && (
                <Accordion elevation={0} sx={{ bgcolor: "transparent", "&:before": { display: "none" }, borderBottom: "1px solid #E5E7EB" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: "#0a0d15" }}>Características</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, color: "#4A5568", fontSize: "0.9rem" }}>
                    <ul style={{ paddingLeft: "20px", margin: 0 }}>
                      {characteristicsList.map((char: string, i: number) => <li key={i} style={{ marginBottom: 8 }}>{char}</li>)}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              )}
              
              {(product.specs_material || product.specs_dimensions || product.specs_weight || product.specs_warranty) && (
                <Accordion elevation={0} sx={{ bgcolor: "transparent", "&:before": { display: "none" }, borderBottom: "1px solid #E5E7EB" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: "#0a0d15" }}>Especificaciones</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, color: "#4A5568", fontSize: "0.9rem" }}>
                    <Grid container spacing={2}>
                      {product.specs_material && <Grid size={{ xs: 12, sm: 6 }}><strong>Material:</strong> {product.specs_material}</Grid>}
                      {product.specs_dimensions && <Grid size={{ xs: 12, sm: 6 }}><strong>Dimensiones:</strong> {product.specs_dimensions}</Grid>}
                      {product.specs_weight && <Grid size={{ xs: 12, sm: 6 }}><strong>Peso:</strong> {product.specs_weight}</Grid>}
                      {product.specs_warranty && <Grid size={{ xs: 12, sm: 6 }}><strong>Garantía:</strong> {product.specs_warranty}</Grid>}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )}
            </Box>

          </Box>
        </Grid>
      </Grid>

      {/* BARRA FLOTANTE PARA MÓVILES */}
      <Box 
        sx={{ 
          display: { xs: "flex", md: "none" }, 
          position: "fixed", 
          bottom: 0, 
          left: 0, 
          right: 0, 
          bgcolor: "white", 
          p: 2, 
          boxShadow: "0 -4px 20px rgba(0,0,0,0.1)", 
          zIndex: 1000,
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #E5E7EB"
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "0.8rem", color: "#5E6B7E", fontWeight: 500 }}>Total</Typography>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 800, color: "#0a0d15" }}>
            S/. {Number(product.sale_price || product.price).toFixed(2)}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          onClick={handleAddToCart} 
          disabled={product.stock <= 0}
          sx={{ 
            bgcolor: product.stock <= 0 ? "#E5E7EB" : "#0a0d15", 
            color: product.stock <= 0 ? "#9CA3AF" : "white", 
            px: 4, 
            py: 1.2, 
            borderRadius: "8px", 
            fontWeight: 700,
            "&:hover": { bgcolor: product.stock <= 0 ? "#E5E7EB" : "#1a1d24" }
          }}
        >
          {product.stock <= 0 ? "Agotado" : "Añadir"}
        </Button>
      </Box>

      {/* PRODUCTOS RELACIONADOS */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 8, pt: 6, borderTop: "1px solid #E5E7EB" }}>
          <Box sx={{ mb: 4 }}><Typography variant="h5" sx={{ fontWeight: 600, color: "#0a0d15" }}>También te puede interesar</Typography></Box>
          <Grid container spacing={3}>
            {relatedProducts.map((relProduct) => (
              <Grid key={relProduct.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ bgcolor: "transparent" }}>
                  <Box sx={{ position: "relative", mb: 2, overflow: "hidden", width: "100%", aspectRatio: "4/5", borderRadius: 2 }}>
                    <Link href={`/products/${relProduct.id}`} style={{ display: "block", width: "100%" }}>
                      <Image src={relProduct.image_url} alt={relProduct.name} fill sizes="(max-width: 600px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "center", transition: "transform 0.3s" }} />
                    </Link>
                  </Box>
                  <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#0a0d15", mb: 0.5 }}>{relProduct.name}</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#5E6B7E" }}>S/. {Number(relProduct.price).toFixed(2)}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}