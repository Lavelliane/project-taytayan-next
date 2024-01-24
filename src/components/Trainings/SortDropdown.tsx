import React, { useEffect, useState } from 'react';
import { Badge, Button, Checkbox, CustomFlowbiteTheme, Dropdown, DropdownItem } from 'flowbite-react';
import { IoIosArrowDown } from 'react-icons/io';

const customTheme: CustomFlowbiteTheme['dropdown'] = {
	content: '',
	floating: {
		base: 'rounded-xl',
		item: {
			base:
				'rounded-xl flex items-center justify-start py-0 px-0 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100/50 focus:bg-gray-100/50 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white',
		},
		style: {
			auto: 'bg-gray-50 border border-gray-100',
		},
	},
};

interface SortDropdownProps {
	onSortChange: (newSelectedCategories: string) => void;
}

const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
	const [newSelected, setNewSelected] = useState<string>('alphabetical');

	const categoryButton = () => {
		return (
			<Button color='gray' className='bg-gray-50 border-gray-200 text-gray-500'>
				Sort
				<IoIosArrowDown className='ml-8 h-5 w-5' />
			</Button>
		);
	};

	return (
		<Dropdown
			label='Sort'
			dismissOnClick={false}
			theme={customTheme}
			renderTrigger={categoryButton}
			placement='bottom'
			inline
			className='z-50'
		>
			<DropdownItem
				onClick={() => {
					onSortChange('alphabetical');
					setNewSelected('alphabetical');
				}}
			>
				<div
					className={`w-full p-2 text-start  ${newSelected === 'alphabetical' ? 'text-[#0090D8]' : 'text-gray-700'}`}
				>
					<span className='py-1 px-2 ' color='none'>
						A-Z
					</span>
				</div>
			</DropdownItem>
			<DropdownItem
				onClick={() => {
					onSortChange('date');
					setNewSelected('date');
				}}
			>
				<div className={`w-full p-2 text-start  ${newSelected === 'date' ? 'text-[#0090D8]' : 'text-gray-700'}`}>
					<span className='py-1 px-2' color='none'>
						Date
					</span>
				</div>
			</DropdownItem>
			<DropdownItem
				onClick={() => {
					onSortChange('registrants');
					setNewSelected('registrants');
				}}
			>
				<div className={`w-full p-2 text-start  ${newSelected === 'registrants' ? 'text-[#0090D8]' : 'text-gray-700'}`}>
					<span className='py-1 px-2' color='none'>
						No. of Registrants
					</span>
				</div>
			</DropdownItem>
		</Dropdown>
	);
};

export { SortDropdown };
