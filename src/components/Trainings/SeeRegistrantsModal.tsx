import React, { useState, useEffect } from 'react';
import { Modal, Avatar } from 'flowbite-react';
import { Registrant, User } from '@/types/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { avatarTheme } from '@/utils/ComponentThemes';

interface FormatRegistrantsProps {
	registrant: Registrant[];
	seeRegistrantOpened: boolean;
	handleSeeRegistrantClose: () => void;
}

const SeeRegistrantsModal = ({ registrant, seeRegistrantOpened, handleSeeRegistrantClose }: FormatRegistrantsProps) => {
	const [registrants, setRegistrants] = useState<string[]>([]);
	const [initials, setInitials] = useState<string[]>([]);
	const [registrantAvatar, setRegistrantAvatar] = useState<string[]>([]);

	useEffect(() => {
		fetchRegistrants();
	}, []);

	const fetchRegistrants = async () => {
		if (!registrant || registrant?.length === 0) {
			console.log('No registrants');
		} else if (registrant?.length > 0) {
			const registrantRef = query(
				collection(db, 'users'),
				where('uid', 'in', registrant?.map((r) => r.registrantId) ?? [])
			);
			const registrantDoc = await getDocs(registrantRef);

			if (!registrantDoc.empty) {
				const fetchedRegistrants: string[] = [];
				const fetchedRegistrantAvatar: string[] = [];
				const fetchedInitials: string[] = [];
				registrantDoc.forEach((doc) => {
					const registrantData: User = { ...(doc.data() as User) };
					fetchedRegistrants.push(registrantData.firstName + ' ' + registrantData.lastName);
					fetchedRegistrantAvatar.push(registrantData.avatarURL);
					fetchedInitials.push(registrantData.firstName.charAt(0) + registrantData.lastName.charAt(0));
				});
				setRegistrants(fetchedRegistrants);
				setRegistrantAvatar(fetchedRegistrantAvatar);
				setInitials(fetchedInitials);
			}
		}
	};

	return (
		<Modal
			dismissible
			show={seeRegistrantOpened}
			position='center'
			size='sm'
			onClose={() => handleSeeRegistrantClose()}
			popup
		>
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
						<div key={avatar} className='flex gap-2 items-center'>
							<Avatar
								rounded
								stacked
								size='md'
								placeholderInitials={initials[index].toString()}
								color='info'
								theme={avatarTheme}
								className='justify-center bg-white rounded-full border-2 border-[#0090D8]'
								img={avatar?.toString()}
							/>
							<h1 className='font-normal lg:text-sm text-xs'>{registrants[index]?.toString()}</h1>
						</div>
					))}
				</div>
			</Modal.Body>
			<Modal.Footer />
		</Modal>
	);
};

export default SeeRegistrantsModal;
