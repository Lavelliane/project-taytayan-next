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
	trainingAddress: string;
	trainingDescription: string;
	trainingRegistrants: Registrant[];
	trainingActivities: string[];
	trainingObjectives: string[];
	trainingRegistration: string;
	trainingCategory: string;
};

export type Registrant = {
	registrantId: string;
	attended: boolean;
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
