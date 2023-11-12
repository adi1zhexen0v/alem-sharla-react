import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { DocumentReference } from "firebase/firestore";

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

// export interface Chat {
//   [correspondenceId: string]: Correspondence;
// }

export interface Correspondence {
  id: string;
  messages: Message[]; 
  status: string;
  profile?: Profile;
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
  questionnaireIDs?: DocumentReference[];
  serviceFeeTenge: number;
  standartVisaApplicationTimeDays: number;
  status: number;
  user: Profile | null;
  userID: string;
  visaEntryType: string;
  visaEndDate: string;
  visaStartDate: string;
  visaType: string;
}

export interface Feedback {
  id: string;
  contact: string;
  createdAt: number;
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

export interface Profile {
  address: string;
  apartment: string;
  email: string;
  phoneNumber: string;
  photoLink: string;
  userID: string;
  username: string;
}

interface GreenCardApplicant extends Applicant {
  photoLink: string;
}

export interface GreenCardApplication {
  applicants: GreenCardApplicant[];
  createdAt: number;
  finalCost: number;
  id: string;
  isPaid: boolean; 
  orderID: number;
  paymentTime: number;
  questionnaires: QuestionnaireAnswer[];
  questionnaireIDs?: DocumentReference[];
  resultsDate: number;
  status: string;
  user: Profile | null;
  userID: string;
}

export interface Status {
  eng: string;
  rus: string;
}

export interface Sort {
  sort: string;
  name: string;
  icon: IconDefinition;
}