import { UserCredential } from "firebase/auth";

export type User = {
    email: string;
    uid: string;
    role: string;
    avatarURL: string;
    firstName: string;
    lastName: string;
    pronoun: string;
    location: string;
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
}

export type AuthStore = {
    user: User;
    signUp: (email: string, password: string, confirmPassword: string, firstName: string, lastName: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
}