import React from 'react';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import CertificateIcon from '../../../public/assets/certificationIcon.png';
import { Training } from '@/types/types';

interface MyTrainingsCardProps {
	trainings: Training;
}

const CertTrainingCard = ({ trainings }: MyTrainingsCardProps) => {
	const certName = trainings.trainingName;
	const typeOfCertification = trainings.trainingCategory;
	const organization = trainings.trainingCenter;
	const location = trainings.trainingAddress.formattedAddress;
	const registrationFee = trainings.trainingRegistration;
	const Status = 'Completed';

	return (
		<Card className='max-w-2xl lg:w-[21rem] w-full h-fit'>
			<div className='flex gap-2 items-center'>
				<Image
					src={CertificateIcon}
					alt='certification icon'
					width={200}
					height={200}
					style={{ width: 60, height: 'auto' }}
				/>
				<h5 className='text-sm text-gray-900 dark:text-gray-400 font-semibold'>{certName}</h5>
			</div>
			<h5 className='rounded-full bg-[#7895FF] text-white text-xs font-semibold px-4 py-2 w-fit'>
				{typeOfCertification}
			</h5>
			<div className='flex flex-col gap-2'>
				<div className='flex gap-4 items-start'>
					<svg
						className='w-[16px] h-[16px] text-gray-800 dark:text-white'
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
							d='M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z'
						/>
					</svg>
					<h1 className='text-xs'>{organization}</h1>
				</div>
				<div className='flex gap-4 items-start'>
					<svg
						className='w-[16px] h-[16px] text-gray-800 dark:text-white'
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
					<h1 className='text-xs'>{location}</h1>
				</div>
				<div className='flex gap-4 items-start'>
					<svg
						className='w-[16px] h-[16px] text-gray-800 dark:text-white'
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
					<h1 className='text-xs'>{Number(registrationFee) >= 0 ? registrationFee.toString() : 'Free'}</h1>
				</div>
			</div>
			<h1 className='text-sm text-white font-semibold bg-[#009639] rounded-lg px-6 py-2 w-fit'>{Status}</h1>
		</Card>
	);
};

export default CertTrainingCard;
