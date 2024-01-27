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
    useEffect(() => {
      console.log(user)
    }, [user])
    let firstNameOnly = ''
    if (user && user.firstName) {
      firstNameOnly= user.firstName.split(' ')[0];
    }

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
      <main className='flex flex-col w-full px-4 md:px-8 lg:px-12 xl:px-24'>
        <section className='py-8'>
          <h1 className='font-inter font-semibold pb-8 text-2xl text-dark'>Welcome back, {firstNameOnly}.</h1>
          <DashboardMetrics activeTrainings={activeTrainings} jobsAvailable={jobsAvailable} upcomingEvents={upcomingEvents} />
        </section>
        <section>
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