import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/hooks/useAuth';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { User } from '@/types/types';
import { db } from '@/lib/firebase';
import { Registrant } from '@/types/types';
import Image from 'next/image';
import Avatar from '../../public/assets/avatar.png';

interface FormatRegistrantsProps {
	registrant: Registrant[];
}

export const FormatRegistrants = ({ registrant }: FormatRegistrantsProps) => {
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
				registrant.map((r) => r.registrantId)
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

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex gap-1'>
				{registrantAvatar?.slice(registrantAvatar?.length > 5 ? 0 - 2 : 0 - 5).map((avatar, index) => (
					<Image
						key={index}
						src={avatar.toString() || Avatar}
						alt='avatar icon'
						width={200}
						height={200}
						style={{ width: '30px', height: '30px', objectFit: 'fill', borderRadius: '100%' }}
					/>
				))}
				{registrantAvatar?.length > 5 && (
					<div className='relative items-center flex justify-center'>
						<Image
							src={registrantAvatar[2]?.toString()}
							alt='avatar icon'
							width={200}
							height={200}
							style={{
								filter: 'brightness(0.5)',
								width: '30px',
								height: '30px',
								objectFit: 'fill',
								borderRadius: '100%',
							}}
						/>
						<h1 className='text-white shadow-md absolute text-center font-normal'>{registrantAvatar?.length - 2}+</h1>
					</div>
				)}
			</div>
			<p className='text-xs lg:text-sm text-gray-600'>{formattedNames}</p>
		</div>
	);
};
