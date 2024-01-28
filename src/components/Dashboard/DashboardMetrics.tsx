import React, { useState, useEffect } from 'react';
import { ActiveTrainingsMetrics } from '@/components/Dashboard/ActiveTrainingsMetrics';
import { JobsAvailableMetrics } from '@/components/Dashboard/JobsAvailableMetrics';
import { MetricsBanner } from '@/components/Dashboard/MetricsBanner';
import { UpcomingEventsMetrics } from './UpcomingEventsMetrics';

type PropType = {
    activeTrainings: number;
    jobsAvailable: number;
    upcomingEvents: number;
}

export const DashboardMetrics: React.FC<PropType> = (props) => {
    const { activeTrainings, jobsAvailable, upcomingEvents } = props;
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
              setCountedFunction(targetValue); // Ensure the final count is exactly the target value
              clearInterval(intervalId);
            }
          }, interval);
        };
    
        incrementMetrics(activeTrainings, setCountedActiveTrainings);
        incrementMetrics(jobsAvailable, setCountedJobsAvailable);
        incrementMetrics(upcomingEvents, setCountedUpcomingEvents);
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [activeTrainings, jobsAvailable, upcomingEvents]);

    return (
        <div className='min-w-3xl w-full'>
            <div className='grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-6 text-white'>
                <MetricsBanner />
                <ActiveTrainingsMetrics activeTrainings={countedActiveTrainings} />
                <JobsAvailableMetrics jobsAvailable={countedJobsAvailable} />
                <UpcomingEventsMetrics upcomingEvents={countedUpcomingEvents} />
            </div>
        </div>
    );
};