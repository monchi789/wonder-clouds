"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/proyectos', label: 'Nuestros proyectos' },
  ];

  // Manejo del scroll para efectos de header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Animaciones
  const headerVariants = {
    initial: { backgroundColor: 'rgba(255, 255, 255, 0)' },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(8px)'
    }
  };

  const linkVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <motion.nav
      className="fixed w-full z-50 xl:px-24 py-4 transition-all duration-300"
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={headerVariants}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 lg:px-0">
        {/* Logo con mejores animaciones */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex-shrink-0"
        >
          <Link href="/">
            <Image
              src="/static/logos/wonderclouds.webp"
              alt="Logo Wonder Clouds Cusco"
              width={200}
              height={200}
              className="w-4/6 xl:w-5/6 h-auto transform hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>
        </motion.div>

        {/* Navegación Desktop */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:flex items-center space-x-8"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.label}
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href={link.href}
                className={`text-lg font-medium relative group transition-all duration-300
                    ${pathname === link.href
                    ? 'text-secondary font-semibold'
                    : 'text-default hover:text-secondary'}`}
              >
                <span className="flex items-center gap-2">
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary"
                    layoutId="underline"
                  />
                )}
              </Link>
            </motion.div>
          ))}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contactanos"
              className="relative inline-flex items-center justify-center h-12 px-6 text-lg font-medium text-white transition-all duration-300 rounded-xl bg-primary overflow-hidden group hover:shadow-lg"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Consulta aquí
                <motion.svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" />
                </motion.svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Botón menú móvil */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-secondary" />
          ) : (
            <Menu className="h-6 w-6 text-default" />
          )}
        </motion.button>
      </div>

      {/* Menú Móvil Mejorado */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <motion.div
              className="bg-white/90 backdrop-blur-lg shadow-lg mt-2 rounded-xl mx-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 text-base font-medium transition-colors
                      ${pathname === link.href
                        ? 'text-secondary bg-gray-50'
                        : 'text-default hover:text-secondary hover:bg-gray-50'}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4"
              >
                <Link
                  href="/contactanos"
                  className="block text-center text-base font-medium text-white bg-primary hover:bg-secondary transition-colors rounded-xl py-3 px-4"
                >
                  Consulta aqui
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;