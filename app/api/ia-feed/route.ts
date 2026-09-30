import Parser from "rss-parser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const parser = new Parser();
const feeds = [
  { nombre: "OpenAI", url: "https://openai.com/news/rss.xml", tipo: "Actualización oficial" },
  { nombre: "Anthropic", url: "https://www.anthropic.com/news/rss.xml", tipo: "Actualización oficial" },
  { nombre: "Google AI", url: "https://blog.google/technology/ai/rss/", tipo: "Actualización oficial" },
  { nombre: "Microsoft AI", url: "https://news.microsoft.com/source/topics/ai/feed/", tipo: "Actualización oficial" },
  { nombre: "Mistral AI", url: "https://mistral.ai/news/rss.xml", tipo: "Lanzamiento oficial" },
  { nombre: "Cohere", url: "https://cohere.com/blog/rss.xml", tipo: "Lanzamiento oficial" },
  { nombre: "AWS Machine Learning", url: "https://aws.amazon.com/blogs/machine-learning/feed/", tipo: "Producto y empresa" },
  { nombre: "NVIDIA AI", url: "https://blogs.nvidia.com/blog/category/deep-learning/feed/", tipo: "Producto y empresa" },
  { nombre: "Hugging Face", url: "https://huggingface.co/blog/feed.xml", tipo: "Open source" },
  { nombre: "Meta AI", url: "https://ai.meta.com/blog/rss/", tipo: "Investigación" },
  { nombre: "arXiv AI", url: "https://export.arxiv.org/rss/cs.AI", tipo: "Investigación académica" },
  { nombre: "arXiv Machine Learning", url: "https://export.arxiv.org/rss/cs.LG", tipo: "Investigación académica" },
  { nombre: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/", tipo: "Noticias y startups" },
  { nombre: "VentureBeat AI", url: "https://venturebeat.com/category/ai/feed/", tipo: "Noticias y startups" },
  { nombre: "MIT Technology Review AI", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed/", tipo: "Análisis" },
  { nombre: "The Verge AI", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", tipo: "Noticias y productos" },
];

function cleanText(value = "") {
  return value.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
}

export async function GET() {
  const resultados = await Promise.allSettled(feeds.map(async (feed) => {
    const response = await fetch(feed.url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`${feed.nombre}: ${response.status}`);
    const xml = await response.text();
    const parsed = await parser.parseString(xml);
    return parsed.items.slice(0, 8).map((item) => ({
      titulo: item.title?.trim() || "Sin título",
      resumen: cleanText(item.contentSnippet || item.content || "Información publicada por la fuente oficial."),
      fecha: item.isoDate || item.pubDate || new Date().toISOString(),
      enlace: item.link || feed.url,
      fuente: feed.nombre,
      tipo: feed.tipo,
    }));
  }));

  const fuentes = resultados.map((resultado, index) => ({
    nombre: feeds[index].nombre,
    tipo: feeds[index].tipo,
    activa: resultado.status === "fulfilled",
    error: resultado.status === "rejected" ? String(resultado.reason?.message || "Fuente no disponible") : undefined,
  }));
  const noticiasSinDuplicados = resultados.flatMap((resultado) => resultado.status === "fulfilled" ? resultado.value : []);
  const noticias = Array.from(new Map(noticiasSinDuplicados.map((noticia) => [noticia.enlace || noticia.titulo, noticia])).values());
  noticias.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  return NextResponse.json({
    consultadoEn: new Date().toISOString(),
    noticias: noticias.slice(0, 80),
    fuentes,
    fuentesActivas: fuentes.filter((fuente) => fuente.activa).length,
    fuentesTotales: feeds.length,
  }, { headers: { "Cache-Control": "no-store, max-age=0" } });
}
