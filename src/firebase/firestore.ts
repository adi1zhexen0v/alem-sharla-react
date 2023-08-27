import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "./config";
import { Application, Feedback } from "../utils/interfaces";

export const getAllApplications = async () => {
  const applicationsRef = collection(firestore, "applications");
  const querySnapshot = await getDocs(applicationsRef);

  const applications: Application[] = [];

  querySnapshot.forEach((doc) => {
    const application = doc.data() as Application;
    applications.push(application);
  });

  return applications;
}
 
export const updateApplicationIsPaid = async (id: string, isPaid: boolean) => {
  const applicationRef = doc(firestore, "applications", id);
  await updateDoc(applicationRef, {
    isPaid
  });
}

export const updateApplicationInterviewDate= async (id: string, date: string) => {
  const applicationRef = doc(firestore, "applications", id);
  await updateDoc(applicationRef, {
    interViewDate: date,
    paymentTime: Date.now()
  });
}

export const getFeedback = async () => {
  const feedbackRef = collection(firestore, "feedback");
  const querySnapshot = await getDocs(feedbackRef);

  const feedback: Feedback[] = [];

  querySnapshot.forEach((doc) => {
    const item = doc.data() as Feedback;
    feedback.push(item);
  });

  return feedback;
}