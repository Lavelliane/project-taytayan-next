import React from 'react';
import Image from 'next/image';
import flavorImage from '../../../public/assets/dinosaur-2.png';

type PropType = {
	activeTrainings: number;
};

export const ActiveTrainingsMetrics: React.FC<PropType> = (props) => {
	const { activeTrainings } = props;
	return (
		<div className='bg-gradient-to-b from-green-500 to-green-300 rounded-2xl text-3xl relative overflow-clip'>
			<div className='absolute right-4 translate-x-8 block'>
				<Image src={flavorImage} alt='flavor-image' height={200} />
			</div>
			<div className='flex flex-col font-lexendDeca uppercase text-sm font-bold w-1/2 p-6 pb-14 z-50'>
				<span className='text-5xl font-bold font-inter'>{activeTrainings}</span>
				Active
				<br />
				Trainings
			</div>
		</div>
	);
};
