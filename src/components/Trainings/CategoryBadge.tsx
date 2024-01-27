import React from 'react';
import { Badge } from 'flowbite-react';

interface BadgeProps {
 category: string;
}

// ! DUPLICATE IN UTILS CUZ OF CSS ISSUES
const trainingCategories = [
  { key: 1, value: 'Technical', className: 'bg-purple-500/30 text-purple-700 border-purple-400' },
  { key: 2, value: 'Certification', className: 'bg-blue-500/30 text-blue-700 border-blue-400' },
  { key: 3, value: 'Personal', className: 'bg-lime-500/30 text-lime-700 border-lime-500' },
  { key: 4, value: 'Professional', className: 'bg-amber-500/30 text-amber-700 border-yellow-400' },
  { key: 5, value: 'Vocational & Arts', className: 'bg-red-500/30 text-red-600 border-red-400' },
  { key: 0, value: 'Other', className: 'bg-gray-500/30 text-gray-800 border-gray-400' },   
]

export const CategoryBadge: React.FC<BadgeProps> = ({ category }) => {
    const matchingCategory = trainingCategories.find(
      (cat) => cat.value === category
    );
   
    const badgeClass = matchingCategory?.className || 'hidden bg-gray-500/50 text-gray-500 border-gray-500'; // Fallback to gray if not found
   
    return (
      <Badge
        className={`${badgeClass} w-fit justify-center border-[0] rounded-xl px-5 py-1.5 uppercase font-base text-xs`}
      >
        {category}
      </Badge>
    );
};
   