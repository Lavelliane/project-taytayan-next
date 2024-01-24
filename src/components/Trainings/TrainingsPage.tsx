import React, { useState, useEffect } from 'react';
import { CategoryBadge } from '../Trainings/CategoryBadge';
import { CategoryDropdown } from '../Trainings/CategoryDropdown';
import { MyTrainingCard } from '../Trainings/MyTrainingCard';
import { Training } from '@/types/types';
import { DefaultTraining } from '@/utils/DefaultProfile';
// import trainings from '@/utils/DummyTrainings';

import { SortDropdown } from './SortDropdown';
import { AddTrainingButton } from './AddTrainingButton';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { filter, set } from 'lodash';

const TrainingsPage = () => {
	const defaultSelectedCategories = [
		'technical',
		'certification',
		'personal',
		'professional',
		'vocational & arts',
		'other',
	]; // Define defaults

	const userStore = useAuthStore((state) => state.user);
	const [trainings, setTrainings] = useState<Training[]>([]);

	useEffect(() => {
		fetchTrainings();
	}, []);

	useEffect(() => {
		setFilteredTrainings(trainings);
	}, [trainings]);

	console.log(userStore);
	const fetchTrainings = async () => {
		try {
			const trainingRef = query(collection(db, 'trainings'), where('trainingId', 'in', userStore.myTrainings));
			const trainingDoc = await getDocs(trainingRef);

			if (userStore.myTrainings.length > 0) {
				const fetchedTrainings: Training[] = [];

				trainingDoc.forEach((doc) => {
					const trainingData: Training = { ...(doc.data() as Training) };
					fetchedTrainings.push(trainingData);
				});
				setTrainings(fetchedTrainings);
			}
		} catch (e) {
			console.error(e);
		}
	};
	console.log(trainings);

	const [sortOption, setSortOption] = useState<string>('alphabetical'); // Default sorting option
	const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultSelectedCategories); // Initialize
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
		console.log(filteredTrainings);
	}, [filteredTrainings]);

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
		<main className='flex flex-col w-full px-4 md:px-8 lg:px-12 xl:px-24'>
			<section className='py-8'>
				<h1 className='font-inter font-semibold pb-4 text-lg text-dark'>My Trainings</h1>
				<div>
					<div className='pb-8'>
						<div className='flex gap-6 justify-between'>
							<div className='flex gap-6'>
								<CategoryDropdown selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
								<SortDropdown onSortChange={handleSortChange} />
							</div>
							<AddTrainingButton />
						</div>
						<div className='flex flex-wrap gap-2 pt-4 '>
							{selectedCategories
								.slice()
								.sort((a, b) => a.localeCompare(b))
								.map((category, index) => (
									<CategoryBadge key={index} category={category} />
								))}
						</div>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full pb-8'>
						{filteredTrainings.map((training, index) => (
							<MyTrainingCard key={training.trainingId + '_' + index} trainingData={training} />
						))}
					</div>
					{trainings.length === 0 && <h1 className='text-center font-semibold'>No trainings created</h1>}
				</div>
			</section>
			<section></section>
		</main>
	);
};

export default TrainingsPage;
