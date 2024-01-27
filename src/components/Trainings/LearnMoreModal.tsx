import { Avatar, Button, CustomFlowbiteTheme, Modal } from 'flowbite-react';
import { Training } from '@/types/types';
import { FiMapPin } from 'react-icons/fi';
import { formatTimestamp } from '@/utils/FormatTimestamp';
import { FormatRegistrants } from '@/utils/FormatRegistrants';
import { Registrant } from '@/types/types';
import SeeRegistrantsButton from './SeeRegistrantsButton';
import { RegisterTrainingButton } from './RegisterTrainingButton';

//TODO: Bind button to Firebase status of user as registered.

interface LearnMoreProps {
	learnMoreOpened: boolean;
	handleLearnMoreClose: () => void;
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

export const LearnMoreModal = ({ learnMoreOpened, handleLearnMoreClose, trainingData }: LearnMoreProps) => {
	return (
		<Modal show={learnMoreOpened} position='center' size='2xl' onClose={() => handleLearnMoreClose()} popup>
			<Modal.Header />
			<Modal.Body className='flex flex-col gap-4 my-4'>
				<div className='flex gap-2 mt-4 items-center'>
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
					{trainingData.trainingAddress.formattedAddress}
				</div>
				<div className='text-sm lg:text-base font-bold'>
					Registration Fee:{' '}
					{parseFloat(trainingData.trainingRegistration) === 0 ? (
						<span className='text-green-400 font-bold'>Free</span>
					) : (
						<span className='text-red-500 font-bold'>
							{`₱${Number(trainingData.trainingRegistration).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
						</span>
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
			<Modal.Footer>
				<div className='flex justify-end w-full'>
					<RegisterTrainingButton trainingId={trainingData?.trainingId} />
				</div>
			</Modal.Footer>
		</Modal>
	);
};
