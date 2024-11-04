"use client"

import TeamCard from "@/components/public/ui/TeamCard";
import { motion } from "framer-motion";
import NosotrosTitle from "@/components/public/nosotros/NosotrosTitle";
import Team from "@/components/public/nosotros/Team";

function Nosotros() {


  return (
    <>
      <div className="bg-primary">
        <NosotrosTitle />
      </div>

      <Team />
    </>
  );
}

export default Nosotros;
