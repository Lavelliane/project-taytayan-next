import React, { useState, useEffect, ReactEventHandler, use } from 'react';
import { Modal, Button } from 'flowbite-react';
import { useAuthStore } from '@/hooks/useAuth';
import { collection, getDoc, query, where, doc, setDoc } from 'firebase/firestore';
import { Training } from '@/types/types';
import { User } from '@/types/types';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import { Avatar } from 'flowbite-react';
import { avatarTheme } from '@/utils/ComponentThemes';
import { DefaultProfile } from '@/utils/DefaultProfile';

interface RegisterTrainingProps {
	trainingId: string;
	registerTrainingOpened: boolean;
	handleRegisterTrainingClose: () => void;
}

const RegisterTrainingModal = ({
	trainingId,
	registerTrainingOpened,
	handleRegisterTrainingClose,
}: RegisterTrainingProps) => {
	const [user, setUser] = useState<User>(DefaultProfile);
	const [training, setTraining] = useState<Training>();

	const userStore = useAuthStore((state: { user: User }) => state.user);
	const updateState = useAuthStore((state) => state.updateUserState);

	useEffect(() => {
		setUser(userStore);
	}, []);

	useEffect(() => {
		fetchRegistrants();
	}, []);

	const fetchRegistrants = async () => {
		if (trainingId) {
			const trainingRef = doc(db, 'trainings', trainingId.toString());
			const trainingDoc = await getDoc(trainingRef);

			if (trainingDoc.exists()) {
				const trainingData: Training = { ...(trainingDoc.data() as Training) };
				setTraining(trainingData);
			}
		}
	};

	const handleAttendButton = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		if (userStore?.trainings.includes(trainingId)) {
			alert('You have already registered for this training.');
		} else {
			const updatedRegistrants = Array.isArray(training?.trainingRegistrants) ? training.trainingRegistrants : [];
			const newRegistrants = {
				registrantId: userStore.uid,
				attended: true,
			};

			updatedRegistrants.push(newRegistrants);

			await setDoc(
				doc(db, 'trainings', trainingId),
				{
					trainingRegistrants: updatedRegistrants,
				},
				{ merge: true }
			);

			const updatedTrainings = userStore?.trainings;
			updatedTrainings?.push(trainingId);

			await setDoc(
				doc(db, 'users', userStore.uid),
				{
					trainings: updatedTrainings,
				},
				{ merge: true }
			);
			updateState(user);
			window.location.reload();
		}
	};

	return (
		<Modal
			dismissible
			show={registerTrainingOpened}
			position='center'
			size='sm'
			onClose={() => handleRegisterTrainingClose()}
			popup
		>
			<Modal.Header></Modal.Header>
			<Modal.Body className='flex flex-col gap-6'>
				<div className='flex gap-2 items-center'>
					<svg
						className='w-8 h-8 text-gray-800 dark:text-white'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M18 5V4c0-.6-.4-1-1-1H9a1 1 0 0 0-.8.3l-4 4a1 1 0 0 0-.2.6V20c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-5M9 3v4c0 .6-.4 1-1 1H4m11.4.8 2.7 2.7m1.2-3.9a2 2 0 0 1 0 3l-6.6 6.6L9 18l.7-3.7 6.7-6.7a2 2 0 0 1 3 0Z'
						/>
					</svg>
					<h1 className='font-bold'>Registration</h1>
				</div>
				<h1>Welcome {userStore.firstName}! To join the training, please click attend below.</h1>
				<div className='flex gap-4 items-center'>
					<Avatar
						color='info'
						size='md'
						theme={avatarTheme}
						placeholderInitials={userStore?.firstName.charAt(0) + userStore?.lastName.charAt(0)}
						className='justify-center bg-white rounded-full border-2 border-[#0090D8]'
						img={(props) => (
							<Image
								alt='avatar'
								src={userStore?.avatarURL ?? ''}
								width={200}
								height={200}
								{...props}
								style={{ borderRadius: '100%' }}
							/>
						)}
					/>
					<h1 className='text-sm lg:text-base font-bold'>{userStore.email}</h1>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className='flex gap-4 justify-end w-full'>
					<Button color='red' size='sm' onClick={() => handleRegisterTrainingClose()}>
						Close
					</Button>
					<Button
						type='submit'
						className='w-fit bg-tertiary border-none text-white px-5'
						size='sm'
						onClick={handleAttendButton}
					>
						Attend
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default RegisterTrainingModal;
