import React from 'react'

import { TaytaytanLogo } from '@/components/TaytayanLogo';

const TaytayanLogoText = () => {
  return (
    <div className='flex flex-row font-lexendDeca items-center gap-1'>
      <TaytaytanLogo size={34} />
      <h1 className='flex items-center'>
        <span className='font-light text-sm'>
          PROJECT&nbsp;
        </span>
        <span className='font-normal text-lg'>
          taytayan
        </span>
      </h1>
    </div>
  )
}

export default TaytayanLogoText