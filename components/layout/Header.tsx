"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Logo({ isScrolled }: { isScrolled: boolean }) {
  const strokeColor = isScrolled ? "black" : "white";
  const fillColor = isScrolled ? "black" : "white";
  const textColor = isScrolled ? "text-neutral-900" : "text-white";
  const subTextColor = isScrolled ? "text-neutral-600" : "text-white/80";
  const accentColor = "#b28e5d"; // Gold

  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10 50 L50 15 L90 50" stroke={strokeColor} strokeWidth="4" fill="none" className="transition-colors duration-300" />
          <path d="M65 28 V15 H75 V36" fill={fillColor} className="transition-colors duration-300" />
          <path d="M25 50 V80 H70" stroke={accentColor} strokeWidth="4" fill="none" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`text-xl leading-none font-medium tracking-[2px] font-display transition-colors duration-300 ${textColor}`}>DSK</span>
        <span className={`text-[10px] tracking-[4px] uppercase font-light transition-colors duration-300 ${subTextColor}`}>Interiors</span>
      </div>
    </div>
  );
}

const navigation = [
  { name: "HOME", href: "/" },
  { name: "SERVICES", href: "/#services" },
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "ABOUT", href: "/#about" },
  { name: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
        ? "bg-accent-50/95 backdrop-blur-md shadow-md py-2 border-accent-200"
        : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6 border-transparent backdrop-blur-[1px]"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group">
            <Logo isScrolled={scrolled} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm tracking-widest font-display font-medium transition-colors duration-300 ${scrolled
                  ? (item.name === "CONTACT" ? "font-semibold text-neutral-900 hover:text-primary-500" : "text-neutral-700 hover:text-primary-500")
                  : (item.name === "CONTACT" ? "font-semibold text-white hover:text-primary-400" : "text-white/90 hover:text-primary-400")
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 transition-colors duration-300 ${scrolled ? "text-neutral-700 hover:text-primary-500" : "text-white hover:text-primary-400"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-2 bg-white/95 backdrop-blur-xl border-t border-accent-100 shadow-xl overflow-hidden rounded-b-2xl"
            >
              <div className="flex flex-col p-6 space-y-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-center text-xl font-display tracking-widest text-neutral-800 hover:text-primary-500 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

