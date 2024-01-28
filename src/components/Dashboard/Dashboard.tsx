"use client"
import React, { useEffect, useState } from 'react';
import { DashboardMetrics } from './DashboardMetrics'
import { DashboardTraining } from './DashboardTraining';
import { DashboardNetworking } from './DashboardNetworking';
import { useAuthStore } from '@/hooks/useAuth';
import { doc, collection, count, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Dashboard = () => {
    const [activeTrainings, setActiveTrainings] = useState<number>(0)
    const [jobsAvailable, setJobsAvailable] = useState<number>(0)
    const [upcomingEvents, setUpcomingEvents] = useState<number>(0)
    const user = useAuthStore((state) => state.user)
    const [firstNameOnly, setFirstNameOnly] = useState<string>('')

    useEffect(() => {
      setFirstNameOnly(user.firstName.split(' ')[0])
    }, [user]);

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
    
    return (
      <main className='flex flex-col w-full p-4 md:p-6 lg:p-8 xl:p-10'>
        <section className='pb-8'>
          <h1 className='font-inter font-semibold pb-8 text-2xl text-dark'>Welcome back, {firstNameOnly}.</h1>
          <DashboardMetrics activeTrainings={activeTrainings} jobsAvailable={jobsAvailable} upcomingEvents={upcomingEvents} />
        </section>
        <section className='pb-8'>
          <h1 className='font-inter font-semibold pb-4 text-lg text-dark'>Featured Trainings</h1>
          <DashboardTraining />
        </section>
        <section>
          <h1 className='font-inter font-semibold pb-4 text-lg text-dark'>Featured Events</h1>
          <DashboardNetworking />
        </section>
      </main>
    );
  };
  
  export default Dashboard;