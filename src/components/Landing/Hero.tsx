'use client';

import React from 'react';
import heroImage from '../../../public/assets/landing/hero.png';
import Image from 'next/image';
import { Button } from 'flowbite-react';
import Link from 'next/link'

const Hero = () => {
	return (
		<section
			className='h-screen translate-y-16 w-full flex bg-gradient-to-br from-[#DCE35B]/80 to-[#45B649]/80 justify-center'
			style={{ height: 'calc(100vh - 64px)' }}
		>
			<div className='custom-shape-divider-top-1706630886 -translate-y-2 z-20'>
				<svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
					<path
						d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
						opacity='.25'
						className='shape-fill'
					></path>
					<path
						d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
						opacity='.5'
						className='shape-fill'
					></path>
					<path
						d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
						className='shape-fill'
					></path>
				</svg>
			</div>
			<div className='w-full h-full flex justify-center items-center'>
				<div className='flex max-w-7xl w-full h-fit px-8 xl:px-0 items-center gap-8'>
					<div className='w-full h-full flex flex-col'>
						<div className='flex flex-col gap-2 mt-20 sm:mt-0 mb-24 sm:mb-12 md:mb-28'>
							<div className='text-5xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-lexendDeca flex flex-col'>
								<span className='bg-gradient-to-tr from-slate-800 via-slate-900 to-amber-700 bg-clip-text text-transparent font-semibold flex-none z-10'>Learn Today,</span>
								<span className='bg-gradient-to-tr from-slate-700 via-slate-900 to-slate-900 bg-clip-text text-transparent font-semibold'>Lead Tomorrow</span>
							</div>
							<p className='max-w-md text-justify text-base sm:text-xs md:text-sm lg:text-base font-light text-white font-lexendDeca pl-1 sm:pl-2'>
								Be part of building the bridge to a better future. Project Taytayan is dedicated to centralizing
								platforms for opportunities.
							</p>
						</div>
						<div className='gap-6 sm:gap-2 pl-1 sm:pl-2 flex z-50'>
              <Link href='#benefits'>
                <button type="button" className="text-gray-900 bg-[#F6C951] hover:bg-[#EFCB66] focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-base sm:text-xs lg:text-base px-6 sm:px-4 md:px-6 py-3 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2">
                  Find out more
                  <svg
                    className='-mr-1 ml-2 h-4 w-4'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </Link>
              <Link href='#be-a-partner'>
                <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100/50 font-medium rounded-lg text-base sm:text-xs lg:text-base px-6 sm:px-4 md:px-6 py-3 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:text-gray-900 me-2 mb-2">
                  Be a partner
                </button>
              </Link>
						</div>
					</div>
					<div className='w-full h-full pt-24 sm:pt-0 z-10 hidden sm:block rounded-full overflow-hidden xl:rounded-none'>
						<Image src={heroImage} alt='flavor-image' width={2000} style={{ objectFit: 'fill', height: 'auto' }} />
					</div>
				</div>
			</div>
			<div className='custom-shape-divider-bottom-1706631099 z-20'>
				<svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
					<path
						d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
						className='shape-fill'
					></path>
				</svg>
			</div>
		</section>
	);
};

export default Hero;
