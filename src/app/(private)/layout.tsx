'use client'
import type { Metadata } from "next";
import "../globals.css";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Next13ProgressBar } from 'next13-progressbar';
import { NavbarSeeker } from '@/components/JobSeeker/NavbarSeeker'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()

  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/login')
    }
  }, [auth.currentUser]);

  return (
    <>
      <main className='flex flex-col min-h-screen justify-start bg-white'>
        <NavbarSeeker />
        <div className='w-full pl-0 sm:pl-64'>
          {children}
        </div>
      </main>
      <Next13ProgressBar height='2px' color='#FFC72C' options={{ showSpinner: false }} showOnShallow />
    </>
  );
}
