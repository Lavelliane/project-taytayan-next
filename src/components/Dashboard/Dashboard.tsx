"use client"
import React, { useEffect } from 'react';
import { DashboardMetrics } from './DashboardMetrics'
import { DashboardTraining } from './DashboardTraining';
import { DashboardNetworking } from './DashboardNetworking';
import { useAuthStore } from '@/hooks/useAuth';

const Dashboard = () => {
  
    const user = useAuthStore((state) => state.user)
    useEffect(() => {
      console.log(user)
    }, [user])



    let firstNameOnly = ''
    if (user && user.firstName) {
      firstNameOnly= user.firstName.split(' ')[0];
    }
    
    return (
      <main className='flex flex-col w-full px-4 md:px-8 lg:px-12 xl:px-24'>
        <section className='py-8'>
          <h1 className='font-inter font-semibold pb-8 text-2xl text-dark'>Welcome back, {firstNameOnly}.</h1>
          <DashboardMetrics activeTrainings={232} jobsAvailable={132} upcomingEvents={13} />
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