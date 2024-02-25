const interestOptions = [
	'Web Development',
	'Mobile Development',
	'UI/UX Design',
	'Cyber Security',
	'Data Science',
	'Artificial Intelligence',
	'Machine Learning',
	'Cloud Computing',
	'Internet of Things',
	'Blockchain',
	'Plumbing',
	'Welding',
	'Carpentry',
	'Masonry',
	'Electrical',
	'Mechanical',
	'Automotive',
	'Cookery',
	'Bartending',
	'Housekeeping',
	'Food and Beverage',
	'Front Office',
	'Tourism',
	'Events Management',
	'Animation',
];

const skillOptions = [
	'Construction',
	'Welding',
	'Plumbing',
	'Electrician',
	'Carpentry',
	'Auto Mechanic',
	'Heavy Equipment Operation',
	'Masonry',
	'Mechanical Repairs',
	'Building and Construction',
	'Landscaping',
	'HVAC Systems',
	'Vehicle Maintenance',
	'Manual Labor',
	'Safety Protocols',
	'Team Collaboration',
	'HTML',
	'CSS',
	'JavaScript',
	'React',
	'React Native',
	'NodeJS',
	'ExpressJS',
	'MongoDB',
	'MySQL',
	'Java',
];

// You can add or remove items based on specific blue-collar job requirements

const satisfactionOptions = [
	{ key: 'very-satisfied', label: 'Very satisfied', value: 5 },
	{ key: 'somewhat-satisfied', label: 'Somewhat satisfied', value: 4 },
	{ key: 'neutral-satisfaction', label: 'Neutral', value: 3 },
	{ key: 'somewhat-dissatisfied', label: 'Somewhat dissatisfied', value: 2 },
	{ key: 'very-dissatisfied', label: 'Very dissatisfied', value: 1 },
];

const navigationOptions = [
	{ key: 'very-easy', label: 'Very easy', value: 5 },
	{ key: 'easy', label: 'Easy', value: 4 },
	{ key: 'neutral', label: 'Neutral', value: 3 },
	{ key: 'difficult', label: 'Difficult', value: 2 },
	{ key: 'very-difficult', label: 'Very difficult', value: 1 },
];

const layoutOptions = [
	{ key: 'very-appealing', label: 'Very appealing', value: 5 },
	{ key: 'somewhat-appealing', label: 'Somewhat appealing', value: 4 },
	{ key: 'neutral-appeal', label: 'Neutral', value: 3 },
	{ key: 'not-very-appealing', label: 'Not very appealing', value: 2 },
	{ key: 'not-appealing-at-all', label: 'Not appealing at all', value: 1 },
];

const bugsOptions = [
	{ key: 'very-often', label: 'Very often', value: 5 },
	{ key: 'often', label: 'Often', value: 4 },
	{ key: 'occasionally', label: 'Occasionally', value: 3 },
	{ key: 'rarely', label: 'Rarely', value: 2 },
	{ key: 'never', label: 'Never', value: 1 },
];

const speedOptions = [
	{ key: 'excellent', label: 'Excellent', value: 5 },
	{ key: 'good', label: 'Good', value: 4 },
	{ key: 'average', label: 'Average', value: 3 },
	{ key: 'poor', label: 'Poor', value: 2 },
	{ key: 'very-poor', label: 'Very poor', value: 1 },
];

const recommendationOptions = [
	{ key: '1', label: 'Not likely at all', value: 1 },
	{ key: '2', label: 'Unlikely', value: 2 },
	{ key: '3', label: 'Neutral', value: 3 },
	{ key: '4', label: 'Likely', value: 4 },
	{ key: '5', label: 'Very likely', value: 5 },
];

export {
	skillOptions,
	interestOptions,
	satisfactionOptions,
	navigationOptions,
	layoutOptions,
	bugsOptions,
	speedOptions,
	recommendationOptions,
};
