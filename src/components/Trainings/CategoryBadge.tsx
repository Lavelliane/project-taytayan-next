import React from 'react';
import { Badge } from 'flowbite-react';

interface BadgeProps {
 category: string;
}

const trainingCategories = [
  { key: 1, value: 'technical', className: 'bg-purple-500/20 text-purple-700 border-purple-500' },
  { key: 2, value: 'certification', className: 'bg-blue-500/20 text-blue-700 border-blue-600' },
  { key: 3, value: 'personal', className: 'bg-lime-500/20 text-lime-700 border-lime-500' },
  { key: 4, value: 'professional', className: 'bg-amber-500/20 text-amber-700 border-yellow-600' },
  { key: 5, value: 'vocational & arts', className: 'bg-red-500/20 text-red-600 border-red-500' },
  { key: 0, value: 'other', className: 'bg-gray-500/20 text-gray-800 border-gray-500' },   
]

export const CategoryBadge: React.FC<BadgeProps> = ({ category }) => {
    const matchingCategory = trainingCategories.find(
      (cat) => cat.value === category
    );
   
    const badgeClass = matchingCategory?.className || 'hidden bg-gray-500/50 text-gray-500 border-gray-500'; // Fallback to gray if not found
   
    return (
      <Badge
        className={`${badgeClass} w-fit justify-center border-0 rounded-xl px-4 uppercase font-normal text-xs py-1`}
      >
        {category}
      </Badge>
    );
};
   