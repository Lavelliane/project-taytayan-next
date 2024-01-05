import { DashboardMetrics } from '@/components/Dashboard/DashboardMetrics';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 bg-white'>
			<DashboardMetrics activeTrainings={232} jobsAvailable={132} upcomingEvents={13} />
		</main>
	);
};
