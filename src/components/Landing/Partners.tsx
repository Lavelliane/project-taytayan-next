import React from 'react'
import philippinesMap from '../../../public/assets/philippines_map.svg'
import Image from 'next/image';
import { Button, Card } from "flowbite-react";
import uscLogo from '../../../public/assets/USC_logo_l.png'
import usaidLogo from '../../../public/assets/USAID-Identity.svg'
import edcLogo from '../../../public/assets/EDC_logo.png'

const Partners = () => {
  return (
    <>
      <section className='h-fit translate-y-14 mb-14 w-full flex flex-col bg-gradient-to-tr from-blue-300 via-indigo-300 to-purple-300 justify-center' style={{ height: 'calc(100vh - 72px)' }}>
        <div className="custom-shape-divider-top-1706825984 z-10">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z" className="shape-fill"></path>
            </svg>
        </div>
        <div className='w-full h-full flex flex-col gap-8 justify-center items-center z-10'>
          <h1 className='text-5xl text-white font-bold font-lexendDeca drop-shadow-xl'>Be a Partner</h1>
          <Button 
            color="light" 
            className='px-4 shadow-xl'
            size='lg'
            pill
          >
            Apply Now
          </Button>
        </div>
        <div className='w-full h-full flex justify-center items-center overflow-hidden absolute'>
          <div className='w-full items-center justify-center flex'>
            <Image
              src={philippinesMap}
              alt='benefit'
              style={{
                width: 'auto',
                height: '100%', // Adjust height as needed
                objectFit: 'cover',
                overflow: 'hidden',
                mixBlendMode: 'luminosity', // Experiment with different blend modes
                opacity: '30%'
              }}
            />
          </div>
        </div>
      </section>
      <section id='project partners' className='flex h-[300px] w-full bg-gradient-to-r from-neutral-100 to-gray-200 mb-16 justify-center items-center'>
        <div className='w-full flex justify-evenly items-center'>
        <Image
          src={usaidLogo}
          alt='benefit'
          style={{ width: 'auto', height: '100px', objectFit: 'fill' }}
        />
        <Image
          src={edcLogo}
          alt='benefit'
          style={{ width: 'auto', height: '100px', objectFit: 'fill' }}
        />
        <Image
          src={uscLogo}
          alt='benefit'
          style={{ width: 'auto', height: '100px', objectFit: 'fill' }}
        />
        </div>
      </section>
      <section id='' className='flex h-fit w-full mb-48 justify-center'>
        <div className='max-w-7xl w-full justify-center items-center flex flex-col gap-8'>
          <div className='max-w-md text-center gap-4 flex flex-col'>
            <h1 className='font-bold text-3xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent'>How to Apply</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ante a semper cursus. Sed ac luctus erat, vel porttitor erat. In odio mi, interdum vel rutrum ut, scelerisque vitae massa.</p>
          </div>
          <div className='flex w-full justify-center gap-4'>
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Training Centers
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ante a semper cursus. Sed ac luctus erat, vel porttitor erat. In odio mi, interdum vel rutrum ut, scelerisque vitae massa.
              </p>
            </Card>
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Job Employers
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ante a semper cursus. Sed ac luctus erat, vel porttitor erat. In odio mi, interdum vel rutrum ut, scelerisque vitae massa.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default Partners