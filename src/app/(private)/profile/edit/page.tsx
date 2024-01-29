import React from "react";
import SidebarSeeker from "@/components/JobSeeker/SidebarSeeker";
import ProfileEdit from "@/components/Profile/ProfileEdit";

const page = () => {
    return <main className='flex sm:flex-row flex-col min-h-screen items-start justify-start sm:p-24 p-0 bg-white'>
        <div className="sm:w-64">
            <SidebarSeeker />
        </div>
        <ProfileEdit />
    </main>;
};

export default page;
