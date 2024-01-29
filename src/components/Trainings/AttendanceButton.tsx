import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { Registrant } from '@/types/types';
import AttendanceModal from './AttendanceModal';

interface AttendanceButtonProps {
	registrant: Registrant[];
	trainingId: string;
}

const AttendanceButton = ({ registrant, trainingId }: AttendanceButtonProps) => {
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
				size='lg'
				color='transparent'
				className='bg-tertiary hover:bg-tertiary/70 text-white'
				onClick={handleModalOpen}
			>
				Attendance
			</Button>
			<AttendanceModal
				registrant={registrant}
				trainingId={trainingId}
				seeRegistrantOpened={modalOpened}
				handleAttendanceClose={handleModalClose}
			/>
		</>
	);
};

export default AttendanceButton;
