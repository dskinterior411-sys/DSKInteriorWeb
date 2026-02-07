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
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CEO",
    company: "Tech Innovations Inc.",
    content: "The corporate office redesign was phenomenal. Our team productivity has increased, and the space reflects our brand perfectly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Store Owner",
    company: "Boutique Fashion",
    content: "Our retail space is now a destination. Customers love the atmosphere, and sales have increased significantly. Highly recommend!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 h-12 w-12 text-accent-300" />
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-neutral-700 mb-6 relative z-10">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-200">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
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




