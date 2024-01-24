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
    }, [selectedCategories]);
  
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


    return (
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
    )
}
