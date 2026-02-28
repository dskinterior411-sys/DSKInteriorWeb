"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getStats, getSettings, getWhyChooseUs, Stat, Settings, WhyChooseUs } from "@/lib/api";
import * as LucideIcons from "lucide-react";

export default function About() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUs[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [statsData, settingsData, whyChooseUsData] = await Promise.all([
        getStats(),
        getSettings(),
        getWhyChooseUs()
      ]);

      if (statsData.length > 0) {
        setStats(statsData);
      } else {
        // Fallback or empty
        setStats([
          { id: "1", label: "Years Experience", value: "6+", order: 1 },
          { id: "2", label: "Projects Completed", value: "35+", order: 2 },
          { id: "3", label: "Cities Covered", value: "3", order: 3 },
          { id: "4", label: "Client Satisfaction", value: "100%", order: 4 },
        ]);
      }
      setSettings(settingsData);
      
      if (whyChooseUsData.length > 0) {
        setWhyChooseUs(whyChooseUsData);
      } else {
        // Fallback to hardcoded items if no data
        setWhyChooseUs([
          { id: "1", title: "Personalized Design", description: "Tailored solutions for your unique space", icon: "CheckCircle2", order: 1 },
          { id: "2", title: "Premium Materials", description: "Quality that stands the test of time", icon: "CheckCircle2", order: 2 },
          { id: "3", title: "End-to-End Service", description: "From concept to completion", icon: "CheckCircle2", order: 3 },
          { id: "4", title: "Transparent Process", description: "Clear communication every step", icon: "CheckCircle2", order: 4 },
        ]);
      }
    }
    fetchData();
  }, []);

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
                src={settings?.about_image || "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000"}
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
              <span className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-2 block">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-neutral-900 tracking-tight leading-tight">
                Crafting Spaces That <br />
                <span className="italic text-primary-600">Tell Your Story</span>
              </h2>
            </div>

            <div className="text-lg text-neutral-600 mb-6 font-light leading-relaxed font-sans whitespace-pre-wrap">
              {settings?.about_story || "At DSK Interiors, we believe that luxury is not just about aesthetics, but about the feeling of belonging. With over 6 years of experience transforming spaces in Nashik, Pune, and Mumbai, we blend functionality with sophisticated design to create homes and offices that inspire."}
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10">
              {whyChooseUs.map((item) => {
                // @ts-ignore
                const IconComponent = LucideIcons[item.icon] ? LucideIcons[item.icon] : CheckCircle2;
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <div>
                      <span className="text-neutral-700 font-sans font-medium block">{item.title}</span>
                      {item.description && (
                        <span className="text-neutral-500 font-sans text-sm block mt-0.5">{item.description}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-neutral-100">
              {stats.map((stat, index) => (
                <div key={index}>
                  <h3 className="text-3xl font-display font-bold text-neutral-900 mb-1">{stat.value}</h3>
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
