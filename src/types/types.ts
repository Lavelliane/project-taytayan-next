import { UserCredential } from 'firebase/auth';

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
	eventsJoined: string[];
	eventsHosted: string[];
};

export type Training = {
  trainingId: number;
  trainingName: string;
  trainingCenter: string;
  trainingDate: Date;
  trainingAddress: string;
  trainingDescription: string;
  trainingActivities: string[];
  trainingObjectives: string[];
  trainingRegistration: string;
  trainingCategory: string;
};

export type AuthStore = {
    user: User;
    signUp: (email: string, password: string, confirmPassword: string, firstName: string, lastName: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    updateUserState: (user: User) => void;
	updateUserLatest: () => void;
    logout: () => Promise<void>;
}
