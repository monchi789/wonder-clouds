import Link from "next/link";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import Image from "next/image";

export function Footer() {
  return (
    <div className="w-full bg-[#104D7E] mt-10 py-5">
      <div className="container flex flex-col md:flex-row md:space-x-12 text-white w-4/6 mx-auto py-12">
        <div className='flex flex-col md:w-1/5 space-y-10 items-center my-auto'>
          <a href="https://www.facebook.com/" className="hover:text-[#A6C0D8] transition duration-300" ><CiFacebook size={35} /></a>
          <a href="https://www.tiktok.com/" className="hover:text-[#A6C0D8] transition duration-300" ><FaInstagram size={30} /></a>
          <a href="https://www.tiktok.com/" className="hover:text-[#A6C0D8] transition duration-300" ><FaTiktok size={30} /></a>
        </div>
        <div className='flex flex-col md:w-3/5 space-y-5 my-auto'>
          <div>
            <p>
              Descubre el poder de la innovación digital con Wonder Clouds.
              Impulsamos tu presencia en línea con soluciones creativas y estratégicas
              que elevan tu marca por encima de las nubes.
            </p>
          </div>
          <div className="flex flex-row space-x-5">
            <div className="flex flex-col">
              <span>Teléfono:</span>
              <span>+ 51 940576340</span>
            </div>
            <div className="flex flex-col">
              <span>Correo Electrónico:</span>
              <span>wonderclouds.cusco@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-2/5">
          <Link href="/"><Image className='w-3/6 md:w-5/6 lg:w-1/2 mx-auto' src="/static/images/clouds.png" alt="Logo Wonder Clouds"  width={1000} height={1000}/></Link>
        </div>
      </div>
      <div className="text-center text-white font-nunito py-5">
        <span className="text-sm"><a href="https://www.wonderclouds.dev">Copyright © 2024 Wonder Clouds</a></span>
      </div>
    </div>
  )
}