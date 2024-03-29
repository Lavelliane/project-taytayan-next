import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { SignUpForm } from '@/components/Login/SignUpForm';
import flavorImage from '../../../public/assets/stock-login.png';

export default function SignUp() {
	return (
		<main className='max-h-[124vh] max-w-screen h-[124vh] lg:overflow-hidden scroll-smooth'>
			<section className=' h-fit flex p-0 sm:p-8 lg:p-0 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 justify-center'>
				<div className='h-[124vh] z-50 w-full rounded-none sm:rounded-2xl lg:rounded-none flex flex-col items-center justify-center bg-white lg:bg-white backdrop-blur-md lg:backdrop-blur-none border-white/50 border'>
					<div className='w-full px-12 max-w-lg'>
						<Link href='/' className='flex font-lexendDeca mb-2 gap-1 w-fit'>
							<Image
								src='/taytayan-logo.svg'
								className='h-6 sm:h-12'
								alt='Project taytayan Logo'
								width={0}
								height={0}
								style={{ width: 'auto', height: '50px', objectFit: 'fill' }}
							/>
							<span className='flex flex-col justify-center'>
								<span className='text-sm font-light whitespace-nowrap dark:text-white'>PROJECT</span>
								<span className='text-lg font-regular whitespace-nowrap dark:text-white'>taytayan</span>
							</span>
						</Link>
						<Breadcrumb className='mb-8'>
							<Breadcrumb.Item href='/' icon={HiHome} >
								Home
							</Breadcrumb.Item>
							<Breadcrumb.Item href='#'>Sign up</Breadcrumb.Item>
						</Breadcrumb>
						<h1 className='text-lg font-semibold underline underline-offset-[10px] decoration-4 decoration-accent text-dark mb-4'>
							Sign up
						</h1>
						<h3 className='text-sm font-medium text-gray-700 mb-4'>Bridging you to opportunities</h3>
					</div>
					<div className='w-full max-w-lg'>
						<SignUpForm />
					</div>
				</div>
				<div className='relative hidden lg:block max-w-7xl w-full h-full items-center'>
					<div className='absolute rounded-full bg-green-300 w-36 h-36 translate-x-2 translate-y-1 top-0'></div>
					<div className='absolute rounded-full bg-pink-300 w-36 h-36 -translate-x-10 translate-y-44 right-0'></div>
					<div className=' absolute rounded-full bg-yellow-100 w-48 h-48 translate-x-14 translate-y-24 bottom-0'></div>
					<div className='w-full h-[124vh] px-8 py-8 overflow-hidden'>
						<div className=' z-50 w-auto h-full rounded-[4rem] flex flex-col items-center justify-start bg-white/40 backdrop-blur-sm border border-white/20'>
							<div className='translate-y-24 overflow-hidden'>
								<Image
									src={flavorImage}
									alt='flavor-image'
									style={{ objectFit: 'fill', width: 'auto', height: 'auto' }}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
