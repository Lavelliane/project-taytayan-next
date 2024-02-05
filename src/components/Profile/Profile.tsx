'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Card, CustomFlowbiteTheme } from 'flowbite-react';
import Link from 'next/link';
import CertTrainingCard from './CertTrainingCard';
import CertEventCard from './CertEventCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthStore } from '@/hooks/useAuth';
import { Training, User, NetworkingEvent } from '@/types/types';
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
	const [event, setEvent] = useState<NetworkingEvent[]>([]);
	const [trainingsCompleted, setTrainingsCompleted] = useState<number>(0);

	const user = useAuthStore<User>((state) => state.user);
	const updateUserLatest = useAuthStore((state) => state.updateUserLatest);

	useEffect(() => {
		updateUserLatest();
	}, []);

	useEffect(() => {
		fetchEvents();
		fetchTrainings();
	}, []);

	console.log(event);

	const fetchTrainings = async () => {
		if (user && user.trainings.length > 0) {
			const trainingRef = query(collection(db, 'trainings'), where('trainingId', 'in', user.trainings));

			try {
				const trainingDoc = await getDocs(trainingRef);
				const trainingData = trainingDoc.docs.map((doc) => doc.data()) as Training[];

				let fetchedTraining: Training[] = trainingData;

				trainingData.forEach((tr, index) => {
					if (tr.trainingRegistrants.find(({ registrantId }) => registrantId === user.uid)?.attended) {
						fetchedTraining.splice(index);
					}
				});
				console.log(trainingData);
				console.log(fetchedTraining);
				setTraining(fetchedTraining);

				// // Calculate the number of completed trainings
				// const completedTrainingsCount = trainingData.reduce((count, training) => {
				// 	const attendedRegistrants = training.trainingRegistrants.filter((registrant) => registrant.attended === true);
				// 	return attendedRegistrants.length > 0 ? count + 1 : count;
				// }, 0);

				// setTrainingsCompleted(completedTrainingsCount);
			} catch (error) {
				console.error('Error fetching trainings:', error);
			}
		}
	};

	const fetchEvents = async () => {
		if (user && user.eventsJoined.length > 0) {
			const eventRef = query(collection(db, 'networking'), where('eventId', 'in', user.eventsJoined));

			try {
				const eventDoc = await getDocs(eventRef);
				const eventData = eventDoc.docs.map((doc) => doc.data()) as NetworkingEvent[];

				setEvent(eventData);
			} catch (error) {
				console.error('Error fetching events:', error);
			}
		}
	};

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
				<div className='px-10 w-full h-fit absolute lg:top-16 top-6 flex lg:flex-row flex-col lg:items-end items-center lg:justify-between'>
					<div className='flex lg:flex-row flex-col lg:gap-6 gap-2 lg:items-end items-center'>
						<UserAvatar
							firstName={user?.firstName}
							lastName={user?.lastName}
							avatarURL={user?.avatarURL}
							role={user?.role}
							size='xl'
						/>
						<div className='flex flex-col lg:text-start text-center'>
							<h1 className='font-bold lg:text-lg md:text-base text-sm'>
								{user.firstName + ' ' + user.lastName}&nbsp;
								<span className='text-xs font-normal'>({user.pronoun})</span>
							</h1>
							<h2 className='text-gray-700 lg:text-base md:text-sm text-xs'>{user.location}</h2>
							<h2 className='text-[#FDBC09] font-semibold lg:text-base md:text-sm text-xs'>{user.occupation}</h2>
						</div>
					</div>
					<Link
						href='/profile/edit'
						className='lg:mt-8 mt-2 px-3 py-2 text-xs font-medium text-center text-gray-900 rounded-full border border-gray-400 hover:bg-gray-400 focus:ring-1 focus:outline-none focus:ring-gray-400  dark:hover:bg-gray-400 dark:focus:ring-gray-400'
					>
						Edit Profile
					</Link>
				</div>
			</div>
			<div className='flex lg:flex-row flex-col w-full h-fit my-10 xl:gap-20 gap-10 lg:mt-10 mt-20'>
				<div className='flex w-full flex-col gap-6'>
					<h1 className='font-semibold xl:text-lg md:text-base text-sm'>About Me</h1>
					<p className='xl:text-base md:text-sm text-xs'>{user.aboutMe}</p>
					<h5 className='text-sm text-gray-900 dark:text-gray-400'>
						<span className='font-semibold xl:text-lg md:text-base text-sm'>Skills</span>
						<br />
						<span className='flex flex-wrap gap-2 mt-1'>
							{user.skills.map((skill) => (
								<span
									className='font-normal px-2 py-1 border border-gray-500 rounded-full lg:text-sm text-xs'
									key={skill}
								>
									{skill}
									<br />
								</span>
							))}
						</span>
					</h5>
				</div>

				<Card href='#' className='lg:max-w-2xl lg:w-[42rem] w-full h-fit ml-auto'>
					<h5 className='text-sm text-gray-900 dark:text-gray-400'>
						<span className='font-semibold xl:text-lg md:text-base text-sm'>Email</span>
						<br />
						<span className='xl:text-base md:text-sm text-xs'>{user.email}</span>
					</h5>
					<h5 className='text-sm text-gray-900 dark:text-gray-400'>
						<span className='font-semibold xl:text-lg md:text-base text-sm'>Education</span>
						<br />
						<span className='font-semibold xl:text-base md:text-sm text-xs'>{user.school}</span>
						<br />
						<span className='xl:text-base md:text-sm text-xs'>{user.course}</span>
					</h5>
					<h5 className='text-sm text-gray-900 dark:text-gray-400'>
						<span className='font-semibold xl:text-lg md:text-base text-sm'>Industry</span>
						<br />
						<span className='xl:text-base md:text-sm text-xs'>{user.industry}</span>
					</h5>
					<h5 className='text-sm text-gray-900 dark:text-gray-400'>
						<span className='font-semibold xl:text-lg md:text-base text-sm'>Interest</span>
						<br />

						<span className='flex flex-wrap gap-2 mt-1'>
							{user.interest.map((interest) => (
								<span
									className='font-normal px-2 py-1 border border-gray-500 rounded-full lg:text-sm text-xs'
									key={interest}
								>
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
				<div className='px-4 py-1 bg-[#00AAFF] rounded-full w-fit font-semibold text-white'>
					<span className='font-semibold xl:text-base md:text-sm text-xs'>Trainings Completed&nbsp;&nbsp;&nbsp;</span>
					<span className='font-semibold xl:text-base md:text-sm text-xs'>{training.length}</span>
				</div>
				<div className='px-4 py-1 bg-[#00AAFF] rounded-full w-fit font-semibold text-white'>
					<span className='font-semibold xl:text-base md:text-sm text-xs'>Events&nbsp;&nbsp;&nbsp;</span>
					<span className='font-semibold xl:text-base md:text-sm text-xs'>{event.length}</span>
				</div>
			</div>
			<div className='mt-6 flex flex-col gap-4'>
				<h1 className='font-semibold xl:text-lg md:text-base text-sm'>Trainings & Certifications</h1>
				<div className='flex flex-wrap gap-6'>
					{user.trainings.map((tr, index) => (
						<div key={training[index]?.trainingId}>
							{training[index] ? <CertTrainingCard trainings={training[index]} /> : null}
						</div>
					))}
				</div>
			</div>
			<div className='mt-6 flex flex-col gap-4'>
				<h1 className='font-semibold xl:text-lg md:text-base text-sm'>Events Joined</h1>
				<div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
					{user?.eventsJoined?.map((ev, index) => (
						<div key={event[index]?.eventId}>{event[index] && <CertEventCard Events={event[index]} />}</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default Profile;
