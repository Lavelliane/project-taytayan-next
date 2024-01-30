'use client';
import React from 'react';
import { Tabs } from 'flowbite-react';
import { MdOutlineDashboard, MdOutlinePostAdd } from 'react-icons/md';
import PostJobForm from './PostJobForm';
import JobPost from './JobPost';

const EmploymentPage = () => {
	return (
		<main className='flex flex-col w-full p-4 md:p-6 lg:p-8 xl:p-10'>
			<section>
				<div>
					<Tabs aria-label='Tabs with icons' style='default'>
						<Tabs.Item active title='Jobs Posted' icon={MdOutlineDashboard}>
							<JobPost />
						</Tabs.Item>
						<Tabs.Item active title='Jobs Applied' icon={MdOutlineDashboard}>
							<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full pb-8 bg-slate-50 p-6 rounded-xl'></div>
						</Tabs.Item>
						<Tabs.Item active title='My Job Posts' icon={MdOutlineDashboard}>
							<JobPost />
						</Tabs.Item>
						<Tabs.Item title='Post a Job' icon={MdOutlinePostAdd}>
							<h1 className='text-semibold'>Please fill up the required information to submit the job posting.</h1>
							<div className='w-full p-6 bg-slate-50 rounded-xl'>
								<PostJobForm />
							</div>
						</Tabs.Item>
					</Tabs>
				</div>
			</section>
		</main>
	);
};

export default EmploymentPage;
