export interface Location {
	coords: {
		latitude: number;
		longitude: number;
	};
}

export interface Status {
	code: number;
	message: string;
}
