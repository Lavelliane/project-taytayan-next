import React from 'react';
import philippinesMap from '../../../public/assets/philippines_map.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card } from 'flowbite-react';
import uscLogo from '../../../public/assets/USC_logo_l.png';
import usaidLogo from '../../../public/assets/USAID-Identity.svg';
import edcLogo from '../../../public/assets/EDC_logo.png';

const Partners = () => {
	return (
		<>
			<section
				id='be-a-partner'
				className='h-fit translate-y-14 mb-14 w-full flex flex-col bg-gradient-to-tr overflow-hidden from-[#DCE35B]/80 to-[#45B649]/80 justify-center'
				style={{ height: 'calc(100vh - 72px)' }}
			>
				<div className='custom-shape-divider-top-1706825984 z-10'>
					<svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
						<path
							d='M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z'
							className='shape-fill'
						></path>
					</svg>
				</div>
				<div className='w-full h-full flex flex-col gap-8 justify-center items-center z-10'>
					<h1 className='text-5xl text-white font-bold font-lexendDeca drop-shadow-xl'>Be a Partner</h1>
					<Link href='#apply-now'>
						<button
							type='button'
							className='text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100/50 font-medium rounded-full text-base px-6 py-3 z-50 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2'
						>
							Apply Now
						</button>
					</Link>
				</div>
				<div className='w-full h-full flex justify-center items-center overflow-hidden absolute'>
					<div className='w-full items-center justify-center flex'>
						<Image
							src={philippinesMap}
							alt='benefit'
							style={{
								width: 'auto',
								height: '100%', // Adjust height as needed
								objectFit: 'cover',
								overflow: 'hidden',
								mixBlendMode: 'luminosity', // Experiment with different blend modes
								opacity: '30%',
							}}
						/>
					</div>
				</div>
			</section>
			<section
				id='project-partners'
				className='flex h-fit w-full bg-gradient-to-r from-gray-100/70 to-gray-300/70 pt-12 pb-12 shadow-inner '
			>
				<div className='flex flex-col w-full items-center gap-8'>
					<h1 className='text-gray-400 text-sm md:text-base lg:text-lg font-lexendDeca font-light'>
						Our core project partners
					</h1>
					{/* LG */}
					<div className='max-w-7xl w-full lg:flex justify-evenly items-center hidden'>
						<Image src={usaidLogo} alt='benefit' style={{ width: 'auto', height: '100px', objectFit: 'fill' }} />
						<Image src={edcLogo} alt='benefit' style={{ width: 'auto', height: '100px', objectFit: 'fill' }} />
						<Image src={uscLogo} alt='benefit' style={{ width: 'auto', height: '100px', objectFit: 'fill' }} />
					</div>
					{/* MD */}
					<div className='max-w-7xl w-full md:flex justify-evenly items-center hidden lg:hidden'>
						<Image src={usaidLogo} alt='benefit' style={{ width: 'auto', height: '75px', objectFit: 'fill' }} />
						<Image src={edcLogo} alt='benefit' style={{ width: 'auto', height: '75px', objectFit: 'fill' }} />
						<Image src={uscLogo} alt='benefit' style={{ width: 'auto', height: '75px', objectFit: 'fill' }} />
					</div>
					{/* SM */}
					<div className='max-w-7xl w-full sm:flex justify-evenly items-center hidden md:hidden'>
						<Image src={usaidLogo} alt='benefit' style={{ width: 'auto', height: '60px', objectFit: 'fill' }} />
						<Image src={edcLogo} alt='benefit' style={{ width: 'auto', height: '60px', objectFit: 'fill' }} />
						<Image src={uscLogo} alt='benefit' style={{ width: 'auto', height: '60px', objectFit: 'fill' }} />
					</div>
					{/* XS */}
					<div className='max-w-7xl w-full flex justify-evenly items-center sm:hidden flex-wrap gap-4'>
						<Image src={usaidLogo} alt='benefit' style={{ width: 'auto', height: '40px', objectFit: 'cover' }} />
						<Image src={edcLogo} alt='benefit' style={{ width: 'auto', height: '40px', objectFit: 'cover' }} />
						<Image src={uscLogo} alt='benefit' style={{ width: 'auto', height: '40px', objectFit: 'cover' }} />
					</div>
				</div>
			</section>
			<section id='apply-now' className='flex h-fit w-full mb-48 justify-center pt-24'>
				<div className='max-w-5xl w-full justify-center items-center flex flex-col gap-8'>
					<div className='max-w-md text-center gap-4 flex flex-col items-center drop-shadow-sm'>
						<h1 className='w-fit font-bold text-3xl bg-gradient-to-br from-[#DCE35B] to-[#45B649] bg-clip-text text-transparent'>
							How to Apply
						</h1>
						<p>
              Become our valued partner and join us on a transformative journey to unlock the potential of the younger generation, guiding them towards becoming responsible and empowered professionals.
						</p>
					</div>
					<div className='flex flex-col sm:flex-row w-full items-center justify-center gap-8 px-8'>
						<Card href='#' className='max-w-sm' imgAlt='training centers' imgSrc='/assets/trainingCenter.jpg'>
							<h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Training Centers</h5>
							<p className='font-normal text-gray-700 dark:text-gray-400'>
                If you provide training programs and vocational workshops, help us empower youth with the essential skills needed to transition into becoming professionals. 
							</p>
						</Card>
						<Card href='#' className='max-w-sm' imgAlt='job employers' imgSrc='/assets/jobEmployer.jpg'>
							<h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Job Employers</h5>
							<p className='font-normal text-gray-700 dark:text-gray-400'>
                Prospective employers play a crucial role in paving the way for young individuals to enter the industry and establish a foothold in their chosen fields.
							</p>
						</Card>
					</div>
				</div>
			</section>
		</>
	);
};

export default Partners;
