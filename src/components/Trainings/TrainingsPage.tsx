'use client'

import React, { useState, useEffect } from "react";
import { CategoryBadge } from '../Trainings/CategoryBadge';
import { CategoryDropdown } from '../Trainings/CategoryDropdown'
import { TrainingCard } from '../Trainings/TrainingCard';
import trainings from '@/utils/DummyTrainings';

const TrainingsPage = () => {
    const defaultSelectedCategories = ['technical', 'certification', 'personal', 'professional', 'vocational & arts', 'other']; // Define defaults
    const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultSelectedCategories); // Initialize 
    const [filteredTrainings, setFilteredTrainings] = useState<any[]>(trainings);

    useEffect(() => {
        console.log(filteredTrainings)
    }, [filteredTrainings])

    const handleCategoryChange = (newSelectedCategories: string[]) => {
        setSelectedCategories(newSelectedCategories);
    };

    const filterTrainings = () => {
        if (selectedCategories.length > 0) {
            setFilteredTrainings(
                trainings.filter((training) =>
                    selectedCategories.includes(training.trainingCategory)
                )
            )
        }
        else {
            setFilteredTrainings(trainings)
        }
    };

    return <main className='flex flex-col w-full px-4 md:px-8 lg:px-12 xl:px-24'>
        <section className='py-8'>
            <h1 className='font-inter font-semibold pb-4 text-lg text-dark'>Trainings</h1>
            <div>
                <div className='pb-8'>
                    <CategoryDropdown
                        selectedCategories={selectedCategories}
                        onCategoryChange={handleCategoryChange}
                    />
                    <div className='flex flex-wrap gap-2 pt-4 '>
                        {selectedCategories.slice().sort().map((category, index) => (
                            <CategoryBadge key={index} category={category} />
                        ))}
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full pb-8'>
                    {filteredTrainings.map((training) => (
                        <TrainingCard
                            key={training.trainingId}
                            trainingData={training}
                        />
                    ))}
                </div>
            </div>
        </section>
        <section>


        </section>
    </main>;
};

export default TrainingsPage;
