import { faArrowUpAZ, faArrowUpZA } from "@fortawesome/free-solid-svg-icons";
import { StatusRusTypes, StatusTypes } from "./enums";
import { Sort, Status } from "./interfaces";

export const LOGIN_ROUTE: string = '/login';
export const CHAT_ROUTE: string = '/chat';
export const TOURIST_VISAS_ROUTE: string = '/visa/tourist';
export const FEEDBACK_ROUTE: string = '/feedback';
export const USERS_ROUTE: string = '/profiles';
export const GREEN_CARDS_ROUTE: string = '/greencards'
export const IMMIGRATION_VISAS_ROUTE: string = '/visa/immigration';

export const TOURIST_VISAS_COLLECTION: string = 'applications';
export const FEEDBACK_COLLECTION: string = 'feedback';
export const PROFILES_COLLECTION: string = 'profiles';
export const GREEN_CARDS_APPLICATIONS_COLLECTION: string = 'greenCardApplications';
export const IMMIGRATION_VISAS_COLLECTION: string = 'chancesAssessmentAnswers';


export const NUMBER_REGEXP: RegExp = /^\d+$/;

export const ApplicationsStatuses: string[] = [
  'Заявка подана',
  'Визовый специалист проверяет данные',
  'Ваши документы подготавливаются для сдачи в посольство',
  'Ваши документы сданы в посольство',
  'Выбираем доступные слоты для собеседования в посольство',
  'Собеседование назначено'
];

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
];


export const ChatStatuses: Status[] = [
  {
    eng: 'new',
    rus: 'Новые'
  },
  {
    eng: 'seen',
    rus: 'Прочитанные'
  },
  {
    eng: 'completed',
    rus: 'Завершенные'
  }
];

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

