'use client';

import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import RegisterTrainingModal from './RegisterTrainingModal';
import { User } from '@/types/types';
import { useAuthStore } from '@/hooks/useAuth';
import { DefaultProfile } from '@/utils/Defaults';

interface RegisterTrainingButtonProps {
	trainingId: string;
}

export const RegisterTrainingButton = ({ trainingId }: RegisterTrainingButtonProps) => {
	const [registerTrainingOpened, setRegisterTrainingOpened] = useState(false);
	const [user, setUser] = useState<User>(DefaultProfile);

	const userStore = useAuthStore((state: { user: User }) => state.user);

	useEffect(() => {
		setUser(userStore);
	}, []);

	const handleRegisterTrainingOpen = () => {
		setRegisterTrainingOpened(true);
	};

	const handleRegisterTrainingClose = () => {
		setRegisterTrainingOpened(false);
	};
	return (
		<>
			{!userStore?.trainings.includes(trainingId) ? (
				<Button
					className='w-fit bg-tertiary hover:bg-tertiary/70 border-none text-white'
					color='transparent'
					size='lg'
					onClick={handleRegisterTrainingOpen}
				>
					Register
				</Button>
			) : (
				<Button color='red' size='lg' onClick={handleRegisterTrainingOpen}>
					Unregister
				</Button>
			)}

			<RegisterTrainingModal
				trainingId={trainingId}
				registerTrainingOpened={registerTrainingOpened}
				handleRegisterTrainingClose={handleRegisterTrainingClose}
			/>
		</>
	);
};
