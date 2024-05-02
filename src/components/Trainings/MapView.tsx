import React, { useState, useEffect } from 'react';

import { TbCurrentLocation } from 'react-icons/tb';
import useGeoLocation from '@/hooks/useGeoLocation';
import { GoogleMap, useJsApiLoader, MarkerF, Marker } from '@react-google-maps/api';
import { GoogleLocation, GoogleCoordinates, MapViewLocation } from '@/types/types';

interface MarkerType {
	id: string;
	position: GoogleCoordinates;
}

interface MapViewProps {
	handleToggleMapView: () => void;
	trainingLocation: MapViewLocation[];
	selectedLocation: { id: string; position: GoogleCoordinates };
	currentLocation: GoogleCoordinates;
}

const containerStyle = {
	width: '100%',
	height: '100%',
	borderRadius: '8px',
};

const MapView = ({ handleToggleMapView, trainingLocation, selectedLocation, currentLocation }: MapViewProps) => {
	const { isLoaded } = useJsApiLoader({
		id: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || '',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || '',
	});

	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [activeMarker, setActiveMarker] = useState<string>(trainingLocation[0]?.id);
	const [mapInfo, setMapInfo] = useState<MapViewLocation | null>();
	const [markers, setMarkers] = useState<MarkerType[]>(trainingLocation);

	const location = useGeoLocation();
	const [center, setCenter] = useState<GoogleCoordinates>({ lat: 10.3157, lng: 123.8854 });

	const handleActiveMarker = (id: string, location: GoogleCoordinates) => {
		setActiveMarker(id);

		const foundRetailer = trainingLocation.find((retailer) => retailer.id === id);
		setMapInfo(foundRetailer || null);

		if (!foundRetailer) {
			handleMyLocation();
		} else if (foundRetailer && map) {
			map.panTo(location);
		}
	};

	useEffect(() => {
		if (trainingLocation) {
			setMarkers(trainingLocation);
		}
	}, [trainingLocation]);

	useEffect(() => {
		if (selectedLocation.position.lat != 0 && selectedLocation.position.lng != 0) {
			setCenter(selectedLocation.position);
			handleActiveMarker(selectedLocation.id, selectedLocation.position);
		} else {
			setCenter(currentLocation);
		}
	}, [selectedLocation, currentLocation]);

	const handleMyLocation = () => {
		if (center.lat === 0 && center.lng === 0) {
			if (location.loaded) {
				setCenter(location.coordinates);
				if (map) {
					map.panTo(location.coordinates);
				}
			}
		}
		if (map && currentLocation) {
			map.panTo(currentLocation);
		}
	};

	const onLoad = React.useCallback(function callback(map: any) {
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map: any) {
		setMap(null);
	}, []);

	return (
		<div className='relative w-full h-full rounded-lg shadow-inner'>
			{isLoaded ? (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={10}
					onLoad={onLoad}
					onUnmount={onUnmount}
					options={{
						streetViewControl: false,
						mapTypeControl: false,
						zoomControl: false,
						fullscreenControl: false,
					}}
				>
					{markers?.map(({ position, id }) => (
						<MarkerF
							key={id} // Add a unique key for each Marker component
							position={position}
							onClick={() => handleActiveMarker(id, position)}
							animation={google.maps.Animation.DROP}
							zIndex={activeMarker === id ? 50 : 0}
							icon={
								activeMarker === id
									? {
											url: 'https://i.imgur.com/cZzKh96.png',
											scaledSize: new google.maps.Size(40, 40),
									  }
									: {
											url: 'https://i.imgur.com/4pUiqZj.png',
											scaledSize: new google.maps.Size(36, 36),
									  }
							}
						/>
					))}
					<Marker
						position={currentLocation}
						zIndex={40}
						icon={{
							path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
							fillColor: '#B41412',
							strokeColor: '#EA4335',
							strokeWeight: 6,
							fillOpacity: 1,
							scale: 0.03, //to reduce the size of icons
						}}
					/>
				</GoogleMap>
			) : (
				<div className=' text-lg font-semibold h-full w-fill flex justify-center items-center'>Loading map view...</div>
			)}

			<div className='flex justify-between items-center p-4 absolute bottom-0 z-[999] w-fit'>
				{/* <button
					className='z-[999] bg-gray-100 rounded-full p-2 text-sm flex w-fit items-center justify-center gap-2 shadow-md font-semibold gray-900'
					onClick={handleToggleMapView}>
					All Stores{' '}
					<span className='px-2 py-1 flex items-center justify-center rounded-full bg-gray-900 text-white font-semibold'>
						{String(trainingLocation.length).padStart(2, '0')}
					</span>
				</button> */}
				<button onClick={handleMyLocation} className='text-gray-900 text-2xl bg-gray-100 p-2 rounded-full shadow-md'>
					<TbCurrentLocation />
				</button>
			</div>
		</div>
	);
};

export default MapView;
