import { AddEventButton } from '@/components/Networking/AddEventButton';
import { AddTrainingButton } from '@/components/Trainings/AddTrainingButton';
import React from 'react';

const page = () => {
	return (
		<div className='h-screen '>
			<div>
				<AddTrainingButton />
				<AddEventButton />
			</div>
		</div>
	);
};

export default page;
