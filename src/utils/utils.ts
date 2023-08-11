import { Correspondence, Message } from '../pages/ChatPage';

export const countUnseenMessages = (correspondence: Correspondence) => {
	return Object.values(correspondence).filter(message => !message.isSeen)
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
		date.getMonth() + 1
	)} ${getZero(date.getHours())}:${getZero(date.getMinutes())}`;
	return formattedDate;
};