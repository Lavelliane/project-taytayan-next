import { Avatar, Card, CustomFlowbiteTheme } from 'flowbite-react';
import React from 'react';
import { CategoryBadge } from './CategoryBadge';
import { Training } from '@/types/types';
import { TrainingDetails } from './TrainingDetails';
import { formatTimestamp } from '@/utils/FormatTimestamp';
import { avatarTheme, cardTheme } from '@/utils/ComponentThemes';

interface TrainingProps {
	trainingData: Training;
}

export const MyTrainingCard: React.FC<TrainingProps> = (props) => {
	const {
		trainingId,
		trainingName,
		trainingDate,
		trainingCenter,
		trainingAddress,
		trainingRegistration,
		trainingCategory,
	} = props.trainingData;
	return (
		<Card className='max-w-full p-0 shadow-none border-[1px] md:border-[3px] justify-between' theme={cardTheme}>
			<div className='flex items-center'>
				<Avatar
					img='/institution.svg'
					alt='avatar'
					rounded
					size='md'
					color='purple'
					theme={avatarTheme}
					bordered
					className='justify-start min-w-10 mr-2'
				/>
				<div className='flex flex-col gap-0'>
					<h1 className='text-sm lg:text-lg font-bold'>{trainingName}</h1>
					<p className='text-xs'>{formatTimestamp(trainingDate)}</p>
				</div>
			</div>
			<h3 className='mt-2 mb-4 lg:mt-0 lg:mb-0'>
				<CategoryBadge category={trainingCategory} />
			</h3>
			<h5 className='flex gap-3 items-center'>
				<svg
					className='min-w-4 w-4 h-4 text-gray-800 dark:text-white'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 20 18'
				>
					<path
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M14 3a3 3 0 1 1-1.614 5.53M15 12a4 4 0 0 1 4 4v1h-3.348M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z'
					/>
				</svg>
				<span className='font-base text-xs lg:text-sm'>{trainingCenter}</span>
			</h5>
			<h5 className='flex gap-3 items-center'>
				<svg
					className='min-w-4 w-4 h-4 text-gray-800 dark:text-white'
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
				<span className='font-base text-xs lg:text-sm'>{trainingAddress.formattedAddress}</span>
			</h5>
			<h5 className='flex gap-3 items-center'>
				<svg
					className='min-w-4 w-4 h-4 text-gray-800 dark:text-white'
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
						d='M11.905 1.316 15.633 6M18 10h-5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h5m0-5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1m0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-3m-6.367-9L7.905 1.316 2.352 6h9.281Z'
					/>
				</svg>
				<span className='font-base text-xs lg:text-sm'>{trainingRegistration}</span>
			</h5>
			<TrainingDetails key={trainingId} trainingData={props.trainingData} />
		</Card>
	);
};
