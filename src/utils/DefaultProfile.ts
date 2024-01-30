import { Employment, GoogleLocation, User } from '../types/types';
import { Training } from '../types/types';

export const DefaultProfile: User = {
	email: '',
	uid: '',
	role: 'general',
	avatarURL: '',
	firstName: '',
	lastName: '',
	pronoun: 'He/Him',
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
	jobsPosted: [],
	jobsApplied: [],
};

export const DefaultTrainingAddress: GoogleLocation = {
	formattedAddress: '',
	geometry: {
		lat: 0,
		lng: 0,
	},
};

export const DefaultEmploymentAddress: GoogleLocation = {
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

export const DefaultEmployment: Employment = {
	employmentId: '',
	employmentTitle: '',
	employmentDescription: '',
	employmentCompany: '',
	employmentCompanyDescription: '',
	employmentContactInformation: [],
	employmentType: 'Full-time', // Full-time, Part-time, Internship, Contract
	employmentLocationType: 'On-site', // On-site, Work-from-home, Hybrid
	employmentAddress: DefaultEmploymentAddress,
	employmentDatePosted: new Date(),
	employmentKeyRoles: [],
	employmentEducation: '',
	employmentExperience: '',
	employmentInstructions: '',
	employmentBenefits: '',
	employmentSalary: 'n/a',
	displayJob: false,
	employmentApplicants: [],
};
