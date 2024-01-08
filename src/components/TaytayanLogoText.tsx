import React from 'react'

import { TaytaytanLogo } from '@/components/TaytayanLogo';

const TaytayanLogoText = () => {
  return (
    <div className='flex flex-row font-lexendDeca items-center gap-1'>
      <TaytaytanLogo size={34} />
      <h1 className='flex flex-wrap items-center'>
        <span className='font-light text-sm'>
          PROJECT&nbsp;
        </span>
        <span className='font-normal text-lg -translate-y-0'>
          taytayan
        </span>
      </h1>
    </div>
  )
}

export default TaytayanLogoText