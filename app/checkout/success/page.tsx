"use client";

import Link from "next/link";
import { Container, Typography, Paper, Button, Stack } from "@mui/material";

export default function CheckoutSuccessPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 6,
          textAlign: "center",
          bgcolor: "rgba(255,255,255,0.72)",
          border: "1px solid rgba(20, 32, 56, 0.06)",
          boxShadow: "0 18px 40px rgba(25, 35, 52, 0.05)",
        }}
      >
        <Stack spacing={2.5} alignItems="center">
          <Typography
            variant="overline"
            sx={{
              color: "#5E6B7E",
              fontWeight: 700,
              letterSpacing: "0.16em",
            }}
          >
            Order Confirmed
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.7rem" },
              fontWeight: 800,
              color: "#142038",
              letterSpacing: "-0.03em",
            }}
          >
            Thanks for your order.
          </Typography>

          <Typography
            sx={{
              color: "#5E6B7E",
              lineHeight: 1.8,
              maxWidth: 520,
            }}
          >
            Your Atlas Grooming order has been placed successfully. This is a
            demo checkout flow for the portfolio project, so no real payment was
            processed.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ pt: 1 }}
          >
            <Button
              component={Link}
              href="/products"
              variant="contained"
              sx={{
                px: 3,
                py: 1.2,
                bgcolor: "#1E2A3A",
                "&:hover": {
                  bgcolor: "#111A2C",
                },
              }}
            >
              Continue shopping
            </Button>

            <Button
              component={Link}
              href="/"
              variant="outlined"
              sx={{ px: 3, py: 1.2 }}
            >
              Back to home
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
