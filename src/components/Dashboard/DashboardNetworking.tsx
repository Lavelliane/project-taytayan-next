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
	const userStore = useAuthStore((state) => state.user);

	const [networkingEvents, setNetworkingEvents] = useState<NetworkingEvent[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [filteredEvents, setFilteredEvents] = useState<any[]>(networkingEvents);

	useEffect(() => {
		fetchEvents();
	}, []);

	useEffect(() => {
		setFilteredEvents(networkingEvents);
	}, [networkingEvents]);

	useEffect(() => {
		console.log(filteredEvents);
	}, [filteredEvents]);

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
			const fetchedEvents: NetworkingEvent[] = [];
			eventsDoc.forEach((doc) => {
				const eventData: NetworkingEvent = {
					...(doc.data() as NetworkingEvent),
				};
				console.log(eventData);
				fetchedEvents.push(eventData);
			});
			const recentEvents = fetchedEvents.slice(0, 4);
			setNetworkingEvents(recentEvents);
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
							<CategoryBadge key={index} category={category} style={''} />
						))}
				</div>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full pb-8 bg-slate-50 p-6 rounded-xl'>
				{filteredEvents.map((event) => (
					<NetworkingEventCard key={event.eventId} networkingEventData={event} />
				))}
				{networkingEvents.length === 0 ||
					(filteredEvents.length === 0 && (
						<h1 className='justify-center font-semibold text-center col-span-full py-24'>No events found</h1>
					))}
			</div>
		</div>
	);
};
