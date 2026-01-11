"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Placeholder project data - will be replaced with real data from database
const featuredProjects = [
  {
    id: "1",
    title: "Modern Luxury Apartment",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    description: "Contemporary design meets luxury in this stunning apartment transformation.",
  },
  {
    id: "2",
    title: "Corporate Headquarters",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    description: "A sophisticated workspace that inspires creativity and collaboration.",
  },
  {
    id: "3",
    title: "Boutique Retail Store",
    category: "Retail",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    description: "An inviting retail space that enhances the shopping experience.",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl">
              Explore our portfolio of stunning interior design transformations
            </p>
          </div>
          <Link
            href="/portfolio"
            className="hidden md:flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <Link href={`/portfolio/${project.id}`}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 bg-neutral-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm rounded-full mb-2">
                      {project.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-600">{project.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <span>View All Projects</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}




