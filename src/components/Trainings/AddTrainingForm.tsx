import React, { useEffect, useState } from 'react';
import { Button, Datepicker, Label, Select, Textarea, TextInput, Modal } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTrainingFormSchema, AddTrainingFormType } from '@/schemas/AddTrainingSchema';
import { collection, addDoc, doc, updateDoc, CollectionReference, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthStore } from '@/hooks/useAuth';
import { GoogleLocation, User } from '@/types/types';
import { DefaultProfile, DefaultTrainingAddress } from '@/utils/DefaultProfile';
import Autocomplete from 'react-google-autocomplete';

interface AddTrainingProps {
	addTrainingOpened: boolean;
	handleAddTrainingClose: () => void;
}

export const AddTrainingForm = ({ addTrainingOpened, handleAddTrainingClose }: AddTrainingProps) => {
	const [user, setUser] = useState<User>(DefaultProfile);
	const [isLoading, setIsLoading] = useState(false);

	const userStore = useAuthStore((state) => state.user);
	const updateState = useAuthStore((state) => state.updateUserState);
	const updateUserLatest = useAuthStore((state) => state.updateUserLatest);

	useEffect(() => {
		setUser(userStore);
	}, []);

	// Define form
	const form = useForm<AddTrainingFormType>({
		resolver: zodResolver(addTrainingFormSchema),
		mode: 'onChange',
		defaultValues: {
			trainingName: '',
			trainingCenter: '',
			trainingDate: undefined,
			trainingAddress: DefaultTrainingAddress,
			trainingDescription: '',
			trainingActivities: '',
			trainingObjectives: '',
			trainingRegistration: undefined,
			trainingCategory: 'Technical',
		},
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = form;

	const handleTrainingDate = (selectedDate: Date) => {
		if (selectedDate) {
			form.setValue('trainingDate', selectedDate);
			form.trigger('trainingDate');
		}
	};

	const handleTrainingAddress = (selectedLocation: any) => {
		if (selectedLocation) {
			const selectedFormattedAddress = selectedLocation.formatted_address;
			const selectedGeometry = JSON.parse(JSON.stringify(selectedLocation.geometry.location));
			const finalLocation: GoogleLocation = {
				formattedAddress: selectedFormattedAddress,
				geometry: selectedGeometry,
			};
			form.setValue('trainingAddress', finalLocation);
			form.trigger('trainingAddress');
		}
	};

	const resetForm = () => {
		reset(); // Reset the form to its default values
		handleAddTrainingClose(); // Close the modal
	};

	const submitAddTrainingForm = async (data: AddTrainingFormType) => {
		setIsLoading(true);
		const trainingActivitiesArray = data.trainingActivities
			.split(';')
			.map((item: string) => item.trim())
			.filter((str) => str !== '');
		const trainingObjectivesArray = data.trainingObjectives
			.split(';')
			.map((item) => item.trim())
			.filter((str) => str !== '');
		const finalPayload = {
			...data,
			trainingId: '',
			trainingRegistrants: [],
			createdBy: '',
			trainingActivities: trainingActivitiesArray,
			trainingObjectives: trainingObjectivesArray,
		};
		const trainingRef = collection(db, 'trainings');
		const trainingCreated = await addDoc(trainingRef, finalPayload);

		try {
			updateState({
				...user,
				myTrainings: [...userStore.myTrainings, trainingCreated.id],
			});
			const updateTrainingId = doc(trainingRef, trainingCreated.id);
			Promise.all([
				await updateDoc(updateTrainingId, {
					trainingId: trainingCreated.id,
					trainingRegistrants: [],
					createdBy: user.uid,
				}),
				await updateDoc(doc(collection(db, 'users'), user.uid), {
					...user,
					myTrainings: [...userStore.myTrainings, trainingCreated.id],
				}),
				await updateUserLatest(),
			])
				.then((result) => {
					console.log('success: ', result);
				})
				.catch((e) => console.error(e));
		} catch (error) {
			console.error(error);
		}

		setIsLoading(false);
		handleAddTrainingClose();
		reset();
		window.location.reload();
	};

	return (
		<Modal show={addTrainingOpened} position='center' size='4xl' onClose={() => resetForm()} popup>
			<Modal.Header>
				<span className='font-bold pl-3'>Add Training</span>
			</Modal.Header>
			<Modal.Body className='flex flex-col gap-4'>
				<form className='flex max-w-full flex-col gap-4' onSubmit={handleSubmit(submitAddTrainingForm)}>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='trainingName' value='Training Name' />
						</div>
						<TextInput
							id='trainingName'
							type='text'
							placeholder='Project Taytayan Training'
							{...register('trainingName')}
						/>
						{errors.trainingName && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.trainingName.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='trainingCenter' value='Training Center' />
						</div>
						<TextInput
							id='trainingCenter'
							type='text'
							placeholder='Project Taytayan HQ'
							{...register('trainingCenter')}
						/>
						{errors.trainingCenter && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.trainingCenter.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='trainingAddress' value='Training Address' />
						</div>
						<Autocomplete
							className='p-3 w-full inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400'
							id='trainingAddress'
							apiKey={process.env.NEXT_PUBLIC_PLACES_API_KEY}
							onPlaceSelected={(place) => {
								handleTrainingAddress(place);
							}}
							defaultValue={undefined}
							{...register('trainingAddress')}
						/>
						{errors.trainingAddress && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.trainingAddress.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='trainingDate' value='Training Date' />
						</div>
						<Datepicker
							id='trainingDate'
							minDate={new Date()}
							placeholder='Select training date'
							onSelectedDateChanged={(selectedDate) => handleTrainingDate(selectedDate)}
							{...register('trainingDate', { required: true })}
						/>
						{errors.trainingDate && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.trainingDate.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='trainingDescription' value='Training Description' />
						</div>
						<Textarea
							placeholder='Tell us about the training...'
							id='trainingDescription'
							{...register('trainingDescription')}
						/>
						{errors.trainingDescription && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>
								{errors.trainingDescription.message}
							</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='trainingActivities' value="Training Activities (Separate with ';')" />
						</div>
						<Textarea
							id='trainingActivities'
							placeholder='Activity 1; Activity 2'
							{...register('trainingActivities')}
						/>
						{errors.trainingActivities && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.trainingActivities.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='trainingObjectives' value="Training Objectives (Separate with ';')" />
						</div>
						<Textarea
							id='trainingObjectives'
							placeholder='Objective 1; Objective 2'
							{...register('trainingObjectives')}
						/>
						{errors.trainingObjectives && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.trainingObjectives.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='trainingRegistration' value='Training Registration (in PHP)' />
						</div>
						<TextInput
							id='trainingRegistration'
							type='number'
							placeholder='0.00'
							addon='₱'
							{...register('trainingRegistration', { valueAsNumber: true })}
						/>
						{errors.trainingRegistration && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>
								{errors.trainingRegistration.message}
							</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='trainingCategory' value='Training Category' />
						</div>
						<Select id='trainingCategory' {...register('trainingCategory', { required: true })}>
							<option>Technical</option>
							<option>Certification</option>
							<option>Personal</option>
							<option>Professional</option>
							<option>Vocational & Arts</option>
							<option>Other</option>
						</Select>
						{errors.trainingCategory && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.trainingCategory.message}</span>
						)}
					</div>
					<div className='flex gap-4 justify-end mt-4'>
						<Button type='button' color='red' onClick={() => resetForm()}>
							Cancel
						</Button>
						<Button
							type='submit'
							color='transparent'
							className='w-fit bg-tertiary hover:bg-opacity-60 border-none text-white'
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
							disabled={!isValid}
						>
							Submit
						</Button>
					</div>
				</form>
			</Modal.Body>
			<Modal.Footer />
		</Modal>
	);
};
function add(trainingRef: CollectionReference<DocumentData, DocumentData>, id: string) {
	throw new Error('Function not implemented.');
}
