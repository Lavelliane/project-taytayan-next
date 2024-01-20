import { auth, db, provider } from "@/lib/firebase";
import SignUpSchema from "@/schemas/SignUpSchema";
import { AuthStore, User } from "@/types/types";
import { UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { ZodError } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const initialUserState: User = {
    email: "",
    uid: "",
    role: "general",
    avatarURL: "",
    firstName: "",
    lastName: "",
    pronoun: "",
    location: "",
	occupation: "",
    title: "",
    school: "",
    course: "",
    industry: "",
    interest: [],
    aboutMe: "",
    skills: [],
    trainings: [],
    eventsJoined: [],
    eventsHosted: [],
}


export const useAuthStore = create(
	persist<AuthStore>(
		(set, get) => ({
			user: initialUserState,
			signUp: async (email: string, password: string, confirmPassword: string, firstName: string, lastName: string) => {
				const params = { email, password, confirmPassword, firstName, lastName };
				try {
					const validatedParams = SignUpSchema.parse(params);
					const { confirmPassword, password, ...paramsWithoutConfirm } = validatedParams;
					await createUserWithEmailAndPassword(auth, validatedParams.email, validatedParams.password);
					onAuthStateChanged(auth, async (user) => {
						if (user) {
							const docRef = doc(collection(db, 'users'), user.uid);
							await setDoc(docRef, { ...paramsWithoutConfirm, ...initialUserState, uid: user.uid });
							set({ user: { ...paramsWithoutConfirm, ...initialUserState, uid: user.uid } });
						}
					});
				} catch (error) {
					if (error instanceof ZodError) {
						console.error('Validation error:', error.errors);
					} else {
						console.error('Unexpected error:', error);
					}
				}
			},
			signIn: async (email: string, password: string) => {
				const response = await signInWithEmailAndPassword(auth, email, password);
				onAuthStateChanged(auth, async (user) => {
					if (user) {
						const docRef = doc(collection(db, 'users'), user.uid);
						const userDoc = await getDoc(docRef);
						if (userDoc.exists()) {
							const userData = userDoc.data();

                        const mappedUserData: User = {
                            email: userData?.email || "",
                            uid: userData?.uid || "",
                            role: userData?.role || "",
                            avatarURL: userData?.avatarURL || "",
                            firstName: userData?.firstName || "",
                            lastName: userData?.lastName || "",
                            pronoun: userData?.pronoun || "",
                            location: userData?.location || "",
							occupation: userData?.occupation || "",
                            title: userData?.title || "",
                            school: userData?.school || "",
                            course: userData?.course || "",
                            industry: userData?.industry || "",
                            interest: userData?.interest || [],
                            aboutMe: userData?.aboutMe || "",
                            skills: userData?.skills || [],
                            trainings: userData?.trainings || [],
                            eventsJoined: userData?.eventsJoined || [],
                            eventsHosted: userData?.eventsHosted || [],
                        };
                        
        
                        set({ user: mappedUserData });
                    }
                }
            })
            return response
        },
        updateUserState: (user: User) => {
            set({ user })
        },
        updateUserLatest: async () => {
            const { user } = get()

            if (user && user.uid) {
                try {
                    const docRef = doc(collection(db, 'users'), user.uid);
                    const userDoc = await getDoc(docRef);
        
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
        
                        const mappedUserData: User = {
                            email: userData?.email || "",
                            uid: userData?.uid || "",
                            role: userData?.role || "",
                            avatarURL: userData?.avatarURL || "",
                            firstName: userData?.firstName || "",
                            lastName: userData?.lastName || "",
                            pronoun: userData?.pronoun || "",
                            location: userData?.location || "",
                            occupation: userData?.occupation || "",
                            title: userData?.title || "",
                            school: userData?.school || "",
                            course: userData?.course || "",
                            industry: userData?.industry || "",
                            interest: userData?.interest || [],
                            aboutMe: userData?.aboutMe || "",
                            skills: userData?.skills || [],
                            trainings: userData?.trainings || [],
                            eventsJoined: userData?.eventsJoined || [],
                            eventsHosted: userData?.eventsHosted || [],
                        };
        
                        set({ user: mappedUserData });
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        },
        logout: async () => {
            set((state) => ({ user: initialUserState }))
            return await signOut(auth)
        },
    }), {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage)
    })
)
