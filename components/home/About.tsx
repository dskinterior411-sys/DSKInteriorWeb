"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, Heart } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passion for Design",
    description: "We pour our heart into every project, ensuring each space tells a unique story.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to delivering the highest quality designs that exceed expectations.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your vision is our priority. We listen, understand, and bring your dreams to life.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We respect your time and deliver projects on schedule without compromising quality.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">DSK Interior</span>
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              With over 6 years of experience, we&apos;ve transformed spaces across Nashik, Pune, and Mumbai,
              creating luxurious, functional interiors that reflect our clients&apos; unique
              personalities and needs.
            </p>
            <p className="text-lg text-neutral-600 mb-8">
              Our team of talented designers combines creativity with practicality,
              ensuring every project elevates your space with luxury while maintaining functionality.
              We believe in creating spaces that inspire, comfort, and enhance the quality of life.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "35+", label: "Projects" },
                { number: "30+", label: "Clients" },
                { number: "6+", label: "Years" },
                { number: "3", label: "Cities" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-neutral-50 rounded-xl">
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {stat.number}
                  </div>
                  <div className="text-neutral-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border-2 border-primary-100"
                >
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-900">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}




