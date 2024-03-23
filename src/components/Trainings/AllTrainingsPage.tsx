'use client';
import React, { useState, useEffect } from 'react';
import { CategoryBadge } from '../Trainings/CategoryBadge';
import { CategoryDropdown } from '../Trainings/CategoryDropdown';
import { TrainingCard } from '../Trainings/TrainingCard';
import { GoogleCoordinates, MapViewLocation, Training } from '@/types/types';
import { DefaultTraining } from '@/utils/Defaults';
import { SortDropdown } from './SortDropdown';
import { AddTrainingButton } from './AddTrainingButton';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { Button } from 'flowbite-react';
import MapView from './MapView';
import useGeoLocation from '@/hooks/useGeoLocation';

interface SelectedLocationType {
	id: string;
	position: GoogleCoordinates;
}

const AllTrainingsPage = () => {
	const userStore = useAuthStore((state) => state.user);
	const [trainings, setTrainings] = useState<Training[]>([]);
	const [currentLocation, setCurrentLocation] = useState<GoogleCoordinates>();
	const location = useGeoLocation();
	const [sortOption, setSortOption] = useState<string>('alphabetical'); // Default sorting option
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Initialize
	const [filteredTrainings, setFilteredTrainings] = useState<Training[]>(trainings);
	const [showMapView, setShowMapView] = useState<boolean>(false);
	const [trainingLocations, setTrainingLocations] = useState<MapViewLocation[]>([]);
	const [selectedLocation, setSelectedLocation] = useState<SelectedLocationType>();

	useEffect(() => {
		fetchTrainings();
	}, []);

	useEffect(() => {
		setFilteredTrainings(trainings);
		handleTrainingLocation();
	}, [trainings]);

	const fetchTrainings = async () => {
		try {
			const trainingRef = collection(db, 'trainings');
			const trainingDoc = await getDocs(trainingRef);

			const fetchedTrainings: Training[] = [];

			trainingDoc.forEach((doc) => {
				const trainingData: Training = { ...(doc.data() as Training) };
				fetchedTrainings.push(trainingData);
			});
			setTrainings(fetchedTrainings);
			setFilteredTrainings(fetchedTrainings);
		} catch (e) {
			console.error(e);
		}
	};

	const handleSortChange = (newSortOption: string) => {
		setSortOption(newSortOption);
		sortTrainings(newSortOption);
	};

	const handleToggleMapView = async () => {
		await setCurrentLocation(location.coordinates);
		await fetchTrainings();
		setShowMapView(!showMapView);
	};

	const handleTrainingLocation = async () => {
		const locations: MapViewLocation[] = [];

		await trainings.map((training) => {
			locations.push({
				id: training.trainingId,
				name: training.trainingName,
				position: training.trainingAddress.geometry,
			});
		});
		setTrainingLocations(locations);
	};

	const sortTrainings = (option: string) => {
		let sortedTrainings: any[] = [...filteredTrainings];

		switch (option) {
			case 'alphabetical':
				sortedTrainings.sort((a, b) => a.trainingName.localeCompare(b.trainingName));
				break;
			case 'date':
				sortedTrainings.sort((a, b) => b.trainingDate - a.trainingDate);
				break;
			case 'registrants':
				sortedTrainings.sort((a, b) => b.trainingRegistrants?.length - a.trainingRegistrants?.length);
				break;
			default:
				break;
		}

		setFilteredTrainings(sortedTrainings);
	};

	useEffect(() => {
		filterTrainings();
	}, [selectedCategories]); // Run the effect whenever selectedCategories changes

	useEffect(() => {
		sortTrainings(sortOption);
	}, [sortOption]);

	const handleCategoryChange = (newSelectedCategories: string[]) => {
		setSelectedCategories(newSelectedCategories);
	};

	const filterTrainings = async () => {
		if (selectedCategories.length > 0) {
			setFilteredTrainings(trainings.filter((training) => selectedCategories.includes(training.trainingCategory)));
		} else {
			setFilteredTrainings(trainings);
		}
		handleTrainingLocation();
	};

	return (
		<main className='flex flex-col w-full p-4 md:p-6 lg:p-8 xl:p-10 pb-0 md:pb-0 lg:pb-0 xl:pb-0'>
			<section className='pb-8'>
				<h1 className='font-inter font-semibold pb-4 text-lg text-dark'>All Trainings</h1>
				<div>
					<div className='pb-8'>
						<div className='flex gap-6 justify-between'>
							<div className='flex gap-6'>
								<CategoryDropdown selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
								<SortDropdown onSortChange={handleSortChange} />
							</div>
							<Button href={showMapView ? '' : '#map-view'} onClick={handleToggleMapView}>
								{showMapView ? 'List View' : 'Map View'}
							</Button>
						</div>
						<div className='flex flex-wrap gap-2 pt-4 '>
							{selectedCategories
								.slice()
								.sort((a, b) => a.localeCompare(b))
								.map((category) => (
									<CategoryBadge key={category} category={category} style={''} />
								))}
						</div>
					</div>
					<div
						id='map-view'
						className={`rounded-xl md:bg-slate-50 bg-none lg:p-6 md:p-4 p-0 gap-6 flex w-full relative ${
							showMapView ? 'overflow-y-auto h-[80vh]' : 'h-fit overflow-y-auto'
						} `}
					>
						{trainings.length === 0 ||
							(filteredTrainings.length === 0 && (
								<h1 className='text-center justify-center font-semibold w-full flex py-24'>No trainings found.</h1>
							))}
						<div
							className={`relative grid grid-cols-1 scroll-smooth ${
								showMapView ? 'lg:grid-cols-1 max-w-sm w-full' : 'lg:grid-cols-2 w-full'
							} gap-6  bg-none `}
						>
							{filteredTrainings.map((training) => (
								<button
									disabled={!showMapView}
									className={`rounded-lg ${
										showMapView && selectedLocation?.id === training.trainingId ? 'ring-tertiary ring-4' : ''
									} ${showMapView ? 'hover:shadow-lg' : ''} transition-shadow`}
									key={training.trainingId}
									onClick={() =>
										setSelectedLocation({ id: training.trainingId, position: training.trainingAddress.geometry })
									}
								>
									<TrainingCard key={training.trainingId} trainingData={training} />
								</button>
							))}
							{trainings.length === 0 ||
								(filteredTrainings.length === 0 && (
									<h1 className='justify-center font-semibold text-center col-span-full py-24'>No trainings found.</h1>
								))}
						</div>

						<div
							className={`rounded-lg shadow-lg sticky top-0 duration-1000  ease-in-out transition-transform w-full h-full ${
								showMapView ? 'scale-x-100 origin-right' : 'scale-x-0 origin-right hidden'
							}`}
						>
							<MapView
								handleToggleMapView={handleToggleMapView}
								trainingLocation={trainingLocations}
								selectedLocation={selectedLocation || { id: '', position: { lat: 0, lng: 0 } }}
								currentLocation={currentLocation || { lat: 0, lng: 0 }}
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default AllTrainingsPage;
