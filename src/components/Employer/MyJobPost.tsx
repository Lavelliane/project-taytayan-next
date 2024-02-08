import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MyJobPostCard from './MyJobPostCard';
import MyJobPostDetails from './MyJobPostDetails';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { Employment } from '@/types/types';
import { query, getDocs, collection, where } from 'firebase/firestore';
import { DefaultEmployment } from '@/utils/DefaultProfile';

const MyJobPost = () => {
	const [job, setJob] = useState<Employment[]>([]);
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
			if (userStore?.jobsPosted?.length > 0) {
				const employmentRef = query(collection(db, 'employment'), where('employmentId', 'in', userStore.jobsPosted));
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
			} else {
				console.log('No job posted');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{job && job?.length > 0 ? (
				<section className='flex gap-10 w-full p-10 rounded-xl'>
					<div className='flex flex-col gap-4 w-3/5 scroll-smooth '>
						{job?.map((data, index) => (
							<div key={data.employmentId}>
								<Link
									href={`/${data.employmentId}`}
									className={`w-full lg:hidden h-fit ${data.displayJob ? 'block' : 'hidden'} ${
										selectedCard === index ? 'border-tertiary border-4 rounded-xl' : 'border-0'
									}`}
								>
									<MyJobPostCard EmploymentData={data} />
								</Link>
								<button
									onClick={() => handleDetailsOpen(index)}
									className={`w-full hidden h-fit ${data.displayJob ? 'lg:block ' : 'hidden'} ${
										selectedCard === index ? 'border-tertiary border-4 rounded-xl' : 'border-0'
									}`}
								>
									<MyJobPostCard EmploymentData={data} />
								</button>
							</div>
						))}
					</div>
					<div className='w-full scroll-smooth overflow-y-auto h-[84vh] sticky top-28'>
						<MyJobPostDetails EmploymentData={job[selectedCard]} />
					</div>
				</section>
			) : (
				<h1 className='font-semibold text-center lg:text-lg text-base mt-10'>No jobs posted yet. </h1>
			)}
		</>
	);
};

export default MyJobPost;
