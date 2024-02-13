'use client';
import SignUp from '@/components/Login/SignUp';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

const page = () => {
	return (
		<div>
			<SignUp />
			<Next13ProgressBar height='2px' color='#FFC72C' options={{ showSpinner: false }} showOnShallow />
		</div>
	);
};

export default page;
