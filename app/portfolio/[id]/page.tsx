"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { getProjectById, Project } from "@/lib/api";
import { motion } from "framer-motion";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      const data = await getProjectById(id);
      setProject(data);
      setLoading(false);
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-neutral-50 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-display font-medium text-neutral-900 mb-4">Project Not Found</h1>
        <Link href="/portfolio" className="text-primary-500 hover:text-primary-600 underline">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  // Fallback if images array is empty or undefined
  const images = project.images && project.images.length > 0 ? project.images : ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-neutral-50">
      <div className="container-custom section-padding">
        <Link
          href="/portfolio"
          className="inline-flex items-center space-x-2 text-neutral-500 hover:text-primary-500 mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm tracking-wide uppercase font-medium">Back to Portfolio</span>
        </Link>

        {/* Project Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-neutral-900 mb-6 tracking-tight">
            {project.title}
          </h1>
          <div className="w-24 h-1 bg-primary-500"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Main Image Gallery - Left Side / Top */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl mb-6 group"
            >
              <Image
                src={images[activeImage]}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </motion.div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary-500 ring-2 ring-primary-200" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Info - Right Side */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-100 sticky top-32">
              <h3 className="text-xl font-display font-medium text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Project Details</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Description</h4>
                  <p className="text-neutral-600 font-light leading-relaxed font-sans">
                    {project.description || "A masterpiece of design and functionality, tailored to the client's unique vision and lifestyle limitations."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-accent-50 p-2 rounded-full text-primary-500">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-neutral-400">Location</h4>
                      <p className="text-neutral-900 font-medium">{project.location || "Nashik, India"}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-accent-50 p-2 rounded-full text-primary-500">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-neutral-400">Year</h4>
                      <p className="text-neutral-900 font-medium">{project.year || new Date().getFullYear()}</p>
                    </div>
                  </div>
                </div>

                {/* Optional Features/Highlights if available (could be added to DB later) */}
                <div className="pt-6 border-t border-neutral-100">
                  <h4 className="text-xs uppercase tracking-widest text-neutral-400 mb-3">Service Provided</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-neutral-600">
                      <CheckCircle2 className="h-4 w-4 text-primary-500 mr-2" />
                      Interior Design
                    </li>
                    <li className="flex items-center text-sm text-neutral-600">
                      <CheckCircle2 className="h-4 w-4 text-primary-500 mr-2" />
                      Space Planning
                    </li>
                    <li className="flex items-center text-sm text-neutral-600">
                      <CheckCircle2 className="h-4 w-4 text-primary-500 mr-2" />
                      {project.category}
                    </li>
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="block w-full text-center bg-neutral-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-500 transition-colors duration-300 mt-6"
                >
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
