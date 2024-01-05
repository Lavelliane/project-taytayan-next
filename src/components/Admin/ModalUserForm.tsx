'use client';

import { Modal, Button, Checkbox, Label, TextInput, Dropdown, Datepicker } from 'flowbite-react';
import React, { useState } from 'react';
import Link from 'next/link';
import skillSuggestion from '@/utils/TypeSuggestion';

const ModalUserForm = () => {
	const [openModal, setOpenModal] = useState(false);
	const [sex, setSex] = useState('Select');
	const [employmentStatus, setEmploymentStatus] = useState('Select');
	const [skillsSuggestion, setSkillsSuggestion] = useState<string[]>([]);
	const [skills, setSkills] = useState<string[]>([]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSkills(value.split(','));

		const filterSkillSuggestion = skillSuggestion.filter((suggestion) =>
			suggestion.toLowerCase().includes(value.toLowerCase())
		);
		setSkillsSuggestion(filterSkillSuggestion);
	};

	const handleSkillSuggestionClick = (suggestion: string) => {
		setSkills([...skills, suggestion]);
		setSkillsSuggestion([]);
	};

	return (
		<>
			<Button onClick={() => setOpenModal(true)}>Register</Button>
			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>Member Registration</Modal.Header>
				<Modal.Body>
					<form className='flex max-w-full flex-col gap-4'>
						<div className='w-full flex gap-2 items-center'>
							<h1 className='text-primary font-bold text-lg'>Personal&nbsp;Information</h1>
							<span className='w-full h-[.5px] bg-black'></span>
						</div>
						<div className='flex md:flex-row flex-col gap-4 w-full'>
							<div className='w-full'>
								<div className='mb-2 block'>
									<Label htmlFor='Full Name' value='Full Name' />
								</div>
								<TextInput id='fullName' type='text' placeholder='e.g. Juan D. Cruz' required shadow />
							</div>
						</div>
						<div className='flex md:flex-row flex-col gap-4 w-full'>
							<div className='w-full'>
								<div className='mb-2 block'>
									<Label htmlFor='Date of Birth' value='Date of Birth' />
								</div>
								<Datepicker
									weekStart={1} // Monday
									shadow
									required
								/>
							</div>
							<div className='w-fit'>
								<div className='mb-2 block'>
									<Label htmlFor='Sex' value='Sex' />
								</div>
								<Dropdown id='sex' label={sex} dismissOnClick={true}>
									<Dropdown.Item onClick={() => setSex('Male ')}>Male</Dropdown.Item>
									<Dropdown.Item onClick={() => setSex('Female')}>Female</Dropdown.Item>
								</Dropdown>
							</div>
						</div>
						<div className='flex md:flex-row flex-col gap-4 w-full'>
							<div className='w-full'>
								<div className='mb-2 block'>
									<Label htmlFor='Email Address' value='Email Address' />
								</div>
								<TextInput id='email' type='email' placeholder='e.g. juancruz@gmail.com' required shadow />
							</div>
							<div className='w-full'>
								<div className='mb-2 block'>
									<Label htmlFor='Contact Number' value='Contact Number' />
								</div>
								<TextInput id='contactNumber' type='number' placeholder='e.g. 09128888999' required shadow />
							</div>
						</div>
						<div className='w-full flex gap-2 items-center mt-4'>
							<h1 className='text-primary font-bold text-lg'>Address&nbsp;Information</h1>
							<span className='w-full h-[.5px] bg-black'></span>
						</div>
						<div className='flex md:flex-row flex-col gap-4 w-full'>
							<div className='w-full'>
								<div className='mb-2 block'>
									<Label htmlFor='Address' value='Address' />
								</div>
								<TextInput id='address' type='text' placeholder='e.g. Nasipit, Talamban' required shadow />
							</div>
							<div className='w-full'>
								<div className='mb-2 block'>
									<Label htmlFor='City' value='City' />
								</div>
								<TextInput id='city' type='text' placeholder='e.g. Cebu City' required shadow />
							</div>
						</div>
						<div className='flex md:flex-row flex-col gap-4 w-full'>
							<div className='w-full'>
								<div className='mb-2 block'>
									<Label htmlFor='State' value='State/Province' />
								</div>
								<TextInput id='state' type='text' placeholder='e.g. Cebu' required shadow />
							</div>
							<div className='w-full'>
								<div className='mb-2 block'>
									<Label htmlFor='Country' value='Country' />
								</div>
								<TextInput id='country' type='text' placeholder='e.g. Philippines' required shadow />
							</div>
						</div>
						<div className='w-full flex gap-2 items-center mt-4'>
							<h1 className='text-primary font-bold text-lg'>Employment&nbsp;Information</h1>
							<span className='w-full h-[.5px] bg-black'></span>
						</div>
						<div className='flex md:flex-row flex-col gap-4 w-full'>
							<div className='w-fit'>
								<div className='mb-2 block'>
									<Label htmlFor='Employment Status' value='Status' />
								</div>
								<Dropdown id='employmentStatus' label={employmentStatus} dismissOnClick={true}>
									<Dropdown.Item onClick={() => setEmploymentStatus('Employed ')}>Employed</Dropdown.Item>
									<Dropdown.Item onClick={() => setEmploymentStatus('Unemployed')}>Unemployed</Dropdown.Item>
								</Dropdown>
							</div>
							{employmentStatus === 'Employed ' && (
								<div className='w-full'>
									<div className='mb-2 block'>
										<Label htmlFor='Current Occupation' value='Occupation' />
									</div>
									<TextInput id='occupation' type='text' placeholder='e.g. Pipe Welder' required shadow />
								</div>
							)}
						</div>
						<div className='w-full flex gap-2 items-center mt-4'>
							<h1 className='text-primary font-bold text-lg'>Skills</h1>
							<span className='w-full h-[.5px] bg-black'></span>
						</div>
						<div className='w-full text-black relative'>
							<div className='mb-2 block'>
								<Label htmlFor='Skills' value='What are you good at?' />
							</div>
							<TextInput
								id='skills'
								type='text'
								placeholder='e.g. Pipe Welder'
								value={skills}
								onChange={handleInputChange}
								required
								shadow
							/>
							{skillsSuggestion.length > 0 && (
								<ul>
									{skillsSuggestion.map((suggestion, index) => (
										<li key={index} onClick={() => handleSkillSuggestionClick(suggestion)}>
											{suggestion}
										</li>
									))}
								</ul>
							)}
						</div>

						<div className='flex items-center gap-2'>
							<Checkbox id='agree' />
							<Label htmlFor='agree' className='flex'>
								I agree with the&nbsp;
								<Link href='#' className='text-cyan-600 hover:underline dark:text-cyan-500'>
									terms and conditions
								</Link>
							</Label>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setOpenModal(false)}>I accept</Button>
					<Button color='gray' onClick={() => setOpenModal(false)}>
						Decline
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalUserForm;
