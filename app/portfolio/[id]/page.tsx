"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";

// This will be replaced with real data fetching from API
const getProject = (id: string) => {
  // Placeholder - replace with API call
  return {
    id,
    title: "Modern Luxury Apartment",
    description: "A stunning transformation of a 3-bedroom apartment into a modern luxury living space. This project showcases contemporary design with elegant finishes and smart space utilization.",
    category: "Residential",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200",
    ],
    location: "New York, NY",
    year: 2024,
    features: [
      "Open concept living area",
      "Modern kitchen with island",
      "Master suite with walk-in closet",
      "Home office space",
      "Smart home integration",
    ],
  };
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = getProject(id);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="container-custom section-padding">
        <Link
          href="/portfolio"
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary-500 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-neutral-200">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {project.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden bg-neutral-200"
                >
                  <Image
                    src={image}
                    alt={`${project.title} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-lg text-neutral-600 mb-8">{project.description}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-neutral-600">
                <MapPin className="h-5 w-5" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-600">
                <Calendar className="h-5 w-5" />
                <span>{project.year}</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-center text-neutral-600">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






