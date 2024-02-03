import React, { useState, useEffect } from 'react';
import { Card, Button } from 'flowbite-react';
import { Employment } from '@/types/types';
import { FormatPostedDate } from '@/utils/FormatPostedDate';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface MyJobPostDetailsProps {
	EmploymentData: Employment;
}

const MyJobPostDetails = ({ EmploymentData }: MyJobPostDetailsProps) => {
	const handleHidePost = async () => {
		try {
			const employmentRef = doc(db, 'employment', EmploymentData.employmentId);

			await updateDoc(employmentRef, {
				displayJob: !EmploymentData.displayJob,
			});

			console.log(`Job has been ${EmploymentData.displayJob ? 'posted' : 'hidden'} successfully!`);
		} catch (error) {
			console.error(error);
		}

		window.location.reload();
	};

	const handleDeletePost = async () => {
		try {
			const employmentRef = doc(db, 'employment', EmploymentData.employmentId);
			await deleteDoc(employmentRef);
		} catch (error) {
			console.error(error);
		}

		window.location.reload();
	};

	return (
		<div className={`max-w-full w-full flex flex-col p-0 shadow-none justify-between transition-all h-full`}>
			<header className='flex flex-col items-start justify-start gap-4 text-sm lg:text-base'>
				<div>
					<h1 className='xl:text-4xl md:text-2xl text-xl font-bold'>{EmploymentData?.employmentTitle}</h1>
					<h2 className='xl:text-2xl md:text-lg text-base font-semibold mt-4'>{EmploymentData?.employmentCompany}</h2>
					<p className='xl:text-base md:text-sm text-xs font-normal'>{EmploymentData?.employmentCompanyDescription}</p>
				</div>
				<div className='flex flex-col gap-4 mt-4'>
					<h5 className='flex gap-3 items-start'>
						<svg
							className='min-w-5 w-5 h-5 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M7 6H5m2 3H5m2 3H5m2 3H5m2 3H5m11-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2M7 3h11c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1V4c0-.6.4-1 1-1Zm8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'
							/>
						</svg>
						<ul className='font-base text-xs lg:text-sm text-start'>
							{EmploymentData?.employmentContactInformation.map((info) => {
								return <li key={info}>{info}</li>;
							})}
						</ul>
					</h5>
					<h5 className='flex gap-3 items-start'>
						<svg
							className='min-w-5 w-5 h-5 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 17 21'
						>
							<g stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'>
								<path d='M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
								<path d='M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z' />
							</g>
						</svg>
						<span className='font-base text-xs lg:text-sm text-start'>
							{EmploymentData?.employmentAddress.formattedAddress}
						</span>
					</h5>
					<h5 className='flex gap-3 items-start'>
						<svg
							className='min-w-5 w-5 h-5 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h0'
							/>
						</svg>
						<span className='font-base text-xs lg:text-sm text-start'>
							{EmploymentData?.employmentType} | {EmploymentData?.employmentLocationType}
						</span>
					</h5>
					<h5 className='flex gap-3 items-start'>
						<svg
							className='min-w-5 w-5 h-5 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeWidth='2'
								d='M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z'
							/>
						</svg>
						<span className='font-base text-xs lg:text-sm text-start'>{EmploymentData?.employmentSalary}</span>
					</h5>
					<h5 className='flex gap-3 items-start'>
						<svg
							className='min-w-5 w-5 h-5 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
							/>
						</svg>
						<span className='font-base text-xs lg:text-sm text-start'>
							{FormatPostedDate(EmploymentData?.employmentDatePosted)}
						</span>
					</h5>
				</div>
				<div className='flex gap-4 mt-4'>
					<Button color='transparent' className='bg-tertiary hover:bg-tertiary/70 text-white'>
						Quick Apply
					</Button>
					<Button color='light'>Save Job</Button>
				</div>
			</header>
			<div className='gap-4 flex flex-col'>
				<div className='mt-8'>
					<h1 className='xl:text-lg md:text-base text-sm font-semibold'>JOB SUMMARY:</h1>
					<p className='xl:text-base md:text-sm text-xs'>{EmploymentData?.employmentDescription}</p>
				</div>
				<div>
					<h1 className='xl:text-lg md:text-base text-sm font-semibold'>JOB BENEFITS:</h1>
					<p className='xl:text-base md:text-sm text-xs'>{EmploymentData?.employmentBenefits}</p>
				</div>
				<div>
					<h1 className='xl:text-lg md:text-base text-sm font-semibold'>KEY ROLES & RESPONSIBILITIES:</h1>
					<ul className=' list-disc ml-8 xl:text-base md:text-sm text-xs'>
						{EmploymentData?.employmentKeyRoles.map((roles, index) => (
							<li key={roles}>{roles}</li>
						))}
					</ul>
				</div>
				<div>
					<h1 className='xl:text-lg md:text-base text-sm font-semibold'>EDUCATION & EXPERIENCE REQUIREMENT:</h1>
					<ul className=' list-disc ml-8 xl:text-base md:text-sm text-xs'>
						<li>{EmploymentData?.employmentEducation}</li>
						<li>{EmploymentData?.employmentExperience}</li>
					</ul>
				</div>
				<div>
					<h1 className='xl:text-lg md:text-base text-sm font-semibold'>EMPLOYMENT INSTRUCTION:</h1>
					<p className=' list-disc ml-8 xl:text-base md:text-sm text-xs'>{EmploymentData?.employmentInstructions}</p>
				</div>
			</div>
			<footer></footer>
		</div>
	);
};

export default MyJobPostDetails;
