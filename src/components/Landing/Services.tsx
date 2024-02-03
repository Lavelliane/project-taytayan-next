"use client";

import React from "react";
import { skillsData } from "@/utils/ServicesData";
import { useSectionInView } from "@/hooks/useSection";
import { motion } from "framer-motion";
import Image from 'next/image'

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

const Services = () => {
  const { ref } = useSectionInView("Services");
  return (
    <section id='services' className='h-fit w-full flex justify-center pt-24'>
      <div className='flex flex-col gap-24 max-w-5xl w-full justify-center items-center px-8 xl:px-0'>
        <div className='max-w-md text-center gap-4 flex flex-col items-center drop-shadow-sm'>
          <h1 className='w-fit font-bold text-3xl bg-gradient-to-r from-sky-400 to-amber-300 bg-clip-text text-transparent'>Learnable Skills</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ante a semper cursus. Sed ac luctus erat, vel porttitor erat. In odio mi, interdum vel rutrum ut, scelerisque vitae massa.</p>
        </div>
        <div className="flex w-full">
          <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
            {skillsData.map((skill, index) => (
              <motion.li
                key={index}
                className="bg-white border-black rounded-xl px-4 py-3 flex align-middle items-center w-fit dark:bg-white/10 dark:text-white/80"
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={index}
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex flex-col gap-2 align-middle items-center text-sm">
                  <Image
                        className=""
                        src={skill.image}
                        alt="Profile Picture"
                        width={150}
                        height={1}
                        priority
                  />
                  {skill.name}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Services