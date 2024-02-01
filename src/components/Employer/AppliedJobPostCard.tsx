import React, { useEffect, useState } from 'react';
import { Card, CardProps } from 'flowbite-react';
import { Employment } from '@/types/types';
import { useAuthStore } from '@/hooks/useAuth';
import { User } from '@/types/types';
import { cardTheme } from '@/utils/ComponentThemes';
import { FormatPostedDate } from '@/utils/FormatPostedDate';

interface MyJobPostProps {
	EmploymentData: Employment;
}

export const MyJobPostCard: React.FC<MyJobPostProps> = ({ EmploymentData }: MyJobPostProps) => {
	const userStore = useAuthStore((state: { user: User }) => state.user);

	const {
		employmentId,
		employmentTitle,
		employmentDescription,
		employmentCompany,
		employmentCompanyDescription,
		employmentContactInformation,
		employmentType,
		employmentLocationType,
		employmentAddress,
		employmentDatePosted,
		employmentKeyRoles,
		employmentEducation,
		employmentExperience,
		employmentInstructions,
		employmentBenefits,
		employmentSalary,
		displayJob,
		employmentApplicants,
	} = EmploymentData;

	return (
		<Card
			className='max-w-full w-full h-80 p-0 shadow-none rounded-xl justify-between'
			theme={cardTheme}
			renderImage={() => (
				<div className='flex min-w-fit h-32 relative w-full items-center justify-center rounded-t-lg'>
					<div className='absolute inset-0 text-white z-10 w-full flex h-full items-start justify-between bg-black/80 rounded-t-lg'>
						<div className='flex w-full items-start justify-between mx-6 mb-4 mt-6 gap-4'>
							<div className='flex flex-col gap-0 w-full'>
								<h1 className='text-lg lg:text-xl font-bold'>{employmentTitle}</h1>
								<span className='font-base text-xs lg:text-sm'>{employmentCompany}</span>
							</div>
						</div>
					</div>
				</div>
			)}
		>
			<div className='flex flex-col gap-2 mx-6 mt-4'>
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
						{employmentContactInformation.map((info) => {
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
					<span className='font-base text-xs lg:text-sm text-start'>{employmentAddress.formattedAddress}</span>
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
						{employmentType} | {employmentLocationType}
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
					<span className='font-base text-xs lg:text-sm text-start'>{employmentSalary}</span>
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
					<span className='font-base text-xs lg:text-sm text-start'>{FormatPostedDate(employmentDatePosted)}</span>
				</h5>
			</div>
		</Card>
	);
};

export default MyJobPostCard;
