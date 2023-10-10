import { doc, collection, getDocs, updateDoc, getDoc, DocumentReference } from "firebase/firestore";
import { firestore } from "./config";
import { Application, Feedback, GreenCardApplication, QuestionnaireAnswer, User } from "../utils/interfaces";
import { APPLICATIONS_COLLECTION, FEEDBACK_COLLECTION, GREEN_CARDS_APPLICATIONS_COLLECTION, PROFILES_COLLECTION } from "../utils/consts";
import { StatusTypes } from "../utils/enums";

export const getAllApplications = async () => {
  const applicationsRef = collection(firestore, APPLICATIONS_COLLECTION);
  const querySnapshot = await getDocs(applicationsRef);

  const applications: Application[] = [];

  for (const doc of querySnapshot.docs) {
    const application = doc.data() as Application;
    
    if (application.questionnaireIDs) {
      const questionnaires = await getQuestionnaires(application.questionnaireIDs);
      application.questionnaires = questionnaires;
    } 

    if (application.userID) {
      const user = await getUser(application.userID);
      application.user = user;
    }

    applications.push(application);
  }

  return applications;
}

const getUser = async (userId: string) => {
  const userRef = doc(firestore, PROFILES_COLLECTION, userId);
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

export const updateApplicationIsPaid = async (id: string, isPaid: boolean, collection: string) => {
  const applicationRef = doc(firestore, collection, id);
  await updateDoc(applicationRef, {
    isPaid,
    paymentTime: Math.floor(Date.now() / 1000)
  });
}

export const updateApplicationInterviewDate = async (id: string, date: string) => {
  const applicationRef = doc(firestore, APPLICATIONS_COLLECTION, id);
  await updateDoc(applicationRef, {
    interViewDate: date
  });
}

export const getFeedback = async () => {
  const feedbackRef = collection(firestore, FEEDBACK_COLLECTION);
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
  const usersRef = collection(firestore, PROFILES_COLLECTION);
  const querySnapshot = await getDocs(usersRef);

  const users: User[] = [];

  querySnapshot.forEach((doc) => {
    const user = doc.data() as User;
    users.push(user);
  })

  return users;
}

export const getAllGreenCardApplications = async () => {
  const greenCardApplicationsRef = collection(firestore, GREEN_CARDS_APPLICATIONS_COLLECTION);
  const querySnapshot = await getDocs(greenCardApplicationsRef);

  const greenCardApplications: GreenCardApplication[] = [];

  for (const doc of querySnapshot.docs) {
    const greenCardApplication = doc.data() as GreenCardApplication;
    
    if (greenCardApplication.questionnaireIDs) {
      const questionnaires = await getQuestionnaires(greenCardApplication.questionnaireIDs);
      greenCardApplication.questionnaires = questionnaires;
    } 
    
    if (greenCardApplication.userID) {
      const user = await getUser(greenCardApplication.userID);
      greenCardApplication.user = user;
    }

    if (greenCardApplication.status === 'progress') {
      greenCardApplication.status = StatusTypes.NEW;
    }

    const {questionnaireIDs, ...application} = greenCardApplication;
    greenCardApplications.push(application);
  }

  return greenCardApplications;
}