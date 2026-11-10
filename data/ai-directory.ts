export type CategoriaFuente =
  "directorios"
  | "lanzamientos"
  | "laboratorios"
  | "buscadores"
  | "papers"
  | "modelos"
  | "benchmarks"
  | "noticias"
  | "tendencias"
  | "apis"
  | "rss";

export interface FuenteIA {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: CategoriaFuente;
  categoriaLabel: string;
  destacado: boolean;
  url: string;
  prioridad: number | null;
}

export const fuentesIA: FuenteIA[] = [
  {
    "id": "001",
    "nombre": "There's An AI For That",
    "descripcion": "Buscar herramientas de IA por tareas y necesidades concretas.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": true,
    "url": "https://www.theresanaiforthat.com/",
    "prioridad": 1
  },
  {
    "id": "002",
    "nombre": "Futurepedia",
    "descripcion": "Directorio de herramientas, categorías y aplicaciones de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": true,
    "url": "https://www.futurepedia.io/",
    "prioridad": 3
  },
  {
    "id": "003",
    "nombre": "Toolify",
    "descripcion": "Descubrir herramientas, aplicaciones y servicios de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": true,
    "url": "https://www.toolify.ai/",
    "prioridad": 2
  },
  {
    "id": "004",
    "nombre": "TopAI.tools",
    "descripcion": "Explorar y filtrar herramientas por categorías y popularidad.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://topai.tools/",
    "prioridad": null
  },
  {
    "id": "005",
    "nombre": "Aixploria",
    "descripcion": "Descubrir herramientas, novedades y aplicaciones de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.aixploria.com/en/",
    "prioridad": null
  },
  {
    "id": "006",
    "nombre": "FutureTools",
    "descripcion": "Catálogo curado de herramientas y tecnologías de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.futuretools.io/",
    "prioridad": null
  },
  {
    "id": "007",
    "nombre": "AI Tool Hunt",
    "descripcion": "Encontrar herramientas y alternativas de inteligencia artificial.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.aitoolhunt.com/",
    "prioridad": null
  },
  {
    "id": "008",
    "nombre": "AI Tools FYI",
    "descripcion": "Directorio de aplicaciones de IA clasificadas por utilidad.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://aitools.fyi/",
    "prioridad": null
  },
  {
    "id": "009",
    "nombre": "Insidr AI",
    "descripcion": "Descubrir herramientas, recursos y novedades de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.insidr.ai/",
    "prioridad": null
  },
  {
    "id": "010",
    "nombre": "Easy With AI",
    "descripcion": "Directorio y guías para encontrar y aprender a usar herramientas.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.easywithai.com/",
    "prioridad": null
  },
  {
    "id": "011",
    "nombre": "AI Top Tools",
    "descripcion": "Catálogo de aplicaciones y servicios de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.aitoptools.com/",
    "prioridad": null
  },
  {
    "id": "012",
    "nombre": "EveryAI",
    "descripcion": "Buscar aplicaciones y soluciones de IA por necesidades.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.every-ai.com/",
    "prioridad": null
  },
  {
    "id": "013",
    "nombre": "RankMyAI",
    "descripcion": "Explorar y comparar productos de IA mediante clasificaciones.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.rankmyai.com/",
    "prioridad": null
  },
  {
    "id": "014",
    "nombre": "AI Tool Index",
    "descripcion": "Directorio con novedades, categorías y seguimiento de herramientas.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": true,
    "url": "https://www.aitoolindex.org/",
    "prioridad": 4
  },
  {
    "id": "015",
    "nombre": "All AI Lists",
    "descripcion": "Catálogo amplio de aplicaciones, modelos y plataformas.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://allailists.com/",
    "prioridad": null
  },
  {
    "id": "016",
    "nombre": "Explore AI Directory",
    "descripcion": "Directorio revisado de herramientas, agentes y soluciones de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.exploreai.directory/tools",
    "prioridad": null
  },
  {
    "id": "017",
    "nombre": "WhatTheAI",
    "descripcion": "Descubrir herramientas y novedades del ecosistema de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.whattheai.tech/",
    "prioridad": null
  },
  {
    "id": "018",
    "nombre": "AI Tool Guru",
    "descripcion": "Explorar herramientas de IA por categorías y usos.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.aitoolguru.com/",
    "prioridad": null
  },
  {
    "id": "019",
    "nombre": "Creati AI",
    "descripcion": "Descubrir aplicaciones y productos de inteligencia artificial.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.creati.ai/",
    "prioridad": null
  },
  {
    "id": "020",
    "nombre": "The AI Report",
    "descripcion": "Consultar recursos y novedades del sector de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.theaireport.ai/",
    "prioridad": null
  },
  {
    "id": "021",
    "nombre": "AI Pure",
    "descripcion": "Descubrir herramientas y productos de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.aipure.ai/",
    "prioridad": null
  },
  {
    "id": "022",
    "nombre": "AI Tools Directory",
    "descripcion": "Explorar herramientas organizadas por categorías.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.aitoolsdirectory.com/",
    "prioridad": null
  },
  {
    "id": "023",
    "nombre": "ToolPilot",
    "descripcion": "Encontrar herramientas y soluciones de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.toolpilot.ai/",
    "prioridad": null
  },
  {
    "id": "024",
    "nombre": "AI Finder Tools",
    "descripcion": "Buscar herramientas y recursos de inteligencia artificial.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.aifindertools.com/",
    "prioridad": null
  },
  {
    "id": "025",
    "nombre": "AI Directories",
    "descripcion": "Descubrir catálogos y recursos de IA.",
    "categoria": "directorios",
    "categoriaLabel": "Directorios de herramientas de IA",
    "destacado": false,
    "url": "https://www.aidirectori.es/",
    "prioridad": null
  },
  {
    "id": "026",
    "nombre": "Product Hunt",
    "descripcion": "Descubrir productos tecnológicos nuevos y lanzamientos de IA.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": true,
    "url": "https://www.producthunt.com/",
    "prioridad": 5
  },
  {
    "id": "027",
    "nombre": "Product Hunt – AI",
    "descripcion": "Consultar lanzamientos clasificados como inteligencia artificial.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://www.producthunt.com/topics/artificial-intelligence",
    "prioridad": null
  },
  {
    "id": "028",
    "nombre": "Hacker News",
    "descripcion": "Descubrir proyectos, investigaciones, startups y debates técnicos.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://news.ycombinator.com/",
    "prioridad": null
  },
  {
    "id": "029",
    "nombre": "Show HN",
    "descripcion": "Conocer proyectos nuevos que desarrolladores presentan a la comunidad.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://news.ycombinator.com/show",
    "prioridad": null
  },
  {
    "id": "030",
    "nombre": "GitHub Trending",
    "descripcion": "Encontrar repositorios y proyectos de código que están creciendo.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": true,
    "url": "https://github.com/trending",
    "prioridad": 8
  },
  {
    "id": "031",
    "nombre": "GitHub AI Topics",
    "descripcion": "Descubrir proyectos clasificados como inteligencia artificial.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://github.com/topics/artificial-intelligence",
    "prioridad": null
  },
  {
    "id": "032",
    "nombre": "GitHub Generative AI",
    "descripcion": "Encontrar proyectos de IA generativa.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://github.com/topics/generative-ai",
    "prioridad": null
  },
  {
    "id": "033",
    "nombre": "GitHub AI Agents",
    "descripcion": "Descubrir agentes, frameworks y sistemas autónomos.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://github.com/topics/ai-agents",
    "prioridad": null
  },
  {
    "id": "034",
    "nombre": "Hugging Face Spaces",
    "descripcion": "Probar aplicaciones y demostraciones experimentales de IA.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://huggingface.co/spaces",
    "prioridad": null
  },
  {
    "id": "035",
    "nombre": "Hugging Face Models",
    "descripcion": "Descubrir modelos nuevos, versiones y arquitecturas.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": true,
    "url": "https://huggingface.co/models",
    "prioridad": 6
  },
  {
    "id": "036",
    "nombre": "Hugging Face Papers",
    "descripcion": "Detectar investigaciones científicas recientes y populares.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": true,
    "url": "https://huggingface.co/papers",
    "prioridad": 7
  },
  {
    "id": "037",
    "nombre": "BetaList",
    "descripcion": "Encontrar startups y productos tecnológicos en etapas tempranas.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://www.betalist.com/",
    "prioridad": null
  },
  {
    "id": "038",
    "nombre": "Indie Hackers",
    "descripcion": "Investigar productos independientes y negocios tecnológicos.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://www.indiehackers.com/",
    "prioridad": null
  },
  {
    "id": "039",
    "nombre": "Uneed",
    "descripcion": "Descubrir productos digitales y lanzamientos independientes.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://www.uneed.best/",
    "prioridad": null
  },
  {
    "id": "040",
    "nombre": "Launching Next",
    "descripcion": "Explorar startups y nuevos productos.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://www.launchingnext.com/",
    "prioridad": null
  },
  {
    "id": "041",
    "nombre": "Peerlist",
    "descripcion": "Descubrir proyectos, desarrolladores y productos tecnológicos.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://www.peerlist.io/",
    "prioridad": null
  },
  {
    "id": "042",
    "nombre": "Reddit – Artificial Intelligence",
    "descripcion": "Detectar herramientas nuevas, debates y experiencias de usuarios.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://www.reddit.com/r/ArtificialIntelligence/",
    "prioridad": null
  },
  {
    "id": "043",
    "nombre": "Reddit – LocalLLaMA",
    "descripcion": "Descubrir modelos abiertos y proyectos para ejecutar IA localmente.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://www.reddit.com/r/LocalLLaMA/",
    "prioridad": null
  },
  {
    "id": "044",
    "nombre": "Reddit – Machine Learning",
    "descripcion": "Seguir investigación, papers, código y discusiones técnicas.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://www.reddit.com/r/MachineLearning/",
    "prioridad": null
  },
  {
    "id": "045",
    "nombre": "Reddit – AI Tools",
    "descripcion": "Descubrir aplicaciones, herramientas y recursos de IA compartidos por usuarios.",
    "categoria": "lanzamientos",
    "categoriaLabel": "Lanzamientos y proyectos emergentes",
    "destacado": false,
    "url": "https://www.reddit.com/r/AItools/",
    "prioridad": null
  },
  {
    "id": "046",
    "nombre": "OpenAI",
    "descripcion": "Nuevos modelos, productos, investigación y actualizaciones.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": true,
    "url": "https://openai.com/news/",
    "prioridad": 9
  },
  {
    "id": "047",
    "nombre": "OpenAI Research",
    "descripcion": "Estudios y avances técnicos.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://openai.com/research/",
    "prioridad": null
  },
  {
    "id": "048",
    "nombre": "Google AI",
    "descripcion": "Novedades de IA y productos de Google.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://blog.google/technology/ai/",
    "prioridad": null
  },
  {
    "id": "049",
    "nombre": "Google DeepMind",
    "descripcion": "Modelos, ciencia, robótica e investigación.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": true,
    "url": "https://deepmind.google/discover/blog/",
    "prioridad": 10
  },
  {
    "id": "050",
    "nombre": "Google Research",
    "descripcion": "Investigaciones y descubrimientos científicos.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://research.google/blog/",
    "prioridad": null
  },
  {
    "id": "051",
    "nombre": "Anthropic",
    "descripcion": "Lanzamientos de Claude y anuncios de la compañía.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": true,
    "url": "https://www.anthropic.com/news",
    "prioridad": 11
  },
  {
    "id": "052",
    "nombre": "Anthropic Research",
    "descripcion": "Capacidades, seguridad y estudios de modelos.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://www.anthropic.com/research",
    "prioridad": null
  },
  {
    "id": "053",
    "nombre": "Meta AI",
    "descripcion": "Modelos, investigación y proyectos abiertos.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": true,
    "url": "https://ai.meta.com/blog/",
    "prioridad": 12
  },
  {
    "id": "054",
    "nombre": "Microsoft AI",
    "descripcion": "Copilot, modelos, servicios y productos.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://blogs.microsoft.com/ai/",
    "prioridad": null
  },
  {
    "id": "055",
    "nombre": "Microsoft Research",
    "descripcion": "Publicaciones científicas y avances técnicos.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://www.microsoft.com/en-us/research/blog/",
    "prioridad": null
  },
  {
    "id": "056",
    "nombre": "NVIDIA",
    "descripcion": "Infraestructura, chips, modelos y robótica.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://blogs.nvidia.com/",
    "prioridad": null
  },
  {
    "id": "057",
    "nombre": "NVIDIA Research",
    "descripcion": "Papers y desarrollos de investigación.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": true,
    "url": "https://research.nvidia.com/",
    "prioridad": 13
  },
  {
    "id": "058",
    "nombre": "Mistral AI",
    "descripcion": "Modelos, APIs y novedades.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://mistral.ai/news/",
    "prioridad": null
  },
  {
    "id": "059",
    "nombre": "DeepSeek",
    "descripcion": "Modelos y productos de DeepSeek.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://www.deepseek.com/",
    "prioridad": null
  },
  {
    "id": "060",
    "nombre": "Hugging Face",
    "descripcion": "Modelos, herramientas, datasets y comunidad.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://huggingface.co/blog",
    "prioridad": null
  },
  {
    "id": "061",
    "nombre": "Cohere",
    "descripcion": "Modelos empresariales, búsqueda y RAG.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://cohere.com/blog",
    "prioridad": null
  },
  {
    "id": "062",
    "nombre": "Stability AI",
    "descripcion": "Modelos generativos y tecnología visual.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://stability.ai/news",
    "prioridad": null
  },
  {
    "id": "063",
    "nombre": "Allen Institute for AI",
    "descripcion": "Investigación abierta, modelos y ciencia.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://allenai.org/blog",
    "prioridad": null
  },
  {
    "id": "064",
    "nombre": "Amazon Science",
    "descripcion": "Investigación de Amazon en IA y aprendizaje automático.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://www.amazon.science/",
    "prioridad": null
  },
  {
    "id": "065",
    "nombre": "AWS Machine Learning",
    "descripcion": "Modelos, infraestructura y aplicaciones empresariales.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://aws.amazon.com/blogs/machine-learning/",
    "prioridad": null
  },
  {
    "id": "066",
    "nombre": "Apple Machine Learning",
    "descripcion": "Investigación y publicaciones de aprendizaje automático.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://machinelearning.apple.com/",
    "prioridad": null
  },
  {
    "id": "067",
    "nombre": "IBM Research",
    "descripcion": "Modelos, ciencia, computación y tecnología empresarial.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://research.ibm.com/blog",
    "prioridad": null
  },
  {
    "id": "068",
    "nombre": "xAI",
    "descripcion": "Modelos y productos de xAI.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://x.ai/",
    "prioridad": null
  },
  {
    "id": "069",
    "nombre": "Qwen",
    "descripcion": "Modelos y novedades del ecosistema Qwen.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://qwen.ai/",
    "prioridad": null
  },
  {
    "id": "070",
    "nombre": "ByteDance Seed",
    "descripcion": "Investigación y modelos de ByteDance.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://seed.bytedance.com/",
    "prioridad": null
  },
  {
    "id": "071",
    "nombre": "Baidu Research",
    "descripcion": "Investigación de IA y tecnologías de Baidu.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://research.baidu.com/",
    "prioridad": null
  },
  {
    "id": "072",
    "nombre": "Tencent AI Lab",
    "descripcion": "Investigación en modelos, visión y aprendizaje automático.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://ai.tencent.com/ailab/",
    "prioridad": null
  },
  {
    "id": "073",
    "nombre": "AI21 Labs",
    "descripcion": "Modelos y tecnología de lenguaje.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://www.ai21.com/",
    "prioridad": null
  },
  {
    "id": "074",
    "nombre": "Databricks",
    "descripcion": "Modelos, datos, ingeniería y aplicaciones empresariales.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://www.databricks.com/blog/category/ai",
    "prioridad": null
  },
  {
    "id": "075",
    "nombre": "Cloudflare",
    "descripcion": "Infraestructura, agentes y servicios de IA en la nube.",
    "categoria": "laboratorios",
    "categoriaLabel": "Laboratorios y empresas oficiales",
    "destacado": false,
    "url": "https://blog.cloudflare.com/tag/ai/",
    "prioridad": null
  },
  {
    "id": "076",
    "nombre": "Perplexity",
    "descripcion": "Buscar en Internet y elaborar respuestas con fuentes.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": true,
    "url": "https://www.perplexity.ai/",
    "prioridad": 14
  },
  {
    "id": "077",
    "nombre": "ChatGPT",
    "descripcion": "Investigar, analizar, comparar y sintetizar información.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://chatgpt.com/",
    "prioridad": null
  },
  {
    "id": "078",
    "nombre": "Google Gemini",
    "descripcion": "Investigar con IA y analizar información y documentos.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://gemini.google.com/",
    "prioridad": null
  },
  {
    "id": "079",
    "nombre": "Claude",
    "descripcion": "Analizar documentos, sintetizar y desarrollar investigaciones.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://claude.ai/",
    "prioridad": null
  },
  {
    "id": "080",
    "nombre": "Microsoft Copilot",
    "descripcion": "Consultar información web y trabajar con herramientas de Microsoft.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://copilot.microsoft.com/",
    "prioridad": null
  },
  {
    "id": "081",
    "nombre": "You.com",
    "descripcion": "Búsqueda web asistida y flujos de investigación.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://you.com/",
    "prioridad": null
  },
  {
    "id": "082",
    "nombre": "Genspark",
    "descripcion": "Investigación asistida y creación de informes.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://www.genspark.ai/",
    "prioridad": null
  },
  {
    "id": "083",
    "nombre": "Felo",
    "descripcion": "Buscar, organizar y resumir información de distintas fuentes.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://felo.ai/",
    "prioridad": null
  },
  {
    "id": "084",
    "nombre": "Phind",
    "descripcion": "Investigar problemas técnicos y de programación.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://www.phind.com/",
    "prioridad": null
  },
  {
    "id": "085",
    "nombre": "Exa",
    "descripcion": "Motor de búsqueda semántica para personas y aplicaciones de IA.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": true,
    "url": "https://exa.ai/",
    "prioridad": 15
  },
  {
    "id": "086",
    "nombre": "Tavily",
    "descripcion": "Búsqueda web diseñada para agentes y aplicaciones de IA.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": true,
    "url": "https://tavily.com/",
    "prioridad": 16
  },
  {
    "id": "087",
    "nombre": "Kagi",
    "descripcion": "Buscador web con herramientas para organizar y resumir resultados.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://kagi.com/",
    "prioridad": null
  },
  {
    "id": "088",
    "nombre": "NotebookLM",
    "descripcion": "Investigar fuentes propias, documentos, enlaces y notas.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://notebooklm.google/",
    "prioridad": null
  },
  {
    "id": "089",
    "nombre": "Wolfram Alpha",
    "descripcion": "Resolver consultas matemáticas, científicas y técnicas.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://www.wolframalpha.com/",
    "prioridad": null
  },
  {
    "id": "090",
    "nombre": "Consensus",
    "descripcion": "Buscar respuestas en investigaciones científicas.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://consensus.app/",
    "prioridad": null
  },
  {
    "id": "091",
    "nombre": "Elicit",
    "descripcion": "Encontrar papers y extraer información de publicaciones científicas.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": true,
    "url": "https://www.elicit.com/",
    "prioridad": 19
  },
  {
    "id": "092",
    "nombre": "SciSpace",
    "descripcion": "Leer, comprender y analizar artículos científicos.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://scispace.com/",
    "prioridad": null
  },
  {
    "id": "093",
    "nombre": "Glean",
    "descripcion": "Buscar y recuperar conocimiento en fuentes empresariales conectadas.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://www.glean.com/",
    "prioridad": null
  },
  {
    "id": "094",
    "nombre": "Andi Search",
    "descripcion": "Buscar información web mediante una experiencia conversacional.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://www.andisearch.com/",
    "prioridad": null
  },
  {
    "id": "095",
    "nombre": "SearchSmart",
    "descripcion": "Comparar y explorar motores y herramientas de búsqueda académica.",
    "categoria": "buscadores",
    "categoriaLabel": "Buscadores y asistentes de investigación",
    "destacado": false,
    "url": "https://www.searchsmart.org/",
    "prioridad": null
  },
  {
    "id": "096",
    "nombre": "arXiv",
    "descripcion": "Consultar investigaciones científicas y papers de IA.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": true,
    "url": "https://arxiv.org/",
    "prioridad": null
  },
  {
    "id": "097",
    "nombre": "arXiv – Artificial Intelligence",
    "descripcion": "Ver publicaciones recientes de inteligencia artificial.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://arxiv.org/list/cs.AI/recent",
    "prioridad": 17
  },
  {
    "id": "098",
    "nombre": "arXiv – Machine Learning",
    "descripcion": "Consultar publicaciones recientes de aprendizaje automático.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://arxiv.org/list/cs.LG/recent",
    "prioridad": null
  },
  {
    "id": "099",
    "nombre": "Semantic Scholar",
    "descripcion": "Buscar artículos científicos y analizar citas.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": true,
    "url": "https://www.semanticscholar.org/",
    "prioridad": 18
  },
  {
    "id": "100",
    "nombre": "Google Scholar",
    "descripcion": "Encontrar artículos, tesis, autores y citas académicas.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://scholar.google.com/",
    "prioridad": null
  },
  {
    "id": "101",
    "nombre": "OpenAlex",
    "descripcion": "Consultar publicaciones, autores, instituciones y relaciones científicas.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://openalex.org/",
    "prioridad": null
  },
  {
    "id": "102",
    "nombre": "Crossref",
    "descripcion": "Consultar metadatos, DOI y referencias bibliográficas.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://www.crossref.org/",
    "prioridad": null
  },
  {
    "id": "103",
    "nombre": "ResearchRabbit",
    "descripcion": "Descubrir papers relacionados y redes de citas.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": true,
    "url": "https://www.researchrabbit.ai/",
    "prioridad": 20
  },
  {
    "id": "104",
    "nombre": "Connected Papers",
    "descripcion": "Visualizar conexiones entre investigaciones.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://www.connectedpapers.com/",
    "prioridad": null
  },
  {
    "id": "105",
    "nombre": "Scite",
    "descripcion": "Analizar cómo otros trabajos citan y discuten una publicación.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://scite.ai/",
    "prioridad": null
  },
  {
    "id": "106",
    "nombre": "The Lens",
    "descripcion": "Investigar publicaciones científicas y patentes.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://www.lens.org/",
    "prioridad": null
  },
  {
    "id": "107",
    "nombre": "Dimensions",
    "descripcion": "Analizar publicaciones, citas, financiación e investigación.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://www.dimensions.ai/",
    "prioridad": null
  },
  {
    "id": "108",
    "nombre": "Semantic Scholar API",
    "descripcion": "Consultar datos académicos desde aplicaciones.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://www.semanticscholar.org/product/api",
    "prioridad": null
  },
  {
    "id": "109",
    "nombre": "OpenReview",
    "descripcion": "Consultar artículos y revisiones de conferencias científicas.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://www.openreview.net/",
    "prioridad": null
  },
  {
    "id": "110",
    "nombre": "Papers with Code",
    "descripcion": "Relacionar papers con implementaciones, código y resultados.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://paperswithcode.com/",
    "prioridad": null
  },
  {
    "id": "111",
    "nombre": "DBLP",
    "descripcion": "Investigar publicaciones y autores de informática.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://dblp.org/",
    "prioridad": null
  },
  {
    "id": "112",
    "nombre": "PubMed",
    "descripcion": "Consultar investigaciones biomédicas relacionadas con IA y otras ciencias.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://pubmed.ncbi.nlm.nih.gov/",
    "prioridad": null
  },
  {
    "id": "113",
    "nombre": "Undermind",
    "descripcion": "Buscar literatura científica mediante investigación asistida.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://www.undermind.ai/",
    "prioridad": null
  },
  {
    "id": "114",
    "nombre": "AlphaXiv",
    "descripcion": "Explorar papers, comentarios y discusiones técnicas.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://www.alphaxiv.org/",
    "prioridad": null
  },
  {
    "id": "115",
    "nombre": "Paper Digest",
    "descripcion": "Descubrir y resumir artículos científicos.",
    "categoria": "papers",
    "categoriaLabel": "Investigación científica y papers",
    "destacado": false,
    "url": "https://www.paperdigest.org/",
    "prioridad": null
  },
  {
    "id": "116",
    "nombre": "Hugging Face Models",
    "descripcion": "Buscar modelos por tarea, arquitectura, licencia y desarrollador.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": true,
    "url": "https://huggingface.co/models",
    "prioridad": null
  },
  {
    "id": "117",
    "nombre": "Hugging Face Datasets",
    "descripcion": "Descubrir conjuntos de datos para entrenar y evaluar IA.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://huggingface.co/datasets",
    "prioridad": null
  },
  {
    "id": "118",
    "nombre": "Hugging Face Spaces",
    "descripcion": "Probar demos y aplicaciones de modelos.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://huggingface.co/spaces",
    "prioridad": null
  },
  {
    "id": "119",
    "nombre": "ModelScope",
    "descripcion": "Descubrir modelos, datasets y proyectos de IA.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://modelscope.cn/",
    "prioridad": null
  },
  {
    "id": "120",
    "nombre": "Kaggle",
    "descripcion": "Consultar datasets, notebooks, modelos y competiciones.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://www.kaggle.com/",
    "prioridad": null
  },
  {
    "id": "121",
    "nombre": "GitHub",
    "descripcion": "Encontrar código, proyectos y frameworks de IA.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://github.com/",
    "prioridad": null
  },
  {
    "id": "122",
    "nombre": "Ollama Library",
    "descripcion": "Descubrir modelos que pueden ejecutarse localmente.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://ollama.com/library",
    "prioridad": null
  },
  {
    "id": "123",
    "nombre": "LM Studio",
    "descripcion": "Explorar y ejecutar modelos locales en el computador.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://lmstudio.ai/",
    "prioridad": null
  },
  {
    "id": "124",
    "nombre": "OpenML",
    "descripcion": "Consultar datasets, experimentos y tareas de aprendizaje automático.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://openml.org/",
    "prioridad": null
  },
  {
    "id": "125",
    "nombre": "Papers with Code",
    "descripcion": "Investigar código e implementaciones de investigaciones.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://paperswithcode.com/",
    "prioridad": null
  },
  {
    "id": "126",
    "nombre": "Civitai",
    "descripcion": "Explorar modelos y recursos comunitarios de IA generativa visual.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://civitai.com/",
    "prioridad": null
  },
  {
    "id": "127",
    "nombre": "Replicate Explore",
    "descripcion": "Descubrir modelos que pueden probarse mediante inferencia.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://replicate.com/explore",
    "prioridad": null
  },
  {
    "id": "128",
    "nombre": "Tensor.Art",
    "descripcion": "Explorar modelos y recursos de generación visual.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://www.tensor.art/",
    "prioridad": null
  },
  {
    "id": "129",
    "nombre": "GitHub LLM",
    "descripcion": "Descubrir proyectos de modelos de lenguaje.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://github.com/topics/large-language-models",
    "prioridad": null
  },
  {
    "id": "130",
    "nombre": "GitHub Machine Learning",
    "descripcion": "Explorar proyectos de aprendizaje automático.",
    "categoria": "modelos",
    "categoriaLabel": "Modelos, repositorios y datasets",
    "destacado": false,
    "url": "https://github.com/topics/machine-learning",
    "prioridad": null
  },
  {
    "id": "131",
    "nombre": "Artificial Analysis",
    "descripcion": "Comparar inteligencia, velocidad, latencia, precio y rendimiento de modelos.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": true,
    "url": "https://artificialanalysis.ai/",
    "prioridad": 21
  },
  {
    "id": "132",
    "nombre": "LMArena",
    "descripcion": "Comparar modelos mediante preferencias y evaluaciones humanas.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": true,
    "url": "https://arena.ai/leaderboard",
    "prioridad": 22
  },
  {
    "id": "133",
    "nombre": "LiveBench",
    "descripcion": "Evaluar modelos mediante preguntas y tareas actualizadas.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": true,
    "url": "https://livebench.ai/",
    "prioridad": 23
  },
  {
    "id": "134",
    "nombre": "OpenRouter Rankings",
    "descripcion": "Consultar popularidad y uso de modelos en OpenRouter.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": false,
    "url": "https://openrouter.ai/rankings",
    "prioridad": null
  },
  {
    "id": "135",
    "nombre": "Hugging Face Leaderboards",
    "descripcion": "Explorar rankings y evaluaciones comunitarias y oficiales.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": false,
    "url": "https://huggingface.co/leaderboards",
    "prioridad": null
  },
  {
    "id": "136",
    "nombre": "Epoch AI",
    "descripcion": "Investigar tendencias y capacidades de modelos y computación.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": true,
    "url": "https://epoch.ai/",
    "prioridad": 24
  },
  {
    "id": "137",
    "nombre": "Scale AI Leaderboards",
    "descripcion": "Consultar evaluaciones de razonamiento, agentes y seguridad.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": false,
    "url": "https://labs.scale.com/leaderboard",
    "prioridad": null
  },
  {
    "id": "138",
    "nombre": "SWE-bench",
    "descripcion": "Medir capacidades de modelos para resolver problemas reales de código.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": false,
    "url": "https://www.swebench.com/",
    "prioridad": null
  },
  {
    "id": "139",
    "nombre": "Stanford HELM",
    "descripcion": "Evaluar modelos mediante escenarios y métricas diversas.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": false,
    "url": "https://crfm.stanford.edu/helm/",
    "prioridad": null
  },
  {
    "id": "140",
    "nombre": "EvalPlus",
    "descripcion": "Evaluar capacidades de generación de código.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": false,
    "url": "https://evalplus.github.io/",
    "prioridad": null
  },
  {
    "id": "141",
    "nombre": "LM Evaluation Harness",
    "descripcion": "Ejecutar evaluaciones reproducibles de modelos de lenguaje.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": false,
    "url": "https://github.com/EleutherAI/lm-evaluation-harness",
    "prioridad": null
  },
  {
    "id": "142",
    "nombre": "Vals AI",
    "descripcion": "Consultar evaluaciones de modelos para tareas profesionales.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": false,
    "url": "https://www.vals.ai/",
    "prioridad": null
  },
  {
    "id": "143",
    "nombre": "Vellum LLM Leaderboard",
    "descripcion": "Comparar modelos en diferentes tareas y capacidades.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": false,
    "url": "https://www.vellum.ai/llm-leaderboard",
    "prioridad": null
  },
  {
    "id": "144",
    "nombre": "HELM on GitHub",
    "descripcion": "Consultar herramientas y metodología del proyecto HELM.",
    "categoria": "benchmarks",
    "categoriaLabel": "Benchmarks y rankings de modelos",
    "destacado": false,
    "url": "https://github.com/StanfordMIMI/HELM",
    "prioridad": null
  },
  {
    "id": "145",
    "nombre": "The Rundown AI",
    "descripcion": "Resúmenes de noticias y novedades del sector.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": true,
    "url": "https://www.therundown.ai/",
    "prioridad": 26
  },
  {
    "id": "146",
    "nombre": "Ben's Bites",
    "descripcion": "Noticias, herramientas y productos emergentes.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.bensbites.com/",
    "prioridad": null
  },
  {
    "id": "147",
    "nombre": "TLDR AI",
    "descripcion": "Resúmenes de noticias técnicas de inteligencia artificial.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://tldr.tech/ai",
    "prioridad": null
  },
  {
    "id": "148",
    "nombre": "The Batch",
    "descripcion": "Noticias y análisis de aprendizaje automático.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.deeplearning.ai/the-batch/",
    "prioridad": null
  },
  {
    "id": "149",
    "nombre": "MarkTechPost",
    "descripcion": "Noticias técnicas, papers, modelos y avances.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.marktechpost.com/",
    "prioridad": null
  },
  {
    "id": "150",
    "nombre": "TechCrunch AI",
    "descripcion": "Noticias de startups, empresas y lanzamientos.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://techcrunch.com/category/artificial-intelligence/",
    "prioridad": null
  },
  {
    "id": "151",
    "nombre": "VentureBeat AI",
    "descripcion": "Aplicaciones empresariales y novedades tecnológicas.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://venturebeat.com/category/ai/",
    "prioridad": null
  },
  {
    "id": "152",
    "nombre": "The Verge AI",
    "descripcion": "Noticias y análisis de productos y compañías.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.theverge.com/ai-artificial-intelligence",
    "prioridad": null
  },
  {
    "id": "153",
    "nombre": "MIT Technology Review",
    "descripcion": "Análisis de avances, impacto y riesgos de IA.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.technologyreview.com/topic/artificial-intelligence/",
    "prioridad": null
  },
  {
    "id": "154",
    "nombre": "WIRED AI",
    "descripcion": "Reportajes y tendencias tecnológicas.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.wired.com/tag/artificial-intelligence/",
    "prioridad": null
  },
  {
    "id": "155",
    "nombre": "Last Week in AI",
    "descripcion": "Recopilación periódica de noticias y publicaciones.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.lastweekin.ai/",
    "prioridad": null
  },
  {
    "id": "156",
    "nombre": "Superhuman AI",
    "descripcion": "Novedades y aplicaciones prácticas de IA.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.superhuman.ai/",
    "prioridad": null
  },
  {
    "id": "157",
    "nombre": "The Decoder",
    "descripcion": "Noticias sobre modelos, empresas y desarrollos de IA.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": true,
    "url": "https://www.the-decoder.com/",
    "prioridad": 27
  },
  {
    "id": "158",
    "nombre": "Unite.AI",
    "descripcion": "Noticias, entrevistas y análisis.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.unite.ai/",
    "prioridad": null
  },
  {
    "id": "159",
    "nombre": "AI News",
    "descripcion": "Noticias sobre IA empresarial y tecnología.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://artificialintelligence-news.com/",
    "prioridad": null
  },
  {
    "id": "160",
    "nombre": "Axios Technology",
    "descripcion": "Noticias y análisis del sector tecnológico.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.axios.com/technology",
    "prioridad": null
  },
  {
    "id": "161",
    "nombre": "Simon Willison",
    "descripcion": "Análisis técnico, experimentos y novedades de modelos y herramientas.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://simonwillison.net/",
    "prioridad": null
  },
  {
    "id": "162",
    "nombre": "Interconnects",
    "descripcion": "Análisis y comentarios técnicos sobre modelos y laboratorios.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.interconnects.ai/",
    "prioridad": null
  },
  {
    "id": "163",
    "nombre": "Import AI",
    "descripcion": "Boletín de investigación, avances y políticas de IA.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.importai.net/",
    "prioridad": null
  },
  {
    "id": "164",
    "nombre": "AI Tidbits",
    "descripcion": "Recopilación de noticias y recursos del ecosistema.",
    "categoria": "noticias",
    "categoriaLabel": "Noticias, medios y boletines",
    "destacado": false,
    "url": "https://www.aitidbits.ai/",
    "prioridad": null
  },
  {
    "id": "165",
    "nombre": "Google Trends",
    "descripcion": "Investigar el crecimiento de búsquedas y temas.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://trends.google.com/",
    "prioridad": null
  },
  {
    "id": "166",
    "nombre": "Exploding Topics",
    "descripcion": "Detectar tendencias emergentes antes de que se generalicen.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": true,
    "url": "https://explodingtopics.com/",
    "prioridad": 28
  },
  {
    "id": "167",
    "nombre": "Similarweb",
    "descripcion": "Analizar tráfico web y competidores.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.similarweb.com/",
    "prioridad": null
  },
  {
    "id": "168",
    "nombre": "Crunchbase",
    "descripcion": "Investigar empresas, startups y financiación.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.crunchbase.com/",
    "prioridad": null
  },
  {
    "id": "169",
    "nombre": "CB Insights",
    "descripcion": "Analizar mercados, tecnologías y empresas.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.cbinsights.com/",
    "prioridad": null
  },
  {
    "id": "170",
    "nombre": "Dealroom",
    "descripcion": "Explorar startups, inversiones y ecosistemas tecnológicos.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.dealroom.co/",
    "prioridad": null
  },
  {
    "id": "171",
    "nombre": "Y Combinator Companies",
    "descripcion": "Descubrir empresas tecnológicas y startups.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.ycombinator.com/companies",
    "prioridad": null
  },
  {
    "id": "172",
    "nombre": "Wellfound",
    "descripcion": "Investigar startups y oportunidades profesionales.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://wellfound.com/",
    "prioridad": null
  },
  {
    "id": "173",
    "nombre": "G2",
    "descripcion": "Leer reseñas y comparar software.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.g2.com/",
    "prioridad": null
  },
  {
    "id": "174",
    "nombre": "Capterra",
    "descripcion": "Investigar características, opiniones y categorías de software.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.capterra.com/",
    "prioridad": null
  },
  {
    "id": "175",
    "nombre": "AlternativeTo",
    "descripcion": "Encontrar alternativas a productos y herramientas.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.alternativeto.net/",
    "prioridad": null
  },
  {
    "id": "176",
    "nombre": "Metaculus",
    "descripcion": "Explorar pronósticos y predicciones sobre tecnología y ciencia.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.metaculus.com/",
    "prioridad": null
  },
  {
    "id": "177",
    "nombre": "Gartner AI",
    "descripcion": "Investigar tendencias y análisis empresariales de IA.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.gartner.com/en/topics/artificial-intelligence",
    "prioridad": null
  },
  {
    "id": "178",
    "nombre": "McKinsey QuantumBlack",
    "descripcion": "Consultar análisis de adopción e impacto de IA en empresas.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.mckinsey.com/capabilities/quantumblack/our-insights",
    "prioridad": null
  },
  {
    "id": "179",
    "nombre": "Stanford AI Index",
    "descripcion": "Consultar datos e informes sobre la evolución mundial de IA.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": true,
    "url": "https://hai.stanford.edu/ai-index",
    "prioridad": 29
  },
  {
    "id": "180",
    "nombre": "World Economic Forum – AI",
    "descripcion": "Investigar impacto económico, social y empresarial de IA.",
    "categoria": "tendencias",
    "categoriaLabel": "Tendencias, startups y mercado",
    "destacado": false,
    "url": "https://www.weforum.org/topics/artificial-intelligence/",
    "prioridad": null
  },
  {
    "id": "181",
    "nombre": "OpenRouter",
    "descripcion": "Descubrir y consultar múltiples modelos a través de una API.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": true,
    "url": "https://openrouter.ai/",
    "prioridad": 25
  },
  {
    "id": "182",
    "nombre": "Replicate",
    "descripcion": "Explorar y ejecutar modelos mediante APIs.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://replicate.com/",
    "prioridad": null
  },
  {
    "id": "183",
    "nombre": "fal.ai",
    "descripcion": "Consultar modelos y APIs de generación de contenido.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://fal.ai/",
    "prioridad": null
  },
  {
    "id": "184",
    "nombre": "Together AI",
    "descripcion": "Acceder a modelos abiertos e infraestructura de inferencia.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://together.ai/",
    "prioridad": null
  },
  {
    "id": "185",
    "nombre": "Fireworks AI",
    "descripcion": "Consultar modelos y servicios de inferencia.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://fireworks.ai/",
    "prioridad": null
  },
  {
    "id": "186",
    "nombre": "Groq",
    "descripcion": "Investigar infraestructura de inferencia de alto rendimiento.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://groq.com/",
    "prioridad": null
  },
  {
    "id": "187",
    "nombre": "DeepInfra",
    "descripcion": "Descubrir modelos y servicios de inferencia.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://deepinfra.com/",
    "prioridad": null
  },
  {
    "id": "188",
    "nombre": "Cerebras",
    "descripcion": "Investigar hardware e infraestructura para IA.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://www.cerebras.ai/",
    "prioridad": null
  },
  {
    "id": "189",
    "nombre": "Modal",
    "descripcion": "Ejecutar cargas de trabajo y modelos en la nube.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://modal.com/",
    "prioridad": null
  },
  {
    "id": "190",
    "nombre": "RunPod",
    "descripcion": "Explorar infraestructura GPU para IA.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://www.runpod.io/",
    "prioridad": null
  },
  {
    "id": "191",
    "nombre": "Google AI for Developers",
    "descripcion": "Consultar modelos, APIs y documentación de Google.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://ai.google.dev/",
    "prioridad": null
  },
  {
    "id": "192",
    "nombre": "OpenAI API Docs",
    "descripcion": "Consultar modelos, herramientas y endpoints de OpenAI.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://platform.openai.com/docs",
    "prioridad": null
  },
  {
    "id": "193",
    "nombre": "Anthropic API Docs",
    "descripcion": "Investigar modelos y capacidades de Anthropic.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://docs.anthropic.com/",
    "prioridad": null
  },
  {
    "id": "194",
    "nombre": "Mistral API Docs",
    "descripcion": "Consultar modelos y documentación de Mistral.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://docs.mistral.ai/",
    "prioridad": null
  },
  {
    "id": "195",
    "nombre": "Google Vertex AI",
    "descripcion": "Explorar modelos y servicios de IA en Google Cloud.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://cloud.google.com/vertex-ai",
    "prioridad": null
  },
  {
    "id": "196",
    "nombre": "Azure AI Foundry",
    "descripcion": "Descubrir y desarrollar aplicaciones con modelos de IA.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://ai.azure.com/",
    "prioridad": null
  },
  {
    "id": "197",
    "nombre": "Amazon Bedrock",
    "descripcion": "Consultar modelos y servicios de IA generativa de AWS.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://aws.amazon.com/bedrock/",
    "prioridad": null
  },
  {
    "id": "198",
    "nombre": "NVIDIA Build",
    "descripcion": "Explorar modelos, APIs y microservicios de IA.",
    "categoria": "apis",
    "categoriaLabel": "APIs, proveedores e inferencia",
    "destacado": false,
    "url": "https://build.nvidia.com/",
    "prioridad": null
  },
  {
    "id": "199",
    "nombre": "Feedly",
    "descripcion": "Seguir y organizar fuentes de noticias y blogs.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": false,
    "url": "https://feedly.com/",
    "prioridad": null
  },
  {
    "id": "200",
    "nombre": "Inoreader",
    "descripcion": "Leer RSS y crear filtros y reglas de seguimiento.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": false,
    "url": "https://www.inoreader.com/",
    "prioridad": null
  },
  {
    "id": "201",
    "nombre": "NewsBlur",
    "descripcion": "Recopilar noticias y publicaciones de diferentes sitios.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": false,
    "url": "https://newsblur.com/",
    "prioridad": null
  },
  {
    "id": "202",
    "nombre": "Feeder",
    "descripcion": "Seguir fuentes RSS y actualizaciones.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": false,
    "url": "https://feeder.co/",
    "prioridad": null
  },
  {
    "id": "203",
    "nombre": "FreshRSS",
    "descripcion": "Instalar un lector RSS de código abierto.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": false,
    "url": "https://freshrss.org/",
    "prioridad": null
  },
  {
    "id": "204",
    "nombre": "changedetection.io",
    "descripcion": "Detectar cambios en páginas web.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": false,
    "url": "https://www.changedetection.io/",
    "prioridad": null
  },
  {
    "id": "205",
    "nombre": "Visualping",
    "descripcion": "Vigilar cambios visuales y de contenido en páginas web.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": false,
    "url": "https://visualping.io/",
    "prioridad": null
  },
  {
    "id": "206",
    "nombre": "Distill",
    "descripcion": "Monitorear páginas y recibir alertas cuando cambian.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": false,
    "url": "https://distill.io/",
    "prioridad": null
  },
  {
    "id": "207",
    "nombre": "Google Alerts",
    "descripcion": "Recibir alertas cuando aparecen nuevas menciones de términos.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": false,
    "url": "https://www.google.com/alerts",
    "prioridad": null
  },
  {
    "id": "208",
    "nombre": "Talkwalker Alerts",
    "descripcion": "Monitorizar menciones y noticias en Internet.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": false,
    "url": "https://www.talkwalker.com/alerts",
    "prioridad": null
  },
  {
    "id": "209",
    "nombre": "arXiv RSS",
    "descripcion": "Seguir nuevas investigaciones por categorías científicas.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": false,
    "url": "https://rss.arxiv.org/",
    "prioridad": null
  },
  {
    "id": "210",
    "nombre": "AI News Sources",
    "descripcion": "Consultar publicaciones de laboratorios y empresas mediante fuentes agrupadas.",
    "categoria": "rss",
    "categoriaLabel": "RSS, agregadores y monitoreo",
    "destacado": true,
    "url": "https://ai-news-ed8ddf.gitlab.io/sources/",
    "prioridad": 30
  }
];
