import { doc, collection, getDocs, updateDoc, getDoc, DocumentReference } from "firebase/firestore";
import { firestore } from "./config";
import { Application, Feedback, QuestionnaireAnswer, User } from "../utils/interfaces";

export const getAllApplications = async () => {
  const applicationsRef = collection(firestore, "applications");
  const querySnapshot = await getDocs(applicationsRef);

  const applications: Application[] = [];

  for (const doc of querySnapshot.docs) {
    const application = doc.data() as Application;
    
    if (application.questionnaireIDs) {
      const questionnaires = await getQuestionnaires(application.questionnaireIDs);
      application.questionnaires = questionnaires;
    } else 

    if (application.userID) {
      const user = await getUser(application.userID);
      application.user = user;
    }

    applications.push(application);
  }

  return applications;
}

const getUser = async (userId: string) => {
  const userRef = doc(firestore, "profiles", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const user = userSnap.data() as User;
    return user;
  }
  return null;
}

const getQuestionnaires = async (questionnaireIDs: DocumentReference[]) => {
  const questionnaires: QuestionnaireAnswer[] = [];
  for (const questionnaireID of questionnaireIDs) {
    const questionnaireDoc = await getDoc(questionnaireID);
    if (questionnaireDoc.exists()) {
      const questionnaire = questionnaireDoc.data() as QuestionnaireAnswer;
      questionnaires.push(questionnaire);
    }
  }
  return questionnaires;
}

export const updateStatus = async(id: string, collection: string, status: string) => {
  const docRef = doc(firestore, collection, id);
  await updateDoc(docRef, {
    status
  });
}

export const updateApplicationIsPaid = async (id: string, isPaid: boolean) => {
  const applicationRef = doc(firestore, "applications", id);
  await updateDoc(applicationRef, {
    isPaid,
    paymentTime: Math.floor(Date.now() / 1000)
  });
}

export const updateApplicationInterviewDate = async (id: string, date: string) => {
  const applicationRef = doc(firestore, "applications", id);
  await updateDoc(applicationRef, {
    interViewDate: date
  });
}

export const getFeedback = async () => {
  const feedbackRef = collection(firestore, "feedback");
  const querySnapshot = await getDocs(feedbackRef);

  const feedback: Feedback[] = [];

  querySnapshot.forEach((doc) => {
    const item = doc.data() as Feedback;
    item.id = doc.id;
    feedback.push(item);
  });

  return feedback;
}

export const getAllUsers = async () => {
  const usersRef = collection(firestore, "profiles");
  const querySnapshot = await getDocs(usersRef);

  const users: User[] = [];

  querySnapshot.forEach((doc) => {
    const user = doc.data() as User;
    users.push(user);
  })

  return users;
}