'use client';

import React, { useState, useEffect } from 'react';
import { CategoryBadge } from '../Trainings/CategoryBadge';
import { CategoryDropdown } from '../Trainings/CategoryDropdown';
import { TrainingCard } from '../Trainings/TrainingCard';
import { Training } from '@/types/types';
import { doc, collection, getDocs, where, query } from 'firebase/firestore';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';

export const DashboardTraining = () => {
	const userStore = useAuthStore((state) => state.user);
	const [trainings, setTrainings] = useState<Training[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Initialize
	const [filteredTrainings, setFilteredTrainings] = useState<Training[]>(trainings);

	useEffect(() => {
		fetchTrainings();
	}, []);

	useEffect(() => {
		setFilteredTrainings(trainings);
	}, [trainings]);

	useEffect(() => {
		filterTrainings();
	}, [selectedCategories]); // Run the effect whenever selectedCategories changes

	const handleCategoryChange = (newSelectedCategories: string[]) => {
		setSelectedCategories(newSelectedCategories);
	};

	const fetchTrainings = async () => {
		try {
			const trainingRef = collection(db, 'trainings');
			const trainingDoc = await getDocs(trainingRef);

			const fetchedTrainings: Training[] = [];

			trainingDoc.forEach((doc) => {
				const trainingData: Training = { ...(doc.data() as Training) };
				fetchedTrainings.push(trainingData);
			});
			const recentTrainings = fetchedTrainings.slice(0, 4);
			setTrainings(recentTrainings);
		} catch (e) {
			console.error(e);
		}
	};

	console.log(trainings);

	const filterTrainings = () => {
		if (selectedCategories.length > 0) {
			setFilteredTrainings(trainings.filter((training) => selectedCategories.includes(training.trainingCategory)));
		} else {
			setFilteredTrainings(trainings);
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
							<CategoryBadge key={index} style='badge' category={category} />
						))}
				</div>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full pb-8'>
				{filteredTrainings.map((training: Training) => (
					<TrainingCard key={training.trainingId} trainingData={training as Training} />
				))}
				{trainings.length === 0 || filteredTrainings.length === 0 && (
					<h1 className="justify-center font-semibold text-center col-span-full py-24">No trainings found</h1>
				)}
			</div>
		</div>
	);
};
