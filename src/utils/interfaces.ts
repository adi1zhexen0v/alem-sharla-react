import { Timestamp } from "firebase/firestore";

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
  serviceFeeTenge: number;
  standartVisaApplicationTimeDays: number;
  userID: string;
  visaEntryType: string;
  visaEndDate: string;
  visaStartDate: string;
  visaType: string;
}

export interface Feedback {
  contact: string;
  createdAt: Timestamp;
  message: string;
  name: string;
}