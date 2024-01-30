"use client"

import React, { useEffect, useState } from 'react'
import flavorImage from '../../../public/assets/stock-landing.png'
import Image from 'next/image';
import { useAuthStore } from '@/hooks/useAuth';
import { doc, collection, count, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

const Hero = () => {
  const [activeTrainings, setActiveTrainings] = useState<number>(0)
  const [jobsAvailable, setJobsAvailable] = useState<number>(0)
  const [upcomingEvents, setUpcomingEvents] = useState<number>(0)
  const user = useAuthStore((state) => state.user)
  useEffect(() => {
    fetchDashboardMetrics();
  }, []);
  

  const fetchDashboardMetrics = async () => {
    try {
      const activeTrainingsRef = collection(db, 'trainings')
      const upcomingEventsRef = collection(db, 'networking')

      const activeTrainingsSnapshot = await getCountFromServer(activeTrainingsRef)
      const upcomingEventsSnapshot = await getCountFromServer(upcomingEventsRef)

      setActiveTrainings(activeTrainingsSnapshot.data().count)
      setUpcomingEvents(upcomingEventsSnapshot.data().count)
      

    } catch (e) {
      console.error(e);
    }
  };

  const [countedActiveTrainings, setCountedActiveTrainings] = useState<number>(0);
  const [countedJobsAvailable, setCountedJobsAvailable] = useState<number>(0);
  const [countedUpcomingEvents, setCountedUpcomingEvents] = useState<number>(0);


  useEffect(() => {
      const incrementMetrics = (targetValue: number, setCountedFunction: React.Dispatch<React.SetStateAction<number>>) => {
        const duration = 400; // 3 seconds
        const interval = 50; // update every 50 milliseconds
        const steps = duration / interval;
        const increment = targetValue / steps;
        let currentCount = 0;
  
        const intervalId = setInterval(() => {
          currentCount += increment;
          setCountedFunction(Math.floor(currentCount));
  
          if (currentCount >= targetValue) {
            setCountedFunction(targetValue);
            clearInterval(intervalId);
          }
        }, interval);
      };
  
      incrementMetrics(activeTrainings, setCountedActiveTrainings);
      incrementMetrics(jobsAvailable, setCountedJobsAvailable);
      incrementMetrics(upcomingEvents, setCountedUpcomingEvents);
  
    }, [activeTrainings, jobsAvailable, upcomingEvents]);
  return (
    <section className='h-screen translate-y-14 w-full p-0 sm:p-8 lg:p-0 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 justify-center' style={{ height: 'calc(100vh - 72px)' }}>
      <div className="custom-shape-divider-top-1706630886 -translate-y-2">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
          </svg>
      </div>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='flex max-w-7xl w-full h-full justify-center items-center px-8 xl:px-0'>
          <div className='w-full h-full flex flex-col gap-4 justify-center pt-14'>
            <div className='text-7xl font-lexendDeca flex flex-col'>
              <span className='text-[#1e3888] font-semibold'>Learn Today,</span>
              <span className='text-[#FCDE73] font-semibold'>Lead Tomorrow</span>
            </div>
            <p className='text-base text-gray-700 font-lexendDeca mb-20 pl-2'>
                Be part of building the bridge to a better future. Project Taytayan is dedicated to centralizing platforms for opportunities.
            </p>
            <div className='flex gap-4'>
              <Link href='/new-account'>
                <button
                  type="button"
                  className="text-white font-medium rounded-full text-md px-10 py-5 text-center anim-bg-gradient focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
                >
                  Join Today
                </button>
              </Link>
              <div className="text-white font-base rounded-full text-md px-8 py-5 text-center border-2 backdrop-blur bg-white/20">
                {countedActiveTrainings} active trainings open or happening right now
              </div>
            </div>
          </div>
          <div className='w-full'>
              <Image
                src={flavorImage}
                alt='flavor-image'
                height={10000}
                style={{ objectFit: 'fill', width: 'auto'}}
              />
          </div>
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1706631099">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero