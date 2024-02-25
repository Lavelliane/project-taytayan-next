'use client';
import React from 'react';
import FeedbackConfirmToast from '@/components/Feedback/FeedbackConfirmToast';
import {
	useConfirmToast,
	GlobalFeedbackConfirmConfirmToastProvider,
} from '@/components/Feedback/ShowFeedbackConfirmToast';
import { Button } from 'flowbite-react';

const page = () => {
	const { showConfirmToast } = useConfirmToast();

	const ShowToast = () => {
		showConfirmToast();
		console.log('clicked');
	};

	return (
		<div>
			<Button onClick={ShowToast}>Show toast</Button>
			<GlobalFeedbackConfirmConfirmToastProvider>
				<div className='fixed w-screen h-screen flex justify-center items-start z-[999]'>
					<FeedbackConfirmToast />
				</div>
			</GlobalFeedbackConfirmConfirmToastProvider>
		</div>
	);
};

export default page;
