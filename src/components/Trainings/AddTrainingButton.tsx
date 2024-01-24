'use client';

import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { AddTrainingForm } from './AddTrainingForm';

export const AddTrainingButton = () => {
	const [addTrainingOpened, setAddTrainingOpened] = useState(false);

	const handleAddTrainingOpen = () => {
		setAddTrainingOpened(true);
	};

	const handleAddTrainingClose = () => {
		setAddTrainingOpened(false);
	};
	return (
		<>
			<Button className='w-fit bg-tertiary border-none text-white px-5' size='lg' onClick={handleAddTrainingOpen}>
				Add Training
			</Button>
			<AddTrainingForm addTrainingOpened={addTrainingOpened} handleAddTrainingClose={handleAddTrainingClose} />
		</>
	);
};
