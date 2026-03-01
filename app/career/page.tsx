"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, TrendingUp, Heart, Sparkles, ShieldCheck } from "lucide-react";
import JobApplicationForm from "@/components/forms/JobApplicationForm";
import Image from "next/image";

const benefits = [
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work alongside a passionate team of designers, architects, and creative minds who push boundaries every day.",
  },
  {
    icon: TrendingUp,
    title: "Growth & Learning",
    description: "Structured mentorship, skill-building workshops, and real opportunities to grow into leadership roles.",
  },
  {
    icon: Heart,
    title: "Creative Freedom",
    description: "We trust your instincts. Bring bold ideas to the table — your creativity is our greatest asset.",
  },
  {
    icon: Briefcase,
    title: "Diverse Projects",
    description: "From luxury residences to commercial landmarks, every project offers a fresh challenge.",
  },
  {
    icon: Sparkles,
    title: "Premium Work Environment",
    description: "A beautifully designed studio with world-class tools and an atmosphere that inspires excellence.",
  },
  {
    icon: ShieldCheck,
    title: "Stability & Benefits",
    description: "Competitive compensation, health benefits, and a culture that values your well-being.",
  },
];

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-accent-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600"
          alt="DSK Interiors studio"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/50 to-neutral-900/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-primary-400 font-sans font-bold tracking-[4px] uppercase text-xs mb-6"
          >
            Join Our Team
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-6 leading-tight tracking-tight"
          >
            Shape the Future of{" "}
            <span className="italic text-primary-400">Luxury Design</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white/70 font-sans font-light text-lg max-w-xl mx-auto leading-relaxed"
          >
            We&apos;re always looking for passionate, talented individuals to join our team of designers and architects.
          </motion.p>

          <motion.a
            href="#apply"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-10 inline-block bg-primary-500 text-white px-10 py-4 font-sans font-bold uppercase tracking-widest text-sm hover:bg-primary-600 transition-colors duration-300 rounded-none"
          >
            Apply Now
          </motion.a>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-accent-50 to-transparent" />
      </section>

      {/* Why Work With Us */}
      <section className="py-24 px-4 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary-500 font-sans font-bold tracking-widest uppercase text-xs mb-3 block">
            Why DSK Interiors
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-neutral-900 mb-4">
            Why Work <span className="italic text-primary-500">With Us</span>
          </h2>
          <div className="w-16 h-0.5 bg-primary-500 mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group bg-white p-8 rounded-2xl border border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-400"
              >
                <div className="w-12 h-12 bg-accent-50 border border-primary-100 rounded-xl flex items-center justify-center text-primary-500 mb-6 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-display font-medium text-neutral-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-neutral-500 font-sans text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-24 bg-neutral-900 relative overflow-hidden">
        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Messaging */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28"
            >
              <span className="text-primary-400 font-sans font-bold tracking-widest uppercase text-xs mb-4 block">
                Apply Now
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6 leading-tight">
                Start Your Journey{" "}
                <span className="italic text-primary-400">With Us</span>
              </h2>
              <p className="text-white/60 font-sans font-light leading-relaxed mb-8">
                Submit your application below and our team will reach out within 3–5 business days. We review every application personally — no automated rejections.
              </p>

              <div className="space-y-4">
                {["Design Consultant", "Project Manager", "3D Visualizer", "Site Supervisor"].map((role) => (
                  <div key={role} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    <span className="text-white/70 font-sans text-sm">{role}</span>
                    <span className="ml-auto text-xs text-primary-400 font-sans border border-primary-500/30 px-2 py-0.5 rounded">Hiring</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-display font-medium text-neutral-900 mb-6">
                Application Form
              </h3>
              <JobApplicationForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
