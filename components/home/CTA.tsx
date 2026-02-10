"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-primary-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-[128px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 rounded-full blur-[128px] opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <span className="text-accent-300 font-bold tracking-widest uppercase text-sm mb-4 block font-sans">Start Your Journey</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-8 leading-tight">
            Ready to <span className="italic text-primary-300">Transform</span> Your Space?
          </h2>
          <p className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto font-light font-sans">
            Let&apos;s bring your vision to life. Get a free consultation and discover
            how we can create the perfect luxurious space for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              href="/consultation"
              className="px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-400 text-white rounded-full font-bold tracking-wide uppercase hover:shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 bg-transparent border border-neutral-600 text-white rounded-full font-bold tracking-wide uppercase hover:bg-white/5 hover:border-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 border-t border-neutral-800 pt-10">
            <a href="tel:+919226146504" className="flex items-center space-x-4 text-neutral-300 hover:text-white transition-colors group">
              <div className="p-3 rounded-full bg-neutral-800 group-hover:bg-primary-900 transition-colors">
                <Phone className="h-6 w-6 text-primary-400" />
              </div>
              <span className="font-sans text-lg">+91 9226146504</span>
            </a>
            <a href="mailto:dskinteriorsofficial@gmail.com" className="flex items-center space-x-4 text-neutral-300 hover:text-white transition-colors group">
              <div className="p-3 rounded-full bg-neutral-800 group-hover:bg-primary-900 transition-colors">
                <Mail className="h-6 w-6 text-primary-400" />
              </div>
              <span className="font-sans text-lg">dskinteriorsofficial@gmail.com</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




