"use client";
export const dynamic = "force-dynamic";
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

  // --- MAGIA MEJORADA: Procesa el texto línea por línea ---
  const formatContent = (text: string) => {
    if (!text) return "";
    
    // Normalizar saltos de línea
    let formatted = text.replace(/\r\n/g, '\n');

    // 1. Títulos numerados: "1. Algo" -> "\n### 1. Algo\n" (Esto asegura que el número se mantenga)
    formatted = formatted.replace(/^(\d+\.\s+.*)$/gm, '\n### $1\n');

    // 2. Viñetas: "• Algo" -> "* Algo"
    formatted = formatted.replace(/^•\s+/gm, '* ');

    // 3. Sub-viñetas (las que empiezan con "o"): "o Algo" -> "    * Algo" (sangría)
    formatted = formatted.replace(/^o\s+(.*)$/gm, '    * $1');

    // 4. Negritas en viñetas: "* Texto:" -> "* **Texto:**"
    formatted = formatted.replace(/\*\s([A-Za-z\sÁÉÍÓÚáéíóúñ]+):/g, '* **$1:**');

    // 5. Notas: "Nota: Algo" -> "*Nota: Algo*" (cursiva)
    formatted = formatted.replace(/^(Nota:.*)$/gm, '*$1*');

    return formatted;
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, minHeight: "60vh" }}>
      <Typography variant="h3" sx={{ fontWeight: 700, color: "#0a0d15", mb: 3, fontSize: { xs: "2rem", md: "2.5rem" } }}>
        {page.title}
      </Typography>
      
      <Divider sx={{ mb: 4 }} />

      <Box sx={{ color: "#4A5568", fontSize: "1rem" }}>
        <ReactMarkdown
          remarkPlugins={[remarkBreaks]}
          components={{
            h1: ({node, ...props}) => <Typography variant="h4" sx={{ fontWeight: 700, color: "#0a0d15", mt: 5, mb: 2, fontSize: "1.5rem" }} {...props} />,
            h2: ({node, ...props}) => <Typography variant="h5" sx={{ fontWeight: 700, color: "#0a0d15", mt: 4, mb: 2, fontSize: "1.25rem" }} {...props} />,
            h3: ({node, ...props}) => <Typography variant="h6" sx={{ fontWeight: 700, color: "#0a0d15", mt: 4, mb: 1.5, fontSize: "1.1rem" }} {...props} />,
            p: ({node, ...props}) => <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2, color: "#374151" }} {...props} />,
            ul: ({node, ...props}) => <ul style={{ paddingLeft: "24px", marginBottom: "24px", lineHeight: 1.8, color: "#374151" }} {...props} />,
            li: ({node, ...props}) => <li style={{ marginBottom: "6px" }} {...props} />,
            strong: ({node, ...props}) => <strong style={{ color: "#0a0d15", fontWeight: 700 }} {...props} />,
            em: ({node, ...props}) => <em style={{ color: "#4A5568", fontStyle: "italic" }} {...props} />,
          }}
        >
          {formatContent(page.content)}
        </ReactMarkdown>
      </Box>
    </Container>
  );
}