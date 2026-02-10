"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, Heart, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const stats = [
  { number: "6+", label: "Years Experience" },
  { number: "35+", label: "Projects Completed" },
  { number: "3", label: "Cities Covered" },
  { number: "100%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container-custom px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000"
                alt="Luxury Interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply"></div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-100 rounded-full -z-10 blur-2xl opacity-60"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-100 rounded-full -z-10 blur-2xl opacity-60"></div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-8 -right-4 md:right-8 bg-white p-6 rounded-xl shadow-xl border border-accent-100 max-w-xs hidden md:block"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary-50 p-3 rounded-full text-primary-600">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-neutral-900">Award Winning</h4>
                  <p className="text-sm text-neutral-500 font-sans mt-1">Recognized for excellence in residential design.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative inline-block pb-3 mb-6">
              <span className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-2 block">About Us</span>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-neutral-900 tracking-tight leading-tight">
                Crafting Spaces That <br />
                <span className="italic text-primary-600">Tell Your Story</span>
              </h2>
            </div>

            <p className="text-lg text-neutral-600 mb-6 font-light leading-relaxed font-sans">
              At DSK Interiors, we believe that luxury is not just about aesthetics, but about the feeling of belonging. With over 6 years of experience transforming spaces in Nashik, Pune, and Mumbai, we blend functionality with sophisticated design to create homes and offices that inspire.
            </p>
            <p className="text-lg text-neutral-600 mb-8 font-light leading-relaxed font-sans">
              Our approach is deeply personal. We listen to your needs, understand your lifestyle, and translate your vision into a reality that exceeds expectations.
            </p>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10">
              {["Personalized Design", "Premium Materials", "End-to-End Service", "Transparent Process"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="text-neutral-700 font-sans">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-neutral-100">
              {stats.map((stat, index) => (
                <div key={index}>
                  <h3 className="text-3xl font-display font-bold text-neutral-900 mb-1">{stat.number}</h3>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}




