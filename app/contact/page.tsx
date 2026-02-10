"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SuccessMessage from "@/components/ui/SuccessMessage";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(result.error || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        error instanceof Error
          ? error.message
          : "There was an error submitting your form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-neutral-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-50/50 -z-10 skew-x-12 transform origin-top-right"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container-custom py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block pb-3 mb-4">
            <span className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-2 block font-sans">Get In Touch</span>
            <h1 className="text-5xl md:text-6xl font-display font-medium text-neutral-900 tracking-tight">
              Let&apos;s Create Something <br />
              <span className="italic text-primary-600">Beautiful Together</span>
            </h1>
          </div>
          <p className="text-xl text-neutral-500 font-light max-w-2xl mx-auto font-sans mt-4">
            Ready to transform your space? Contact us for a consultation and let&apos;s discuss your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-accent-100/50 border border-neutral-100 relative overflow-hidden group hover:border-primary-200 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-50 rounded-bl-full -z-10 group-hover:bg-accent-100 transition-colors"></div>
              <div className="flex items-start gap-5">
                <div className="bg-primary-50 p-3 rounded-full text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-neutral-900 mb-1">Call Us</h3>
                  <p className="text-neutral-500 font-sans text-sm mb-2">Mon-Sat from 11am to 7pm</p>
                  <a href="tel:+919226146504" className="text-primary-600 font-medium hover:text-primary-700 font-sans text-lg block">
                    +91 9226146504
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-accent-100/50 border border-neutral-100 relative overflow-hidden group hover:border-primary-200 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-50 rounded-bl-full -z-10 group-hover:bg-accent-100 transition-colors"></div>
              <div className="flex items-start gap-5">
                <div className="bg-primary-50 p-3 rounded-full text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-neutral-900 mb-1">Email Us</h3>
                  <p className="text-neutral-500 font-sans text-sm mb-2">We&apos;ll get back to you within 24 hours</p>
                  <a href="mailto:dskinteriorsofficial@gmail.com" className="text-primary-600 font-medium hover:text-primary-700 font-sans text-lg break-all">
                    dskinteriorsofficial@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-accent-100/50 border border-neutral-100 relative overflow-hidden group hover:border-primary-200 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-50 rounded-bl-full -z-10 group-hover:bg-accent-100 transition-colors"></div>
              <div className="flex items-start gap-5">
                <div className="bg-primary-50 p-3 rounded-full text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-neutral-900 mb-1">Visit Studio</h3>
                  <p className="text-neutral-600 font-sans mb-3 leading-relaxed">
                    Shop No 3, Aaradhya Nakshtra<br />
                    Near Ashoka College<br />
                    Chandshi, Nashik 422003
                  </p>
                  <a
                    href="https://maps.app.goo.gl/rhCY92fAWcN9wNdY7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm underline decoration-primary-300 underline-offset-4"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8"
          >
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-primary-900/5 border border-neutral-100">
              <h3 className="text-2xl font-display font-bold text-neutral-900 mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-primary-500" />
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-6"
                  >
                    <SuccessMessage message="Thank you! Your message has been sent successfully. We'll get back to you soon." />
                  </motion.div>
                )}

                {error && (
                  <div className="mb-6">
                    <ErrorMessage message={error} />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-700 font-sans ml-1">Name *</label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="John Doe"
                      className="w-full px-5 py-4 rounded-xl bg-neutral-50 border-transparent focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 text-neutral-800 placeholder:text-neutral-400 font-sans"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-700 font-sans ml-1">Email *</label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="john@example.com"
                      className="w-full px-5 py-4 rounded-xl bg-neutral-50 border-transparent focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 text-neutral-800 placeholder:text-neutral-400 font-sans"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-700 font-sans ml-1">Phone *</label>
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="+91 0000000000"
                      className="w-full px-5 py-4 rounded-xl bg-neutral-50 border-transparent focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 text-neutral-800 placeholder:text-neutral-400 font-sans"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs ml-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-700 font-sans ml-1">Subject *</label>
                    <input
                      type="text"
                      {...register("subject")}
                      placeholder="Project Inquiry"
                      className="w-full px-5 py-4 rounded-xl bg-neutral-50 border-transparent focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 text-neutral-800 placeholder:text-neutral-400 font-sans"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs ml-1">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-700 font-sans ml-1">Message *</label>
                  <textarea
                    {...register("message")}
                    rows={6}
                    placeholder="Tell us about your project dream..."
                    className="w-full px-5 py-4 rounded-xl bg-neutral-50 border-transparent focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 text-neutral-800 placeholder:text-neutral-400 font-sans resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs ml-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-bold tracking-wide uppercase hover:shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span className="ml-2">Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-5 w-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

