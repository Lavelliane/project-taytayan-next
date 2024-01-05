import { DashboardMetrics } from '@/components/Dashboard/DashboardMetrics';
import SidebarSeeker from '@/components/JobSeeker/SidebarSeeker';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 bg-white'>
			<SidebarSeeker />
			<DashboardMetrics activeTrainings={232} jobsAvailable={132} upcomingEvents={13} />
		</main>
	);
};

