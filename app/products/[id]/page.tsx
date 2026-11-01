import { getProduct, getProducts } from "@/app/lib/api";
import { Product } from "@/app/types/Product";
import {
  Container,
  CardActionArea,
  Box,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
// import { Suspense } from "react";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" textAlign="center">
          Product not found or temporarily unavailable.
        </Typography>
      </Container>
    );
  }
  const allProduct: Product[] = await getProducts();

  // Related logic

  const related = allProduct.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <Container
      sx={{
        py: 6,
        maxWidth: "md",
      }}
    >
      {/* Main Product area */}
      {/* Main Product area */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
          gap: { xs: 4, md: 8 },
          alignItems: "center",
        }}
      >
        {/* IMAGE SIDE */}
        <Box
          sx={{
            borderRadius: 6,
            overflow: "hidden",
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(20, 32, 56, 0.06)",
            boxShadow: "0 30px 60px rgba(15, 23, 42, 0.08)",
            p: 2,
          }}
        >
          <Box
            sx={{
              height: { xs: 260, md: 420 },
              borderRadius: 4,
              backgroundImage: `url(${product.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>

        {/* TEXT SIDE */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "1.8rem", md: "2.4rem" },
              fontWeight: 800,
              color: "#142038",
              mb: 1.5,
              letterSpacing: "-0.02em",
            }}
          >
            {product.name}
          </Typography>

          <Typography
            sx={{
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#5F6F65",
              mb: 2,
            }}
          >
            ${product.price.toFixed(2)}
          </Typography>

          <Typography
            sx={{
              color: "#5E6B7E",
              lineHeight: 1.8,
              fontSize: 16,
              mb: 4,
              maxWidth: 420,
            }}
          >
            {product.description}
          </Typography>

          <Box sx={{ maxWidth: 320 }}>
            <AddToCartButton product={product} />
          </Box>
        </Box>
      </Box>

      {/* RELATED PRODUCTS SECTION */}
      {/* RELATED PRODUCTS SECTION */}
      <Box sx={{ mt: { xs: 8, md: 10 }, pt: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="overline"
            sx={{
              color: "#5E6B7E",
              fontWeight: 700,
              letterSpacing: "0.16em",
            }}
          >
            Related Picks
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.4rem" },
              fontWeight: 800,
              color: "#142038",
              letterSpacing: "-0.03em",
              mt: 1,
            }}
          >
            You might also like
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {related.map((p) => (
            <Card
              key={p.id}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: 5,
                border: "1px solid rgba(20, 32, 56, 0.06)",
                boxShadow: "0 18px 40px rgba(25, 35, 52, 0.06)",
                bgcolor: "#FFFFFF",
                transition: "transform 180ms ease, box-shadow 180ms ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 24px 50px rgba(25, 35, 52, 0.1)",
                },
              }}
            >
              <Link
                href={`/products/${p.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardActionArea
                  sx={{
                    display: "block",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 210,
                      backgroundImage: `url(${p.image_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: "#E8ECE8",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.12), transparent)",
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        top: 14,
                        left: 14,
                        zIndex: 2,
                        px: 1.25,
                        py: 0.6,
                        borderRadius: 999,
                        bgcolor: "rgba(255,255,255,0.88)",
                        color: "#1E2A3A",
                        fontSize: 13,
                        fontWeight: 700,
                        lineHeight: 1,
                        textTransform: "capitalize",
                      }}
                    >
                      {p.category}
                    </Box>
                  </Box>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      px: 2.25,
                      py: 2.25,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#142038",
                        mb: 1,
                        lineHeight: 1.3,
                        fontSize: "1.05rem",
                      }}
                    >
                      {p.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#5E6B7E",
                        fontSize: 14,
                        lineHeight: 1.7,
                        mb: 1.75,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: 48,
                      }}
                    >
                      {p.description}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        color: "#142038",
                      }}
                    >
                      ${p.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>

              <CardActions
                sx={{
                  px: 2.25,
                  pb: 2.25,
                  pt: 0,
                  mt: "auto",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <AddToCartButton product={p} />
                </Box>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
