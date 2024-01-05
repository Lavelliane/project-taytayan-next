import { DashboardMetrics } from '@/components/Dashboard/DashboardMetrics';
import SidebarSeeker from '@/components/JobSeeker/SidebarSeeker';

export default function Home() {
	return (
		<main className='flex min-h-screen items-start justify-between p-24 bg-white'>
			<div className='w-64'>
				<SidebarSeeker />
			</div>
			<DashboardMetrics activeTrainings={232} jobsAvailable={132} upcomingEvents={13} />
		</main>
	);
};

