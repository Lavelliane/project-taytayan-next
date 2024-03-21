import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { CategoryBadge } from './CategoryBadge';
import { LearnMoreButton } from './LearnMoreButton';
import { Training, User } from '@/types/types';
import { formatTimestamp } from '@/utils/FormatTimestamp';
import { useAuthStore } from '@/hooks/useAuth';
import { cardTheme } from '@/utils/ComponentThemes';
import TrainingRegistrationStatus from './TrainingRegistrationStatus';
import Image from 'next/image';
import flavorImage from '../../../public/assets/stock_2.jpg';

interface TrainingProps {
	trainingData: Training;
}

const trainingCategories = [
	{ key: 1, value: 'Technical', color: 'text-purple-400' },
	{ key: 2, value: 'Certification', color: 'text-blue-400' },
	{ key: 3, value: 'Personal', color: 'text-lime-500' },
	{ key: 4, value: 'Professional', color: 'text-amber-400' },
	{ key: 5, value: 'Vocational & Arts', color: 'text-red-400' },
	{ key: 0, value: 'Other', color: 'text-gray-500' },
];

export const TrainingCard: React.FC<TrainingProps> = (props) => {
	const userStore = useAuthStore((state: { user: User }) => state.user);
	const [categoryColor, setCategoryColor] = useState<string>('gray');
	const {
		trainingId,
		trainingName,
		trainingDate,
		trainingCenter,
		trainingAddress,
		trainingRegistration,
		trainingCategory,
	} = props.trainingData;

	useEffect(() => {
		const category = trainingCategories.find((category) => category.value === trainingCategory);
		if (category) {
			setCategoryColor(category.color);
		} else {
			setCategoryColor('gray');
		}
	}, [trainingCategory]);

	return (
		<Card
			className='max-w-full p-0 shadow-none border-[1px] md:border-[1px] justify-between'
			theme={cardTheme}
			renderImage={() => (
				<div className='flex min-w-fit h-48 relative w-full items-center justify-center rounded-t-lg'>
					<Image
						src={flavorImage}
						alt='banner image'
						style={{
							objectFit: 'cover',
							width: '100%',
							height: '100%',
						}}
						sizes='auto'
						className='rounded-t-lg'
					/>
					<div className='absolute inset-0 text-white z-10 w-full flex h-full items-start justify-between bg-black/40 rounded-t-lg'>
						<div className='flex w-full items-start justify-between mx-6 mb-4 mt-6 gap-4'>
							<div className='flex flex-col gap-0'>
								<h1 className='text-xl font-bold'>{trainingName}</h1>
							</div>
							<div className='bg-neutral-50 flex flex-col px-3 py-1 rounded-lg items-center'>
								<span className={`${categoryColor} uppercase font-bold text-sm`}>
									{formatTimestamp(trainingDate).split(' ')[1].slice(0, 3)}
								</span>
								<span className='font-bold text-2xl text-black'>
									{formatTimestamp(trainingDate).split(',')[1].trim().split(' ')[1]}
								</span>
							</div>
						</div>
					</div>
				</div>
			)}>
			<h3 className='mb-4'>
				<CategoryBadge
					style='banner'
					category={trainingCategory}
				/>
			</h3>
			<div className='flex flex-col gap-2 mx-6 mb-4'>
				<h5 className='flex gap-3 items-center'>
					<svg
						className='min-w-5 w-5 h-5 text-gray-800 dark:text-white'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z'
						/>
					</svg>
					<span className='font-base text-xs lg:text-sm'>{trainingCenter}</span>
				</h5>
				<h5 className='flex gap-3 items-center'>
					<svg
						className='min-w-5 w-5 h-5 text-gray-800 dark:text-white'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 17 21'>
						<g
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'>
							<path d='M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
							<path d='M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z' />
						</g>
					</svg>
					<span className='font-base text-xs lg:text-sm'>{trainingAddress.formattedAddress}</span>
				</h5>
				<h5 className='flex gap-3 items-center'>
					<svg
						className='min-w-5 w-5 h-5 text-gray-800 dark:text-white'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
						/>
					</svg>
					<span className='font-base text-xs lg:text-sm'>{formatTimestamp(trainingDate)}</span>
				</h5>
			</div>

			<div className='flex flex-wrap sm:justify-start justify-around items-center mx-6 mb-6 gap-2'>
				<LearnMoreButton
					key={trainingId}
					trainingData={props.trainingData}
				/>
				<TrainingRegistrationStatus
					trainingId={trainingId}
					trainingRegistration={trainingRegistration}
					userStore={userStore}
				/>
			</div>
		</Card>
	);
};
