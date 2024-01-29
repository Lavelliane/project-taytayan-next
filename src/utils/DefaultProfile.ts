import { GoogleLocation, User } from '../types/types';
import { Training } from '../types/types';

export const DefaultProfile: User = {
	email: '',
	uid: '',
	role: 'general',
	avatarURL: '',
	firstName: '',
	lastName: '',
	pronoun: '',
	location: '',
	occupation: '',
	title: '',
	school: '',
	course: '',
	industry: '',
	interest: [],
	aboutMe: '',
	skills: [],
	trainings: [],
	myTrainings: [],
	eventsJoined: [],
	eventsHosted: [],
};

export const DefaultTrainingAddress: GoogleLocation = {
	formattedAddress: '',
	geometry: {
		lat: 0,
		lng: 0,
	},
};

export const DefaultTraining: Training = {
	trainingId: '',
	trainingName: '',
	trainingCenter: '',
	trainingDate: new Date(),
	trainingAddress: DefaultTrainingAddress,
	trainingDescription: '',
	trainingRegistrants: [],
	trainingActivities: [],
	trainingObjectives: [],
	trainingRegistration: '',
	trainingCategory: '',
	createdBy: '',
};
