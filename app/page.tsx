import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <FeaturedProjects />
      <About />
      <Testimonials />
      <CTA />
    </div>
  );
}

