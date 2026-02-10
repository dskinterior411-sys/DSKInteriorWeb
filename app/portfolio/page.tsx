"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjects, Project } from "@/lib/api";

const categories = ["All", "Residential", "Commercial", "Office", "Kitchen"];

// Placeholder projects for fallback
const placeholderProjects = [
  {
    id: "1",
    title: "Modern Luxury Apartment",
    category: "Residential",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"],
    location: "New York, NY",
    year: 2024,
    featured: true,
    description: "Sample project"
  },
  {
    id: "2",
    title: "Corporate Headquarters",
    category: "Commercial",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
    location: "San Francisco, CA",
    year: 2024,
    featured: false,
    description: "Sample project"
  },
  {
    id: "3",
    title: "Boutique Retail Store",
    category: "Retail",
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"],
    location: "Los Angeles, CA",
    year: 2023,
    featured: false,
    description: "Sample project"
  },
  {
    id: "4",
    title: "Contemporary Office Space",
    category: "Office",
    images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"],
    location: "Chicago, IL",
    year: 2023,
    featured: false,
    description: "Sample project"
  },
  {
    id: "5",
    title: "Luxury Hotel Lobby",
    category: "Hospitality",
    images: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800"],
    location: "Miami, FL",
    year: 2024,
    featured: false,
    description: "Sample project"
  },
  {
    id: "6",
    title: "Family Home Renovation",
    category: "Residential",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"],
    location: "Seattle, WA",
    year: 2023,
    featured: false,
    description: "Sample project"
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const data = await getProjects(activeCategory === "All" ? undefined : activeCategory);

      if (data && data.length > 0) {
        setProjects(data);
      } else {
        // Use placeholders if no real data, filtering manually
        const filtered = activeCategory === "All"
          ? placeholderProjects
          : placeholderProjects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
        setProjects(filtered as unknown as Project[]);
      }
      setLoading(false);
    }
    fetchProjects();
  }, [activeCategory]);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-neutral-50">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block pb-3 mb-4">
            <h1 className="text-5xl md:text-6xl font-bold font-display tracking-tight text-neutral-900">OUR PORTFOLIO</h1>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-primary-500"></div>
          </div>
          <p className="text-xl text-neutral-500 font-light max-w-2xl mx-auto font-sans mt-4">
            Explore our collection of stunning interior design projects
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-300 ${activeCategory === category
                ? "bg-primary-500 text-white shadow-lg transform scale-105"
                : "bg-white text-neutral-500 border border-neutral-200 hover:border-primary-300 hover:text-primary-500"
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {loading ? (
              // Loading Skeletons
              [1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="aspect-[4/5] bg-neutral-200 animate-pulse rounded-2xl"
                />
              ))
            ) : (
              projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/portfolio/${project.id}`}>
                    <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-neutral-200 shadow-md group-hover:shadow-2xl transition-all duration-500">
                      <Image
                        src={project.images && project.images.length > 0 ? project.images[0] : (project as any).image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                        <span className="text-amber-300 text-xs tracking-[2px] uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                          {project.category}
                        </span>
                        <h3 className="text-white text-2xl font-display transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                          {project.title}
                        </h3>
                        <div className="w-12 h-0.5 bg-primary-500 mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200 origin-left"></div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {!loading && projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-600">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
