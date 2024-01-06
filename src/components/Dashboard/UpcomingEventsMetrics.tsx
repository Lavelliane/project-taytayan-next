import React from 'react';
import Image from 'next/image';
import flavorImage from '../../../public/assets/dinosaur.png'

type PropType = {
    upcomingEvents: number;
}

export const UpcomingEventsMetrics: React.FC<PropType> = (props) => {
    const { upcomingEvents } = props;
 	return (
        <div className='bg-gradient-to-b from-yellow-400 to-amber-200 rounded-2xl text-3xl relative overflow-clip'>
            <div className='absolute right-0 translate-x-8'>
                <Image
                    src={flavorImage}
                    alt='flavor-image'
                    height={200}
                />
            </div>
            <div className='flex flex-col font-lexendDeca uppercase text-sm font-bold w-1/2 p-6 pb-14 z-50'>
                <span className='text-5xl font-bold font-inter'>{upcomingEvents}</span>
                Upcoming<br></br>Events
            </div>
        </div>
	);
};