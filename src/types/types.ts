import { Unsubscribe, UserCredential } from 'firebase/auth';

export type User = {
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
};

export type Training = {
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

export type Registrant = {
	registrantId: string;
	attended: boolean;
};

export type NetworkingEvent = {
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

export type Employment = {
	employmentId: string;
	employmentTitle: string;
	employmentDescription: string;
	employmentCompany: string;
	employmentCompanyDescription: string;
	employmentContactInformation: string;
	employmentType: string; // Full-time, Part-time, Internship, Contract
	employmentLocationType: string; // Remote, On-site, Hybrid
	employmentAddress: GoogleLocation;
	employmentDatePosted: Date;
	employmentKeyRoles: string;
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

export type AuthStore = {
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

export type GoogleLocation = {
	formattedAddress: string;
	geometry: GoogleCoordinates;
};

type GoogleCoordinates = {
	lat: number;
	lng: number;
};
