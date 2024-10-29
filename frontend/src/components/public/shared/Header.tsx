"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/', label: 'Nosotros' },
    { href: '/', label: 'Servicios' },
    { href: '/', label: 'Nuestros proyectos' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="relative z-10 xl:px-24 py-4">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/static/images/wonder.png"
              alt="Logo Wonder Clouds Cusco"
              width={80}
              height={80}
              className="w-auto h-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-lg font-semibold hover:text-secondary transition-colors
                  ${pathname === link.href ? 'text-secondary' : 'text-default'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contactanos"
              className="text-lg text-white font-semibold hover:bg-secondary transition-colors bg-primary rounded-3xl px-4 py-2 "
            >
              Consulta Gratuita
            </Link>
          </div>

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
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="bg-white shadow-lg mt-5 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`block rounded-md text-base font-medium hover:bg-gray-50 px-3 py-2
                  ${pathname === link.href ? 'text-secondary' : 'text-default'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="block text-center text-base font-medium text-white hover:bg-secondary transition-colors bg-primary rounded-xl mx-3 mt-5 px-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Consulta Gratuita
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
