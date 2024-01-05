import React from 'react'

import { TaytaytanLogo } from '@/components/TaytayanLogo';

const TaytayanLogoText = () => {
  return (
    <div className='flex flex-row font-lexendDeca w-fit items-center'>
      <div className='pr-1'>
         <TaytaytanLogo size={34} /> 
      </div>
      <span className='font-extralight text-xs flex pr-1'>
        PROJECT
      </span>
      <span className='font-light text-lg flex -translate-y-0.5'> 
        taytayan
      </span>
    </div>
  )
}

export default TaytayanLogoText