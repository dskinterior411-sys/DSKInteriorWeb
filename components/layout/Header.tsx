"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/contact" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold gradient-text"
            >
              DSK Interior
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (item.href.startsWith("#")) {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                } else if (item.href.startsWith("/#")) {
                  e.preventDefault();
                  const hash = item.href.substring(1);
                  if (window.location.pathname !== "/") {
                    window.location.href = "/" + hash;
                  } else {
                    const element = document.querySelector(hash);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }
              };

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleClick}
                  className="text-neutral-700 hover:text-primary-600 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full" />
                </Link>
              );
            })}
            <Link
              href="/consultation"
              className="px-6 py-2 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-neutral-700"
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
              className="md:hidden mt-4 space-y-4 pb-4"
            >
              {navigation.map((item) => {
                const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  setMobileMenuOpen(false);
                  if (item.href.startsWith("#")) {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  } else if (item.href.startsWith("/#")) {
                    e.preventDefault();
                    const hash = item.href.substring(1);
                    if (window.location.pathname !== "/") {
                      window.location.href = "/" + hash;
                    } else {
                      const element = document.querySelector(hash);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }
                };

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-neutral-700 hover:text-primary-600 font-medium py-2"
                    onClick={handleMobileClick}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/consultation"
                className="block w-full text-center px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Consultation
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

