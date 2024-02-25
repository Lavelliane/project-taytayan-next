import { Unsubscribe, UserCredential } from 'firebase/auth';

type User = {
	email: string;
	uid: string;
	role: string;
	avatarURL: string;
	firstName: string;
	lastName: string;
	pronoun: string;
	location: string;
	occupation: string;
	title: string;
	school: string;
	course: string;
	industry: string;
	interest: string[];
	aboutMe: string;
	skills: string[];
	trainings: string[];
	myTrainings: string[];
	eventsJoined: string[];
	eventsHosted: string[];
	jobsPosted: string[];
	jobsApplied: string[];
};

type Training = {
	trainingId: string;
	trainingName: string;
	trainingCenter: string;
	trainingDate: Date;
	trainingAddress: GoogleLocation;
	trainingDescription: string;
	trainingRegistrants: Registrant[];
	trainingActivities: string[];
	trainingObjectives: string[];
	trainingRegistration: string;
	trainingCategory: string;
	createdBy: string;
};

type Registrant = {
	registrantId: string;
	attended: boolean;
};

type NetworkingEvent = {
	eventId: string;
	eventName: string;
	eventAddress: GoogleLocation;
	eventCenter: string;
	eventDate: Date;
	eventDescription: string;
	eventRegistrants: Registrant[];
	eventActivities: string[];
	eventObjectives: string[];
	eventRegistration: string;
	eventCategory: string;
};

type Employment = {
	employmentId: string;
	employmentTitle: string;
	employmentDescription: string;
	employmentCompany: string;
	employmentCompanyDescription: string;
	employmentContactInformation: string[];
	employmentType: string; // Full-time, Part-time, Internship, Contract
	employmentLocationType: string; // Remote, On-site, Hybrid
	employmentAddress: GoogleLocation;
	employmentDatePosted: Date;
	employmentKeyRoles: string[];
	employmentEducation: string;
	employmentExperience: string;
	employmentInstructions: string;
	employmentBenefits: string;
	employmentSalary: string;
	displayJob: boolean;
	employmentApplicants: Applicant[];
};

type Applicant = {
	applicantId: string;
	pending: boolean;
	accepted: boolean;
};

type Feedback = {
	satisfaction: number;
	navigation: number;
	layout: number;
	bugs: number;
	speed: number;
	recommendation: number;
	improvements: string;
	comments: string;
	name: string;
	email: string;
};

type AuthStore = {
	user: User;
	signUp: (
		email: string,
		password: string,
		confirmPassword: string,
		firstName: string,
		lastName: string
	) => Promise<void>;
	signIn: (email: string, password: string) => Promise<{ response: UserCredential; unsubscribe: Unsubscribe }>;
	updateUserState: (user: User) => void;
	updateUserLatest: () => void;
	logout: () => Promise<void>;
};

type GoogleLocation = {
	formattedAddress: string;
	geometry: GoogleCoordinates;
};

type GoogleCoordinates = {
	lat: number;
	lng: number;
};

export const links = [
	{
		name: 'Home',
		hash: '#home',
	},
	{
		name: 'About',
		hash: '#benefits',
	},
	{
		name: 'Services',
		hash: '#services',
	},
	{
		name: 'Contact',
		hash: '#contact',
	},
] as const;

type SectionName = typeof links[number]['name'];

export type { Employment, NetworkingEvent, Registrant, GoogleLocation, User, Training, Feedback, SectionName, AuthStore }