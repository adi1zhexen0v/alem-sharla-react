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