"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Container, Typography, Box, Grid, Button, Chip, Stack, 
  Card, CardContent, CardMedia, CircularProgress, Breadcrumbs, 
  Link as MuiLink, Table, TableBody, TableRow, TableCell 
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
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

  // Estados para las variantes (Preparado para el futuro)
  const [selectedSize, setSelectedSize] = useState("Única");
  const [selectedColor, setSelectedColor] = useState("Negro");

  useEffect(() => {
    const fetchProductData = async () => {
      if (!params.id) return;
      setLoading(true);

      const { data: productData, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

      if (productData) {
        setProduct(productData);

        const { data: relatedData } = await supabase
          .from("products")
          .select("*")
          .eq("category", productData.category)
          .neq("id", productData.id)
          .limit(3);
        
        if (relatedData) setRelatedProducts(relatedData);
      }
      
      setLoading(false);
    };

    fetchProductData();
  }, [params.id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#0a0d15" }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 15, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Producto no encontrado</Typography>
        <Typography sx={{ color: "#5E6B7E", mb: 4 }}>El producto que buscas no existe o ha sido removido.</Typography>
        <Button component={Link} href="/products" variant="contained" sx={{ bgcolor: "#0a0d15" }}>Volver a la colección</Button>
      </Container>
    );
  }

  const specs = product.specifications || {
    material: "Cuero genuino / Acero inoxidable",
    dimensions: "Consultar medidas específicas",
    weight: "Variable según modelo",
    warranty: "1 año de garantía",
    origin: "Perú"
  };

  const handleComprarAhora = () => {
    addToCart({ ...product, image: product.image_url });
    router.push("/checkout");
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      
      {/* BREADCRUMBS (Sin el nombre del producto al final) */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <MuiLink component={Link} href="/" underline="hover" color="inherit" sx={{ fontSize: "0.9rem", color: "#5E6B7E" }}>
            Inicio
          </MuiLink>
          <MuiLink component={Link} href="/products" underline="hover" color="inherit" sx={{ fontSize: "0.9rem", color: "#5E6B7E" }}>
            Colección
          </MuiLink>
          <MuiLink component={Link} href={`/products?category=${product.category}`} underline="hover" color="inherit" sx={{ fontSize: "0.9rem", color: "#5E6B7E" }}>
            {product.category}
          </MuiLink>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
        
        {/* Imagen del producto */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box 
            sx={{ 
              position: "relative", width: "100%", maxWidth: 500, mx: "auto", 
              borderRadius: 4, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
          >
            <Box 
              component="img"
              src={product.image_url || "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"}
              alt={product.name}
              sx={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
            />
          </Box>
        </Grid>

        {/* Información del producto */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Chip label={product.category} sx={{ width: "fit-content", bgcolor: "#F8F9FA", fontWeight: 700, color: "#0a0d15" }} />
            
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#0a0d15", fontSize: { xs: "2rem", md: "2.8rem" }, lineHeight: 1.1 }}>
              {product.name}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0a0d15" }}>
              S/. {Number(product.price).toFixed(2)}
            </Typography>

            <Typography sx={{ color: "#5E6B7E", fontSize: "1.05rem", lineHeight: 1.7 }}>
              {product.description}
            </Typography>

            {/* SELECTOR DE VARIANTES (Maqueta visual para el futuro admin) */}
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", mb: 1 }}>Talla</Typography>
              <Stack direction="row" spacing={1}>
                {["Única", "S", "M", "L"].map((size) => (
                  <Chip 
                    key={size} 
                    label={size} 
                    onClick={() => setSelectedSize(size)}
                    sx={{ 
                      borderRadius: 1, 
                      borderColor: selectedSize === size ? "#0a0d15" : "#E0E0E0",
                      bgcolor: selectedSize === size ? "#0a0d15" : "white",
                      color: selectedSize === size ? "white" : "#5E6B7E",
                      fontWeight: 600 
                    }} 
                    variant="outlined" 
                  />
                ))}
              </Stack>

              <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", mt: 3, mb: 1 }}>Color</Typography>
              <Stack direction="row" spacing={1}>
                {["Negro", "Marrón", "Azul"].map((color) => (
                  <Chip 
                    key={color} 
                    label={color} 
                    onClick={() => setSelectedColor(color)}
                    sx={{ 
                      borderRadius: 1, 
                      borderColor: selectedColor === color ? "#0a0d15" : "#E0E0E0",
                      bgcolor: selectedColor === color ? "#0a0d15" : "white",
                      color: selectedColor === color ? "white" : "#5E6B7E",
                      fontWeight: 600 
                    }} 
                    variant="outlined" 
                  />
                ))}
              </Stack>
            </Box>

            {/* BOTONES DE ACCIÓN */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 2 }}>
              <Button 
                variant="outlined" 
                size="large" 
                startIcon={<ShoppingBagIcon />} 
                onClick={() => addToCart({ ...product, image: product.image_url })} 
                fullWidth
                sx={{ 
                  bgcolor: "white", color: "#0a0d15", borderColor: "#0a0d15", py: 1.5, 
                  fontSize: "1rem", borderRadius: 999, fontWeight: 700, transition: "all 0.3s",
                  "&:hover": { bgcolor: "#0a0d15", color: "white", borderColor: "#0a0d15" } 
                }}
              >
                Añadir al carrito
              </Button>
              
              <Button 
                variant="contained" 
                size="large" 
                onClick={handleComprarAhora} 
                fullWidth
                sx={{ 
                  bgcolor: "#0a0d15", color: "white", py: 1.5, 
                  fontSize: "1rem", borderRadius: 999, fontWeight: 700, transition: "all 0.3s",
                  "&:hover": { bgcolor: "#1a1d24" } 
                }}
              >
                Comprar ahora
              </Button>
            </Stack>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#5E6B7E", mt: 2 }}>
              <LocalShippingIcon />
              <Typography sx={{ fontSize: "0.9rem" }}>Envío gratis a todo el Perú (Miembros VIP)</Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* ESPECIFICACIONES TÉCNICAS */}
      <Box sx={{ mt: 8 }}>
        {/* RAE: Minúscula en "producto" */}
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#0a0d15", mb: 3 }}>
          Especificaciones del producto
        </Typography>
        <Table sx={{ maxWidth: 600, border: "1px solid rgba(10, 13, 21, 0.1)", borderRadius: 2 }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#5E6B7E", width: "40%" }}>Material</TableCell>
              <TableCell>{specs.material}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#5E6B7E" }}>Dimensiones</TableCell>
              <TableCell>{specs.dimensions}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#5E6B7E" }}>Peso</TableCell>
              <TableCell>{specs.weight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#5E6B7E" }}>Garantía</TableCell>
              <TableCell>{specs.warranty}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#5E6B7E" }}>Origen</TableCell>
              <TableCell>{specs.origin}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      {/* Sección de productos relacionados */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 12, pt: 6, borderTop: "1px solid rgba(10, 13, 21, 0.05)" }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "#5E6B7E", fontWeight: 700, letterSpacing: "0.16em" }}>Productos relacionados</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#142038", mt: 0.5 }}>También te puede interesar</Typography>
          </Box>

          <Grid container spacing={3}>
            {relatedProducts.map((relProduct) => (
              <Grid key={relProduct.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card elevation={0} sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4, overflow: "hidden", bgcolor: "#FFFFFF", border: "1px solid rgba(20, 32, 56, 0.06)", transition: "transform 0.3s", "&:hover": { transform: "translateY(-5px)" } }}>
                  <Link href={`/products/${relProduct.id}`} style={{ display: "block", overflow: "hidden" }}>
                    <CardMedia 
                      component="img" image={relProduct.image_url} alt={relProduct.name} 
                      sx={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", transition: "transform 0.4s ease", "&:hover": { transform: "scale(1.05)" } }} 
                    />
                  </Link>
                  <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#142038", fontSize: "1.1rem", mb: 1 }}>{relProduct.name}</Typography>
                    <Typography sx={{ color: "#5E6B7E", fontSize: "0.9rem", lineHeight: 1.5, mb: 2, flexGrow: 1 }}>{relProduct.description}</Typography>
                    <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#142038", mb: 2 }}>S/. {Number(relProduct.price).toFixed(2)}</Typography>
                    <Button 
                      variant="outlined" fullWidth onClick={() => addToCart({ ...relProduct, image: relProduct.image_url })} 
                      sx={{ bgcolor: "white", color: "#0a0d15", borderColor: "#0a0d15", py: 1, fontSize: "0.9rem", transition: "all 0.3s", "&:hover": { bgcolor: "#0a0d15", color: "white", borderColor: "#0a0d15" } }}
                    >
                      Añadir al carrito
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}