import Dashboard from '@/components/Dashboard/Dashboard';
import SidebarSeeker from '@/components/JobSeeker/SidebarSeeker';

export default function Home() {
	return (
		<main className='flex min-h-screen justify-between bg-white'>
			<div className='w-fit sm:w-[309px]'>
				<SidebarSeeker />
			</div>
			<div className='w-full p-0'>
				<Dashboard />
			</div>
		</main>
	);
};

