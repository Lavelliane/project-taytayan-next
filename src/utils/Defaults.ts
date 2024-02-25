import { Employment, GoogleLocation, User, Training, Feedback } from '../types/types';

const DefaultProfile: User = {
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

const DefaultTrainingAddress: GoogleLocation = {
	formattedAddress: '',
	geometry: {
		lat: 0,
		lng: 0,
	},
};

const DefaultEmploymentAddress: GoogleLocation = {
	formattedAddress: '',
	geometry: {
		lat: 0,
		lng: 0,
	},
};

const DefaultTraining: Training = {
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

const DefaultEmployment: Employment = {
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

const DefaultFeedback: Feedback = {
	satisfaction: -1,
	navigation: -1,
	layout: -1,
	bugs: -1,
	speed: -1,
	recommendation: -1,
	improvements: '',
	comments: '',
	name: '',
	email: '',
};

export {
	DefaultProfile,
	DefaultTrainingAddress,
	DefaultEmploymentAddress,
	DefaultTraining,
	DefaultEmployment,
	DefaultFeedback,
};
