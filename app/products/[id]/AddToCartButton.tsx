"use client";
import { Product } from "@/app/types/Product";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useNotification } from "@/app/context/NotificationContext";

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { notify } = useNotification();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addToCart(product);
    notify("Added to cart", "success");
  };

  return (
    <Button
      fullWidth
      variant="contained"
      startIcon={<AddShoppingCartIcon />}
      onClick={handleClick}
      sx={{
        color: "primary.contrastText",
        textTransform: "none",
        fontWeight: 600,
        borderRadius: "999px",
        backgroundColor: "primary.main",
        "&:hover": {
          backgroundColor: "primary.dark",
        },
        py: 1,
      }}
    >
      Add to cart
    </Button>
  );
}
