'use client';
import React from 'react';
import EventPage from '@/components/Events/EventPage';

const page = ({ params }: { params: { id: string; uid: string } }) => {
	return <EventPage uid={params.uid} eventId={params.id} />;
};

export default page;
