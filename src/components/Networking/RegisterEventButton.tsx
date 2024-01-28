'use client';

import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import RegisterEventModal from './RegisterEventModal';

interface RegisterEventButtonProps {
	eventId: string;
}

export const RegisterEventButton = ({ eventId }: RegisterEventButtonProps) => {
	const [registerEventOpened, setRegisterEventOpened] = useState(false);

	const handleRegisterEventOpen = () => {
		setRegisterEventOpened(true);
	};

	const handleRegisterEventClose = () => {
		setRegisterEventOpened(false);
	};
	return (
		<>
			<Button className='w-fit bg-tertiary border-none text-white px-5' size='lg' onClick={handleRegisterEventOpen}>
				Register
			</Button>
			<RegisterEventModal
				eventId={eventId}
				registerEventOpened={registerEventOpened}
				handleRegisterEventClose={handleRegisterEventClose}
			/>
		</>
	);
};
