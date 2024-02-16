import { Timestamp } from 'firebase/firestore';

export const formatTimestamp = (timestamp: Date | Timestamp) => {
	// Convert Firestore Timestamp to JavaScript Date
	const jsDate = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;

	// Format the date as a string
	const formattedDate = jsDate.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return formattedDate;
};
