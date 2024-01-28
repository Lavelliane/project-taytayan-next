'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Avatar, Card, CustomFlowbiteTheme } from 'flowbite-react';
import Link from 'next/link';
import TrainingsCard from './TrainingsCard';
import EventsCard from './EventsCard';
import avatar from '../../../public/assets/avatar.png';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthStore } from '@/hooks/useAuth';
import { Training, User } from '@/types/types';
import UserAvatar from './UserAvatar';

const avatarTheme: CustomFlowbiteTheme['avatar'] = {
	root: {
		bordered: 'p-1 ring-2',
		color: {
			info: 'ring-tertiary',
		},
		initials: {
			text: 'text-5xl',
		},
	},
};

const Profile = () => {
	const [training, setTraining] = useState<Training[]>([]);
	const [trainingsCompleted, setTrainingsCompleted] = useState<number>(0);

	const user = useAuthStore<User>((state) => state.user);
	const updateUserLatest = useAuthStore((state) => state.updateUserLatest);

	useEffect(() => {
		updateUserLatest();
		console.log(user);
	}, []);

	useEffect(() => {
		fetchTrainings();
	}, []);

	const fetchTrainings = async () => {
		if (user) {
			const trainingRef = query(collection(db, 'trainings'), where('trainingId', 'in', user.trainings));

			try {
				const trainingDoc = await getDocs(trainingRef);
				const trainingData = trainingDoc.docs.map((doc) => doc.data()) as Training[];

				setTraining(trainingData);

				// Calculate the number of completed trainings
				const completedTrainingsCount = trainingData.reduce((count, training) => {
					const attendedRegistrants = training.trainingRegistrants.filter((registrant) => registrant.attended === true);
					return attendedRegistrants.length > 0 ? count + 1 : count;
				}, 0);

				setTrainingsCompleted(completedTrainingsCount);
			} catch (error) {
				console.error('Error fetching trainings:', error);
			}
		}
	};

	const events = user?.eventsJoined.length ?? 0;

	let nameInitials = '';

	if (user && user.firstName && user.lastName) {
		nameInitials = user?.firstName.charAt(0) + user?.lastName.charAt(0);
	}

	const checkAttendance = (index: number) => {
		return training[index]?.trainingRegistrants[
			training[index].trainingRegistrants.findIndex((id) => id.registrantId === user.uid)
		].attended;
	};

	return (
		<main className='h-fit w-full'>
			<div className='flex flex-col w-full h-52 relative'>
				<div className='absolute w-full h-32 bg-[#9B5FFC] rounded-lg'></div>
				<div className='px-10 w-full h-fit z-10 absolute bottom-0 flex sm:flex-row flex-col items-center justify-between'>
					<div className='flex gap-6 items-end '>
						<UserAvatar
							firstName={user?.firstName}
							lastName={user?.lastName}
							avatarURL={user?.avatarURL}
							role={user?.role}
							size='xl'
						/>
						<div className='flex flex-col '>
							<h1 className='text-xl font-bold'>
								{user.firstName + ' ' + user.lastName}&nbsp;
								<span className='text-xs font-normal'>({user.pronoun})</span>
							</h1>
							<h2 className='text-gray-700'>{user.location}</h2>
							<h2 className='text-[#FDBC09] font-semibold'>{user.occupation}</h2>
						</div>
					</div>
					<Link
						href='/profile/edit'
						className='mt-8 px-3 py-2 text-xs font-medium text-center text-gray-900 rounded-full border border-gray-400 hover:bg-gray-400 focus:ring-1 focus:outline-none focus:ring-gray-400  dark:hover:bg-gray-400 dark:focus:ring-gray-400'
					>
						Edit Profile
					</Link>
				</div>
			</div>
			<div className='flex w-full h-fit my-10 gap-20'>
				<div className='flex w-full flex-col gap-6'>
					<h1 className='font-semibold text-lg'>About Me</h1>
					<p>{user.aboutMe}</p>
					<h5 className='text-sm text-gray-900 dark:text-gray-400'>
						<span className='font-semibold'>Skills</span>
						<br />
						<span className='flex flex-wrap gap-2 mt-1'>
							{user.skills.map((skill) => (
								<span className='font-normal px-2 py-1 border border-gray-500 rounded-full' key={skill}>
									{skill}
									<br />
								</span>
							))}
						</span>
					</h5>
				</div>

				<Card href='#' className='max-w-2xl w-[42rem] h-fit ml-auto'>
					<h5 className='text-sm text-gray-900 dark:text-gray-400'>
						<span className='font-semibold'>Email</span>
						<br />
						{user.email}
					</h5>
					<h5 className='text-sm text-gray-900 dark:text-gray-400'>
						<span className='font-semibold'>Education</span>
						<br />
						<span className='font-semibold'>{user.school}</span>
						<br />
						{user.course}
					</h5>
					<h5 className='text-sm text-gray-900 dark:text-gray-400'>
						<span className='font-semibold'>Industry</span>
						<br />
						{user.industry}
					</h5>
					<h5 className='text-sm text-gray-900 dark:text-gray-400'>
						<span className='font-semibold'>Interest</span>
						<br />
						<span className='flex flex-wrap gap-2 mt-1'>
							{user.interest.map((interest) => (
								<span className='font-normal px-2 py-1 border border-gray-500 rounded-full' key={interest}>
									{interest}
									<br />
								</span>
							))}
						</span>
					</h5>
				</Card>
			</div>
			<div className='min-w-full w-full h-[1px] bg-gray-400 mb-4'></div>
			<div className='flex gap-4'>
				<div className='px-4 py-1 bg-[#00AAFF] rounded-full w-fit text-sm font-semibold text-white'>
					<span>Trainings Completed&nbsp;&nbsp;&nbsp;</span>
					<span>{trainingsCompleted}</span>
				</div>
				<div className='px-4 py-1 bg-[#00AAFF] rounded-full w-fit text-sm font-semibold text-white'>
					<span>Events&nbsp;&nbsp;&nbsp;</span>
					<span>{events}</span>
				</div>
			</div>
			<div className='mt-6 flex flex-col gap-4'>
				<h1 className='font-semibold text-lg'>Trainings & Certifications</h1>
				<div className='flex flex-wrap gap-6'>
					{user.trainings.map((tr, index) => (
						<div key={training[index]?.trainingId}>
							{checkAttendance(index) ? <TrainingsCard trainings={training[index]} /> : null}
						</div>
					))}
				</div>
			</div>
			<div className='mt-6 flex flex-col gap-4'>
				<h1 className='font-semibold text-lg'>Events Joined</h1>
				<div className='flex flex-wrap gap-6'>
					<EventsCard />
					<EventsCard />
					<EventsCard />
				</div>
			</div>
		</main>
	);
};

export default Profile;
