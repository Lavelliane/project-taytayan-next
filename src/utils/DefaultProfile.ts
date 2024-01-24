import { User } from '../types/types';
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

export const DefaultTraining: Training = {
	trainingId: '',
	trainingName: '',
	trainingCenter: '',
	trainingDate: new Date(),
	trainingAddress: '',
	trainingDescription: '',
	trainingRegistrants: [],
	trainingActivities: [],
	trainingObjectives: [],
	trainingRegistration: '',
	trainingCategory: '',
};
