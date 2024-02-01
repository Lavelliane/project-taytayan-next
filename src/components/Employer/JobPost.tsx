import React, { useState, useEffect } from 'react';
import JobPostCard from './JobPostCard';
import JobPostDetails from './JobPostDetails';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { Employment } from '@/types/types';
import { query, getDocs, doc, getDoc, collection } from 'firebase/firestore';
import { DefaultEmployment } from '@/utils/DefaultProfile';

const JobPost = () => {
	const [job, setJob] = useState<Employment[]>([DefaultEmployment]);
	const [detailsOpened, setDetailsOpened] = useState<boolean[]>([false]);
	const [selectedCard, setSelectedCard] = useState<number>(0);

	const userStore = useAuthStore((state) => state.user);

	const handleDetailsOpen = (index: number) => {
		const updatedDetailsOpened = detailsOpened.map((value, i) => (i === index ? !value : false));
		setDetailsOpened(updatedDetailsOpened);

		setSelectedCard(index);
	};

	useEffect(() => {
		fetchEmployment();
	}, []);

	const fetchEmployment = async () => {
		try {
			const employmentRef = collection(db, 'employment');
			const employmentDoc = await getDocs(employmentRef);

			const fetchedEmployment: Employment[] = [];
			const detailsOpen: boolean[] = [];

			employmentDoc.forEach((doc) => {
				const employmentData: Employment = { ...(doc.data() as Employment) };
				fetchedEmployment.push(employmentData);
				detailsOpen.push(false);
			});
			setJob(fetchedEmployment);
			setDetailsOpened(detailsOpen);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{job?.length > 0 ? (
				<section className='flex gap-10 w-full p-10 rounded-xl'>
					<div className='flex flex-col gap-4 w-3/5 scroll-smooth '>
						{job?.map((data, index) => (
							<button
								key={index}
								onClick={() => handleDetailsOpen(index)}
								className={`w-full h-fit ${data.displayJob ? 'block' : 'hidden'} ${
									selectedCard === index ? 'border-tertiary border-4 rounded-xl' : 'border-0'
								}`}
							>
								<JobPostCard key={index} EmploymentData={data} />
							</button>
						))}
					</div>
					<div className='w-full scroll-smooth overflow-y-auto h-[84vh] sticky top-28'>
						<JobPostDetails EmploymentData={job[selectedCard]} />
					</div>
				</section>
			) : (
				<h1 className='font-semibold text-center lg:text-lg text-base'>No jobs posted yet. </h1>
			)}
		</>
	);
};

export default JobPost;
