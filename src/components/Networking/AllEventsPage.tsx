import React, { useState, useEffect } from 'react';
import { CategoryBadge } from '../Trainings/CategoryBadge';
import { CategoryDropdown } from '../Trainings/CategoryDropdown';
import { NetworkingEvent } from '@/types/types';

import { SortDropdown } from '@/components/Trainings/SortDropdown';
import { AddEventButton } from './AddEventButton';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { NetworkingEventCard } from './NetworkingEventCard';

const AllEventsPage = () => {
	const [networkingEvents, setNetworkingEvents] = useState<NetworkingEvent[]>([]);
	const [sortOption, setSortOption] = useState<string>('alphabetical'); // Default sorting option
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Initialize
	const [filteredEvents, setFilteredEvents] = useState<any[]>(networkingEvents);

	useEffect(() => {
		fetchEvents();
	}, []);

	useEffect(() => {
		setFilteredEvents(networkingEvents);
	}, [networkingEvents]);

	useEffect(() => {
		sortEvents(sortOption);
	}, [sortOption]);

	useEffect(() => {
		filterEvents();
	}, [selectedCategories]);

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

	const handleSortChange = (newSortOption: string) => {
		setSortOption(newSortOption);
		sortEvents(newSortOption);
	};

	const sortEvents = (option: string) => {
		let sortedEvents: any[] = [...filteredEvents];

		switch (option) {
			case 'alphabetical':
				sortedEvents.sort((a, b) => a.trainingName.localeCompare(b.trainingName));
				break;
			case 'date':
				sortedEvents.sort((a, b) => b.trainingDate - a.trainingDate);
				break;
			case 'registrants':
				sortedEvents.sort((a, b) => b.trainingRegistrants?.length - a.trainingRegistrants?.length);
				break;
			default:
				break;
		}

		setFilteredEvents(sortedEvents);
	};

	const handleCategoryChange = (newSelectedCategories: string[]) => {
		setSelectedCategories(newSelectedCategories);
	};

	const filterEvents = () => {
		if (selectedCategories.length > 0) {
			setFilteredEvents(networkingEvents.filter((event) => selectedCategories.includes(event.eventCategory)));
		} else {
			setFilteredEvents(networkingEvents);
		}
	};

	return (
		<main className='flex flex-col w-full p-4 md:p-6 lg:p-8 xl:p-10'>
			<section className='pb-8'>
				<h1 className='font-inter font-semibold pb-4 text-lg text-dark'>All Events</h1>
				<div>
					<div className='pb-8'>
						<div className='flex gap-6 justify-between'>
							<div className='flex gap-6'>
								<CategoryDropdown selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
								<SortDropdown onSortChange={handleSortChange} />
							</div>
							<AddEventButton />
						</div>
						<div className='flex flex-wrap gap-2 pt-4 '>
							{selectedCategories
								.slice()
								.sort((a, b) => a.localeCompare(b))
								.map((category, index) => (
									<CategoryBadge key={index} category={category} style={''} />
								))}
						</div>
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 w-full pb-8 bg-slate-50 p-6 rounded-xl'>
						{filteredEvents.map((event) => (
							<NetworkingEventCard key={event.eventId} networkingEventData={event} />
						))}
						{networkingEvents.length === 0 ||
							(filteredEvents.length === 0 && (
								<h1 className='justify-center font-semibold text-center col-span-full py-24'>No events found</h1>
							))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default AllEventsPage;
