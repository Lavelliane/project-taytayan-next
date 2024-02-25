'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Label, TextInput, Button, Rating, RatingStar } from 'flowbite-react';
import { FeedbackSchema, FeedbackType } from '@/schemas/FeedbackSchema';
import { DefaultFeedback } from '@/utils/Defaults';
import {
	satisfactionOptions,
	navigationOptions,
	layoutOptions,
	bugsOptions,
	speedOptions,
	recommendationOptions,
} from '@/utils/Options';
import { useAuthStore } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useModal } from './ShowFeedbackModal';

const FeedbackFormModal = () => {
	const [satisfactionRating, setSatisfactionRating] = useState<number>(-1);
	const [navigationRating, setNavigationRating] = useState<number>(-1);
	const [layoutRating, setLayoutRating] = useState<number>(-1);
	const [bugsRating, setBugsRating] = useState<number>(-1);
	const [speedRating, setSpeedRating] = useState<number>(-1);
	const [recommendationRating, setRecommendationRating] = useState<number>(-1);

	const userStore = useAuthStore((state) => state.user);
	const { isModalVisible, hideModal } = useModal();

	const resetForm = () => {
		reset(); // Reset the form to its default values
		hideModal();
	};

	const submitFeedbackForm = async (feedbackPayload: FeedbackType) => {
		const finalPayload = {
			...feedbackPayload,
			name: userStore.firstName + ' ' + userStore.lastName,
			email: userStore.email,
		};
		console.log(finalPayload);

		const feedbackRef = collection(db, 'feedback');
		const feedbackCreated = await addDoc(feedbackRef, finalPayload);

		resetForm();
	};

	const form = useForm<FeedbackType>({
		resolver: zodResolver(FeedbackSchema),
		mode: 'onChange',
		defaultValues: DefaultFeedback,
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = form;

	const onSelectRating = (value: number, ratingCategory: string) => {
		let valueData = value + 1;
		if (ratingCategory === 'navigation') {
			setNavigationRating(value);
			form.setValue('navigation', valueData);
			form.trigger('navigation');
		} else if (ratingCategory === 'layout') {
			setLayoutRating(value);
			form.setValue('layout', valueData);
			form.trigger('layout');
		} else if (ratingCategory === 'bugs') {
			setBugsRating(value);
			form.setValue('bugs', valueData);
			form.trigger('bugs');
		} else if (ratingCategory === 'speed') {
			setSpeedRating(value);
			form.setValue('speed', valueData);
			form.trigger('speed');
		} else if (ratingCategory === 'satisfaction') {
			setSatisfactionRating(value);
			form.setValue('satisfaction', valueData);
			form.trigger('satisfaction');
		} else if (ratingCategory === 'recommendation') {
			setRecommendationRating(value);
			form.setValue('recommendation', valueData);
			form.trigger('recommendation');
		}
	};

	return (
		<Modal show={isModalVisible} position='center' size='2xl' onClose={() => resetForm()} popup>
			<Modal.Header>
				<span className='font-bold pl-3'>Feedback Form</span>
			</Modal.Header>
			<Modal.Body className='flex flex-col gap-4'>
				<form className='flex max-w-full flex-col gap-4' onSubmit={handleSubmit(submitFeedbackForm)}>
					<div className='flex flex-col w-full items-start justify-between gap-2'>
						<Label
							htmlFor='navigation'
							className='font-semibold md:text-base text-sm'
							value='How easy was it to navigate through the application?'
						/>
						<Rating size={'md'} className='sm:w-fit sm:mr-4 w-full justify-center items-center'>
							{navigationOptions.map((rating, index) => (
								<div key={rating.key} className='flex items-center justify-center '>
									<RatingStar
										key={rating.key}
										id={rating.key}
										name='navigation'
										filled={index <= navigationRating}
										onClick={() => onSelectRating(index, 'navigation')}
									/>
								</div>
							))}
						</Rating>

						{errors.navigation && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.navigation.message}</span>
						)}
					</div>
					<div className='flex flex-col w-full items-start justify-between gap-2'>
						<Label
							htmlFor='layout'
							className='font-semibold md:text-base text-sm'
							value='Did you find the layout/design of the application appealing?'
						/>
						<Rating size={'md'} className='sm:w-fit sm:mr-4 w-full justify-center items-center'>
							{layoutOptions.map((rating, index) => (
								<div key={rating.key} className='flex items-center justify-center '>
									<RatingStar
										key={rating.key}
										id={rating.key}
										name='layout'
										filled={index <= layoutRating}
										onClick={() => onSelectRating(index, 'layout')}
									/>
								</div>
							))}
						</Rating>

						{errors.layout && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.layout.message}</span>
						)}
					</div>
					<div className='flex flex-col w-full items-start justify-between gap-2'>
						<Label
							htmlFor='bugs'
							className='font-semibold md:text-base text-sm'
							value='How often do you encounter bugs or glitches while using the application?'
						/>
						<Rating size={'md'} className='sm:w-fit sm:mr-4 w-full justify-center items-center'>
							{bugsOptions.map((rating, index) => (
								<div key={rating.key} className='flex items-center justify-center '>
									<RatingStar
										key={rating.key}
										id={rating.key}
										name='bugs'
										filled={index <= bugsRating}
										onClick={() => onSelectRating(index, 'bugs')}
									/>
								</div>
							))}
						</Rating>

						{errors.bugs && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.bugs.message}</span>
						)}
					</div>
					<div className='flex flex-col w-full items-start justify-between gap-2'>
						<Label
							htmlFor='speed'
							className='font-semibold md:text-base text-sm'
							value='How would you rate the speed and performance of the application?'
						/>
						<Rating size={'md'} className='sm:w-fit sm:mr-4 w-full justify-center items-center'>
							{speedOptions.map((rating, index) => (
								<div key={rating.key} className='flex items-center justify-center '>
									<RatingStar
										key={rating.key}
										id={rating.key}
										name='speed'
										filled={index <= speedRating}
										onClick={() => onSelectRating(index, 'speed')}
									/>
								</div>
							))}
						</Rating>

						{errors.speed && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.speed.message}</span>
						)}
					</div>
					<div className='flex flex-col w-full items-start justify-between gap-2'>
						<Label
							htmlFor='satisfaction'
							className='font-semibold md:text-base text-sm'
							value='Overall, how satisfied are you with our application?'
						/>
						<Rating size={'md'} className='sm:w-fit sm:mr-4 w-full justify-center items-center'>
							{satisfactionOptions.map((rating, index) => (
								<div key={rating.key} className='flex items-center justify-center '>
									<RatingStar
										key={rating.key}
										id={rating.key}
										name='satisfaction'
										filled={index <= satisfactionRating}
										onClick={() => onSelectRating(index, 'satisfaction')}
									/>
								</div>
							))}
						</Rating>

						{errors.satisfaction && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.satisfaction.message}</span>
						)}
					</div>
					<div>
						<Label
							htmlFor='recommendation'
							className='font-semibold md:text-base text-sm'
							value='How likely are you to recommend our application to a friend or colleague?'
						/>

						<Rating size={'md'} className='sm:w-fit sm:mr-4 w-full justify-center items-center'>
							{recommendationOptions.map((rating, index) => (
								<div key={rating.key} className='flex items-center justify-center '>
									<RatingStar
										key={rating.key}
										id={rating.key}
										name='recommendation'
										filled={index <= recommendationRating}
										onClick={() => onSelectRating(index, 'recommendation')}
									/>
								</div>
							))}
						</Rating>
						{errors.recommendation && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.recommendation.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label
								htmlFor='improvements'
								className='font-semibold md:text-base text-sm'
								value='What improvements would you like to see in our application? (Optional)'
							/>
						</div>
						<TextInput
							id='improvements'
							type='text'
							placeholder='Leave a recommendation here...'
							{...register('improvements')}
						/>
						{errors.improvements && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.improvements.message}</span>
						)}
					</div>
					<div>
						<div className='mb-2 block'>
							<Label
								htmlFor='comments'
								className='font-semibold md:text-base text-sm'
								value='Do you have any additional comments or suggestions for us? (Optional)'
							/>
						</div>
						<TextInput id='comments' type='text' placeholder='Leave a comment here...' {...register('comments')} />
						{errors.comments && (
							<span className='text-xs lg:text-sm text-red-600 font-semibold'>{errors.comments.message}</span>
						)}
					</div>
					<Button type='submit' disabled={!isValid}>
						Submit
					</Button>
				</form>
			</Modal.Body>
		</Modal>
	);
};

export default FeedbackFormModal;
