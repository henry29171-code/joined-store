"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import ReactMarkdown from "react-markdown";
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
      
      {/* AQUI USAMOS REACT-MARKDOWN CON ESTILOS DE MUI */}
      <Box sx={{ color: "#4A5568", fontSize: "1rem" }}>
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <Typography variant="h5" sx={{ fontWeight: 700, color: "#0a0d15", mt: 4, mb: 2 }} {...props} />,
            h2: ({node, ...props}) => <Typography variant="h6" sx={{ fontWeight: 700, color: "#0a0d15", mt: 4, mb: 1.5 }} {...props} />,
            h3: ({node, ...props}) => <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#0a0d15", mt: 3, mb: 1 }} {...props} />,
            p: ({node, ...props}) => <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }} {...props} />,
            ul: ({node, ...props}) => <ul style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: 1.8 }} {...props} />,
            li: ({node, ...props}) => <li style={{ marginBottom: "8px" }} {...props} />,
            strong: ({node, ...props}) => <strong style={{ color: "#0a0d15", fontWeight: 600 }} {...props} />,
            em: ({node, ...props}) => <em style={{ color: "#666", fontStyle: "italic" }} {...props} />,
          }}
        >
          {page.content}
        </ReactMarkdown>
      </Box>
    </Container>
  );
}