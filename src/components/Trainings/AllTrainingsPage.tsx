import React, { useState, useEffect } from 'react';
import { CategoryBadge } from '../Trainings/CategoryBadge';
import { CategoryDropdown } from '../Trainings/CategoryDropdown';
import { TrainingCard } from '../Trainings/TrainingCard';
import { Training } from '@/types/types';
import { DefaultTraining } from '@/utils/DefaultProfile';
import { SortDropdown } from './SortDropdown';
import { AddTrainingButton } from './AddTrainingButton';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';

const AllTrainingsPage = () => {
	const userStore = useAuthStore((state) => state.user);
	const [trainings, setTrainings] = useState<Training[]>([]);

	useEffect(() => {
		fetchTrainings();
	}, []);

	useEffect(() => {
		setFilteredTrainings(trainings);
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
		} catch (e) {
			console.error(e);
		}
	};

	const [sortOption, setSortOption] = useState<string>('alphabetical'); // Default sorting option
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Initialize
	const [filteredTrainings, setFilteredTrainings] = useState<any[]>(trainings);

	const handleSortChange = (newSortOption: string) => {
		setSortOption(newSortOption);
		sortTrainings(newSortOption);
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

	const filterTrainings = () => {
		if (selectedCategories.length > 0) {
			setFilteredTrainings(trainings.filter((training) => selectedCategories.includes(training.trainingCategory)));
		} else {
			setFilteredTrainings(trainings);
		}
	};

	return (
		<main className='flex flex-col w-full p-4 md:p-6 lg:p-8 xl:p-10'>
			<section className='pb-8'>
				<h1 className='font-inter font-semibold pb-4 text-lg text-dark'>All Trainings</h1>
				<div>
					<div className='pb-8'>
						<div className='flex gap-6 justify-between'>
							<div className='flex gap-6'>
								<CategoryDropdown selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
								<SortDropdown onSortChange={handleSortChange} />
							</div>
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
					<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full pb-8 bg-slate-50 p-6 rounded-xl'>
						{filteredTrainings.map((training, index) => (
							<TrainingCard key={training.trainingId + '_' + index} trainingData={training} />
						))}
						{trainings.length === 0 ||
							(filteredTrainings.length === 0 && (
								<h1 className='justify-center font-semibold text-center col-span-full py-24'>No trainings found</h1>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default AllTrainingsPage;
