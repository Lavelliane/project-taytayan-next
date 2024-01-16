import React from 'react';
import Image from 'next/image';
import flavorImage from '../../../public/assets/rocket.png'

type PropType = {
    jobsAvailable: number;
}

export const JobsAvailableMetrics: React.FC<PropType> = (props) => {
    const { jobsAvailable } = props;
 	return (
        <div className='bg-gradient-to-b from-fuchsia-400 to-fuchsia-200 rounded-2xl text-3xl relative overflow-clip'>
            <div className='absolute right-0 translate-x-8 hidden sm:block'>
                <Image
                    src={flavorImage}
                    alt='flavor-image'
                    height={200}
                />
            </div>
            <div className='flex flex-col font-lexendDeca uppercase text-sm font-bold w-1/2 p-6 pb-14 z-50'>
                <span className='text-5xl font-bold font-inter'>{jobsAvailable}</span>
                Jobs<br></br>Available
            </div>
        </div>
	);
};