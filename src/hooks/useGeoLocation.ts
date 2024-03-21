'use client';

import React, { useState, useEffect } from 'react';
import { Location, Status } from '@/types/geo-location-types';

const useGeoLocation = () => {
	const [location, setLocation] = useState({
		loaded: false,
		coordinates: { lat: 0, lng: 0 },
		status: { code: 0, message: '' },
	});

	const onSuccess = (location: Location) => {
		setLocation({
			loaded: true,
			coordinates: {
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			},
			status: { code: 200, message: 'OK' },
		});
	};

	const onError = (status: Status) => {
		setLocation({
			loaded: true,
			coordinates: { lat: 0, lng: 0 },
			status: {
				code: status?.code,
				message: status.message,
			},
		});
	};

	useEffect(() => {
		if (!('geolocation' in navigator)) {
			onError({
				code: 501,
				message: 'Geolocation not supported',
			});
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}, []);

	return location;
};

export default useGeoLocation;
