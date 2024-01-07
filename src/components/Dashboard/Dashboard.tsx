import React from 'react';
import { DashboardMetrics } from './DashboardMetrics'
import { DashboardTraining } from './DashboardTraining';

const Dashboard = () => {
  
    return (
      <main className='flex flex-col w-full px-4 md:px-8 lg:px-12 xl:px-24'>
        <section className='py-8'>
          <h1 className='font-inter font-semibold pb-8 text-2xl text-dark'>Welcome back, Jhury.</h1>
          <DashboardMetrics activeTrainings={232} jobsAvailable={132} upcomingEvents={13} />
        </section>
        <section>
          <h1 className='font-inter font-semibold pb-4 text-lg text-dark'>Featured Trainings</h1>
          <DashboardTraining />
        </section>
      </main>
    );
  };
  
  export default Dashboard;