import { auth, db } from "@/lib/firebase";
import SignUpSchema from "@/schemas/SignUpSchema";
import { AuthStore, User } from "@/types/types";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { ZodError } from "zod";
import { create } from "zustand";

const initialUserState: User = {
    email: "",
    uid: "",
    role: "",
    avatarURL: "",
}


export const useAuthStore = create<AuthStore>((set) => ({
    user: initialUserState,
    signUp: async (email: string, password: string, confirmPassword: string) => {
        const params = { email, password, confirmPassword }
        try {
            const validatedParams = SignUpSchema.parse(params)
            await createUserWithEmailAndPassword(auth, validatedParams.email, validatedParams.password)
            onAuthStateChanged(auth, async (user) => {
                if(user){
                    const docRef = doc(collection(db, 'users'), user.uid)
                    await setDoc(docRef, { ...validatedParams, role: "general", avatarURL: "", uid: user.uid })
                }
            })
        } catch (error) {
            if (error instanceof ZodError) {
                console.error("Validation error:", error.errors);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    },
    signIn: async (email: string, password: string) => {
        const response = await signInWithEmailAndPassword(auth, email, password)
        onAuthStateChanged(auth, async (user) => {
            if(user){
                const docRef = doc(collection(db, "users"), user.uid)
                const userDoc = await getDoc(docRef)
                console.log(userDoc)
            }
        })
        return response
    },
    logout: async () => {
        set((state) => ({ user: initialUserState }))
        return await signOut(auth)
    },
    authStateChangeListener: () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              set((state) => ({ user: { email: user.email ?? state.user.email, uid: user.uid ?? state.user.uid, role: "general", avatarURL: "" } }));
            } else {
              set({ user: initialUserState });
            }
        });
    }
}))
