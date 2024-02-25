'use client';

import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { NetworkingEvent } from '@/types/types';
import { EventLearnMoreModal } from './EventLearnMoreModal';

interface EventLearnMoreButtonProps {
	networkingEventData: NetworkingEvent;
}

export const EventLearnMoreButton: React.FC<EventLearnMoreButtonProps> = ({ networkingEventData }) => {
	const [modalOpened, setModalOpened] = useState(false);

	const handleModalOpen = () => {
		setModalOpened(true);
	};

	const handleModalClose = () => {
		setModalOpened(false);
	};

	return (
		<>
			<Button className='w-fit bg-tertiary border-none text-white shrink-0' size='md' onClick={handleModalOpen}>
				Learn more
				<svg
					className='-mr-1 ml-2 h-4 w-4 sm:block hidden'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fillRule='evenodd'
						d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
						clipRule='evenodd'
					/>
				</svg>
			</Button>
			<EventLearnMoreModal
				learnMoreOpened={modalOpened}
				handleLearnMoreClose={handleModalClose}
				networkingEventData={networkingEventData}
			/>
		</>
	);
};
