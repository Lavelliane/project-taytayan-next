'use client'
import type { Metadata } from "next";
import "../globals.css";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Next13ProgressBar } from 'next13-progressbar';
import { NavbarMain } from '@/components/Navbar/NavbarMain'
import { useAuthStore } from "@/hooks/useAuth";
import { GlobalFeedbackToastProvider } from "@/components/Feedback/ShowFeedbackToast";
import {GlobalFeedbackModalProvider} from '@/components/Feedback/ShowFeedbackModal';
import { GlobalFeedbackConfirmConfirmToastProvider } from "@/components/Feedback/ShowFeedbackConfirmToast";
import FeedbackToast from "@/components/Feedback/FeedbackToast";
import FeedbackFormModal from "@/components/Feedback/FeedbackFormModal";
import FeedbackConfirmToast from "@/components/Feedback/FeedbackConfirmToast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const userStore = useAuthStore((state) => state.user)


  useEffect(() => {
    if (!userStore.uid) {
      router.push('/login')
    }

  }, [userStore, router]);

  return (
    <GlobalFeedbackToastProvider>
      <GlobalFeedbackModalProvider>
        <GlobalFeedbackConfirmConfirmToastProvider>
      <div className="fixed p-4 z-[999] bottom-0 right-0">
        <FeedbackToast/>
        <FeedbackFormModal />
      </div>
      <div className="fixed p-4 z-[999] top-0 left-[50%] -translate-x-1/2">
        <FeedbackConfirmToast />
      </div>
      <main className='flex flex-col min-h-screen h-screen justify-start bg-white'>
        <NavbarMain />
        <div className='w-full pl-0 sm:pl-64'>
          {children}
        </div>
      </main>
    
      <Next13ProgressBar height='2px' color='#FFC72C' options={{ showSpinner: false }} showOnShallow />
        </GlobalFeedbackConfirmConfirmToastProvider>
      </GlobalFeedbackModalProvider>
    </GlobalFeedbackToastProvider>
  );
}
