import React from "react";
import SidebarSeeker from "@/components/JobSeeker/SidebarSeeker";
import Profile from "@/components/Profile/Profile";

const page = () => {
    return <main className='flex min-h-screen items-start justify-start p-24 bg-white'>
        <div className="w-64">
            <SidebarSeeker />
        </div>
        <Profile />
    </main>;
};

export default page;
