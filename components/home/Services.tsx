"use client";

import { motion } from "framer-motion";
import { Home, Building2, Palette, PenTool, Layout, Armchair, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Armchair,
    title: "Interior Design",
    description: "Full-service residential design focused on creating functional yet luxurious living environments.",
    link: "/contact?service=interior-design"
  },
  {
    icon: Layout,
    title: "Space Planning",
    description: "Optimizing the layout of your home to ensure flow, balance, and maximum utility.",
    link: "/contact?service=space-planning"
  },
  {
    icon: Palette,
    title: "Styling & Decor",
    description: "The finishing touches that turn a house into a home, from art selection to custom textiles.",
    link: "/contact?service=styling"
  },
  {
    icon: Building2,
    title: "Commercial Design",
    description: "Create professional workspaces that enhance productivity and brand identity.",
    link: "/contact?service=commercial"
  },
  {
    icon: Home,
    title: "Renovation",
    description: "Expert guidance through structural changes and updates to breathe new life into your space.",
    link: "/contact?service=renovation"
  },
  {
    icon: PenTool,
    title: "Custom Furniture",
    description: "Bespoke furniture design tailored specifically to your dimensions and style preferences.",
    link: "/contact?service=custom-furniture"
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 bg-accent-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-4 block font-sans">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-neutral-900 tracking-tight mb-6">
            DESIGN <span className="italic text-primary-500">SOLUTIONS</span>
          </h2>
          <div className="w-24 h-0.5 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-neutral-500 font-light max-w-2xl mx-auto font-sans leading-relaxed">
            Comprehensive interior styling and design services tailored to your unique lifestyle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative bg-white p-10 rounded-xl hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:border-primary-100 overflow-hidden"
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-accent-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-accent-50 rounded-lg flex items-center justify-center mb-8 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:rotate-3">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-2xl mb-4 font-display font-medium text-neutral-900 group-hover:translate-x-1 transition-transform duration-300">
                    {service.title}
                  </h3>

                  <p className="text-neutral-500 leading-relaxed font-light font-sans mb-8 group-hover:text-neutral-600 transition-colors">
                    {service.description}
                  </p>

                  <Link
                    href={service.link}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary-500 hover:text-primary-600 transition-colors group/link"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="h-4 w-4 ml-2 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}






