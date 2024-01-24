import React from 'react';

interface FormatRegistrantsProps {
	names: string[];
}

export function FormatRegistrants({ names }: Readonly<FormatRegistrantsProps>) {
	const formatNames = (nameList: string[]) => {
		const totalNames = nameList.length ?? 0;

		if (totalNames === 0) {
			return 'No names provided';
		}

		if (totalNames <= 2) {
			return nameList.join(' and ');
		}

		const firstNames = nameList.slice(0, 2).join(', ');
		const remainingCount = totalNames - 2;
		const othersText = remainingCount === 1 ? '1 other' : `${remainingCount} others`;

		return `${firstNames}, and ${othersText}`;
	};

	const formattedNames = formatNames(names);

	return <p className='text-xs lg:text-sm text-gray-600'>{formattedNames}</p>;
}
