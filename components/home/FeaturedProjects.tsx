"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getFeaturedProjects, Project } from "@/lib/api";

const placeholderProjects = [
  {
    id: "1",
    title: "Minimalist Haven",
    category: "Bedroom Transformation",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "Velvet Lounge",
    category: "Custom Living Area",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "The Chef's Corner",
    category: "Modern Kitchen Suite",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
  },
];

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const data = await getFeaturedProjects();
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        // Fallback to placeholder if no real data
        setProjects(placeholderProjects as any);
      }
      setIsLoading(false);
    }
    loadProjects();
  }, []);

  return (
    <section className="py-24 px-4 bg-accent-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16"
        >
          <div className="mb-6 md:mb-0">
            <div className="relative inline-block pb-3 mb-4">
              <h2 className="text-4xl font-display font-medium text-neutral-900 tracking-tight">RECENT PROJECTS</h2>
              <div className="absolute bottom-0 left-0 w-24 h-0.5 bg-primary-500"></div>
            </div>
            <p className="text-xl text-neutral-500 font-light max-w-md font-sans">
              Explore our latest transformations and signature interior styles.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="flex items-center text-primary-500 hover:text-primary-600 transition-colors tracking-widest text-sm font-semibold uppercase group"
          >
            <span>View All Collections</span>
            <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loading
            [1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-neutral-200 animate-pulse rounded-xl"></div>
            ))
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <Link href={`/portfolio/${project.id}`}>
                  <div className="relative overflow-hidden rounded-xl aspect-[4/5] shadow-md group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={project.images && project.images.length > 0 ? project.images[0] : (project as any).image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h4 className="text-2xl font-display text-white mb-2">{project.title}</h4>
                        <p className="text-sm font-light text-white/90 tracking-wide font-sans capitalize">{project.category}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}






