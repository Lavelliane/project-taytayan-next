import { Unsubscribe, UserCredential } from "firebase/auth";

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
  trainingRegistrants: string[];
  trainingActivities: string[];
  trainingObjectives: string[];
  trainingRegistration: string;
  trainingCategory: string;
};

export type NetworkingEvent = {
  eventId: string;
  eventName: string;
  eventAddress: string;
  eventCenter: string;
  eventDate: Date;
  eventDescription: string;
  eventRegistrants: string[];
  eventActivities: string[];
  eventObjectives: string[];
  eventRegistration: string;
  eventCategory: string;
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
  signIn: (
    email: string,
    password: string
  ) => Promise<{ response: UserCredential; unsubscribe: Unsubscribe }>;
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
