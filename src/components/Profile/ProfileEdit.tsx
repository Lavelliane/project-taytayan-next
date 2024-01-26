'use client';
import Image from 'next/image';
import React, { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import { User } from '@/types/types';
import { DefaultProfile } from '@/utils/DefaultProfile';
import Multiselect from 'multiselect-react-dropdown';
import { skillOptions, interestOptions } from '@/utils/Options';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import avatar from '../../../public/assets/avatar.png';
import { doc, updateDoc } from 'firebase/firestore';

const ProfileEdit = () => {
	const [user, setUser] = useState<User>(DefaultProfile);

	const userStore = useAuthStore((state: { user: User }) => state.user);
	const updateState = useAuthStore((state) => state.updateUserState);

	useEffect(() => {
		setUser(userStore);
	}, []);

	const handleOnChange: any = (event: ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const handleOnSubmit = async (event: any) => {
		event.preventDefault();

		try {
			const docRef = doc(db, 'users', userStore.uid);
			await updateDoc(docRef, user);
			await updateState(user);

			console.log(user);

			window.location.href = '/profile';
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form className='h-fit w-full lg:p-0 p-4'>
			<div className='flex flex-col w-full lg:h-52 relative'>
				<div className='absolute w-full h-32 bg-[#9B5FFC] rounded-lg'></div>
				<div className='lg:px-10 w-full h-fit z-10 lg:absolute sm:bottom-0 flex lg:flex-row flex-col items-center justify-between'>
					<div className='flex lg:flex-row flex-col lg:gap-6 items-center lg:items-end'>
						<Image
							src={user.avatarURL || avatar}
							alt='Profile'
							width={200}
							height={200}
							className='rounded-full'
							style={{ width: 'auto', height: '140px', objectFit: 'fill' }}
						/>
						<div className='flex flex-col'>
							<h1 className='text-xl font-bold'>Profile</h1>
							<h2 className='text-gray-700'>Upload your photo and personal details</h2>
						</div>
					</div>
					<div className='flex gap-4'>
						<Link
							href='/profile'
							className='mt-8 px-3 py-2 text-xs font-medium text-center text-gray-900 rounded-full border border-gray-400 hover:bg-gray-400 focus:ring-1 focus:outline-none focus:ring-gray-400  dark:hover:bg-gray-400 dark:focus:ring-gray-400'
						>
							Cancel
						</Link>
						<button
							onClick={handleOnSubmit}
							type='submit'
							className='bg-gray-700 mt-8 px-3 py-2 text-xs font-medium text-center text-white rounded-full border border-gray-600 hover:bg-gray-600 focus:ring-1 focus:outline-none focus:ring-gray-600  dark:hover:bg-gray-600 dark:focus:ring-gray-600'
						>
							Save
						</button>
					</div>
				</div>
			</div>
			<div className='flex w-full flex-col gap-6 md:m-14 m-0'>
				<h1 className='font-semibold text-lg'>Basic Info</h1>
				<div className='flex flex-col max-w-xl w-full gap-6'>
					<div className='w-full flex items-center gap-4'>
						<label htmlFor='firstName' className='text-sm font-semibold w-1/4'>
							First Name
						</label>
						<input
							type='text'
							name='firstName'
							id='firstName'
							placeholder={'e.g. Juan'}
							value={user.firstName || ''}
							onChange={handleOnChange}
							className='focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						/>
					</div>
					<div className='w-full flex items-center gap-4'>
						<label htmlFor='lastName' className='text-sm font-semibold w-1/4'>
							Last Name
						</label>
						<input
							type='text'
							name='lastName'
							id='lastName'
							placeholder={'e.g. Cruz'}
							value={user.lastName || ''}
							onChange={handleOnChange}
							className='focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						/>
					</div>
					<div className='w-full flex items-center gap-4'>
						<label htmlFor='location' className='text-sm font-semibold w-1/4'>
							Address
						</label>
						<input
							type='text'
							name='location'
							id='location'
							placeholder={'Street/Brgy/City/Province/Country'}
							value={user.location || ''}
							onChange={handleOnChange}
							className='focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						/>
					</div>
					<div className='w-full flex items-center gap-4'>
						<label htmlFor='occupation' className='text-sm font-semibold w-1/4'>
							Occupation
						</label>
						<input
							type='text'
							name='occupation'
							id='occupation'
							placeholder={'e.g. Construction Worker'}
							value={user.occupation || ''}
							onChange={handleOnChange}
							className='focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						/>
					</div>
					<div className='w-full flex items-center gap-4'>
						<label htmlFor='pronoun' className='text-sm font-semibold w-1/4'>
							Pronoun
						</label>
						<select
							id='pronoun'
							name='pronoun'
							value={user.pronoun}
							onChange={handleOnChange}
							className='focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						>
							<option value='He/Him'>He/Him</option>
							<option value='She/Her'>She/Her</option>
							<option value='They/Them'>They/Them</option>
						</select>
					</div>
				</div>
			</div>
			<div className='flex w-full flex-col gap-6 md:m-14 m-0'>
				<h1 className='font-semibold text-lg'>About Me</h1>
				<div className='flex flex-col max-w-xl w-full gap-6'>
					<div className='w-full flex flex-col items-start gap-4'>
						<label htmlFor='aboutMe' className='text-sm font-semibold'>
							Bio
						</label>
						<textarea
							name='aboutMe'
							id='aboutMe'
							placeholder={'Tell us about yourself...'}
							value={user.aboutMe || ''}
							onChange={handleOnChange}
							className='focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4 h-32 resize-none'
						/>
					</div>
					<div>
						<label htmlFor='skills' className='text-sm font-semibold'>
							Skills
						</label>
						<p className='text-sm text-gray-600'>Add skills to display your experience</p>
						<Multiselect
							id='skills'
							selectedValues={user.skills}
							onSelect={(selectedList, selectedItem) => setUser({ ...user, skills: selectedList })}
							onRemove={(selectedList, removedItem) => setUser({ ...user, skills: selectedList })}
							customCloseIcon={
								<svg
									className='hover:text-gray-600 hover:cursor-pointer ml-1 w-4 h-4 text-gray-800 dark:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z' />
								</svg>
							}
							className='shadow-sm mt-4'
							style={{
								chips: { background: '#DBDEE3', color: '#000000', margin: '8px 4px 2px 4px' },
								searchBox: { border: '1px solid #DBDEE3', borderRadius: '6px', padding: '0px 10px 4px 10px' },
							}}
							isObject={false}
							options={skillOptions.sort((a, b) => a.localeCompare(b))}
							placeholder=''
						/>
					</div>
				</div>
			</div>
			<div className='flex w-full flex-col gap-6 md:m-14 m-0'>
				<h1 className='font-semibold text-lg'>Additional Information</h1>
				<div className='flex flex-col max-w-xl w-full gap-6'>
					<div className='w-full flex items-center gap-4'>
						<label htmlFor='email' className='text-sm font-semibold w-1/4'>
							Email
						</label>
						<input
							type='email'
							name='email'
							id='email'
							placeholder={'e.g. juancruz@gmail.com'}
							value={user.email || ''}
							onChange={handleOnChange}
							className='focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						/>
					</div>
					<div className='w-full flex items-center gap-4'>
						<label htmlFor='school' className='text-sm font-semibold w-1/4'>
							School
						</label>
						<input
							type='text'
							name='school'
							id='school'
							placeholder={'Enter school if applicable'}
							value={user.school || ''}
							onChange={handleOnChange}
							className='focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						/>
					</div>
					<div className='w-full flex items-center gap-4'>
						<label htmlFor='course' className='text-sm font-semibold w-1/4'>
							Course
						</label>
						<input
							type='text'
							name='course'
							id='course'
							placeholder={'Enter course if applicable'}
							value={user.course || ''}
							onChange={handleOnChange}
							className='focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						/>
					</div>
					<div className='w-full flex items-center gap-4'>
						<label htmlFor='industry' className='text-sm font-semibold w-1/4'>
							Industry
						</label>
						<input
							type='text'
							name='industry'
							id='industry'
							placeholder={'Enter workplace if applicable'}
							value={user.industry || ''}
							onChange={handleOnChange}
							className='focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
						/>
					</div>
					<div>
						<label htmlFor='interest' className='text-sm font-semibold'>
							Interests
						</label>
						<p className='text-sm text-gray-600'>Tell us about your hobbies and passions</p>
						<Multiselect
							id='interest'
							selectedValues={user.interest}
							onSelect={(selectedList, selectedItem) => setUser({ ...user, interest: selectedList })}
							onRemove={(selectedList, removedItem) => setUser({ ...user, interest: selectedList })}
							customCloseIcon={
								<svg
									className='hover:text-gray-600 hover:cursor-pointer ml-1 w-4 h-4 text-gray-800 dark:text-white'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z' />
								</svg>
							}
							className='shadow-sm mt-4'
							style={{
								chips: { background: '#DBDEE3', color: '#000000', margin: '8px 4px 2px 4px' },
								searchBox: { border: '1px solid #DBDEE3', borderRadius: '6px', padding: '0px 10px 4px 10px' },
							}}
							isObject={false}
							options={interestOptions.sort((a, b) => a.localeCompare(b))}
							placeholder=''
						/>
					</div>
				</div>
			</div>
		</form>
	);
};

export default ProfileEdit;
