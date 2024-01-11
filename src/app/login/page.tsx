import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { LoginForm } from '@/components/Login/LoginForm';

export default function Login() {
  return (
    <main className='max-h-screen max-w-screen'>
      <section className=' h-screen flex p-0 sm:p-8 lg:p-0 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 justify-center'>
        <div className='z-50 w-full rounded-none sm:rounded-2xl lg:rounded-none flex flex-col h-full items-center justify-center pb-12 bg-white lg:bg-white backdrop-blur-md lg:backdrop-blur-none border-white/50 border'>
          <div className='w-full px-12 max-w-lg'>
            <Link href='/admin' className=' flex font-lexendDeca mb-8 gap-1 w-fit'>
                <Image src='/taytayan-logo.svg' className='h-6 sm:h-12' alt='Project taytayan Logo' width={0} height={0} style={{ width: 'auto', height: '50px', objectFit: 'fill' }} />
                <span className='flex flex-col items-start justify-center'>
                    <span className='text-sm font-light whitespace-nowrap dark:text-white'>PROJECT</span>
                    <span className='text-lg font-regular whitespace-nowrap dark:text-white'>taytayan</span>
                </span>
            </Link>
            <h1 className='text-lg font-semibold underline underline-offset-[10px] decoration-4 decoration-accent text-dark mb-4'>Log in</h1>
            <h3 className='text-sm font-medium text-gray-700 mb-4'>Bridging you to opportunities</h3>
          </div>
          <div className='w-full max-w-lg'>
            <LoginForm />
          </div>
        </div>
        <div className='hidden lg:block max-w-7xl w-full h-full'>
          <div className='fixed rounded-full bg-green-300 w-36 h-36 translate-x-2 translate-y-1 top-0'></div>
          <div className='fixed rounded-full bg-pink-300 w-36 h-36 -translate-x-10 translate-y-44 right-0'></div>
          <div className='fixed rounded-full bg-yellow-100 w-48 h-48 translate-x-14 translate-y-24 bottom-0'></div>

          <div className='w-full h-full px-8 py-8'>
            <div className='z-50 w-auto h-full rounded-[4rem] flex flex-col items-center justify-start bg-white/40 backdrop-blur-sm border border-white/20'>
            </div>
          </div>
        </div>
      </section >
    </main>
  )
}
