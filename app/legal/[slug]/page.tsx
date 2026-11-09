"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box, CircularProgress, Divider } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
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
      <Typography variant="h3" sx={{ fontWeight: 700, color: "#0a0d15", mb: 3, fontSize: { xs: "2rem", md: "2.5rem" } }}>
        {page.title}
      </Typography>
      
      <Divider sx={{ mb: 4 }} />

      <Box sx={{ color: "#4A5568", fontSize: "1rem" }}>
        <ReactMarkdown
          remarkPlugins={[remarkBreaks]} // <--- ESTO HACE QUE LOS SALTOS DE LINEA SIMPLES FUNCIONEN
          components={{
            h1: ({node, ...props}) => <Typography variant="h4" sx={{ fontWeight: 700, color: "#0a0d15", mt: 5, mb: 2, fontSize: "1.5rem" }} {...props} />,
            h2: ({node, ...props}) => <Typography variant="h5" sx={{ fontWeight: 700, color: "#0a0d15", mt: 4, mb: 2, fontSize: "1.25rem" }} {...props} />,
            h3: ({node, ...props}) => <Typography variant="h6" sx={{ fontWeight: 700, color: "#0a0d15", mt: 3, mb: 1.5, fontSize: "1.1rem" }} {...props} />,
            p: ({node, ...props}) => <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2, color: "#374151" }} {...props} />,
            ul: ({node, ...props}) => <ul style={{ paddingLeft: "24px", marginBottom: "24px", lineHeight: 1.8, color: "#374151" }} {...props} />,
            li: ({node, ...props}) => <li style={{ marginBottom: "8px" }} {...props} />,
            strong: ({node, ...props}) => <strong style={{ color: "#0a0d15", fontWeight: 700 }} {...props} />,
            em: ({node, ...props}) => <em style={{ color: "#4A5568", fontStyle: "italic" }} {...props} />,
          }}
        >
          {page.content}
        </ReactMarkdown>
      </Box>
    </Container>
  );
}