import { CustomFlowbiteTheme } from 'flowbite-react';

export const avatarTheme: CustomFlowbiteTheme['avatar'] = {
	root: {
		bordered: 'p-1 ring-2',
		color: {
			info: 'ring-tertiary',
		},
	},
};

export const cardTheme: CustomFlowbiteTheme['card'] = {
	root: {
		children: 'flex h-full flex-col justify-between gap-2 lg:gap-3 xl:gap-4 p-6',
	},
};
