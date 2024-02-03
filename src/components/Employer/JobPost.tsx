import React, { useState, useEffect } from 'react';
import JobPostCard from './JobPostCard';
import JobPostDetails from './JobPostDetails';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { Employment } from '@/types/types';
import { query, getDocs, doc, getDoc, collection } from 'firebase/firestore';
import { DefaultEmployment } from '@/utils/DefaultProfile';
import Link from 'next/link';

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
				<section className='flex gap-10 w-full sm:p-10 p-0 rounded-xl'>
					<div className='flex flex-col gap-4 md:w-3/5 w-full scroll-smooth '>
						{job?.map((data, index) => (
							<div key={data.employmentId}>
								<Link
									key={data.employmentId}
									href={`/${data.employmentId}`}
									className={`w-full lg:hidden h-fit ${data.displayJob ? 'block' : 'hidden'} ${
										selectedCard === index ? 'border-tertiary border-4 rounded-xl' : 'border-0'
									}`}
								>
									<JobPostCard key={data.employmentId} EmploymentData={data} />
								</Link>
								<button
									key={data.employmentId}
									onClick={() => handleDetailsOpen(index)}
									className={`w-full hidden h-fit ${data.displayJob ? 'lg:block ' : 'hidden'} ${
										selectedCard === index ? 'border-tertiary border-4 rounded-xl' : 'border-0'
									}`}
								>
									<JobPostCard key={data.employmentId} EmploymentData={data} />
								</button>
							</div>
						))}
					</div>
					<div className='md:block hidden w-full scroll-smooth overflow-y-auto h-[84vh] sticky top-28'>
						<JobPostDetails EmploymentData={job[selectedCard]} />
					</div>
				</section>
			) : (
				<h1 className='font-semibold text-center lg:text-lg text-base mt-10'>No jobs posted yet. </h1>
			)}
		</>
	);
};

export default JobPost;
