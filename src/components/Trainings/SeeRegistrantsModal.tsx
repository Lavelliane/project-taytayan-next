import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'flowbite-react';
import { Registrant } from '@/types/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { User } from '@/types/types';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Avatar from '../../../public/assets/avatar.png';

interface FormatRegistrantsProps {
	registrant: Registrant[];
}

const SeeRegistrantsModal = ({ registrant }: FormatRegistrantsProps) => {
	const [modalOpened, setModalOpened] = useState(false);
	const [registrants, setRegistrants] = useState<String[]>([]);
	const [registrantAvatar, setRegistrantAvatar] = useState<String[]>([]);

	useEffect(() => {
		fetchRegistrants();
	}, []);

	const fetchRegistrants = async () => {
		const registrantRef = query(
			collection(db, 'users'),
			where(
				'uid',
				'in',
				registrant?.map((r) => r.registrantId)
			)
		);
		const registrantDoc = await getDocs(registrantRef);

		if (!registrantDoc.empty) {
			const fetchedRegistrants: string[] = [];
			const fetchedRegistrantAvatar: string[] = [];
			registrantDoc.forEach((doc) => {
				const registrantData: User = { ...(doc.data() as User) };
				fetchedRegistrants.push(registrantData.firstName + ' ' + registrantData.lastName);
				fetchedRegistrantAvatar.push(registrantData.avatarURL);
			});
			setRegistrants(fetchedRegistrants);
			setRegistrantAvatar(fetchedRegistrantAvatar);
		}
	};

	const handleModalOpen = () => {
		setModalOpened(true);
	};

	const handleModalClose = () => {
		setModalOpened(false);
	};
	return (
		<>
			<Button
				className='w-fit bg-transparent focus:border-0 focus:outline-0 focus:ring-0 text-gray-700 px-0 py-0 hover:text-gray-500 underline-offset-2 underline'
				size='xs'
				color={'transparent'}
				onClick={handleModalOpen}
			>
				View All
				<svg className='-mr-1 ml-2 h-4 w-4' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
						clipRule='evenodd'
					/>
				</svg>
			</Button>

			<Modal dismissible show={modalOpened} position='center' size='sm' onClose={() => handleModalClose()} popup>
				<Modal.Header />
				<Modal.Body className='flex flex-col gap-4'>
					<div className='flex gap-2 items-center'>
						<svg
							className='w-12 h-12 text-gray-800 dark:text-white'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeWidth='2'
								d='M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z'
							/>
						</svg>
						<div className='flex flex-col items-start'>
							<h1 className='lg:text-base text-sm font-bold'>List of Registrants</h1>
							<h2 className='text-xs'>{registrants?.length} Participants</h2>
						</div>
					</div>
					<div className='flex flex-col gap-2 max-h-[300px] h-[300px]'>
						{registrantAvatar?.map((avatar, index) => (
							<div key={index} className='flex gap-2 items-center'>
								<Image
									key={index}
									src={avatar.toString() || Avatar}
									alt='avatar icon'
									width={200}
									height={200}
									style={{ width: '40px', height: '40px', objectFit: 'fill', borderRadius: '100%' }}
								/>
								<h1 className='font-normal lg:text-sm text-xs'>{registrants[index]?.toString()}</h1>
							</div>
						))}
					</div>
				</Modal.Body>
				<Modal.Footer />
			</Modal>
		</>
	);
};

export default SeeRegistrantsModal;
