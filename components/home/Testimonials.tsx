"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getTestimonials, Testimonial } from "@/lib/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getTestimonials();
      setTestimonials(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Use placeholder if no data but not loading (or just show empty state)
  // For now, if loading, we can show a skeleton or nothing.

  if (loading) return null; // Or a loading spinner

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-neutral-900 border-t border-neutral-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16"
        >
          <div className="mb-6 md:mb-0">
            <span className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-4 block font-sans">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-2 tracking-tight">
              CLIENT <span className="text-primary-500 italic">STORIES</span>
            </h2>
          </div>
          <p className="text-neutral-400 font-light max-w-md font-sans text-right md:text-left">
            Don&apos;t just take our word for it — hear from those who experience our spaces daily.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-neutral-800/50 p-10 backdrop-blur-sm border border-neutral-800 hover:border-primary-500/30 transition-all duration-300 group"
            >
              <div className="mb-8">
                <Quote className="h-10 w-10 text-primary-500/30 mb-6 group-hover:text-primary-500 transition-colors duration-300" />
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary-500 text-primary-500"
                    />
                  ))}
                </div>
                <p className="text-neutral-300 font-light leading-relaxed italic font-display text-lg min-h-[120px]">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>

              <div className="flex items-center space-x-4 border-t border-neutral-700 pt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-neutral-600 group-hover:border-primary-500 transition-colors">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-white tracking-wide font-display">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-primary-400 font-sans tracking-wider uppercase mt-1">
                    {testimonial.role}
                    {testimonial.company && <span className="text-neutral-500 normal-case tracking-normal"> • {testimonial.company}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
