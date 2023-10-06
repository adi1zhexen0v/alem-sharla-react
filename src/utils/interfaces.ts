import { DocumentReference, Timestamp } from "firebase/firestore";

export interface Message {
  displayName: string;
  isManager: false;
  isSeen: boolean;
  imageURL?: string;
  fileURL?: string;
  messageId: string;
  senderId: string;
  sentDate: number;
  text?: string;
}

export interface Correspondence {
  [messageId: string]: Message;
}

export interface Chat {
  [correspondenceId: string]: Correspondence;
}

interface AdditionalService {
  price: number;
  title: string;
}

interface Applicant {
  authority: string;
  citizenship: string;
  dateOfBirth: string;
  gender: string;
  iin: string;
  name: string;
  passportDueToDate: string;
  passportGivenDate: string;
  passportID: string;
  surname: string;
}

export interface Application {
  additionalServices: AdditionalService[];
  applicants: Applicant[];
  biometricFeeTenge: number;
  citizenship: string;
  consularFeeTenge: number;
  country: string;
  courierFeeTenge: number;
  createdAt: number;
  finalCost: number;
  id: string;
  interViewDate: string;
  isPaid: boolean;
  orderID: number;
  paymentTime: number;
  processingCost: number;
  processingTime: number;
  questionnaires: QuestionnaireAnswer[];
  questionnaireIDs: DocumentReference[];
  serviceFeeTenge: number;
  standartVisaApplicationTimeDays: number;
  user: User | null;
  userID: string;
  visaEntryType: string;
  visaEndDate: string;
  visaStartDate: string;
  visaType: string;
}

export interface Feedback {
  id: string;
  contact: string;
  createdAt: Timestamp;
  message: string;
  name: string;
  status: string;
}

interface ApplicantQuestionnaireAnswer {
  answer: string;
  question: string;
}

export interface QuestionnaireAnswer {
  applicantQuestionnaireAnswers: ApplicantQuestionnaireAnswer[];
  id: string;
}

export interface User {
  address: string;
  apartment: string;
  email: string;
  phoneNumber: string;
  photoLink: string;
  userID: string;
  username: string;
}