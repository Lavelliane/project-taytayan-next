import React from 'react'
import Image from 'next/image';
import bridgeImage from '../../../public/assets/bridge.svg'
import certificationsImage from '../../../public/assets/certifications.svg'
import networkingImage from '../../../public/assets/networking.svg'
import jobseekImage from '../../../public/assets/jobseek.svg'
import trainingsImage from '../../../public/assets/trainings.svg'

const Benefits = () => {
  return (
    <section id='benefits' className='h-fit w-full flex justify-center pt-48'>
      <div className='flex flex-col gap-24 max-w-5xl w-full justify-center items-center px-8 xl:px-0'>
        <div className='w-full flex justify-evenly'>
          <Image
            src={trainingsImage}
            alt='benefit'
            style={{ width: 'auto', height: '300px', objectFit: 'fill' }}
          />
          <div className='max-w-lg flex flex-col gap-4'>
            <h1 className='text-3xl'>Find workshops and trainings offered near you</h1>
            <p className='font-lexendDeca font-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ante a semper cursus. Sed ac luctus erat, vel porttitor erat. In odio mi, interdum vel rutrum ut, scelerisque vitae massa. Nam ut tincidunt dolor, sed consequat arcu. Integer in dui ac purus rutrum consectetur. Vestibulum a nisi non tellus tristique sodales non in lacus. </p>
          </div>
        </div>
        <div className='w-full flex justify-evenly'>
          <div className='max-w-lg flex flex-col gap-4'>
            <h1 className='text-3xl'>Achieve proper completion of trainings to receive certifications</h1>
            <p className='font-lexendDeca font-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ante a semper cursus. Sed ac luctus erat, vel porttitor erat. In odio mi, interdum vel rutrum ut, scelerisque vitae massa. Nam ut tincidunt dolor, sed consequat arcu. Integer in dui ac purus rutrum consectetur. Vestibulum a nisi non tellus tristique sodales non in lacus. </p>
          </div>
          <Image
            src={certificationsImage}
            alt='benefit'
            style={{ width: 'auto', height: '300px', objectFit: 'fill' }}
          />
        </div>
        <div className='w-full flex justify-evenly'>
          <Image
            src={networkingImage}
            alt='benefit'
            style={{ width: 'auto', height: '300px', objectFit: 'fill' }}
          />
          <div className='max-w-lg flex flex-col gap-4'>
            <h1 className='text-3xl'>Join community events and expand your social network</h1>
            <p className='font-lexendDeca font-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ante a semper cursus. Sed ac luctus erat, vel porttitor erat. In odio mi, interdum vel rutrum ut, scelerisque vitae massa. Nam ut tincidunt dolor, sed consequat arcu. Integer in dui ac purus rutrum consectetur. Vestibulum a nisi non tellus tristique sodales non in lacus. </p>
          </div>
        </div>
        <div className='w-full flex justify-evenly'>
          <div className='max-w-lg flex flex-col gap-4'>
            <h1 className='text-3xl'>Browse through our job board and interact with potential employers</h1>
            <p className='font-lexendDeca font-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ante a semper cursus. Sed ac luctus erat, vel porttitor erat. In odio mi, interdum vel rutrum ut, scelerisque vitae massa. Nam ut tincidunt dolor, sed consequat arcu. Integer in dui ac purus rutrum consectetur. Vestibulum a nisi non tellus tristique sodales non in lacus. </p>
          </div>
          <Image
            src={jobseekImage}
            alt='benefit'
            style={{ width: 'auto', height: '300px', objectFit: 'fill' }}
          />
        </div>
        <div className='flex flex-col gap-16'>
          <div className='max-w-lg flex flex-col gap-4'>
            <h1 className='text-3xl text-center'>Bridging you to Opportunities.</h1>
          </div>
          <Image
            src={bridgeImage}
            alt='benefit'
            style={{ width: 'auto', height: '300px', objectFit: 'fill' }}
          />
        </div>
      </div>
    </section>
  )
}

export default Benefits