import Hero from "@/components/sections/hero";
import Categorias from "@/components/sections/categorias";
import CTA from "@/components/sections/cta";
import DescubrimientoDelDia from "@/components/sections/descubrimiento-del-dia";

export default function Home() {
  return (
    <main>
      <Hero />
      <DescubrimientoDelDia />
      <Categorias />
      <CTA />
    </main>
  );
}