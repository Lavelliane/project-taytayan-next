import React, { useEffect, useState } from 'react';
import { Avatar, CustomFlowbiteTheme } from 'flowbite-react';

type UserAvatarProps = {
	firstName: string;
	lastName: string;
	avatarURL: string;
	role: string;
	size: string;
};
const avatarTheme: CustomFlowbiteTheme['avatar'] = {
	root: {
		bordered: 'p-1 ring-2 justify-center items-center',
		color: {
			info: 'ring-[#0090D8]',
			success: 'ring-[#429445]',
			warning: 'ring-[#F6C951]',
		},
		img: {
			placeholder: 'text-gray-400 w-auto h-auto',
		},
	},
};

const UserAvatar: React.FC<UserAvatarProps> = (props) => {
	const { firstName, lastName, avatarURL, role, size } = props;
	const [nameInitials, setNameInitials] = useState<string>('');
	useEffect(() => {
		if (firstName || lastName) {
			setNameInitials(firstName.charAt(0) + lastName.charAt(0));
		}
	}, [firstName, lastName]);

	return (
		<div>
			<Avatar
				size={size}
				placeholderInitials={nameInitials}
				img={avatarURL ?? ''}
				alt='user'
				rounded
				className={`rounded-full 
        ${
					role === 'training_center'
						? 'border-[#429445]'
						: role === 'employer'
						? 'border-[#F6C951]'
						: role === 'general'
						? 'border-[#0090D8]'
						: 'border-gray-300'
				}
        ${size === 'sm' ? 'border-2' : size === 'xl' ? 'border-0' : 'border-0'}`}
			/>
		</div>
	);
};

export default UserAvatar;
