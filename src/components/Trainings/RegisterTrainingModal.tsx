import React, { useState, useEffect } from 'react';
import { Modal, Button, Avatar } from 'flowbite-react';
import { useAuthStore } from '@/hooks/useAuth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { Training, User } from '@/types/types';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import { avatarTheme } from '@/utils/ComponentThemes';
import { DefaultProfile } from '@/utils/Defaults';

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
	const [isLoading, setIsLoading] = useState(false);
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
		setIsLoading(true);
		if (userStore?.trainings.includes(trainingId)) {
			alert('You have already registered for this training.');
		} else {
			const updatedRegistrants = Array.isArray(training?.trainingRegistrants) ? training.trainingRegistrants : [];
			const newRegistrants = {
				registrantId: userStore.uid,
				attended: false,
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
			setIsLoading(false);
			handleRegisterTrainingClose();
			window.location.reload();
			localStorage.setItem('toastVisibility', JSON.stringify(true));
		}
	};

	const handleCancelRegistration = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		setIsLoading(true);
		if (!userStore?.trainings.includes(trainingId)) {
			alert('You are not registered for this training.');
		} else {
			const updatedRegistrants = Array.isArray(training?.trainingRegistrants) ? training.trainingRegistrants : [];

			const index = updatedRegistrants.findIndex((registrant) => registrant.registrantId === userStore.uid);

			updatedRegistrants.splice(index);

			await setDoc(
				doc(db, 'trainings', trainingId),
				{
					trainingRegistrants: updatedRegistrants,
				},
				{ merge: true }
			);

			const updatedTrainings = userStore?.trainings;
			const indexTrainings = updatedTrainings?.findIndex((training) => training === trainingId);

			updatedTrainings?.splice(indexTrainings);

			await setDoc(
				doc(db, 'users', userStore.uid),
				{
					trainings: updatedTrainings,
				},
				{ merge: true }
			);
			updateState(user);
			setIsLoading(false);
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
				{!userStore?.trainings.includes(trainingId) ? (
					<h1>
						Welcome {userStore.firstName}! To join the <span className='font-semibold'>{training?.trainingName}</span>,
						please click <span className='font-semibold text-tertiary'>Attend.</span>
					</h1>
				) : (
					<h1>
						You are registered for <span className='font-semibold'>{training?.trainingName}</span>.
						<br />
						<br />
						If you wish to cancel, please click{' '}
						<span className='font-semibold text-yellow-500'>Cancel Registration.</span>
					</h1>
				)}
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
					<Button color='light' size='sm' onClick={() => handleRegisterTrainingClose()}>
						Close
					</Button>
					{!userStore?.trainings.includes(trainingId) ? (
						<Button
							disabled={userStore?.trainings.includes(trainingId)}
							type='submit'
							className='w-fit bg-tertiary hover:bg-tertiary/70 border-none text-white'
							color='transparent'
							size='sm'
							isProcessing={isLoading}
							processingSpinner={
								<svg
									aria-hidden='true'
									className='w-4 h-4 text-white animate-spin'
									viewBox='0 0 100 101'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
										fill='#E5E7EB'
									/>
									<path
										d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
										fill='currentColor'
									/>
								</svg>
							}
							onClick={handleAttendButton}
						>
							Attend
						</Button>
					) : (
						<Button
							disabled={!userStore?.trainings.includes(trainingId)}
							type='submit'
							color='warning'
							size='sm'
							isProcessing={isLoading}
							processingSpinner={
								<svg
									aria-hidden='true'
									className='w-4 h-4 text-white animate-spin'
									viewBox='0 0 100 101'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
										fill='#E5E7EB'
									/>
									<path
										d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
										fill='currentColor'
									/>
								</svg>
							}
							onClick={handleCancelRegistration}
						>
							Cancel Registration
						</Button>
					)}
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default RegisterTrainingModal;
