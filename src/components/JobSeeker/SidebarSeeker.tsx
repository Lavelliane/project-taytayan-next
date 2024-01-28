'use client';

import React, { useEffect, useState } from 'react';
import { Drawer, DrawerOptions, DrawerInterface, InstanceOptions } from 'flowbite';
import Link from 'next/link';
import Image from 'next/image';
import avatar from '../../../public/assets/avatar.png';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/hooks/useAuth';
import { Avatar, Dropdown, DropdownItem, CustomFlowbiteTheme, Sidebar } from 'flowbite-react';
import { HiShoppingBag } from 'react-icons/hi';
import UserAvatar from '../Profile/UserAvatar';

const $targetEl: HTMLElement | null = typeof window !== 'undefined' ? document.getElementById('logo-sidebar') : null;
// options with default values
const options: DrawerOptions = {
	backdrop: true,
	bodyScrolling: false,
	edge: false,
	edgeOffset: '',
	backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
};

// instance options object
const instanceOptions: InstanceOptions = {
	id: 'logo-sidebar',
	override: true,
};

const avatarTheme: CustomFlowbiteTheme['avatar'] = {
	root: {
		bordered: 'p-1 ring-2 justify-center items-center',
		color: {
			info: 'ring-[#0090D8]',
			success: 'ring-[#429445]',
			warning: 'ring-[#F6C951]',
		},
		img: {
			placeholder: 'text-gray-400 w-auto h-auto',
		},
	},
};

const customTheme: CustomFlowbiteTheme['dropdown'] = {
	content: '',
	floating: {
		base: 'backdrop-blur-sm rounded-lg focus:ring-0 focus:outline-0 focus:border-0',
		item: {
			base:
				'shadow-md m-0 rounded-lg flex items-center p-0 justify-start text-sm cursor-pointer w-full dark:text-gray-200 focus:outline-none',
		},
		style: {
			auto: 'bg-gray-50/80 border border-gray-100',
		},
	},
};

const drawer: DrawerInterface = new Drawer($targetEl, options, instanceOptions);

async function fetchData() {
	// Simulate asynchronous data fetching
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('Fetched data');
		}, 1000);
	});
}

const SidebarSeeker = () => {
	const pathName = usePathname();
	const router = useRouter();
	const logout = useAuthStore((state: { logout: any }) => state.logout);
	const user = useAuthStore((state: { user: any }) => state.user);
	const [name, setName] = useState<string>('');
	const [nameInitials, setNameInitials] = useState<string>('');

	function handleLogout() {
		logout();
		router.push('/login');
	}

	useEffect(() => {
		if ((user && user.firstName) || user.lastName) {
			setName(user?.firstName + ' ' + user?.lastName);
			setNameInitials(user?.firstName.charAt(0) + user?.lastName.charAt(0));
		}
	}, [user]);

	const [isTrainingsDropdownOpen, setIsTrainingsDropdownOpen] = useState<boolean>(false);
	const [isNetworksDropdownOpen, setIsNetworksDropdownOpen] = useState<boolean>(false);

	const handleTrainingsDropdownPress = () => {
		setIsTrainingsDropdownOpen(!isTrainingsDropdownOpen);
	};
	const handleNetworksDropdownPress = () => {
		setIsNetworksDropdownOpen(!isNetworksDropdownOpen);
	};

	return (
		<>
			<button
				data-drawer-target='logo-sidebar'
				data-drawer-toggle='logo-sidebar'
				aria-controls='logo-sidebar'
				type='button'
				className='inline-flex items-center py-2 px-4 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
			>
				<span className='sr-only'>Open sidebar</span>
				<svg
					className='w-6 h-6'
					aria-hidden='true'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						clipRule='evenodd'
						fillRule='evenodd'
						d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
					></path>
				</svg>
			</button>

			<aside
				id='logo-sidebar'
				className='fixed top-0 left-0 z-40 w-64 max-h-screen h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-md rounded-r-xl bg-white'
				aria-label='Sidebar'
				aria-hidden='true'
			>
				<div className='max-h-screen h-screen px-4 py-6 overflow-y-auto flex flex-col text-sm'>
					<Link href='/' className=' flex font-lexendDeca items-center justify-center mt-4 mb-10 gap-1'>
						<Image
							src='/taytayan-logo.svg'
							className='h-6 sm:h-12'
							alt='Project taytayan Logo'
							width={0}
							height={0}
							style={{ width: 'auto', height: '50px', objectFit: 'fill' }}
						/>
						<span className='flex flex-col items-start justify-center'>
							<span className='text-sm font-light whitespace-nowrap dark:text-white'>PROJECT</span>
							<span className='text-lg font-regular whitespace-nowrap dark:text-white'>taytayan</span>
						</span>
					</Link>
					<div className='h-full'>
						<ul className='flex flex-col gap-2 font-medium'>
							<li>
								<Link
									href='/'
									className={`flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg 
									${
										pathName.includes('jobs') ||
										pathName.includes('trainings') ||
										pathName.includes('events') ||
										pathName.includes('contact-us') ||
										pathName.includes('profile') ||
										pathName.includes('settings') ||
										pathName.includes('logout')
											? 'text-gray-700 dark:text-white'
											: 'bg-[#E3F6F5] dark:bg-[#E3F6F5] text-[#0090D8] dark:text-[#0090D8]'
									}`}
								>
									<svg
										className='w-4 h-4'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 20 20'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9'
										/>
									</svg>
									<span className='ms-3'>Home</span>
								</Link>
							</li>
							<li>
								<Link
									href='/jobs'
									className={`flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
										pathName.includes('/jobs')
											? 'bg-[#E3F6F5] dark:bg-[#E3F6F5] text-[#0090D8] dark:text-[#0090D8]'
											: 'text-gray-700 dark:text-white'
									}`}
								>
									<svg
										className='w-4 h-4'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										width='20'
										height='20'
										fill='none'
										viewBox='0 0 20 20'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeWidth='2'
											d='M1 10c1.5 1.5 5.25 3 9 3s7.5-1.5 9-3m-9-1h.01M2 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1ZM14 5V3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2h8Z'
										/>
									</svg>
									<span className='flex-1 ms-3 whitespace-nowrap'>Jobs</span>
								</Link>
							</li>
							<li>
								<Link
									href=''
									className={`flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
										pathName.includes('/alltrainings') || pathName.includes('/mytrainings')
											? 'bg-[#E3F6F5] dark:bg-[#E3F6F5] text-[#0090D8] dark:text-[#0090D8]'
											: 'text-gray-700 dark:text-white'
									}`}
									onClick={() => handleTrainingsDropdownPress()}
								>
									<svg
										className='w-4 h-4'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 18 18'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M3 1h12M3 1v16M3 1H2m13 0v16m0-16h1m-1 16H3m12 0h2M3 17H1M6 4h1v1H6V4Zm5 0h1v1h-1V4ZM6 8h1v1H6V8Zm5 0h1v1h-1V8Zm-3 4h2a1 1 0 0 1 1 1v4H7v-4a1 1 0 0 1 1-1Z'
										/>
									</svg>
									<span className='flex-1 ms-3 whitespace-nowrap '>Trainings</span>
									<svg
										className={`w-4 h-4 transform ${isTrainingsDropdownOpen ? 'hidden' : ''}`}
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
											d='m9 5 7 7-7 7'
										/>
									</svg>
									<svg
										className={`w-4 h-4 ${isTrainingsDropdownOpen ? '' : 'hidden'}`}
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
											d='m19 9-7 7-7-7'
										/>
									</svg>
								</Link>
							</li>
							<li className={`${isTrainingsDropdownOpen ? '' : 'hidden'}`}>
								<Link
									href='/alltrainings'
									className={`flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
										pathName.includes('/alltrainings')
											? 'bg-[#E3F6F5] dark:bg-[#1e2222] text-[#0090D8] dark:text-[#0090D8]'
											: 'text-gray-700 dark:text-white'
									}`}
								>
									<span className='flex-1 ms-7 whitespace-nowrap '>Browse All</span>
								</Link>
							</li>
							<li className={`${isTrainingsDropdownOpen ? '' : 'hidden'}`}>
								<Link
									href='/mytrainings'
									className={`flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
										pathName.includes('/mytrainings')
											? 'bg-[#E3F6F5] dark:bg-[#E3F6F5] text-[#0090D8] dark:text-[#0090D8]'
											: 'text-gray-700 dark:text-white'
									}`}
								>
									<span className='flex-1 ms-7 whitespace-nowrap '>My Trainings</span>
								</Link>
							</li>
							<li>
								<Link
									href=''
									className={`flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
										pathName.includes('/allevents') || pathName.includes('/myevents')
											? 'bg-[#E3F6F5] dark:bg-[#E3F6F5] text-[#0090D8] dark:text-[#0090D8]'
											: 'text-gray-700 dark:text-white'
									}`}
									onClick={() => handleNetworksDropdownPress()}
								>
									<svg
										className='w-4 h-4'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 16 20'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z'
										/>
									</svg>
									<span className='flex-1 ms-3 whitespace-nowrap '>Networks</span>
									<svg
										className={`w-4 h-4 transform ${isNetworksDropdownOpen ? 'hidden' : ''}`}
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
											d='m9 5 7 7-7 7'
										/>
									</svg>
									<svg
										className={`w-4 h-4 ${isNetworksDropdownOpen ? '' : 'hidden'}`}
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
											d='m19 9-7 7-7-7'
										/>
									</svg>
								</Link>
							</li>
							<li className={`${isNetworksDropdownOpen ? '' : 'hidden'}`}>
								<Link
									href='/allevents'
									className={`flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
										pathName.includes('/allevents')
											? 'bg-[#E3F6F5] dark:bg-[#1e2222] text-[#0090D8] dark:text-[#0090D8]'
											: 'text-gray-700 dark:text-white'
									}`}
								>
									<span className='flex-1 ms-7 whitespace-nowrap '>Browse All</span>
								</Link>
							</li>
							<li className={`${isNetworksDropdownOpen ? '' : 'hidden'}`}>
								<Link
									href='/myevents'
									className={`flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
										pathName.includes('/myevents')
											? 'bg-[#E3F6F5] dark:bg-[#E3F6F5] text-[#0090D8] dark:text-[#0090D8]'
											: 'text-gray-700 dark:text-white'
									}`}
								>
									<span className='flex-1 ms-7 whitespace-nowrap '>My Events</span>
								</Link>
							</li>
							<li>
								<Link
									href='/contact-us'
									className={`flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
										pathName.includes('/contact-us')
											? 'bg-[#E3F6F5] dark:bg-[#E3F6F5] text-[#0090D8] dark:text-[#0090D8]'
											: 'text-gray-700 dark:text-white'
									}`}
								>
									<svg
										className='w-4 h-4'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 18 18'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z'
										/>
									</svg>
									<span className='flex-1 ms-3 whitespace-nowrap'>Contact Us</span>
								</Link>
							</li>
						</ul>
					</div>
					<div className='flex flex-col h-3/4 justify-between'>
						<ul className='flex flex-col gap-2 h-fit font-medium border-t-2 border-gray-300 justify-between'>
							<li className='flex flex-col gap-2 font-semibold items-start'>
								<h1 className=' text-sm font-semibold text-gray-500 mt-4'>My Profile</h1>
								<Link
									href='/profile'
									className={`flex items-center w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
										pathName.includes('/profile')
											? 'bg-[#E3F6F5] dark:bg-[#E3F6F5] text-[#0090D8] dark:text-[#0090D8]'
											: 'text-gray-700 dark:text-white'
									}`}
								>
									<div className='flex gap-2 items-center'>
										<UserAvatar
											firstName={user?.firstName}
											lastName={user?.lastName}
											avatarURL={user?.avatarURL}
											role={user?.role}
											size='sm'
										/>
										<span>{name}</span>
									</div>
								</Link>
							</li>
						</ul>

						<ul className='flex flex-col gap-2 h-fit font-medium'>
							<li>
								<Link
									href='#settings'
									className={`flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
										pathName.includes('/settings')
											? 'bg-[#E3F6F5] dark:bg-[#E3F6F5] text-[#0090D8] dark:text-[#0090D8]'
											: 'text-gray-700 dark:text-white'
									}`}
								>
									<svg
										className='w-4 h-4 text-[#1A56DB] dark:text-[#1A56DB]'
										aria-hidden='true'
										viewBox='0 0 20 18'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M6.5 8C5.80777 8 5.13108 7.79473 4.55551 7.41015C3.97993 7.02556 3.53133 6.47893 3.26642 5.83939C3.00152 5.19985 2.9322 4.49612 3.06725 3.81719C3.2023 3.13825 3.53564 2.51461 4.02513 2.02513C4.51461 1.53564 5.13825 1.2023 5.81719 1.06725C6.49612 0.932205 7.19985 1.00152 7.83939 1.26642C8.47893 1.53133 9.02556 1.97993 9.41015 2.55551C9.79473 3.13108 10 3.80777 10 4.5'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M6.5 17H1V15C1 13.9391 1.42143 12.9217 2.17157 12.1716C2.92172 11.4214 3.93913 11 5 11'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M19.5 11H18.38C18.2672 10.5081 18.0714 10.0391 17.801 9.613L18.601 8.818C18.6947 8.72424 18.7474 8.59708 18.7474 8.4645C18.7474 8.33192 18.6947 8.20476 18.601 8.111L17.894 7.404C17.8002 7.31026 17.6731 7.25761 17.5405 7.25761C17.4079 7.25761 17.2808 7.31026 17.187 7.404L16.392 8.204C15.9647 7.93136 15.4939 7.73384 15 7.62V6.5C15 6.36739 14.9473 6.24021 14.8536 6.14645C14.7598 6.05268 14.6326 6 14.5 6H13.5C13.3674 6 13.2402 6.05268 13.1464 6.14645C13.0527 6.24021 13 6.36739 13 6.5V7.62C12.5081 7.73283 12.0391 7.92863 11.613 8.199L10.818 7.404C10.7242 7.31026 10.5971 7.25761 10.4645 7.25761C10.3319 7.25761 10.2048 7.31026 10.111 7.404L9.404 8.111C9.31026 8.20476 9.25761 8.33192 9.25761 8.4645C9.25761 8.59708 9.31026 8.72424 9.404 8.818L10.204 9.618C9.9324 10.0422 9.73492 10.5096 9.62 11H8.5C8.36739 11 8.24021 11.0527 8.14645 11.1464C8.05268 11.2402 8 11.3674 8 11.5V12.5C8 12.6326 8.05268 12.7598 8.14645 12.8536C8.24021 12.9473 8.36739 13 8.5 13H9.62C9.73283 13.4919 9.92863 13.9609 10.199 14.387L9.404 15.182C9.31026 15.2758 9.25761 15.4029 9.25761 15.5355C9.25761 15.6681 9.31026 15.7952 9.404 15.889L10.111 16.596C10.2048 16.6897 10.3319 16.7424 10.4645 16.7424C10.5971 16.7424 10.7242 16.6897 10.818 16.596L11.618 15.796C12.0422 16.0676 12.5096 16.2651 13 16.38V17.5C13 17.6326 13.0527 17.7598 13.1464 17.8536C13.2402 17.9473 13.3674 18 13.5 18H14.5C14.6326 18 14.7598 17.9473 14.8536 17.8536C14.9473 17.7598 15 17.6326 15 17.5V16.38C15.4919 16.2672 15.9609 16.0714 16.387 15.801L17.182 16.601C17.2758 16.6947 17.4029 16.7474 17.5355 16.7474C17.6681 16.7474 17.7952 16.6947 17.889 16.601L18.596 15.894C18.6897 15.8002 18.7424 15.6731 18.7424 15.5405C18.7424 15.4079 18.6897 15.2808 18.596 15.187L17.796 14.392C18.0686 13.9647 18.2662 13.4939 18.38 13H19.5C19.6326 13 19.7598 12.9473 19.8536 12.8536C19.9473 12.7598 20 12.6326 20 12.5V11.5C20 11.3674 19.9473 11.2402 19.8536 11.1464C19.7598 11.0527 19.6326 11 19.5 11ZM14 14.5C13.5055 14.5 13.0222 14.3534 12.6111 14.0787C12.2 13.804 11.8795 13.4135 11.6903 12.9567C11.5011 12.4999 11.4516 11.9972 11.548 11.5123C11.6445 11.0273 11.8826 10.5819 12.2322 10.2322C12.5819 9.8826 13.0273 9.6445 13.5123 9.54804C13.9972 9.45157 14.4999 9.50108 14.9567 9.6903C15.4135 9.87952 15.804 10.2 16.0787 10.6111C16.3534 11.0222 16.5 11.5055 16.5 12C16.5 12.663 16.2366 13.2989 15.7678 13.7678C15.2989 14.2366 14.663 14.5 14 14.5Z'
											fill='currentColor'
										/>
									</svg>

									<span className='flex-1 ms-3 whitespace-nowrap'>Settings</span>
								</Link>
							</li>
							<li>
								<p
									onClick={handleLogout}
									className={`cursor-pointer flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
										pathName.includes('/logout')
											? 'bg-[#E3F6F5] dark:bg-[#E3F6F5] text-[#0090D8] dark:text-[#0090D8]'
											: 'text-gray-700 dark:text-white'
									}`}
								>
									<svg
										className='w-4 h-4 text-[#F05656] dark:text-[#F05656]'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 16 16'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3'
										/>
									</svg>
									<span className='flex-1 ms-3 whitespace-nowrap'>Logout</span>
								</p>
							</li>
						</ul>
					</div>
				</div>
			</aside>
		</>
	);
};

export default SidebarSeeker;
