"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getServices, Service } from "@/lib/api";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Curated images matched to common service title keywords
const SERVICE_IMAGES: { key: string; url: string }[] = [
  { key: "modular", url: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&q=80&w=800" },
  { key: "kitchen", url: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&q=80&w=800" },
  { key: "full home", url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800" },
  { key: "residential", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800" },
  { key: "luxury", url: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800" },
  { key: "renovation", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800" },
  { key: "commercial", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
  { key: "office", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
];
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800";

function getServiceImage(title: string): string {
  const lower = title.toLowerCase();
  const match = SERVICE_IMAGES.find(({ key }) => lower.includes(key));
  return match ? match.url : FALLBACK_IMAGE;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getServices();
      setServices(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return null;

  return (
    <section id="services" className="py-24 bg-accent-50 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-300 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header — DSK branded */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary-500 font-sans font-bold tracking-widest uppercase text-xs mb-3 block">
            Our Expertise
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-neutral-900 leading-tight max-w-xl">
              One-Stop Shop For{" "}
              <span className="italic text-primary-500">All Things</span>{" "}
              Interiors
            </h2>
            <p className="text-neutral-500 font-sans font-light max-w-sm text-base leading-relaxed md:text-right">
              Be it end-to-end interiors, renovation or modular solutions — we have your back from start to finish.
            </p>
          </div>
          <div className="w-16 h-0.5 bg-primary-500 mt-8" />
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link
                href={service.link || "/contact"}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-neutral-100 hover:border-primary-200 transition-all duration-500 h-full"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={service.image || getServiceImage(service.title)}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ transform: "scale(1)" }}
                  />
                  {/* Gold overlay on hover */}
                  <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-display font-medium text-lg text-neutral-900 mb-2 group-hover:text-primary-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-neutral-500 font-sans text-sm leading-relaxed flex-1 line-clamp-2">
                    {service.description}
                  </p>
                  {/* CTA arrow */}
                  <div className="mt-5 flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-300 group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-300">
                      <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-white transition-colors duration-300" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
