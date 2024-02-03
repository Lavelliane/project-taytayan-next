'use client';
import React from 'react';
import { Tabs } from 'flowbite-react';
import { MdOutlineDashboard, MdOutlinePostAdd, MdOutlinePendingActions } from 'react-icons/md';
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
					<Tabs.Item active title='Posted' icon={MdOutlineDashboard}>
						<JobPost />
					</Tabs.Item>
					{userStore.role === 'general' && (
						<Tabs.Item active title='Applied' icon={MdOutlinePendingActions}>
							<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full pb-8 bg-slate-50 p-6 rounded-xl'></div>
						</Tabs.Item>
					)}
					{userStore.role === 'employer' && (
						<Tabs.Item active title='My Posts' icon={MdOutlinePendingActions}>
							<MyJobPost />
						</Tabs.Item>
					)}
					{userStore.role === 'employer' && (
						<Tabs.Item title='Post Job' icon={MdOutlinePostAdd} className='flex flex-col items-center justify-center'>
							<h1 className='text-semibold sm:text-base text-sm'>
								Please fill up the required information, jobs will be posted immediately.
							</h1>
							<div className='w-full max-w-5xl sm:p-10 p-4 bg-slate-50 rounded-xl m-auto mt-6'>
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
