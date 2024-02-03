'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';


const NavbarLanding = () => {
	const pathName = usePathname();
	const router = useRouter();

	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);

			// Clean up the event listener when the component is unmounted
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	}, []);

	return (
		<nav
			id='navbar'
			className={`dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200/0 dark:border-gray-600
      ${isScrolled ? 'bg-white' : 'bg-transparent'}
    `}
		>
			<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
				<a className='flex items-center space-x-3 rtl:space-x-reverse font-lexendDeca'>
          <Image
							src='/taytayan-logo.svg'
							className='h-6 sm:h-12'
							alt='Project taytayan Logo'
							width={200}
							height={200}
							style={{ width: 'auto', height: '50px', objectFit: 'fill' }}
					/>
          <span className='flex flex-col items-start justify-center'>
            <span className='text-sm font-light whitespace-nowrap dark:text-white'>PROJECT</span>
            <span className='text-lg font-regular whitespace-nowrap dark:text-white'>taytayan</span>
          </span>
				</a>
				<div className='flex justify-center items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
          <ul className='flex items-center p-4 md:p-0 font-medium border border-gray-100/0 rounded-lg bg-gray-50/0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white/0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li>
							<a
								href='/login'
								className='block py-2 px-3 text-gray-900 rounded bg-transparent hover:text-neutral-600'
							>
								Login
							</a>
						</li>
						<li>
							<a
								href='/new-account'
								className='block py-2 px-3 text-gray-900 rounded-lg bg-transparent hover:text-white hover:bg-black border-gray-900 border-solid border-2'
							>
								Get started
							</a>
						</li>
					</ul>
					<button
						data-collapse-toggle='navbar-sticky'
						type='button'
						className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
						aria-controls='navbar-sticky'
						aria-expanded='false'
					>
						<span className='sr-only'>Open main menu</span>
						<svg
							className='w-5 h-5'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 17 14'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M1 1h15M1 7h15M1 13h15'
							/>
						</svg>
					</button>
				</div>
				<div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id='navbar-sticky'>
					<ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100/0 rounded-lg bg-gray-50/0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white/0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
						<li>
							<a
								href='#'
								className='block py-2 px-3 text-gray-900 rounded bg-transparent hover:text-neutral-600'
								aria-current='page'
							>
								Home
							</a>
						</li>
						<li>
							<a
								href='#benefits'
								className='block py-2 px-3 text-gray-900 rounded bg-transparent hover:text-neutral-600'
							>
								About
							</a>
						</li>
            <li>
							<a
								href='#services'
								className='block py-2 px-3 text-gray-900 rounded bg-transparent hover:text-neutral-600'
								aria-current='page'
							>
								Services
							</a>
						</li>
						<li>
							<a
								href='#'
								className='block py-2 px-3 text-gray-900 rounded bg-transparent hover:text-neutral-600'
							>
								Contact
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavbarLanding;
