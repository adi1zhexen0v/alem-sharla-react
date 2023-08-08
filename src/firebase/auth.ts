import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./config";
import { FirebaseError } from "@firebase/app";

export const firebaseAuthSignUp = async (name: string, email: string, password: string): Promise<string | null> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    if (user) {
      await updateProfile(user, {
        displayName: name
      });

      console.log(user);
      return null;
    }
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    console.error('Error signing up:', firebaseError);
    return firebaseError.code;
  }

  return "unknown-error";
}

export const firebaseAuthSignIn = async (email: string, password: string): Promise<string | null> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    
    if (user) {
      console.log(user);
      return null;
    }
  } catch (error: unknown) {
    const firebaseError = error as FirebaseError;
    console.error('Error signing in:', firebaseError);
    return firebaseError.code;
  }

  return "unknown-error";
}