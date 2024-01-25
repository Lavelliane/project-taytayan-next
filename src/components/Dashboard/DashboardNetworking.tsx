'use client';

import React, { useState, useEffect } from 'react';
import { CategoryBadge } from '../Trainings/CategoryBadge';
import { CategoryDropdown } from '../Trainings/CategoryDropdown';
import { NetworkingEventCard } from '@/components/Networking/NetworkingEventCard';
import { NetworkingEvent } from '@/types/types';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';

export const DashboardNetworking = () => {
	const defaultSelectedCategories = [
		'technical',
		'certification',
		'personal',
		'professional',
		'vocational & arts',
		'other',
	]; // Define defaults

	const userStore = useAuthStore((state) => state.user);

	const [networkingEvents, setNetworkingEvents] = useState<NetworkingEvent[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultSelectedCategories); // Initialize
	const [filteredEvents, setFilteredEvents] = useState<any[]>(networkingEvents);

	useEffect(() => {
		fetchEvents();
	}, []);

	useEffect(() => {
		setFilteredEvents(networkingEvents);
	}, [networkingEvents]);

	useEffect(() => {
		filterEvents();
	}, [selectedCategories]); // Run the effect whenever selectedCategories changes

	const handleCategoryChange = (newSelectedCategories: string[]) => {
		setSelectedCategories(newSelectedCategories);
	};

	const fetchEvents = async () => {
		try {
			const eventsRef = query(collection(db, 'networking'));
			const eventsDoc = await getDocs(eventsRef);

			if (userStore.myTrainings.length > 0) {
				const fetchedEvents: NetworkingEvent[] = [];

				eventsDoc.forEach((doc) => {
					const trainingData: NetworkingEvent = { ...(doc.data() as NetworkingEvent) };
					fetchedEvents.push(trainingData);
				});
				setNetworkingEvents(fetchedEvents);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const filterEvents = () => {
		if (selectedCategories.length > 0) {
			setFilteredEvents(networkingEvents.filter((event) => selectedCategories.includes(event.eventCategory)));
		} else {
			setFilteredEvents(networkingEvents);
		}
	};

	return (
		<div>
			<div className='pb-8'>
				<CategoryDropdown selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
				<div className='flex flex-wrap gap-2 pt-4 '>
					{selectedCategories
						.slice()
						.sort()
						.map((category, index) => (
							<CategoryBadge key={index} category={category} />
						))}
				</div>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full pb-8'>
				{filteredEvents.map((event) => (
					<NetworkingEventCard key={event.eventId} networkingEventData={event} />
				))}
			</div>
			{networkingEvents.length === 0 && <h1 className='text-center font-semibold pb-14'>No events created</h1>}
		</div>
	);
};
