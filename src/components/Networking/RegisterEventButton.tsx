'use client';

import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import RegisterEventModal from './RegisterEventModal';
import { User } from '@/types/types';
import { useAuthStore } from '@/hooks/useAuth';
import { DefaultProfile } from '@/utils/Defaults';

interface RegisterEventButtonProps {
	eventId: string;
}

export const RegisterEventButton = ({ eventId }: RegisterEventButtonProps) => {
	const [registerEventOpened, setRegisterEventOpened] = useState(false);

	const [user, setUser] = useState<User>(DefaultProfile);

	const userStore = useAuthStore((state: { user: User }) => state.user);

	useEffect(() => {
		setUser(userStore);
	}, []);
	const handleRegisterEventOpen = () => {
		setRegisterEventOpened(true);
	};

	const handleRegisterEventClose = () => {
		setRegisterEventOpened(false);
	};
	return (
		<>
			{!userStore?.eventsJoined.includes(eventId) ? (
				<Button className='w-fit bg-tertiary border-none text-white px-5' size='lg' onClick={handleRegisterEventOpen}>
					Register
				</Button>
			) : (
				<Button color='red' size='lg' onClick={handleRegisterEventOpen}>
					Unregister
				</Button>
			)}
			<RegisterEventModal
				eventId={eventId}
				registerEventOpened={registerEventOpened}
				handleRegisterEventClose={handleRegisterEventClose}
			/>
		</>
	);
};
