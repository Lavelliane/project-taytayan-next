import React from 'react';
import { Badge } from 'flowbite-react';
import trainingCategories from '@/utils/TrainingCategories';

interface BadgeProps {
 category: string;
 size: string;
}

export const CategoryBadge: React.FC<BadgeProps> = ({ category, size }) => {
    const matchingCategory = trainingCategories.find(
      (cat) => cat.value === category
    );
   
    const badgeClass = matchingCategory?.className || 'hidden bg-gray-500/50 text-gray-500 border-gray-500'; // Fallback to gray if not found
   
    return (
      <Badge
        className={`${badgeClass} w-fit justify-center border-0 rounded-full px-4 capitalize`}
        size={size}
      >
        {category}
      </Badge>
    );
};
   