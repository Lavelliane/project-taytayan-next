import React from 'react';
import { useRouter } from 'next/navigation';
import { NetworkingEvent } from '@/types/types';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Avatar } from 'flowbite-react';
import { avatarTheme } from '@/utils/ComponentThemes';
import { FormatRegistrants } from '@/utils/FormatRegistrants';
import { FiArrowUpRight } from 'react-icons/fi';
import { formatTimestamp } from '@/utils/FormatTimestamp';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';

const trainingCategories = [
	{ key: 1, value: 'Technical', color: 'bg-purple-400' },
	{ key: 2, value: 'Certification', color: 'bg-blue-400' },
	{ key: 3, value: 'Personal', color: 'bg-lime-500' },
	{ key: 4, value: 'Professional', color: 'bg-amber-400' },
	{ key: 5, value: 'Vocational & Arts', color: 'bg-red-400' },
	{ key: 0, value: 'Other', color: 'bg-gray-500' },
];

const EventPage = ({ uid, eventId }: { uid: string; eventId: string }) => {
  const [event, setEvent] = React.useState<NetworkingEvent | null>(null);
  const router = useRouter();
	const [categoryColor, setCategoryColor] = React.useState<string>('bg-gray-500');

  React.useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventsRef = collection(db, 'networking');
        const q = query(eventsRef, where('eventId', '==', eventId));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const eventData: NetworkingEvent = {
            ...(doc.data() as NetworkingEvent),
            // Convert Timestamp to Date for eventDate
            eventDate: (doc.data().eventDate as Timestamp).toDate(),
          };
          setEvent(eventData);
        });
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  React.useEffect(() => {
    if (event) {
      const category = trainingCategories.find((category) => category.value === event.eventCategory);
      if (category) {
        setCategoryColor(category.color);
      } else {
        setCategoryColor('gray');
      }
    }
	}, [event]);

  // Ensure eventDate is available before formatting
  const eventDate = event?.eventDate;

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Function to format time string
  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    };
    return date.toLocaleTimeString('en-US', options);
  };

  // Format date and time
  const formattedDate = eventDate ? formatDate(eventDate) : '';
  const formattedTime = eventDate ? formatTime(eventDate) : '';

  React.useEffect(() => {
    document.body.classList.add('event-page');
    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('event-page');
    };
  }, []);

  return (
    <div className='h-screen'>
      <div className='absolute w-full h-12 justify-center items-center flex'>
        <div className='container mx-auto max-w-4xl flex justify-between'>
          <div className='flex gap-5'>
            <button 
              className='flex items-center gap-1 text-sm text-white font-semibold w-fit'
              onClick={() => {
                router.back();
              }}
            >
              <svg className='w-6 h-6' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4"/>
              </svg>
            </button>
          </div>
          <div className='flex gap-5'>
            <Link href='/allevents' className='flex items-center gap-1 text-sm text-white font-semibold w-fit'>
              <svg
                className='w-3.5 h-3.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 16 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z'
                />
              </svg>
              Events
            </Link>
            <Link href='/alltrainings' className='flex items-center gap-1 text-sm text-white font-semibold w-fit'>
              <svg
                className='w-4 h-4'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 18 18'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 1h12M3 1v16M3 1H2m13 0v16m0-16h1m-1 16H3m12 0h2M3 17H1M6 4h1v1H6V4Zm5 0h1v1h-1V4ZM6 8h1v1H6V8Zm5 0h1v1h-1V8Zm-3 4h2a1 1 0 0 1 1 1v4H7v-4a1 1 0 0 1 1-1Z'
                />
              </svg>
              Trainings
            </Link>
            <Link href='/jobs' className='flex items-center gap-1 text-sm text-white font-semibold w-fit'>
              <svg
                className='w-4 h-4'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeWidth='2'
                  d='M1 10c1.5 1.5 5.25 3 9 3s7.5-1.5 9-3m-9-1h.01M2 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1ZM14 5V3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2h8Z'
                />
              </svg>
              Jobs
            </Link>           
          </div>
        </div>
      </div>
      <div className='h-full pt-16'>
        {event ? (
          <div className='container mx-auto flex gap-8 max-w-4xl h-full px-4 py-4 text-stone-100/80'>
            <aside id='aside' className='w-[500px] h-full flex flex-col gap-4'>
              <div id='event thumbnail'className='glass min-h-[300px] w-full animate-pulse bg-stone-300/50 rounded-lg flex items-center justify-center'>
                <svg className="w-auto h-[150px] text-gray-200/50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='w-full font-medium'>Hosted by</div>
                <hr className="glass h-[2px] rounded-full opacity-30" />
              </div>
              <div id='event host' className='flex gap-2 items-start'>
                <Avatar
                  img='/institution.svg'
                  alt='avatar'
                  rounded
                  size='md'
                  color='purple'
                  theme={avatarTheme}
                  bordered
                  className='justify-start min-w-10 mr-2 bg-white rounded-full'
                />
                <div className='text-base text-white'>{event.eventCenter}</div>
              </div>
              <div id='event registrants count' className='font-medium text-sm'>{event.eventRegistrants.length} going</div>
              <hr className="glass h-[2px] rounded-full opacity-30" />
              <FormatRegistrants registrant={event.eventRegistrants} />
              <div id='event host link' className='pt-8 underline underline-offset-4 text-sm cursor-pointer flex'>View training center <FiArrowUpRight /></div>
            </aside>
            <main id='main' className='w-full h-full flex flex-col gap-4'>
              <div id='event title' className='w-full text-4xl font-bold text-white'>{event.eventName}</div>
              <div className='glass-dark p-4 rounded-xl flex flex-col gap-4 bg-stone-600/80 backdrop-blur'>
                <div id='event date and time' className='flex gap-4'>
                  <div className='glass flex flex-col rounded-lg items-center w-fit border-[1px]'>
                    <span className={`glass text-white uppercase font-semibold text-xs px-2.5 py-[0.5px] rounded-t-lg`}>
                      {formatTimestamp(event.eventDate)
                        .split(' ')[1]
                        .slice(0, 3)}
                    </span>
                    <span className='font-bold text-lg text-white pb-[0.5px]'>
                      {
                        formatTimestamp(event.eventDate)
                          .split(',')[1]
                          .trim()
                          .split(' ')[1]
                      }
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-white font-semibold'>{formattedDate}</span>
                    <span>{formattedTime}</span>
                  </div>
                </div>
                <div id='event address' className='flex flex-col'>
                  <span className='text-white font-semibold'>{event.eventAddress.formattedAddress}</span>
                  <div className='flex gap-2'>
                    <span className='text-stone-200/80 gap-1 flex'>
                      {event.eventAddress.geometry.lat}
                      <span className='text-white'>{'\u2022'}</span>
                      {event.eventAddress.geometry.lng}
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='w-full font-medium'>About</div>
                <hr className="glass h-[2px] rounded-full opacity-30" />
              </div>
              <div id='event description' className='text-white text-justify'>{event.eventDescription}</div>
            </main>
          </div>
        ) : (
          <div className='container mx-auto flex gap-8 max-w-4xl h-full px-4 py-4'>
            <aside id='aside' className='w-[500px] h-full flex flex-col gap-4'>
              <div id='event thumbnail'className='glass h-[300px] w-full animate-pulse bg-stone-300/50 rounded-lg flex items-center justify-center'>
                <svg className="w-auto h-[150px] text-gray-200/50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='w-full text-stone-200/80'>Hosted by</div>
                <hr className="glass h-[2px] rounded-full opacity-30" />
              </div>
              <div id='event host' className='flex gap-2 items-center'>
                <div className='h-[40px] min-w-[40px] animate-pulse bg-stone-300/40 backdrop-blur rounded-full' />
                <div className='h-[25px] w-full animate-pulse bg-stone-300/40 backdrop-blur rounded' />
              </div>
              <div id='event registrants count' className='h-[25px] w-1/2 animate-pulse bg-stone-300/40 backdrop-blur rounded' />
              <hr className="glass h-[2px] rounded-full opacity-30" />
              <div id='event registrants' className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                  <div className='h-[40px] w-[40px] animate-pulse bg-stone-300/40 backdrop-blur rounded-full border border-transparent' />
                  <div className='h-[40px] w-[40px] animate-pulse bg-stone-300/40 backdrop-blur rounded-full border border-transparent' />
                  <div className='h-[40px] w-[40px] animate-pulse bg-stone-300/40 backdrop-blur rounded-full border border-transparent' />
                  <div className='h-[40px] w-[40px] animate-pulse bg-stone-300/40 backdrop-blur rounded-full border border-transparent' />
                </div>
                <div className='h-[25px] w-full animate-pulse bg-stone-300/40 backdrop-blur rounded' />
                <div className='h-[25px] w-2/3 animate-pulse bg-stone-300/40 backdrop-blur rounded' />
              </div>
              <div id='event host link' className='my-8 h-[25px] w-1/2 animate-pulse bg-stone-300/40 backdrop-blur rounded' />
            </aside>
            <main id='main' className='w-full h-full flex flex-col gap-4'>
              <div id='event title' className='h-[40px] w-full animate-pulse bg-stone-300/40 backdrop-blur rounded' />
              <div id='event title' className='h-[40px] w-1/2 animate-pulse bg-stone-300/40 backdrop-blur rounded' />
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage