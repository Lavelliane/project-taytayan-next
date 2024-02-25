import React from 'react';
import { User } from '@/types/types';
import { Badge } from 'flowbite-react';

interface RegistrationStatusProps {
	trainingId: string;
	trainingRegistration: string;
	userStore: User;
}

const TrainingRegistrationStatus: React.FC<RegistrationStatusProps> = (props) => {
	const { trainingId, trainingRegistration, userStore } = props;
	return (
		<div>
			{userStore?.trainings.includes(trainingId) ? (
				<Badge className='bg-green-100 text-green-500 px-5 py-2.5 rounded-lg text-center font-semibold text-sm'>
					<div className='flex flex-row items-center justify-center gap-1'>
						<svg
							className='w-5 h-5 sm:block hidden'
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
								d='m8 12 2 2 5-5m4.5 5.3 1-.9a2 2 0 0 0 0-2.8l-1-.9a2 2 0 0 1-.6-1.4V7a2 2 0 0 0-2-2h-1.2a2 2 0 0 1-1.4-.5l-.9-1a2 2 0 0 0-2.8 0l-.9 1a2 2 0 0 1-1.4.6H7a2 2 0 0 0-2 2v1.2c0 .5-.2 1-.5 1.4l-1 .9a2 2 0 0 0 0 2.8l1 .9c.3.4.6.9.6 1.4V17a2 2 0 0 0 2 2h1.2c.5 0 1 .2 1.4.5l.9 1a2 2 0 0 0 2.8 0l.9-1a2 2 0 0 1 1.4-.6H17a2 2 0 0 0 2-2v-1.2c0-.5.2-1 .5-1.4Z'
							/>
						</svg>
						Registered
					</div>
				</Badge>
			) : (
				<Badge className='bg-zinc-100 text-zinc-500 px-5 py-2.5 rounded-lg text-center font-bold text-sm'>
					{parseFloat(trainingRegistration) === 0
						? 'FREE'
						: `₱${Number(trainingRegistration).toLocaleString('en-US', {
								minimumFractionDigits: 2,
						  })}`}
				</Badge>
			)}
		</div>
	);
};

export default TrainingRegistrationStatus;
