"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/proyectos', label: 'Nuestros proyectos' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative z-10 xl:px-24 py-4">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link href={"/"}>
            <Image
              src="/static/logos/wonder.webp"
              alt="Logo Wonder Clouds Cusco"
              width={80}
              height={80}
              className="w-auto h-auto"
            />
            </Link>
          </motion.div>

          {/* Desktop Navigation with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex items-center space-x-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-lg font-medium relative transition-colors 
                  ${pathname === link.href ? 'text-secondary font-semibold border-b-2 border-secondary' : 'text-default hover:text-secondary hover:border-b-2 hover:border-secondary'} `}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contactanos"
              className="relative inline-flex items-center justify-center h-12 px-5 text-lg font-medium text-white transition-transform rounded-xl border-2 border-transparent bg-primary overflow-hidden active:scale-95 group"
            >

              <span
                className="absolute inset-0 w-full h-full rounded-xl bg-primary transition-all duration-500 transform scale-105 group-hover:border-2 group-hover:border-secondary group-hover:scale-100"
              ></span>

              <span className="relative z-10 flex items-center gap-2 text-white transition-transform duration-500 group-hover:scale-105">
                Consulta aquí
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"></path>
                </svg>
              </span>
            </Link>

          </motion.div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-default hover:text-secondary"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <div className="bg-white shadow-lg mt-5 pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block rounded-md text-base font-medium hover:bg-gray-50 px-3 py-2
                    ${pathname === link.href ? 'text-secondary border-b-2 border-secondary' : 'text-default hover:text-secondary'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contactanos"
                className="block text-center text-base font-medium text-white hover:bg-secondary transition-colors bg-primary rounded-xl mx-3 mt-5 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Consulta Gratuita
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
