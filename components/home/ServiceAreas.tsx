"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const serviceAreas = [
  { city: "Nashik", description: "Premium interior design services in Nashik" },
  { city: "Pune", description: "Luxury design solutions for Pune homes and businesses" },
  { city: "Mumbai", description: "Expert interior design across Mumbai" },
];

export default function ServiceAreas() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            We Serve <span className="gradient-text">Multiple Cities</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Bringing luxury interior design to Nashik, Pune, and Mumbai
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceAreas.map((area, index) => (
            <motion.div
              key={area.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border-2 border-primary-100 text-center"
            >
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900">{area.city}</h3>
              <p className="text-neutral-600">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

