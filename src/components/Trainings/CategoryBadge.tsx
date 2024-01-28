import React from 'react';
import { Badge } from 'flowbite-react';

interface BadgeProps {
	category: string;
}

// ! DUPLICATE IN UTILS CUZ OF CSS ISSUES
const trainingCategories = [
	{ key: 1, value: 'Technical', className: 'bg-gradient-to-r from-violet-400 to-purple-500 text-white border-purple-400' },
	{ key: 2, value: 'Certification', className: 'bg-gradient-to-r from-sky-300 to-blue-400 text-white border-blue-400' },
	{ key: 3, value: 'Personal', className: 'bg-gradient-to-r from-lime-400 to-green-400 text-white border-lime-500' },
	{ key: 4, value: 'Professional', className: 'bg-gradient-to-r from-amber-300 to-yellow-400 text-white border-yellow-400' },
	{ key: 5, value: 'Vocational & Arts', className: 'bg-gradient-to-r from-pink-400 to-red-400 text-white border-red-400' },
	{ key: 0, value: 'Other', className: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-400' },
	
];

export const CategoryBadge: React.FC<BadgeProps> = ({ category }) => {
	const matchingCategory = trainingCategories.find((cat) => cat.value === category);

	const badgeClass = matchingCategory?.className || 'hidden bg-gray-500/50 text-gray-500 border-gray-500'; // Fallback to gray if not found

	return (
		<Badge
			className={`${badgeClass} w-fit justify-center border-[0] rounded-xl px-5 py-1.5 uppercase font-base text-xs`}
		>
			{category}
		</Badge>
	);
};
