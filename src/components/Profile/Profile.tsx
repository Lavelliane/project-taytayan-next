import Image from "next/image";
import React from "react";
import { Card } from 'flowbite-react';
import Link from "next/link";

const Profile = () => {
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

    return <main className="h-screen w-full">
        <div className="flex flex-col w-full h-52 relative">
            <div className="absolute w-full h-32 bg-[#9B5FFC] rounded-lg">
            </div>
            <div className="px-10 w-full h-fit z-10 absolute bottom-0 flex sm:flex-row flex-col items-center justify-between">
                <div className="flex gap-6 items-end ">
                    <Image src="/favicon.ico" alt="Profile" width={0} height={0} className="rounded-full" style={{ width: 'auto', height: '140px', objectFit: 'fill' }} />
                    <div className="flex flex-col ">
                        <h1 className="text-xl font-bold">{name}&nbsp;<span className="text-xs font-normal">({pronounce})</span></h1>
                        <h2 className="text-gray-700">{address}</h2>
                        <h2 className="text-[#FDBC09] font-semibold">{occupation}</h2>
                    </div>
                </div>
                <Link href='/profile/edit' className="mt-8 px-3 py-2 text-xs font-medium text-center text-gray-900 rounded-full border border-gray-400 hover:bg-gray-400 focus:ring-1 focus:outline-none focus:ring-gray-400  dark:hover:bg-gray-400 dark:focus:ring-gray-400">Edit Profile</Link>
            </div>
        </div>
        <div className="flex w-fit h-fit my-10 gap-20">
            <div className="flex w-full flex-col gap-6">
                <h1 className="font-semibold text-lg">About Me</h1>
                <p>{aboutMe}</p>
                <h5 className="text-sm text-gray-900 dark:text-gray-400">
                    <span className="font-semibold">Skills</span><br />
                    <span className="flex flex-wrap gap-2 mt-1">
                        {skills.map((skill) => (<span className="font-normal px-2 py-1 border border-gray-700 rounded-full" key={skill}>{skill}<br /></span>))}
                    </span>
                </h5>
            </div>

            <Card href="#" className="max-w-2xl w-[42rem] h-fit">
                <h5 className="text-sm text-gray-900 dark:text-gray-400">
                    <span className="font-semibold">Email</span><br />
                    {email}
                </h5>
                <h5 className="text-sm text-gray-900 dark:text-gray-400">
                    <span className="font-semibold">Education</span>
                    <br />
                    <span className="font-semibold">
                        {school}
                    </span>
                    <br />
                    {course}
                </h5>
                <h5 className="text-sm text-gray-900 dark:text-gray-400">
                    <span className="font-semibold">Industry</span><br />
                    {industry}
                </h5>
                <h5 className="text-sm text-gray-900 dark:text-gray-400">
                    <span className="font-semibold">Interest</span><br />
                    <span className="flex flex-wrap gap-2 mt-1">
                        {interests.map((interest) => (<span className="font-normal px-2 py-1 border border-gray-700 rounded-full" key={interest}>{interest}<br /></span>))}
                    </span>
                </h5>
            </Card>
        </div>
        <div className="min-w-full w-full h-[1px] bg-gray-400 mb-4"></div>
        <div className="flex gap-4">
            <div className="px-4 py-1 bg-[#00AAFF] rounded-full w-fit text-sm font-semibold text-white">
                <span>Trainings Completed&nbsp;&nbsp;&nbsp;</span><span>{trainings}</span>
            </div>
            <div className="px-4 py-1 bg-[#00AAFF] rounded-full w-fit text-sm font-semibold text-white">
                <span>Events&nbsp;&nbsp;&nbsp;</span><span>{events}</span>
            </div>
        </div>
    </main>;
};

export default Profile;
