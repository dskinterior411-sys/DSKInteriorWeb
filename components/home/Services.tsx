"use client";

import { motion } from "framer-motion";
import { Home, Building2, Store, Briefcase, Sparkles, Palette } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Design",
    description: "Transform your home into a personalized sanctuary that reflects your lifestyle and taste.",
    features: ["Space Planning", "Color Consultation", "Furniture Selection", "Lighting Design"],
  },
  {
    icon: Building2,
    title: "Commercial Design",
    description: "Create professional workspaces that enhance productivity and brand identity.",
    features: ["Office Layout", "Brand Integration", "Ergonomic Solutions", "Modern Aesthetics"],
  },
  {
    icon: Store,
    title: "Retail Design",
    description: "Design retail spaces that attract customers and maximize sales potential.",
    features: ["Store Layout", "Visual Merchandising", "Customer Flow", "Brand Experience"],
  },
  {
    icon: Briefcase,
    title: "Corporate Design",
    description: "Elevate your corporate environment with sophisticated and functional designs.",
    features: ["Executive Spaces", "Meeting Rooms", "Reception Areas", "Collaborative Zones"],
  },
  {
    icon: Sparkles,
    title: "Hospitality Design",
    description: "Create memorable experiences for guests with stunning hospitality interiors.",
    features: ["Hotel Interiors", "Restaurant Design", "Lounge Areas", "Guest Experience"],
  },
  {
    icon: Palette,
    title: "Custom Solutions",
    description: "Tailored design solutions for unique spaces and specific requirements.",
    features: ["Bespoke Design", "Custom Furniture", "Unique Concepts", "Personalized Service"],
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Comprehensive interior design solutions for every space and style
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
                className="group p-8 bg-neutral-50 rounded-2xl hover:bg-white border-2 border-transparent hover:border-primary-200 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-neutral-900">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-neutral-600">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}




