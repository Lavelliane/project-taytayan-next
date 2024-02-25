import React, { useState, useEffect } from 'react';
import { AddEmploymentFormType, addEmploymentFormSchema } from '@/schemas/AddEmploymentSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultEmployment, DefaultProfile, DefaultEmploymentAddress } from '@/utils/Defaults';
import { Button, Datepicker, Label, Select, Textarea, TextInput } from 'flowbite-react';
import { useAuthStore } from '@/hooks/useAuth';
import { GoogleLocation, User } from '@/types/types';
import Autocomplete from 'react-google-autocomplete';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const PostJobForm = () => {
	const [user, setUser] = useState<User>(DefaultProfile);
	const [isLoading, setIsLoading] = useState(false);

	const userStore = useAuthStore((state) => state.user);
	const updateState = useAuthStore((state) => state.updateUserState);
	const updateUserLatest = useAuthStore((state) => state.updateUserLatest);

	useEffect(() => {
		setUser(userStore);
	}, []);

	const handleEmploymentAddress = (selectedLocation: any) => {
		if (selectedLocation) {
			const selectedFormattedAddress = selectedLocation.formatted_address;
			const selectedGeometry = JSON.parse(JSON.stringify(selectedLocation.geometry.location));
			const finalLocation: GoogleLocation = {
				formattedAddress: selectedFormattedAddress,
				geometry: selectedGeometry,
			};
			form.setValue('employmentAddress', finalLocation);
			form.trigger('employmentAddress');
		}
	};

	const resetForm = () => {
		reset(); // Reset the form to its default values
	};

	const submitPostJobForm = async (data: AddEmploymentFormType) => {
		setIsLoading(true);
		const contactInformation = data.employmentContactInformation
			.split(';')
			.map((item: string) => item.trim())
			.filter((str) => str !== '');

		const keyRoles = data.employmentKeyRoles
			.split(';')
			.map((item) => item.trim())
			.filter((str) => str !== '');

		const finalPayload = {
			...data,
			employmentId: '',
			employmentApplicants: [],
			employmentContactInformation: contactInformation,
			employmentKeyRoles: keyRoles,
			employmentDatePosted: new Date(),
			displayJob: true,
		};
		const employmentRef = collection(db, 'employment');
		const employmentCreated = await addDoc(employmentRef, finalPayload);

		try {
			updateState({
				...user,
				jobsPosted: [...userStore.jobsPosted, employmentCreated.id],
			});
			const updateEmploymentId = doc(employmentRef, employmentCreated.id);

			Promise.all([
				await updateDoc(updateEmploymentId, {
					employmentId: employmentCreated.id,
					employmentApplicants: [],
				}),
				await updateDoc(doc(collection(db, 'users'), user.uid), {
					...user,
					jobsPosted: [...user.jobsPosted, employmentCreated.id],
				}),
				await updateUserLatest(),
			])
				.then((result) => {
					console.log('success: ', result);
				})
				.catch((e) => console.error(e));
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
		reset();
		window.location.reload();
	};

	// Define form
	const form = useForm<AddEmploymentFormType>({
		resolver: zodResolver(addEmploymentFormSchema),
		mode: 'onChange',
		defaultValues: {
			employmentTitle: '',
			employmentDescription: '',
			employmentCompany: '',
			employmentCompanyDescription: '',
			employmentContactInformation: '',
			employmentAddress: DefaultEmploymentAddress,
			employmentType: 'Full-time',
			employmentLocationType: 'On-site',
			employmentDatePosted: undefined,
			employmentKeyRoles: '',
			employmentEducation: '',
			employmentExperience: '',
			employmentInstructions: '',
			employmentBenefits: '',
		},
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = form;

	return (
		<form className='flex max-w-full w-full flex-col gap-4' onSubmit={handleSubmit(submitPostJobForm)}>
			<h1 className='font-semibold text-lg'>Job Posting Information</h1>
			<div className='flex flex-col lg:flex-row gap-4 w-full'>
				<div className='w-full flex flex-col gap-4'>
					<div className='w-full'>
						<div className='mb-2 block'>
							<Label htmlFor='employmentTitle' value='Job Title' />
						</div>
						<TextInput
							id='employmentTitle'
							type='text'
							placeholder='What is the job title?'
							{...register('employmentTitle')}
						/>
						{errors.employmentTitle && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.employmentTitle.message}</span>
						)}
					</div>
					<div className='w-full'>
						<div className='mb-2 block'>
							<Label htmlFor='employmentDescription' value='Job Description' />
						</div>
						<Textarea
							placeholder='Tell us about the job...'
							id='trainingDescription'
							{...register('employmentDescription')}
						/>
						{errors.employmentDescription && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>
								{errors.employmentDescription.message}
							</span>
						)}
					</div>
				</div>
				<div className='w-full flex flex-col gap-4'>
					<div className='w-full'>
						<div className='mb-2 block'>
							<Label htmlFor='employmentCompany' value='Company Name' />
						</div>
						<TextInput
							id='employmentCompany'
							type='text'
							placeholder='What is the company/organization name?'
							{...register('employmentCompany')}
						/>
						{errors.employmentCompany && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.employmentCompany.message}</span>
						)}
					</div>
					<div className='w-full'>
						<div className='mb-2 block'>
							<Label htmlFor='employmentCompanyDescription' value='Company Description' />
						</div>
						<Textarea
							placeholder='Tell us about the company/organization...'
							id='employmentCompanyDescription'
							{...register('employmentCompanyDescription')}
						/>
						{errors.employmentCompanyDescription && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>
								{errors.employmentCompanyDescription.message}
							</span>
						)}
					</div>
				</div>
			</div>
			<div>
				<div className='mb-2 block'>
					<Label htmlFor='employmentContactInformation' value='Contact Information (Separate with ";")' />
				</div>
				<TextInput
					id='employmentContactInformation'
					type='text'
					placeholder='E-mail Address; Phone Number; Telephone Number'
					{...register('employmentContactInformation')}
				/>
				{errors.employmentContactInformation && (
					<span className='text-xs lg:text-sm text-red-600 font-semibold'>
						{errors.employmentContactInformation.message}
					</span>
				)}
			</div>
			<div className='flex gap-4 w-full lg:flex-row flex-col'>
				<div className='w-full'>
					<div className='mb-2 block'>
						<Label htmlFor='employmentAddress' value='Job Address' />
					</div>
					<Autocomplete
						className='p-3 w-full inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400'
						id='employmentAddress'
						apiKey={process.env.NEXT_PUBLIC_PLACES_API_KEY}
						onPlaceSelected={(place) => {
							handleEmploymentAddress(place);
						}}
						defaultValue={undefined}
						{...register('employmentAddress')}
					/>
					{errors.employmentAddress && (
						<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.employmentAddress.message}</span>
					)}
				</div>
				{/* <div className='w-full'>
					<div className='mb-2 block'>
						<Label htmlFor='employmentDatePosted' value='Job Posting Date' />
					</div>
					<Datepicker
						id='employmentDatePosted'
						minDate={new Date()}
						placeholder='Select training date'
						onSelectedDateChanged={(selectedDate) => handleEmploymentDate(selectedDate)}
						{...register('employmentDatePosted', { required: true })}
					/>
					{errors.employmentDatePosted && (
						<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.employmentDatePosted.message}</span>
					)}
				</div> */}
			</div>
			<div className='flex gap-4 w-full lg:flex-row flex-col'>
				<div className='w-full'>
					<div className='mb-2 block'>
						<Label htmlFor='employmentType' value='Job Type' />
					</div>
					<Select id='employmentType' {...register('employmentType', { required: true })}>
						<option>Full-time</option>
						<option>Part-time</option>
						<option>Contract</option>
					</Select>
					{errors.employmentType && (
						<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.employmentType.message}</span>
					)}
				</div>
				<div className='w-full'>
					<div className='mb-2 block'>
						<Label htmlFor='employment' value='Training Category' />
					</div>
					<Select id='employmentLocationType' {...register('employmentLocationType', { required: true })}>
						<option>On-site</option>
						<option>Work-from-home</option>
						<option>Hybrid</option>
					</Select>
					{errors.employmentLocationType && (
						<span className='text-xs lg:text-sm text-red-600 font-semibold'>
							{errors.employmentLocationType.message}
						</span>
					)}
				</div>
			</div>
			<div className='flex flex-col lg:flex-row gap-4 w-full'>
				<div className='w-full'>
					<div className='mb-2 block'>
						<Label htmlFor='employmentKeyRoles' value="Job Key Roles/Responsibilities (Separate with ';')" />
					</div>
					<Textarea id='trainingActivities' placeholder='Key Role 1; Key Role 2' {...register('employmentKeyRoles')} />
					{errors.employmentKeyRoles && (
						<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.employmentKeyRoles.message}</span>
					)}
				</div>
				<div className='w-full'>
					<div className='mb-2 block'>
						<Label htmlFor='employmentBenefits' value='Job Benefits (optional)' />
					</div>
					<Textarea
						id='employmentBenefits'
						placeholder='What benefits will they have?'
						{...register('employmentBenefits')}
					/>
					{errors.employmentBenefits && (
						<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.employmentBenefits.message}</span>
					)}
				</div>
			</div>
			<div className='flex flex-col lg:flex-row gap-4 w-full'>
				<div className='w-full'>
					<div className='mb-2 block'>
						<Label htmlFor='employmentEducation' value='Education Requirement (optional)' />
					</div>
					<Textarea
						id='employmentEducation'
						placeholder='What is the required educational attainment?'
						{...register('employmentEducation')}
					/>
					{errors.employmentEducation && (
						<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.employmentEducation.message}</span>
					)}
				</div>
				<div className='w-full'>
					<div className='mb-2 block'>
						<Label htmlFor='employmentExperience' value='Experience (optional)' />
					</div>
					<Textarea
						id='employmentExperience'
						placeholder='What experiences are required?'
						{...register('employmentExperience')}
					/>
					{errors.employmentExperience && (
						<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.employmentExperience.message}</span>
					)}
				</div>
			</div>
			<div>
				<div className='mb-2 block'>
					<Label htmlFor='employmentInstructions' value='Employment Instructions' />
				</div>
				<Textarea
					id='employmentInstructions'
					placeholder='What procedures do they need to follow?'
					{...register('employmentInstructions')}
				/>
				{errors.employmentInstructions && (
					<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.employmentInstructions.message}</span>
				)}
			</div>

			<div>
				<div className='mb-2 block'>
					<Label htmlFor='employmentSalary' value='Salary Range in PHP (optional)' />
				</div>
				<TextInput
					id='employmentSalary'
					type='text'
					placeholder='What is the salary range for the job?'
					{...register('employmentSalary')}
				/>
				{errors.employmentSalary && (
					<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.employmentSalary.message}</span>
				)}
			</div>

			<div className='flex gap-4 justify-end mt-4'>
				<Button type='button' color='red' onClick={() => resetForm()}>
					Reset
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
	);
};

export default PostJobForm;
