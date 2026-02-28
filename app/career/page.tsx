"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, TrendingUp, Heart } from "lucide-react";
import JobApplicationForm from "@/components/forms/JobApplicationForm";

export default function CareerPage() {
  const benefits = [
    {
      icon: Users,
      title: "Collaborative Team",
      description: "Work with talented designers and architects"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Opportunities for professional development"
    },
    {
      icon: Heart,
      title: "Creative Freedom",
      description: "Bring your design ideas to life"
    },
    {
      icon: Briefcase,
      title: "Diverse Projects",
      description: "Work on exciting residential and commercial spaces"
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-accent-500">
      <div className="container-custom section-padding">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-4 block font-sans">Join Our Team</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-neutral-900 mb-6 tracking-tight">
            Build Your Career with <span className="italic text-primary-600">DSK Interiors</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light font-sans">
            We're always looking for passionate designers and creative professionals to join our growing team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-medium text-neutral-900 mb-8">Why Work With Us</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-neutral-100"
                  >
                    <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-medium text-neutral-900 mb-1">{benefit.title}</h3>
                      <p className="text-neutral-600 font-sans text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8"
          >
            <h2 className="text-2xl font-display font-medium text-neutral-900 mb-6">Apply Now</h2>
            <JobApplicationForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

