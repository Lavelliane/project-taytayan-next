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
            href='#apply-now'
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
      <section id='project-partners' className='flex h-fit w-full bg-gradient-to-r from-neutral-100 to-gray-200 pt-12 pb-20'>
        <div className='flex flex-col w-full items-center gap-8'>
          <h1 className='text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg font-lexendDeca font-extralight'>Our core project partners</h1>
          {/* LG */}
          <div className='max-w-7xl w-full lg:flex justify-evenly items-center hidden'>
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
          {/* MD */}
          <div className='max-w-7xl w-full md:flex justify-evenly items-center hidden lg:hidden'>
            <Image
              src={usaidLogo}
              alt='benefit'
              style={{ width: 'auto', height: '75px', objectFit: 'fill' }}
            />
            <Image
              src={edcLogo}
              alt='benefit'
              style={{ width: 'auto', height: '75px', objectFit: 'fill' }}
            />
            <Image
              src={uscLogo}
              alt='benefit'
              style={{ width: 'auto', height: '75px', objectFit: 'fill' }}
            />
          </div>
          {/* SM */}
          <div className='max-w-7xl w-full sm:flex justify-evenly items-center hidden md:hidden'>
            <Image
              src={usaidLogo}
              alt='benefit'
              style={{ width: 'auto', height: '60px', objectFit: 'fill' }}
            />
            <Image
              src={edcLogo}
              alt='benefit'
              style={{ width: 'auto', height: '60px', objectFit: 'fill' }}
            />
            <Image
              src={uscLogo}
              alt='benefit'
              style={{ width: 'auto', height: '60px', objectFit: 'fill' }}
            />
          </div>
          {/* XS */}
          <div className='max-w-7xl w-full flex justify-evenly items-center sm:hidden'>
            <Image
              src={usaidLogo}
              alt='benefit'
              style={{ width: 'auto', height: '40px', objectFit: 'fill' }}
            />
            <Image
              src={edcLogo}
              alt='benefit'
              style={{ width: 'auto', height: '40px', objectFit: 'fill' }}
            />
            <Image
              src={uscLogo}
              alt='benefit'
              style={{ width: 'auto', height: '40px', objectFit: 'fill' }}
            />
          </div>
        </div>
      </section>
      <section id='apply-now' className='flex h-fit w-full mb-48 justify-center pt-24'>
        <div className='max-w-5xl w-full justify-center items-center flex flex-col gap-8'>
          <div className='max-w-md text-center gap-4 flex flex-col items-center drop-shadow-sm'>
            <h1 className='w-fit font-bold text-3xl bg-gradient-to-r from-sky-400 to-amber-300 bg-clip-text text-transparent'>How to Apply</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ante a semper cursus. Sed ac luctus erat, vel porttitor erat. In odio mi, interdum vel rutrum ut, scelerisque vitae massa.</p>
          </div>
          <div className='flex flex-col sm:flex-row w-full items-center justify-center gap-8 px-8'>
            <Card 
              href="#" 
              className="max-w-sm"
              imgAlt="training centers"
              imgSrc="/assets/trainingCenter.jpg"        
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Training Centers
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ante a semper cursus. Sed ac luctus erat, vel porttitor erat. In odio mi, interdum vel rutrum ut, scelerisque vitae massa.
              </p>
            </Card>
            <Card 
              href="#" 
              className="max-w-sm"
              imgAlt="job employers"
              imgSrc="/assets/jobEmployer.jpg"        
            >
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