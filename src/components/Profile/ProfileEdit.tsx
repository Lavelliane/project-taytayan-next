import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Card } from 'flowbite-react';

const ProfileEdit = () => {
    const name = 'Jhury Kevin Lastre';
    const pronounce = 'He/Him';
    const address = 'Talamban, Cebu';
    const occupation = 'Student';
    const aboutMe = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. ';
    const email = 'jhurylastre@gmail.com'
    const school = 'University of San Carlos - Talamban Campus';
    const course = 'Bachelor of Science in Information and Communications Technology';
    const industry = 'Bachelor of Science in Information and Communications Technology';
    const interests = ['Web Development', 'Mobile Development', 'UI/UX Design', 'Cyber Security']
    const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'React Native', 'NodeJS', 'ExpressJS', 'MongoDB', 'MySQL', 'Java']

    const trainings = 5;
    const events = 2;

    return <form className="h-fit w-full lg:p-0 p-4">
        <div className="flex flex-col w-full lg:h-52 relative">
            <div className="absolute w-full h-32 bg-[#9B5FFC] rounded-lg">
            </div>
            <div className="lg:px-10 w-full h-fit z-10 lg:absolute sm:bottom-0 flex lg:flex-row flex-col items-center justify-between">
                <div className="flex lg:flex-row flex-col lg:gap-6 items-center lg:items-end">
                    <Image src="/favicon.ico" alt="Profile" width={0} height={0} className="rounded-full" style={{ width: 'auto', height: '140px', objectFit: 'fill' }} />
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">Profile</h1>
                        <h2 className="text-gray-700">Upload your photo and personal details</h2>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Link href='/profile' className="mt-8 px-3 py-2 text-xs font-medium text-center text-gray-900 rounded-full border border-gray-400 hover:bg-gray-400 focus:ring-1 focus:outline-none focus:ring-gray-400  dark:hover:bg-gray-400 dark:focus:ring-gray-400">Cancel</Link>
                    <button type="submit" className="bg-gray-700 mt-8 px-3 py-2 text-xs font-medium text-center text-white rounded-full border border-gray-600 hover:bg-gray-600 focus:ring-1 focus:outline-none focus:ring-gray-600  dark:hover:bg-gray-600 dark:focus:ring-gray-600">Save</button>
                </div>
            </div>
        </div>
        <div className="flex w-full flex-col gap-6 md:m-14 m-0">
            <h1 className="font-semibold text-lg">Basic Info</h1>
            <div className="flex flex-col max-w-xl w-full gap-6">
                <div className="w-full flex items-center gap-4">
                    <label htmlFor="name" className="text-sm font-semibold w-1/4">
                        Name
                    </label>
                    <input type="text" name="name" id="name" placeholder={name} className="focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="w-full flex items-center gap-4">
                    <label htmlFor="address" className="text-sm font-semibold w-1/4">
                        Address
                    </label>
                    <input type="text" name="address" id="address" placeholder={address} className="focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="w-full flex items-center gap-4">
                    <label htmlFor="occupation" className="text-sm font-semibold w-1/4">
                        Occupation
                    </label>
                    <input type="text" name="occupation" id="occupation" placeholder={occupation} className="focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="w-full flex items-center gap-4">
                    <label htmlFor="pronoun" className="text-sm font-semibold w-1/4">
                        Pronoun
                    </label>
                    <select id='pronoun' name='pronoun' className="focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                        <option value='he'>He/Him</option>
                        <option value='she'>She/Her</option>
                        <option value='they'>They/Them</option>
                    </select>
                </div>
            </div>

        </div>
        <div className="flex w-full flex-col gap-6 md:m-14 m-0">
            <h1 className="font-semibold text-lg">About Me</h1>
            <div className="flex flex-col max-w-xl w-full gap-6">
                <div className="w-full flex flex-col items-start gap-4">
                    <label htmlFor="bio" className="text-sm font-semibold">
                        Bio
                    </label>
                    <textarea name="bio" id="bio" placeholder={aboutMe} className="focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-4" />
                </div>
                <div>
                    <label htmlFor="skill" className="text-sm font-semibold">
                        Skills
                    </label>
                    <p className="text-sm text-gray-600">Add skills to display your experience</p>
                    <h5 className="text-sm text-gray-900 dark:text-gray-400">
                        <br />

                        <span className="flex flex-wrap gap-2 mt-1">
                            {skills.map((skill) => (<span className="font-normal px-2 py-1 border border-gray-700 rounded-full" key={skill}>{skill}<br /></span>))}
                        </span>
                    </h5>
                    <input type="text" name="skill" id="skill" placeholder={skills.join(', ')} className="focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
            </div>

        </div>

    </form>;
};

export default ProfileEdit;
