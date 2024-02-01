'use client';

import React, { useEffect, useState } from 'react';
import { Button, Navbar } from 'flowbite-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const navbarTheme = {
	root: {
		base: 'bg-transparent',
	},
};

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
				<div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
					<div className='flex gap-2'>
						<Link href='/login'>
							<button
								type='button'
								className='text-gray-900 bg-transparent hover:bg-gray-200  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							>
								Sign in
							</button>
						</Link>
						<Link href='/new-account'>
							<button
								type='button'
								className='text-black bg-transparent border-black border border-solid hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center'
							>
								Get started
							</button>
						</Link>
					</div>
					<button
						data-collapse-toggle='navbar-sticky'
						type='button'
						className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
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
								className='block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
								aria-current='page'
							>
								Home
							</a>
						</li>
						<li>
							<a
								href='#'
								className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
							>
								About
							</a>
						</li>
						<li>
							<button
								id='dropdownDelayButton'
								data-dropdown-delay='500'
								data-dropdown-trigger='hover'
								className='flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
							>
								Services
								<svg
									className='w-2.5 h-2.5 ms-2.5'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 10 6'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='m1 1 4 4 4-4'
									/>
								</svg>
							</button>
							<div
								id='dropdownDelay'
								className='z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'
							>
								<ul className='py-2 text-sm text-gray-700 dark:text-gray-400' aria-labelledby='dropdownLargeButton'>
									<li>
										<a
											href='#'
											className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
										>
											Dashboard
										</a>
									</li>
									<li>
										<a
											href='#'
											className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
										>
											Settings
										</a>
									</li>
									<li>
										<a
											href='#'
											className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
										>
											Earnings
										</a>
									</li>
								</ul>
							</div>
						</li>
						<li>
							<a
								href='#'
								className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
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
