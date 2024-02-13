'use client';
import SignIn from '@/components/Login/SignIn';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

const page = () => {
	return (
		<div>
			<SignIn />
			<Next13ProgressBar height='2px' color='#FFC72C' options={{ showSpinner: false }} showOnShallow />
		</div>
	);
};

export default page;
