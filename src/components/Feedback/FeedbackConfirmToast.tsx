'use client';
import React, { useEffect, useState } from 'react';
import { Toast, ToastToggle, Progress, Rating, RatingStar } from 'flowbite-react';
import { MdCheck } from 'react-icons/md';
import { useConfirmToast } from './ShowFeedbackConfirmToast';
import { useModal } from './ShowFeedbackModal';

const FeedbackConfirmToast = () => {
	const { showConfirmToast, hideConfirmToast, isConfirmToastVisible } = useConfirmToast();
	const { showModal } = useModal();
	const [progress, setProgress] = useState(100); // Initial progress at 100%

	useEffect(() => {
		if (isConfirmToastVisible) {
			setProgress(100);
		}
	}, [isConfirmToastVisible]);

	useEffect(() => {
		let timerId: any;

		if (isConfirmToastVisible) {
			timerId = setInterval(() => {
				setProgress((prevProgress) => prevProgress - 1 / 5);
			}, 1); // Decrease every 1 millisecond
		}

		// setTimeout to close the survey form after 30 seconds
		const timeoutId = setTimeout(() => {
			setProgress(100);
			hideConfirmToast();
			clearTimeout(timerId); // Clear the interval when the survey form is closed
		}, 5000); // 5000 milliseconds = 5 seconds

		return () => {
			clearInterval(timerId); // Cleanup function to clear the interval
			clearTimeout(timeoutId); // Cleanup function to clear the timeout
		};
	}, [isConfirmToastVisible]);

	return (
		isConfirmToastVisible && (
			<Toast className='mt-4 flex items-start'>
				<div className='flex items-start justify-start'>
					<div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tertiary/10 text-tertiary dark:bg-tertiary dark:text-tertiary/10'>
						<MdCheck className='h-5 w-5' />
					</div>
					<div className='ml-3 text-sm font-normal'>
						<span className='mb-1 text-sm font-semibold text-gray-900 dark:text-white'>Feedback Submitted</span>
						<p className='mb-2 text-sm font-normal'>Thank you for your response.</p>

						<Rating className='flex gap-2 items-center justify-center'>
							<RatingStar className={`transition-transform ${progress < 70 ? 'scale-100' : 'scale-0'}`} />
							<RatingStar className={`transition-transform ${progress < 55 ? 'scale-100' : 'scale-0'}`} />
							<RatingStar className={`transition-transform ${progress < 40 ? 'scale-100' : 'scale-0'}`} />
							<RatingStar className={`transition-transform ${progress < 25 ? 'scale-100 ' : 'scale-0'}`} />
							<RatingStar className={`transition-transform ${progress < 10 ? 'scale-100' : 'scale-0'}`} />
						</Rating>
					</div>
				</div>
				<ToastToggle />
			</Toast>
		)
	);
};

export default FeedbackConfirmToast;
