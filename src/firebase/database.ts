import { ref, set, update, onValue } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { database } from './config';
import { Correspondence, Message } from '../utils/interfaces';

export const selectAllMessages = (callback: (data: Correspondence[]) => void) => {
  const messagesRef = ref(database, 'messages/');

  const messagesListener = onValue(messagesRef, (snapshot) => {
    const messagesData: Correspondence[] = [];

    snapshot.forEach((childSnapshot) => {
      const messageData = childSnapshot.val();

      const { isCompleted, ...messages } = messageData;

      messagesData.push({
        id: childSnapshot.key,
        messages: Object.values(messages),
        isCompleted: !!isCompleted,
      });
    });
    callback(messagesData);
  });

  return messagesListener;
};

export const insertNewMessage = async (userId: string, text: string): Promise<Message> => {
  try {
    const messageId = uuidv4().toUpperCase();
    const message: Message = {
      messageId,
      senderId: userId,
      displayName: 'Менеджер',
      text,
      sentDate: Date.now(),
      isManager: true,
      isSeen: true,
    };

    await set(ref(database, `messages/${userId}/${messageId}`), message);

    return message;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const updateCorrespondenceIsCompleted = async (correspondenceId: string, isCompleted: boolean) => {
  try {
    const correspondenceRef = ref(database, `/messages/${correspondenceId}`);
    update(correspondenceRef, {
      isCompleted
    })
  } catch (error) {
    console.error(error);
  }
}

export const updateAllMessagesAsSeen = async (
  userCorrespondence: Correspondence,
) => {
  try {
    for (const message of userCorrespondence.messages) {
      update(ref(database, `messages/${userCorrespondence.id}/${message.messageId}`), {
        isSeen: true
      });
    }

  } catch (error) {
    console.error(error);
  }
};
