import { faArrowUpAZ, faArrowUpZA } from "@fortawesome/free-solid-svg-icons";
import { StatusRusTypes, StatusTypes } from "./enums";
import { Sort, Status } from "./interfaces";

export const LOGIN_ROUTE: string = '/login';
export const CHAT_ROUTE: string = '/chat';
export const APPLICATIONS_ROUTE: string = '/applications';
export const FEEDBACK_ROUTE: string = '/feedback';
export const USERS_ROUTE: string = '/profiles';
export const GREEN_CARDS_ROUTE: string = '/greencards'

export const APPLICATIONS_COLLECTION: string = 'applications';
export const FEEDBACK_COLLECTION: string = 'feedback';
export const PROFILES_COLLECTION: string = 'profiles';
export const GREEN_CARDS_APPLICATIONS_COLLECTION: string = 'greenCardApplications';

export const NUMBER_REGEXP: RegExp = /^\d+$/;

export const GeneralStatuses: Status[] = [
  {
    eng: StatusTypes.NEW,
    rus: StatusRusTypes.NEW
  },
  {
    eng: StatusTypes.PROCESS,
    rus: StatusRusTypes.PROCESS
  },
  {
    eng: StatusTypes.COMPLETED,
    rus: StatusRusTypes.COMPLETED
  }
]

export const FromAtoZSorting: string = "-name";
export const FromZtoASorting: string = "+name";
export const ProfilesSorting: Sort[] = [
  {
    sort: FromAtoZSorting,
    name: "По имени (А-Я)",
    icon: faArrowUpAZ
  }, 
  {
    sort: FromZtoASorting,
    name: "По имени (Я-А)",
    icon: faArrowUpZA
  }
];

