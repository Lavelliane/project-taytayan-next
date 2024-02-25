import { Button, Datepicker, Label, Select, Textarea, TextInput, Modal } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addEventFormSchema, AddEventFormType } from '@/schemas/AddEventSchema';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Autocomplete from 'react-google-autocomplete';
import { GoogleLocation, User } from '@/types/types';
import { useAuthStore } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { DefaultProfile } from '@/utils/Defaults';

interface AddEventProps {
	addEventOpened: boolean;
	handleAddEventClose: () => void;
}

export const AddEventForm = ({ addEventOpened, handleAddEventClose }: AddEventProps) => {
	const [user, setUser] = useState<User>(DefaultProfile);

	const userStore = useAuthStore((state) => state.user);
	const updateState = useAuthStore((state) => state.updateUserState);

	useEffect(() => {
		setUser(userStore);
	}, []);
	// Define form
	const form = useForm<AddEventFormType>({
		resolver: zodResolver(addEventFormSchema),
		mode: 'onChange',
		defaultValues: {
			eventName: '',
			eventAddress: undefined,
			eventCenter: '',
			eventDate: undefined,
			eventDescription: '',
			eventCategory: '',
			eventActivities: '',
			eventObjectives: '',
			eventRegistration: undefined,
		},
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = form;

	const handleEventDate = (selectedDate: Date) => {
		if (selectedDate) {
			form.setValue('eventDate', selectedDate);
			form.trigger('eventDate');
		}
	};

	const handleEventAddress = (selectedLocation: any) => {
		if (selectedLocation) {
			const selectedFormattedAddress = selectedLocation.formatted_address;
			const selectedGeometry = JSON.parse(JSON.stringify(selectedLocation.geometry.location));
			console.log(selectedGeometry);
			const finalLocation: GoogleLocation = {
				formattedAddress: selectedFormattedAddress,
				geometry: selectedGeometry,
			};
			form.setValue('eventAddress', finalLocation);
			form.trigger('eventAddress');
		}
	};

	const resetForm = () => {
		reset(); // Reset the form to its default values
		handleAddEventClose(); // Close the modal
	};

	const submitAddEventForm = async (eventPayload: AddEventFormType) => {
		const eventActivitiesArray = eventPayload.eventActivities
			.split(';')
			.map((item: string) => item.trim())
			.filter((str) => str !== '');
		const eventObjectivesArray = eventPayload.eventObjectives
			.split(';')
			.map((item) => item.trim())
			.filter((str) => str !== '');
		const finalPayload = {
			...eventPayload,
			eventId: '',
			eventActivities: eventActivitiesArray,
			eventObjectives: eventObjectivesArray,
		};
		const networkingRef = collection(db, 'networking');
		const eventCreated = await addDoc(networkingRef, finalPayload);
		try {
			//	const docRef = doc(db, 'users', userStore.uid);
			updateState({
				...user,
				myTrainings: [...userStore.myTrainings, eventCreated.id],
			});
			const updateEventId = doc(networkingRef, eventCreated.id);
			await updateDoc(updateEventId, { eventId: eventCreated.id });
		} catch (error) {
			console.log(error);
		}
		handleAddEventClose();
		reset();
	};

	return (
		<Modal show={addEventOpened} position='center' size='4xl' onClose={() => resetForm()} popup>
			<Modal.Header>
				<span className='font-bold pl-3'>Add Networking Event</span>
			</Modal.Header>
			<Modal.Body className='flex flex-col gap-4'>
				<form className='flex max-w-full flex-col gap-4' onSubmit={handleSubmit(submitAddEventForm)}>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='eventName' value='Event Name' />
						</div>
						<TextInput
							id='eventName'
							type='text'
							placeholder='Project Taytayan Networking Event'
							{...register('eventName')}
						/>
						{errors.eventName && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.eventName.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='eventCenter' value='Event Center' />
						</div>
						<TextInput id='eventCenter' type='text' placeholder='Project Taytayan HQ' {...register('eventCenter')} />
						{errors.eventCenter && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.eventCenter.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='eventAddress' value='Event Address' />
						</div>
						<Autocomplete
							className='p-3 w-full inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400'
							id='eventAddress'
							apiKey={process.env.NEXT_PUBLIC_PLACES_API_KEY}
							onPlaceSelected={(place) => {
								handleEventAddress(place);
							}}
							defaultValue={undefined}
							{...register('eventAddress')}
						/>
						{errors.eventAddress && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.eventAddress.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='eventDate' value='Event Date' />
						</div>
						<Datepicker
							id='eventDate'
							minDate={new Date()}
							placeholder='Select event date'
							onSelectedDateChanged={(selectedDate) => handleEventDate(selectedDate)}
							{...register('eventDate', { required: true })}
						/>
						{errors.eventDate && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.eventDate.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='eventDescription' value='Event Description' />
						</div>
						<Textarea id='trainingDescription' {...register('eventDescription')} />
						{errors.eventDescription && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.eventDescription.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='eventActivities' value="Event Activities (Separate with ';')" />
						</div>
						<Textarea id='eventActivities' placeholder='Activity 1; Activity 2' {...register('eventActivities')} />
						{errors.eventActivities && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.eventActivities.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='eventObjectives' value="Event Objectives (Separate with ';')" />
						</div>
						<Textarea id='eventObjectives' placeholder='Objective 1; Objective 2' {...register('eventObjectives')} />
						{errors.eventObjectives && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.eventObjectives.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='eventRegistration' value='Event Registration (in PHP)' />
						</div>
						<TextInput
							id='trainingRegistration'
							type='number'
							placeholder='0.00'
							addon='₱'
							{...register('eventRegistration', { valueAsNumber: true })}
						/>
						{errors.eventRegistration && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.eventRegistration.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='eventCategory' value='Event Category' />
						</div>
						<Select id='eventCategory' {...register('eventCategory', { required: true })}>
							<option>Technical</option>
							<option>Certification</option>
							<option>Personal</option>
							<option>Professional</option>
							<option>Vocational & Arts</option>
							<option>Other</option>
						</Select>
						{errors.eventCategory && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.eventCategory.message}</span>
						)}
					</div>
					<Button type='submit' disabled={!isValid}>
						Submit
					</Button>
				</form>
			</Modal.Body>
		</Modal>
	);
};
