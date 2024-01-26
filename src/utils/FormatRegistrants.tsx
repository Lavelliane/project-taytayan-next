import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/hooks/useAuth';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { User } from '@/types/types';
import { db } from '@/lib/firebase';
import { Registrant } from '@/types/types';
import Image from 'next/image';
import { Avatar } from 'flowbite-react';
import { DefaultProfile } from '@/utils/DefaultProfile';
import { avatarTheme } from '@/utils/ComponentThemes';
import SeeRegistrantsModal from '@/components/Trainings/SeeRegistrantsModal';

interface FormatRegistrantsProps {
	registrant: Registrant[];
}

export const FormatRegistrants = ({ registrant }: FormatRegistrantsProps) => {
	const [registrants, setRegistrants] = useState<String[]>([]);
	const [registrantAvatar, setRegistrantAvatar] = useState<String[]>([]);

	const [user, setUser] = useState<User>(DefaultProfile);

	const userStore = useAuthStore((state: { user: User }) => state.user);
	const updateState = useAuthStore((state) => state.updateUserState);

	useEffect(() => {
		setUser(userStore);
	}, []);

	useEffect(() => {
		fetchRegistrants();
	}, []);

	let nameInitials = '';
	if (user && user.firstName && user.lastName) {
		nameInitials = user?.firstName.charAt(0) + user?.lastName.charAt(0);
	}

	const fetchRegistrants = async () => {
		if (!registrant || registrant?.length === 0) {
			console.log('No registrants');
		} else if (registrant?.length > 0) {
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
					fetchedRegistrants.push(registrantData.firstName);
					fetchedRegistrantAvatar.push(registrantData.avatarURL);
				});
				setRegistrants(fetchedRegistrants);
				setRegistrantAvatar(fetchedRegistrantAvatar);
			}
		}
	};

	const formatNames = (nameList: String[]) => {
		const totalNames = nameList.length ?? 0;

		if (totalNames === 0) {
			return 'No names provided';
		}

		if (totalNames <= 2) {
			return nameList.join(' and ');
		}

		const firstNames = nameList.slice(0, 2).join(', ');
		const remainingCount = totalNames - 2;
		const othersText = remainingCount === 1 ? '1 other' : `${remainingCount} others`;

		return `${firstNames}, and ${othersText}`;
	};

	const formattedNames = formatNames(registrants);

	const [modalOpened, setModalOpened] = useState(false);

	const handleModalOpen = () => {
		setModalOpened(true);
	};

	const handleModalClose = () => {
		setModalOpened(false);
	};
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex gap-1'>
				<Avatar.Group>
					{registrantAvatar?.slice(registrantAvatar?.length > 8 ? 0 - 5 : 0 - 8).map((avatar, index) => (
						<Avatar
							onClick={handleModalOpen}
							key={index + '_' + avatar}
							rounded
							stacked
							size='md'
							placeholderInitials={nameInitials}
							color='info'
							theme={avatarTheme}
							className='justify-center bg-white rounded-full border-2 border-[#0090D8] hover:cursor-pointer'
							img={avatar?.toString()}
						/>
					))}
					{registrantAvatar?.length > 8 && <Avatar.Counter total={registrantAvatar?.length - 5} />}
				</Avatar.Group>
			</div>
			<p className='text-xs lg:text-sm text-gray-600'>{formattedNames}</p>
			<SeeRegistrantsModal
				registrant={registrant}
				seeRegistrantOpened={modalOpened}
				handleSeeRegistrantClose={handleModalClose}
			/>
		</div>
	);
};
