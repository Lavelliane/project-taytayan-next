'use client'

import React, { useState, useEffect } from 'react';
import { CategoryBadge } from '../Trainings/CategoryBadge';
import { CategoryDropdown } from '../Trainings/CategoryDropdown'
import { TrainingCard } from '../Trainings/TrainingCard';
import trainings from '@/utils/DummyTrainings';

export const DashboardTraining = () => {
    const defaultSelectedCategories = ['technical', 'certification', 'personal', 'professional', 'vocational & arts', 'other']; // Define defaults
    const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultSelectedCategories); // Initialize 
  
    const [filteredTrainings, setFilteredTrainings] = useState<any[]>(trainings);

    useEffect(() => {
      filterTrainings();
    }, [selectedCategories]); // Run the effect whenever selectedCategories changes
  
    const handleCategoryChange = (newSelectedCategories: string[]) => {
      setSelectedCategories(newSelectedCategories);
    };
  
    const filterTrainings = () => {
      setFilteredTrainings(
        trainings.filter((training) =>
          selectedCategories.includes(training.trainingCategory)
        )
      );
    };


    return (
        <div>
            <div className='pb-8'>
                <CategoryDropdown
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                />
                <div className='flex gap-2 pt-4 bg'>
                    {selectedCategories.slice().sort().map((category, index) => (
                        <CategoryBadge key={index} category={category} size='sm' />
                    ))}
                </div>
            </div>
            <div className='grid grid-cols-2 gap-8 w-full pb-8'>
                {filteredTrainings.map((training) => (
                    <TrainingCard
                    key={training.trainingId}
                    trainingName={training.trainingName}
                    trainingCenter={training.trainingCenter}
                    trainingAddress={training.trainingAddress}
                    trainingRegistration={training.trainingRegistration}
                    trainingCategory={training.trainingCategory}
                    />
                ))}
            </div>
        </div>
    )
}
