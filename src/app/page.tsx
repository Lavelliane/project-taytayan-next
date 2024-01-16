import Dashboard from '@/components/Dashboard/Dashboard';
import { NavbarSeeker } from '@/components/JobSeeker/NavbarSeeker';
import SidebarSeeker from '@/components/JobSeeker/SidebarSeeker';


export default function Home() {
	return (
		<main className='flex min-h-screen items-start justify-between p-24 bg-white'>
			<div className='w-64'>
				<SidebarSeeker />
			</div>
		</main>
	);
};

