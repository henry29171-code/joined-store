"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { supabase } from "../../lib/supabase";

export default function LegalPage() {
  const params = useParams();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      if (!params.slug) return;
      const { data, error } = await supabase
        .from("legal_pages")
        .select("*")
        .eq("slug", params.slug)
        .single();
      
      if (!error && data) setPage(data);
      setLoading(false);
    };
    fetchPage();
  }, [params.slug]);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", py: 15 }}><CircularProgress sx={{ color: "#0a0d15" }} /></Box>;
  if (!page) return <Container maxWidth="md" sx={{ py: 15, textAlign: "center" }}><Typography variant="h4">Página no encontrada</Typography></Container>;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, minHeight: "60vh" }}>
      <Typography variant="h3" sx={{ fontWeight: 700, color: "#0a0d15", mb: 4, fontSize: { xs: "2rem", md: "2.5rem" } }}>
        {page.title}
      </Typography>
      <Box 
        sx={{ 
          color: "#4A5568", 
          lineHeight: 1.8, 
          fontSize: "1rem",
          "& p": { mb: 2 },
          "& h2, & h3": { color: "#0a0d15", mt: 3, mb: 1, fontWeight: 600 },
          "& ul": { pl: 3, mb: 2 }
        }}
        // Usamos dangerouslySetInnerHTML porque el admin guardará HTML
        dangerouslySetInnerHTML={{ __html: page.content }} 
      />
    </Container>
  );
}