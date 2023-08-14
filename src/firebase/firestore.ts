import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./config";
import { Application } from "../utils/interfaces";

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