import React from 'react';
import { Card } from 'flowbite-react';
import { Employment } from '@/types/types';

interface JobPostDetailsProps {
	EmploymentData: Employment;
}

const JobPostDetails = ({ EmploymentData }: JobPostDetailsProps) => {
	return (
		<Card className={`max-w-full w-full flex p-0 shadow-none justify-between transition-all`}>JobPostDetails</Card>
	);
};

export default JobPostDetails;
