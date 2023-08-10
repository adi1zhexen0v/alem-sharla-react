import { ref, set, update } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { database } from './config';
import { Chat } from '../pages/ChatPage';

export const insertNewMessage = (userId: string, text: string) => {
	try {
		const messageId = uuidv4().toUpperCase();
		const message = {
			text,
			sentDate: Date.now(),
			isManager: true,
			isSeen: true
		};
		set(ref(database, `messages/${userId}/${messageId}`), message);
	} catch (error) {
		console.error(error);
	}
};

export const updateAllMessagesAsSeen = async (
	userId: string,
	correspondences: Chat
) => {
	try {
		const updatedCorrespondences = { ...correspondences };
		const userCorrespondence = updatedCorrespondences[userId];

		for (const messageId in userCorrespondence) {
			userCorrespondence[messageId].isSeen = true;
		}

		update(ref(database, `messages/${userId}`), userCorrespondence);
	} catch (error) {
		console.error('Error marking messages as seen:', error);
	}
};
