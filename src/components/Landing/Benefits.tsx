import React from 'react';
import Image from 'next/image';
import bridgeImage from '../../../public/assets/bridge.svg';
import certificationsImage from '../../../public/assets/certifications.svg';
import networkingImage from '../../../public/assets/networking.svg';
import jobseekImage from '../../../public/assets/jobseek.svg';
import trainingsImage from '../../../public/assets/trainings.svg';

const Benefits = () => {
	return (
		<section id='benefits' className='h-fit w-full flex justify-center pt-48 z-20 '>
			<div className='flex flex-col gap-24 max-w-5xl w-full justify-center items-center px-8 xl:px-0 '>
				<div className='w-full flex flex-col md:flex-row justify-evenly items-center md:items-start gap-6'>
					<Image src={trainingsImage} alt='benefit' style={{ width: 'auto', height: '300px', objectFit: 'fill' }} />
					<div className='max-w-lg flex flex-col gap-4'>
						<h1 className='text-xl md:text-3xl'>Find workshops and trainings offered near you</h1>
						<p className='font-lexendDeca text-sm md:text-base font-light'>
							Discover workshops and trainings conveniently located near you, providing easy access to valuable
							educational opportunities. Our platform streamlines the search process, allowing you to efficiently find
							and enroll in courses that align with your interests and professional goals, ensuring a seamless learning
							experience tailored to your needs.
						</p>
					</div>
				</div>
				<div className='w-full flex flex-col-reverse md:flex-row justify-evenly items-center md:items-start gap-6'>
					<div className='max-w-lg flex flex-col gap-4'>
						<h1 className='text-xl md:text-3xl'>Achieve proper completion of trainings to receive certifications</h1>
						<p className='font-lexendDeca text-sm md:text-base font-light'>
							Ensure successful completion of your training programs and enhance your skill set with our
							certification-focused approach. We guide you through the entire learning journey, offering resources and
							support to help you master the content. Upon completion, you'll receive certifications recognized by
							industry leaders, boosting your credibility and opening doors to new career opportunities.
						</p>
					</div>
					<Image
						src={certificationsImage}
						alt='benefit'
						style={{ width: 'auto', height: '300px', objectFit: 'fill' }}
					/>
				</div>
				<div className='w-full flex flex-col md:flex-row justify-evenly items-center md:items-start gap-6'>
					<Image src={networkingImage} alt='benefit' style={{ width: 'auto', height: '300px', objectFit: 'fill' }} />
					<div className='max-w-lg flex flex-col gap-4'>
						<h1 className='text-xl md:text-3xl'>Join community events and expand your social network</h1>
						<p className='font-lexendDeca text-sm md:text-base font-light'>
							Immerse yourself in a vibrant community of like-minded individuals by participating in our exclusive
							events. Expand your social network, connect with peers, and engage in meaningful discussions. Our
							community events foster collaboration and provide a supportive environment for continuous learning and
							professional growth.
						</p>
					</div>
				</div>
				<div className='w-full flex flex-col-reverse md:flex-row justify-evenly items-center md:items-start gap-6'>
					<div className='max-w-lg flex flex-col gap-4'>
						<h1 className='text-xl md:text-3xl'>Browse through our job board and interact with potential employers</h1>
						<p className='font-lexendDeca text-sm md:text-base font-light'>
							Explore job opportunities on our dedicated job board, connecting with potential employers seeking
							candidates with your skill set. Interact directly with hiring managers, submit applications, and stay
							informed about the latest job openings in your field. Our platform serves as a bridge between skilled
							professionals and employers, facilitating connections that can propel your career forward.
						</p>
					</div>
					<Image src={jobseekImage} alt='benefit' style={{ width: 'auto', height: '300px', objectFit: 'fill' }} />
				</div>
				<div className='flex flex-col gap-16'>
					<div className='max-w-lg flex flex-col gap-4'>
						<h1 className='text-xl md:text-3xl text-center'>Bridging you to Opportunities.</h1>
					</div>
					<Image src={bridgeImage} alt='benefit' style={{ width: 'auto', height: '300px', objectFit: 'fill' }} />
				</div>
			</div>
		</section>
	);
};

export default Benefits;
