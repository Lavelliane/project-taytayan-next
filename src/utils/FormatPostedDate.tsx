import { Timestamp } from 'firebase/firestore';

export function FormatPostedDate(timestamp: Date | Timestamp): string {
	const jsDate = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
	const currentDate = new Date();

	// Calculate the difference in milliseconds
	const timeDifference: number = currentDate.getTime() - jsDate.getTime();

	// Calculate the difference in days
	const daysAgo: number = Math.floor(timeDifference / (1000 * 3600 * 24));

	// Return the formatted string
	if (daysAgo === 0) {
		return 'Posted today';
	} else if (daysAgo === 1) {
		return 'Posted yesterday';
	} else if (daysAgo > 1) {
		return `Posted ${daysAgo} 'days' ago`;
	} else if (daysAgo === -1) {
		return `To be posted tomorrow`;
	} else if (daysAgo < -1) {
		return `To be posted in ${-daysAgo} days`;
	} else {
		return 'No schedule provided.';
	}
}
