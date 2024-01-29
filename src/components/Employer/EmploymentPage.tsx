import React from 'react';
import { Tabs } from 'flowbite-react';

const EmploymentPage = () => {
	return (
		<main className='flex flex-col w-full p-4 md:p-6 lg:p-8 xl:p-10'>
			<section className='pb-8'>
				<h1 className='font-inter font-semibold pb-4 text-lg text-dark'>Manage Jobs</h1>
				<div>
					<div className='pb-8'>
						<Tabs aria-label='Default tabs' style='default'></Tabs>
						<div className='flex flex-wrap gap-2 pt-4 '></div>
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full pb-8 bg-slate-50 p-6 rounded-xl'></div>
				</div>
			</section>
		</main>
	);
};

export default EmploymentPage;
