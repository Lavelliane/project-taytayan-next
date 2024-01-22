import React, { useEffect, useState } from 'react';
import { Badge, Button, Checkbox, CustomFlowbiteTheme, Dropdown, DropdownItem } from 'flowbite-react';
import trainingCategories from '@/utils/TrainingCategories';
import { IoIosArrowDown } from 'react-icons/io';
import { CategoryBadge } from './CategoryBadge';

const customTheme: CustomFlowbiteTheme['dropdown'] = {
	content: '',
	floating: {
		base: 'backdrop-blur-sm rounded-xl',
		item: {
			base:
				'rounded-xl flex items-center justify-start py-0 px-0 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100/50 focus:bg-gray-100/50 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white',
		},
		style: {
			auto: 'bg-gray-50/80 border border-gray-100',
		},
	},
};

interface CategoryDropdownProps {
	selectedCategories: string[];
	onCategoryChange: (newSelectedCategories: string[]) => void;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ selectedCategories, onCategoryChange }) => {
	const [internalSelectedCategories, setInternalSelectedCategories] = useState<string[]>(selectedCategories);

	const handleCategoryChange = (categoryValue: string) => {
		setInternalSelectedCategories((prevCategories) =>
			prevCategories.includes(categoryValue)
				? prevCategories.filter((cat) => cat !== categoryValue)
				: [...prevCategories, categoryValue]
		);
	};

	useEffect(() => {
		onCategoryChange(internalSelectedCategories);
	}, [internalSelectedCategories]);

	const categoryButton = () => {
		return (
			<Button color='gray' className='bg-gray-50 border-gray-200 text-gray-500'>
				Category
				<IoIosArrowDown className='ml-8 h-5 w-5' />
			</Button>
		);
	};

	return (
		<Dropdown
			label='Category'
			dismissOnClick={false}
			renderTrigger={categoryButton}
			theme={customTheme}
			placement='bottom'
			inline
			className='z-50'
		>
			{trainingCategories.map((category) => (
				<DropdownItem key={category.key} onClick={() => handleCategoryChange(category.value)}>
					<div className='bg-gray-200/50 w-fit p-2'>
						<Checkbox
							className='h-4 w-4 rounded focus:ring-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100'
							color='gray'
							checked={internalSelectedCategories.includes(category.value)}
							onChange={() => handleCategoryChange(category.value)}
							onClick={() => handleCategoryChange(category.value)}
						/>
					</div>
					<div className='py-1 px-2'>
						<CategoryBadge category={category.value} />
					</div>
				</DropdownItem>
			))}
		</Dropdown>
	);
};
