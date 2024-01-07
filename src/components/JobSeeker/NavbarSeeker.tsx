
import Link from 'next/link';
import { Navbar, TextInput } from 'flowbite-react';
import React from 'react'
import SidebarSeeker from './SidebarSeeker';

export const NavbarSeeker = () => {
    return (
        <Navbar fluid rounded className='sticky top-0 z-50'>
          <div className='flex w-full justify-between sm:justify-end items-center'>
            <SidebarSeeker />
            <div className=''>
                <TextInput placeholder='Search' />
            </div>
          </div>
        </Navbar>
      );
}
