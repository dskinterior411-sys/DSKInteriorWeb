"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Homeowner",
    company: "",
    content: "DSK Interior transformed our home beyond our expectations. Their attention to detail and creative vision is unmatched. We couldn't be happier!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CEO",
    company: "Tech Innovations",
    content: "The corporate office redesign was phenomenal. Our team productivity has increased, and the space reflects our brand perfectly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Director",
    company: "Boutique Fashion",
    content: "Our retail space is now a destination. Customers love the atmosphere, and sales have increased significantly. Highly recommend!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
  },
];

export default function Testimonials() {
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
                  {[...Array(testimonial.rating)].map((_, i) => (
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
