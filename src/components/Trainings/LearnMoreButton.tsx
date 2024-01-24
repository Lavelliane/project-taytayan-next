'use client';

import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { Training } from '@/types/types';
import { LearnMoreModal } from './LearnMoreModal';

interface LearnMoreButtonProps {
	trainingData: Training;
}

export const LearnMoreButton: React.FC<LearnMoreButtonProps> = ({ trainingData }) => {
	const [modalOpened, setModalOpened] = useState(false);

	const handleModalOpen = () => {
		setModalOpened(true);
	};

	const handleModalClose = () => {
		setModalOpened(false);
	};

	return (
		<>
			<Button className='w-fit bg-tertiary border-none text-white px-5' size='lg' onClick={handleModalOpen}>
				Learn more
				<svg className='-mr-1 ml-2 h-4 w-4' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
						clipRule='evenodd'
					/>
				</svg>
			</Button>
			<LearnMoreModal
				learnMoreOpened={modalOpened}
				handleLearnMoreClose={handleModalClose}
				trainingData={trainingData}
			/>
		</>
	);
};
