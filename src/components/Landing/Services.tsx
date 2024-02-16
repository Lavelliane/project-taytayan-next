'use client';

import React from 'react';
import { skillsData } from '@/utils/ServicesData';
import { useSectionInView } from '@/hooks/useSection';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
	const { ref } = useSectionInView('Services');
	return (
		<section id='services' className='h-fit w-full flex justify-center pt-24'>
			<div className='flex flex-col gap-8 max-w-5xl w-full justify-center items-center px-8 xl:px-0'>
				<div className='max-w-md text-center gap-4 flex flex-col items-center drop-shadow-sm'>
					<h1 className='w-fit font-bold text-3xl bg-gradient-to-br from-[#DCE35B] to-[#45B649] bg-clip-text text-transparent'>
						Learnable Skills
					</h1>
					<p className='text-sm sm:text-base'>
						From coding and digital marketing to project management, our curated courses provide a direct path to
						mastering practical expertise and advancing your professional proficiency.
					</p>
				</div>
				<div className='flex w-full'>
					<ul className='flex flex-wrap justify-center gap-2 text-lg text-gray-800'>
						{skillsData.map((skill, index) => (
							<motion.li
								key={index}
								className='bg-white border-black rounded-xl px-0 md:px-1 lg:px-2 py-0 md:py-1 lg:py-3 flex align-middle items-center w-fit dark:bg-white/10 dark:text-white/80'
								variants={fadeInAnimationVariants}
								initial='initial'
								whileInView='animate'
								viewport={{ once: true }}
								custom={index}
								whileHover={{ scale: 1.1 }}
							>
								<div className='flex flex-col gap-2 align-middle items-center text-[7px] leading-[7px] md:text-xs lg:text-sm'>
									<Image
										className='hidden lg:block shadow-lg rounded-[1.7rem]'
										src={skill.image}
										alt='Profile Picture'
										width={130}
										height={1}
										priority
									/>
									<Image
										className='hidden md:block lg:hidden shadow-lg rounded-[1.5rem]'
										src={skill.image}
										alt='Profile Picture'
										width={120}
										height={1}
										priority
									/>
									<Image
										className='block md:hidden shadow-md rounded-[0.9rem]'
										src={skill.image}
										alt='Profile Picture'
										width={70}
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
	);
};

export default Services;
