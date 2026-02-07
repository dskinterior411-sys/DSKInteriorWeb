"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function CTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-500 to-accent-500 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Let&apos;s bring your vision to life. Get a free consultation and discover
            how we can create the perfect space for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/consultation"
              className="group px-8 py-4 bg-white text-primary-500 rounded-full font-semibold text-lg hover:bg-neutral-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/90">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5" />
              <span>+91 9226146504</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5" />
              <span>dskinteriorsofficial@gmail.com</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




