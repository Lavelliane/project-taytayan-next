import React from 'react';
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
    return (
        <div className='min-w-3xl w-full'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 text-white'>
                <MetricsBanner />
                <ActiveTrainingsMetrics activeTrainings={activeTrainings} />
                <JobsAvailableMetrics jobsAvailable={jobsAvailable} />
                <UpcomingEventsMetrics upcomingEvents={upcomingEvents} />
            </div>
        </div>
    );
};