'use client';
import React from 'react';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import EventIcon from '../../../public/assets/eventsIcon.png';

const CertEventCard = () => {
	const certName = 'Web Development';
	const eventDate = 'June 20, 2021';
	const Status = 'Completed';

	return (
		<Card className='max-w-2xl w-full h-fit mr-auto rounded-full'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-col gap-2'>
					<div className='flex gap-2 items-center'>
						<Image
							src={EventIcon}
							alt='certification icon'
							width={0}
							height={0}
							style={{ width: 30, height: 'auto' }}
						/>
						<div>
							<h5 className='text-sm text-gray-900 dark:text-gray-400 font-semibold'>{certName}</h5>
							<h1 className='text-xs'>{eventDate}</h1>
						</div>
					</div>
				</div>
				<svg
					className='w-[20px] h-[20px] text-green-400 dark:text-green-400'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 20 20'
				>
					<path
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
					/>
				</svg>
			</div>
		</Card>
	);
};

export default CertEventCard;
