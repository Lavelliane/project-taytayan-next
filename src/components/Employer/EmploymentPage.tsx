'use client';
import React from 'react';
import { Tabs } from 'flowbite-react';
import { MdOutlineDashboard, MdOutlinePostAdd } from 'react-icons/md';
import PostJobForm from './PostJobForm';
import MyJobPost from './MyJobPost';
import JobPost from './JobPost';
import { useAuthStore } from '@/hooks/useAuth';

const EmploymentPage = () => {
	const userStore = useAuthStore((state) => state.user);

	return (
		<main className='flex flex-col w-full p-4'>
			<section>
				<Tabs aria-label='Tabs with icons' style='default'>
					<Tabs.Item active title='Jobs Posted' icon={MdOutlineDashboard}>
						<JobPost />
					</Tabs.Item>
					{userStore.role === 'general' && (
						<Tabs.Item active title='Jobs Applied' icon={MdOutlineDashboard}>
							<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full pb-8 bg-slate-50 p-6 rounded-xl'></div>
						</Tabs.Item>
					)}
					{userStore.role === 'employer' && (
						<Tabs.Item active title='My Job Posts' icon={MdOutlineDashboard}>
							<MyJobPost />
						</Tabs.Item>
					)}
					{userStore.role === 'employer' && (
						<Tabs.Item title='Post a Job' icon={MdOutlinePostAdd} className='flex flex-col items-center justify-center'>
							<h1 className='text-semibold'>
								Please fill up the required information, jobs will be posted immediately.
							</h1>
							<div className='w-full max-w-5xl p-10 bg-slate-50 rounded-xl m-auto mt-6'>
								<PostJobForm />
							</div>
						</Tabs.Item>
					)}
				</Tabs>
			</section>
		</main>
	);
};

export default EmploymentPage;
