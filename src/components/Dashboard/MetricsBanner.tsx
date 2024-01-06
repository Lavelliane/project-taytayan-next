import React from 'react';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import flavorImage from '../../../public/assets/stock_1.png'
import TaytayanLogoText from '../TaytayanLogoText';

export const MetricsBanner = () => {
 	return (
        <div className='col-span-1 lg:col-span-3'>
            <div className='flex bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-2xl justify-center lg:justify-between overflow-hidden'>
                <div className='flex flex-col p-10 text-xl sm:text-2xl md:text-3xl'>
                    <h1 className='font-bold mb-4'>Your Bridge to Opportunities.</h1>
                    <div className='w-fit mb-20'><TaytayanLogoText /></div>
                    <Button color='warning' size='sm' className='bg-orange-400 px-3 w-auto lg:w-fit' href='/'>My Events</Button> 
                    </div>
                <div className='hidden lg:block'>
                    <Image
                        src={flavorImage}
                        alt='flavor-image'
                        height={285}
                    />
            </div>
            </div>
        </div>
	);
};