"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ProjectCategory } from "@/types";

const categories: ProjectCategory[] = ["all", "residential", "commercial", "retail", "corporate", "hospitality"];

// Placeholder projects - will be replaced with real data from API
const projects = [
  {
    id: "1",
    title: "Modern Luxury Apartment",
    category: "residential" as ProjectCategory,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    location: "New York, NY",
    year: 2024,
  },
  {
    id: "2",
    title: "Corporate Headquarters",
    category: "corporate" as ProjectCategory,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    location: "San Francisco, CA",
    year: 2024,
  },
  {
    id: "3",
    title: "Boutique Retail Store",
    category: "retail" as ProjectCategory,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    location: "Los Angeles, CA",
    year: 2023,
  },
  {
    id: "4",
    title: "Contemporary Office Space",
    category: "commercial" as ProjectCategory,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    location: "Chicago, IL",
    year: 2023,
  },
  {
    id: "5",
    title: "Luxury Hotel Lobby",
    category: "hospitality" as ProjectCategory,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    location: "Miami, FL",
    year: 2024,
  },
  {
    id: "6",
    title: "Family Home Renovation",
    category: "residential" as ProjectCategory,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    location: "Seattle, WA",
    year: 2023,
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Explore our collection of stunning interior design projects
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-sm rounded-full mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-white text-xl font-bold">{project.title}</h3>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600">
                    {project.location} • {project.year}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-600">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}






