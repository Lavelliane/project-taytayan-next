'use client';
import React from 'react';
import { NavbarSeeker } from '@/components/JobSeeker/NavbarSeeker';
import NetworkingPage from '@/components/Networking/NetworkingPage';

const page = () => {
	return (
		<main className='flex flex-col min-h-screen justify-start bg-white'>
			<NavbarSeeker />
			<div className='w-full pl-0 sm:pl-64'>
				<NetworkingPage />
			</div>
		</main>
	);
};

export default page;
