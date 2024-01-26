'use client';

import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import RegisterTrainingModal from './RegisterTrainingModal';

interface RegisterTrainingButtonProps {
	trainingId: string;
}

export const RegisterTrainingButton = ({ trainingId }: RegisterTrainingButtonProps) => {
	const [registerTrainingOpened, setRegisterTrainingOpened] = useState(false);

	const handleRegisterTrainingOpen = () => {
		setRegisterTrainingOpened(true);
	};

	const handleRegisterTrainingClose = () => {
		setRegisterTrainingOpened(false);
	};
	return (
		<>
			<Button className='w-fit bg-tertiary border-none text-white px-5' size='lg' onClick={handleRegisterTrainingOpen}>
				Register
			</Button>
			<RegisterTrainingModal
				trainingId={trainingId}
				registerTrainingOpened={registerTrainingOpened}
				handleRegisterTrainingClose={handleRegisterTrainingClose}
			/>
		</>
	);
};
