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
		<section className='flex gap-4 h-[84vh] w-full overflow-hidden  rounded-xl'>
			<div className='flex flex-col gap-4 w-3/5 scroll-smooth overflow-y-auto'>
				{job?.map((data, index) => (
					<button
						onClick={() => handleDetailsOpen(index)}
						className={`w-full h-fit ${selectedCard === index ? 'border-tertiary border-4 rounded-xl' : 'border-0'}`}
					>
						<JobPostCard EmploymentData={data} />
					</button>
				))}
			</div>
			<JobPostDetails EmploymentData={job[selectedCard]} />
		</section>
	);
};

export default JobPost;
