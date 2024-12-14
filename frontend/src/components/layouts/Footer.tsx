//components/public/shared/Footer.tsx

"use client"

import Link from "next/link";
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaTiktok } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/wonderclouds",
      label: "Facebook"
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/wonderclouds",
      label: "Instagram"
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@wonderclouds",
      label: "TikTok"
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/company/wonder-clouds",
      label: "LinkedIn"
    }
  ];

  const contactInfo = [
    {
      icon: FaPhoneAlt,
      text: "+ 51 940 576 340",
    },
    {
      icon: FaEnvelope,
      text: "wonderclouds.cusco@gmail.com",
    }
  ];

  return (
    <>
      <div className="bg-primary pt-10 pb-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 text-white max-w-6xl mx-auto py-8">
            <div className="flex md:flex-col justify-center items-center gap-8 md:gap-10 order-3 md:order-1 md:w-1/4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#A6C0D8] transition duration-300"
                  aria-label={`Visita nuestra página de ${label}`}
                >
                  <Icon size={30} />
                </a>
              ))}
            </div>

            <div className="space-y-6 order-2 md:w-2/4 text-center md:text-left">
              <p className="text-sm sm:text-base">
                Descubre el poder de la innovación digital con Wonder Clouds.
                Impulsamos tu presencia en línea con soluciones creativas y estratégicas
                que elevan tu marca por encima de las nubes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-8">
                {contactInfo.map(({ icon: Icon, text, }, key) => (
                  <div
                    key={key}
                    className="flex flex-row gap-2"
                  >
                    <Icon className="text-[#A6C0D8] my-auto" />
                    <span className="text-md my-auto">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center order-1 md:order-3 md:w-1/4">
              <Link href="/">
                <Image
                  className="w-32 sm:w-40 md:w-48 lg:w-full max-w-[200px]"
                  src="/static/logos/clouds.webp"
                  alt="Logo Wonder Clouds"
                  width={800}
                  height={800}
                  priority
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-white border-t border-white/10 mt-8 pt-6">
          <span className="text-xs sm:text-sm">
            <a href="https://www.wonderclouds.dev" className="hover:text-[#A6C0D8] transition duration-300">
              Copyright © 2024 Wonder Clouds
            </a>
          </span>
        </div>
      </div>
    </>
  );
}