
import Link from 'next/link';
import { Navbar, TextInput } from 'flowbite-react';
import React from 'react'
import SidebarSeeker from './SidebarSeeker';

export const NavbarSeeker = () => {
  return (
    <Navbar fluid rounded className='sticky top-0 z-50 shadow-sm'>
      <div className='flex w-full justify-between sm:justify-end items-center my-2'>
        <SidebarSeeker />
        <div className='ml-64 w-full'>
          <div className='max-w-md w-full '>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#0090D8] focus:border-[#0090D8] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0090D8] dark:focus:border-[#0090D8]" placeholder="Search" required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#0090D8] hover:bg-[#45AFE1] focus:ring-4 focus:outline-none focus:ring-[#45AFE1] font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#0090D8] dark:hover:bg-[#45AFE1] dark:focus:ring-[#0090D8]">Search</button>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
