import React, { useState, useEffect } from 'react';
import MyJobPostCard from './MyJobPostCard';
import MyJobPostDetails from './MyJobPostDetails';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { Employment } from '@/types/types';
import { query, getDocs, doc, getDoc, collection, where } from 'firebase/firestore';
import { DefaultEmployment } from '@/utils/Defaults';

const MyJobPost = () => {
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
			if (userStore?.jobsPosted?.length > 0) {
				const employmentRef = query(collection(db, 'employment'), where('employmentId', 'in', userStore.jobsApplied));
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
		<section className='flex gap-10 w-full p-10 rounded-xl'>
			<div className='flex flex-col gap-4 w-3/5 scroll-smooth '>
				{job?.map((data, index) => (
					<button
						key={data.employmentId}
						onClick={() => handleDetailsOpen(index)}
						className={`w-full h-fit ${selectedCard === index ? 'border-tertiary border-4 rounded-xl' : 'border-0'}`}
					>
						<MyJobPostCard key={data.employmentId} EmploymentData={data} />
					</button>
				))}
			</div>
			<div className='w-full scroll-smooth overflow-y-auto h-[84vh] sticky top-28'>
				<MyJobPostDetails EmploymentData={job[selectedCard]} />
			</div>
		</section>
	);
};

export default MyJobPost;
