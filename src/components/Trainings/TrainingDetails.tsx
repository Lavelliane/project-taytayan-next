import { useState } from 'react';
import { Avatar, Button, CustomFlowbiteTheme, Modal } from 'flowbite-react';
import { Training } from '@/types/types';
import { FiMapPin } from 'react-icons/fi';
import { formatTimestamp } from '@/utils/FormatTimestamp';
import { FormatRegistrants } from '@/utils/FormatRegistrants';
import { Registrant } from '@/types/types';
import SeeRegistrantsButton from './SeeRegistrantsButton';

//TODO: Bind button to Firebase status of user as registered.

interface TrainingDetailsProps {
	trainingData: Training;
}

const avatarTheme: CustomFlowbiteTheme['avatar'] = {
	root: {
		bordered: 'p-1 ring-2',
		color: {
			info: 'ring-tertiary',
		},
	},
};

export const TrainingDetails = ({ trainingData }: TrainingDetailsProps) => {
	const [modalOpened, setModalOpened] = useState(false);

	const handleModalOpen = () => {
		setModalOpened(true);
	};

	const handleModalClose = () => {
		setModalOpened(false);
	};

	return (
		<>
			<Button className='w-fit bg-tertiary border-none text-white px-0 py-0' size='lg' onClick={handleModalOpen}>
				Details
				<svg className='-mr-1 ml-2 h-4 w-4' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
						clipRule='evenodd'
					/>
				</svg>
			</Button>

			<Modal show={modalOpened} position='center' size='2xl' onClose={() => handleModalClose()} popup>
				<Modal.Header />
				<Modal.Body className='flex flex-col gap-4'>
					<div className='flex gap-2 mt-2 items-center'>
						<Avatar
							img='/institution.svg'
							alt='avatar'
							rounded
							size='md'
							color='purple'
							theme={avatarTheme}
							bordered
							className='justify-start min-w-10 mr-2'
						/>
						<h1 className='text-sm lg:text-base font-bold'>{trainingData.trainingName}</h1>
					</div>
					<p className='text-xs lg:text-sm text-gray-500'>{trainingData.trainingDescription}</p>
					<div className='text-xs lg:text-sm font-bold'>{formatTimestamp(trainingData.trainingDate)}</div>
					<div className='flex gap-2 items-center text-xs lg:text-sm'>
						<FiMapPin />
						{trainingData.trainingAddress}
					</div>
					<div className='text-sm lg:text-base font-bold'>
						Registration Fee:{' '}
						{parseFloat(trainingData.trainingRegistration) === 0 ? (
							<span className='text-green-400 font-bold'>Free</span>
						) : (
							<span className='text-red-600 font-bold'>{trainingData.trainingRegistration}</span>
						)}
					</div>
					<div>
						<span className='text-sm lg:text-base font-bold'>Activities</span>
						<ul className='list-disc text-gray-500 list-inside'>
							{trainingData.trainingActivities.map((activity: string, index: number) => (
								<li key={index} className='text-xs lg:text-sm'>
									{activity}
								</li>
							))}
						</ul>
					</div>
					<div>
						<span className='text-sm lg:text-base font-bold'>
							Upon finishing this course, the student should be able to:
						</span>
						<ul className='list-disc text-gray-500 list-inside'>
							{trainingData.trainingObjectives.map((objective: string, index: number) => (
								<li key={index} className='text-xs lg:text-sm'>
									{objective}
								</li>
							))}
						</ul>
					</div>
					<div className='flex flex-col gap-2'>
						<div className='flex gap-2 items-center'>
							<h1 className='text-xs lg:text-sm font-semibold'>
								{trainingData?.trainingRegistrants?.length} Participants
							</h1>
							<SeeRegistrantsButton registrant={trainingData?.trainingRegistrants} />
						</div>
						<FormatRegistrants registrant={trainingData?.trainingRegistrants} />
					</div>
				</Modal.Body>
				<Modal.Footer />
			</Modal>
		</>
	);
};
