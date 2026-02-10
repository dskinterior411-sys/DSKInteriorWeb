"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Linkedin, Youtube, Facebook } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/#about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Residential Design", href: "/portfolio?category=residential" },
    { name: "Commercial Design", href: "/portfolio?category=commercial" },
    { name: "Retail Design", href: "/portfolio?category=retail" },
    { name: "Corporate Design", href: "/portfolio?category=corporate" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/dskinteriorsofficial?igsh=Yml0dThwdm1lMTZo&utm_source=qr" },
  { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@DskInteriors" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/dskinteriors" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/dsk-interiors" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 pt-20 pb-10 border-t border-neutral-800">
      <div className="container-custom px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6 group">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 flex items-center justify-center border border-primary-500 rounded-none group-hover:bg-primary-500 transition-colors duration-300">
                  <span className="font-display font-bold text-xl text-primary-500 group-hover:text-neutral-900">D</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl leading-none font-medium tracking-[2px] font-display text-white">DSK</span>
                  <span className="text-[10px] tracking-[4px] uppercase font-light text-neutral-400 group-hover:text-primary-500 transition-colors">Interiors</span>
                </div>
              </div>
            </Link>
            <p className="text-neutral-400 mb-8 font-light leading-relaxed max-w-sm font-sans">
              Elevating spaces with sophisticated design and premium execution. We create environments that inspire and endure.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 text-neutral-400 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 md:col-start-1 lg:col-start-6">
            <h4 className="text-white font-display font-medium text-lg mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-500 transition-colors font-sans text-sm tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-display font-medium text-lg mb-6 tracking-wide">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-500 transition-colors font-sans text-sm tracking-wide"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-display font-medium text-lg mb-6 tracking-wide">Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <MapPin className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0 group-hover:text-white transition-colors" />
                <div>
                  <span className="block text-neutral-400 font-sans text-sm leading-relaxed group-hover:text-neutral-200 transition-colors">
                    Shop No 3, Aaradhya Nakshtra,<br />
                    Near Ashoka College, Chandshi,<br />
                    Nashik 422003
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <Phone className="h-5 w-5 text-primary-500 flex-shrink-0 group-hover:text-white transition-colors" />
                <span className="text-neutral-400 font-sans text-sm group-hover:text-neutral-200 transition-colors">+91 92261 46504</span>
              </div>
              <div className="flex items-center space-x-4 group">
                <Mail className="h-5 w-5 text-primary-500 flex-shrink-0 group-hover:text-white transition-colors" />
                <span className="text-neutral-400 font-sans text-sm group-hover:text-neutral-200 transition-colors">dskinteriorsofficial@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-xs font-sans tracking-wider">
            © {new Date().getFullYear()} DSK INTERIORS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-neutral-500 hover:text-primary-500 text-xs transition-colors font-sans tracking-wider uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}






