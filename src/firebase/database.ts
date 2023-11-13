import { ref, set, update, onValue } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { database } from './config';
import { Correspondence } from '../utils/interfaces';

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

export const insertNewMessage = (userId: string, text: string) => {
  try {
    const messageId = uuidv4().toUpperCase();
    const message = {
      messageId,
      senderId: userId,
      displayName: 'Менеджер',
      text,
      sentDate: Date.now(),
      isManager: true,
      isSeen: true,
    };
    set(ref(database, `messages/${userId}/${messageId}`), message);
  } catch (error) {
    console.error(error);
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

// export const updateAllMessagesAsSeen = async (
//   userId: string,
//   correspondences: Chat,
// ) => {
//   try {
//     const updatedCorrespondences = { ...correspondences };
//     const userCorrespondence = updatedCorrespondences[userId];

//     for (const messageId in userCorrespondence) {
//       userCorrespondence[messageId].isSeen = true;
//     }

//     update(ref(database, `messages/${userId}`), userCorrespondence);
//   } catch (error) {
//     console.error(error);
//   }
// };
