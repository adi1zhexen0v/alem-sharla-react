import { Correspondence, Message } from './interfaces';

export const countUnseenMessages = (correspondence: Correspondence) => {
  return Object.values(correspondence).filter((message) => !message.isSeen).length;
};

export const getLastMessageText = (correspondence: Correspondence): string => {
  let lastMessage: Message | null = null;

  for (const message of Object.values(correspondence)) {
    if (!lastMessage || message.sentDate > lastMessage.sentDate) {
      lastMessage = message;
    }
  }

  if (lastMessage) {
    return lastMessage.text || (lastMessage.imageURL ? '📷 Изображение' : lastMessage.fileURL ? '📄 Файл' : '');
  }

  return '';
};

const getZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const formatDate = (timestamp: number, withYear: boolean = false): string => {
  const date = new Date(timestamp);
  const formattedDate = withYear ? `${getZero(date.getDate())}.${getZero(date.getMonth() + 1,)}.${date.getFullYear()}` 
    : `${getZero(date.getDate())}.${getZero(date.getMonth() + 1,)} ${getZero(date.getHours())}:${getZero(date.getMinutes())}`;
  return formattedDate;
};


export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  const truncatedText = text.substring(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');
  return lastSpaceIndex === -1
    ? truncatedText
    : truncatedText.substring(0, lastSpaceIndex) + '...';
};

export const getVisaType = (value: string): string => {
  switch (value) {
    case 'touristVisa':
      return 'Туристическая виза';
    case 'workVisa':
      return 'Рабочая виза';
    case 'studentVisa':
      return 'Студенческая виза';
    default:
      return value;
  }
};

export const getVisaEntryType = (value: string): string => {
  return value === 'single' ? 'Однократная виза' : 'Многократная виза';
};

export const getPrice = (length: number, price: number): string => {
  return length > 1 ? `${length} x ${price} ₸` : `${price} ₸`;
}

export const formatDateToISO = (input: string): string => {
  const [datePart, timePart] = input.split(' ');
  const [day, month, year] = datePart.split('.');
  const [hours, minutes] = timePart.split(':');
  
  const isoDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  return isoDate;
};

export const formatISOToDate = (iso: string): string => {
  const [datePart, timePart] = iso.split('T');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes] = timePart.split(':');
  
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  return formattedDate;
};