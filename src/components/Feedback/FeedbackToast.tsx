'use client';
import React, { useEffect, useState } from 'react';
import { Button, Toast, ToastToggle, Progress } from 'flowbite-react';
import { MdStarRate } from 'react-icons/md';
import { useToast } from './ShowFeedbackToast';
import { useModal } from './ShowFeedbackModal';

const FeedbackToast = () => {
	const { showToast, hideToast, isToastVisible } = useToast();
	const { showModal } = useModal();
	const [progress, setProgress] = useState(100); // Initial progress at 100%

	const onOpen = () => {
		showModal();
		hideToast();
	};

	useEffect(() => {
		if (isToastVisible) {
			setProgress(100);
		}
	}, [isToastVisible]);

	useEffect(() => {
		let timerId: any;

		if (isToastVisible) {
			timerId = setInterval(() => {
				setProgress((prevProgress) => prevProgress - 1 / 36);
			}, 1); // Decrease every 1 millisecond
		}

		// setTimeout to close the survey form after 30 seconds
		const timeoutId = setTimeout(() => {
			setProgress(100);
			hideToast();
			clearTimeout(timerId); // Clear the interval when the survey form is closed
		}, 15000); // 15000 milliseconds = 15 seconds

		return () => {
			clearInterval(timerId); // Cleanup function to clear the interval
			clearTimeout(timeoutId); // Cleanup function to clear the timeout
		};
	}, [isToastVisible]);

	return (
		isToastVisible && (
			<Toast className='z-[999] bottom-4'>
				<div className='flex items-start'>
					<div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tertiary/90 text-tertiary dark:bg-tertiary dark:text-tertiary/70'>
						<MdStarRate className='h-5 w-5' />
					</div>
					<div className='ml-3 text-sm font-normal'>
						<span className='mb-1 text-sm font-semibold text-gray-900 dark:text-white'>Feedback Form</span>
						<div className='mb-2 text-sm font-normal'>Let us know your experience on the application.</div>
						<div className='flex-start flex gap-2 mb-2'>
							<div className='w-auto'>
								<Button
									type='button'
									size='xs'
									onClick={onOpen}
									gradientMonochrome='tertiary'
									theme={{
										gradient: {
											tertiary:
												'text-white bg-gradient-to-r from-tertiary/60 via-tertiary/80 to-tertiary enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-tertiary/60 dark:focus:ring-tertiary',
										},
									}}
								>
									Open
								</Button>
							</div>
							<div className='w-auto'>
								<Button type='button' color='light' size='xs' onClick={hideToast}>
									Not now
								</Button>
							</div>
						</div>
						<Progress
							progress={progress}
							color='tertiary'
							theme={{
								color: {
									tertiary:
										'text-white bg-gradient-to-l from-tertiary/60 via-tertiary/80 to-tertiary enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-tertiary/60 dark:focus:ring-tertiary',
								},
							}}
						/>
					</div>
					<ToastToggle />
				</div>
			</Toast>
		)
	);
};

export default FeedbackToast;
