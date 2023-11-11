import { useEffect, useState } from 'react';
import { selectAllMessages } from '../firebase/database';
import { getUser } from '../firebase/firestore';
import { RootState } from '../redux/store';
import { setChat } from '../redux/slices/chatSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { Correspondence, Profile } from '../utils/interfaces';

export function useMessages() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    const messagesListener = selectAllMessages(async (data) => {
      const chat: Correspondence[] = [];
      for (const correspondenceData of Array.from(data)) {
        const profile: Profile | null = await getUser(correspondenceData.id);
        const correspondence: Correspondence = {
          id: correspondenceData.id,
          messages: correspondenceData.messages,
          status: correspondenceData.status
        };

        if (profile) {
          correspondence.profile = profile;
        }

        chat.push(correspondence);
      }

      console.log(chat);

      dispatch(setChat(chat));
      setIsLoading(false);
    });

    return () => {
      messagesListener();
    };
  }, []);

  return { isLoading };
}

