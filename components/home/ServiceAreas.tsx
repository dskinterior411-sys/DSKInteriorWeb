"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";

const serviceAreas = [
  {
    city: "Nashik",
    description: "Our home base, delivering exceptional design across the city.",
    // Nashik styled house (Indian traditional/modern mix)
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
  },
  {
    city: "Pune",
    description: "Transforming residential and commercial spaces in the cultural capital.",
    // Pune styled House (Modern apartment/bungalow)
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
  },
  {
    city: "Mumbai",
    description: "Bringing sophisticated luxury to the bustling metropolis.",
    // Modern Villas (High-end luxury)
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800"
  },
];

export default function ServiceAreas() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-50/50 -skew-x-12 transform translate-x-20"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-4 block font-sans">Locations</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-neutral-900 mb-6 tracking-tight">
            SERVING <span className="italic text-primary-500">PREMIER</span> LOCATIONS
          </h2>
          <div className="w-24 h-0.5 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed font-sans">
            Bringing our signature luxury aesthetic to distinctive properties across Maharashtra.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {serviceAreas.map((area, index) => (
            <motion.div
              key={area.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              className="group relative"
            >
              <div className="relative h-[400px] overflow-hidden rounded-none shadow-lg">
                <Image
                  src={area.image}
                  alt={area.city}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20 group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-300">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-3xl font-display text-white mb-3 tracking-wide">{area.city.toUpperCase()}</h3>

                  <div className="h-10 overflow-hidden relative w-full">
                    <p className="text-white/80 font-sans text-sm font-light transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                      {area.description}
                    </p>
                  </div>
                </div>

                {/* Border effect */}
                <div className="absolute inset-4 border border-white/20 group-hover:inset-6 transition-all duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

