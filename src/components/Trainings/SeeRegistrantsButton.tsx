import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { Registrant } from '@/types/types';
import SeeRegistrantsModal from './SeeRegistrantsModal';

interface SeeRegistrantsButtonProps {
	registrant: Registrant[];
}

const SeeRegistrantsButton = ({ registrant }: SeeRegistrantsButtonProps) => {
	const [modalOpened, setModalOpened] = useState(false);

	const handleModalOpen = () => {
		setModalOpened(true);
	};

	const handleModalClose = () => {
		setModalOpened(false);
	};

	return (
		<>
			<Button
				className='w-fit bg-transparent focus:border-0 focus:outline-0 focus:ring-0 text-gray-700 px-0 py-0 hover:text-gray-500 underline-offset-2 underline'
				size='xs'
				color={'transparent'}
				onClick={handleModalOpen}
			>
				View All
				<svg className='-mr-1 ml-2 h-4 w-4' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
						clipRule='evenodd'
					/>
				</svg>
			</Button>
			<SeeRegistrantsModal
				registrant={registrant}
				seeRegistrantOpened={modalOpened}
				handleSeeRegistrantClose={handleModalClose}
			/>
		</>
	);
};

export default SeeRegistrantsButton;
