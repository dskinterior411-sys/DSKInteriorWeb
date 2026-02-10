import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import About from "@/components/home/About";
import ServiceAreas from "@/components/home/ServiceAreas";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="overflow-hidden bg-accent-500">
      <Hero />
      <Services />
      <FeaturedProjects />
      <About />
      <ServiceAreas />
      <Testimonials />
      <CTA />
    </div>
  );
}






