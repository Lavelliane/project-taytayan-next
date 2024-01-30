import Dashboard from '@/components/Dashboard/Dashboard';
import { NavbarSeeker } from '@/components/JobSeeker/NavbarSeeker';
import SidebarSeeker from '@/components/JobSeeker/SidebarSeeker';
import React from 'react';

function Home() {
	return (
		<main className='flex flex-col min-h-screen justify-between bg-white'>
			<NavbarSeeker />
			<div className='w-full pl-0 sm:pl-64'>
				<Dashboard />
			</div>
		</main>
	);
}

export default Home
