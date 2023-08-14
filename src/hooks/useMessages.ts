import { useEffect, useState } from 'react';
import { selectAllMessages } from '../firebase/database';
import { Chat } from '../utils/interfaces';

export function useMessages() {
  const [isLoading, setIsLoading] = useState(false);
  const [correspondences, setCorrespondences] = useState<Chat | null>(null);
  const [sortedCorrespondencesKeys, setSortedCorrespondencesKeys] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const messagesListener = selectAllMessages((data) => {
      setCorrespondences(data);

      if (data) {
        const sortedKeys = Object.keys(data).sort(
          (a, b) =>
            data[b][Object.keys(data[b])[0]].sentDate -
            data[a][Object.keys(data[a])[0]].sentDate,
        );
        setSortedCorrespondencesKeys(sortedKeys);
      }

      setIsLoading(false);
    });

    return () => {
      messagesListener();
    };
  }, []);

  return { isLoading, correspondences, sortedCorrespondencesKeys };
}
