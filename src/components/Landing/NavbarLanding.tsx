'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NavbarLanding = () => {
	const pathName = usePathname();
	const router = useRouter();

	const [isMenuToggled, setIsMenuToggled] = useState(false);
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

	const handleMenuToggle = () => {
		setIsMenuToggled(!isMenuToggled);
		if (isMenuToggled) setIsMenuToggled(false);
	};

	return (
		<nav
			id='navbar'
			className={`dark:bg-gray-900 fixed w-full z-[999] top-0 start-0
      ${isScrolled ? 'bg-white shadow' : 'bg-transparent'}
      ${isMenuToggled ? 'bg-white shadow' : ''}
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
					<ul className='flex items-center p-0 text-xs lg:text-sm font-medium border border-gray-100/0 rounded-lg bg-gray-50/0 space-x-1 md:space-x-2 lg:space-x-3 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white/0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
						<li>
							<a
								href='/login'
								className='hidden sm:flex gap-2 items-center py-2 px-3 font-normal text-gray-900 rounded-lg bg-transparent hover:text-gray-700 hover:underline hover:underline-offset-2'
							>
								Log in
								<svg
									className='w-4 h-4 text-gray-800 dark:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2'
									/>
								</svg>
							</a>
						</li>
						<Link href='/new-account'>
							<button
								type='button'
								className='hidden sm:inline-flex text-white font-medium bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-900/50 rounded-lg px-3 py-2 text-center items-center'
							>
								Get started
							</button>
						</Link>
					</ul>
					<button
						id='openMenu'
						onClick={handleMenuToggle}
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
				<div
					className={`items-center justify-between w-full md:flex md:w-auto md:order-1
          ${isMenuToggled ? '' : 'hidden'}
          `}
					id='navbar-hamburger'
				>
					<ul className='flex flex-col p-0 mt-4 text-xs lg:text-sm font-medium rounded-lg bg-white md:space-x-2 lg:space-x-3 rtl:space-x-reverse md:flex-row md:mt-0 '>
						<li>
							<a
								href='#'
								className='block py-2 px-3 text-gray-900 rounded-lg bg-transparent hover:text-gray-700 hover:bg-gray-100 md:hover:bg-transparent'
								aria-current='page'
							>
								Home
							</a>
						</li>
						<li>
							<a
								href='#benefits'
								className='block py-2 px-3 text-gray-900 rounded-lg bg-transparent hover:text-gray-700 hover:bg-gray-100 md:hover:bg-transparent'
							>
								About
							</a>
						</li>
						<li>
							<a
								href='#services'
								className='block py-2 px-3 text-gray-900 rounded-lg bg-transparent hover:text-gray-700 hover:bg-gray-100 md:hover:bg-transparent'
								aria-current='page'
							>
								Services
							</a>
						</li>
						<li>
							<a
								href='#'
								className='block py-2 px-3 text-gray-900 rounded-lg bg-transparent hover:text-gray-700 hover:bg-gray-100 md:hover:bg-transparent'
							>
								Contact
							</a>
						</li>
						<li>
							<a
								href='#login'
								className='flex gap-2 items-center sm:hidden py-2 px-3 text-gray-900 rounded-lg bg-transparent hover:text-gray-700 hover:bg-gray-100'
							>
								Log in
								<svg
									className='w-4 h-4 text-gray-800 dark:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2'
									/>
								</svg>
							</a>
						</li>
						<li>
							<a
								href='#new-account'
								className='block sm:hidden py-2 px-3 text-gray-900 rounded-lg bg-transparent hover:text-gray-700 hover:bg-gray-100'
							>
								Create an account
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavbarLanding;
