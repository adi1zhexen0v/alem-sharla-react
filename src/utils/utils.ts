import { Correspondence, Message } from './interfaces';

export const countUnseenMessages = (correspondence: Correspondence) => {
  return Object.values(correspondence).filter((message) => !message.isSeen)
    .length;
};

export const getLastMessageText = (correspondence: Correspondence): string => {
  let lastMessage: Message | null = null;

  for (const message of Object.values(correspondence)) {
    if (!lastMessage || message.sentDate > lastMessage.sentDate) {
      lastMessage = message;
    }
  }

  if (lastMessage) {
    return lastMessage.text || (lastMessage.imageURL ? '📷 Изображение' : '');
  }

  return '';
};

const getZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const formattedDate = `${getZero(date.getDate())}.${getZero(
    date.getMonth() + 1,
  )} ${getZero(date.getHours())}:${getZero(date.getMinutes())}`;
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