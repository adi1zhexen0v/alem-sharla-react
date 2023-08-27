import { useState, useEffect, useRef } from 'react';
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { insertNewMessage } from '../firebase/database';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';
import { removeCorrespondenceId } from '../redux/slices/correspondenceSlise';
import { Chat } from '../utils/interfaces';
import MessageItem from './MessageItem';
import { MessageTypes } from '../utils/enums';

interface ChatTypingProps {
  correspondences: Chat;
}

const userProfilePicture = require('../assets/img/ava-default.png');

const ChatTyping: React.FC<ChatTypingProps> = ({ correspondences }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState<string>('');
  const dispatch = useAppDispatch();
  const correspondenceId = useAppSelector(
    (state: RootState) => state.correspondence.id,
  );
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    insertNewMessage(correspondenceId, inputText);
    setInputText('');
  };

  const closeCorrespondence = () => {
    dispatch(removeCorrespondenceId());
  };

  const scrollToBottom = () => {
    const list = listRef.current;
    if (list) {
      list.scrollTo(0, list.scrollHeight);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [correspondences, correspondenceId]);

  return (
    <div className="chat-typing">
      <div className="chat-typing__header">
        <div className="chat-typing__header-part">
          <img
            src={userProfilePicture}
            alt="Ava"
            className="chat-typing__header-img"
          />
        </div>
        <div className="chat-typing__header-part">
          <h4 className="chat-typing__header-name">{correspondenceId}</h4>
        </div>
        <div className="chat-typing__header-part">
          <div
            className="chat-typing__header-close"
            onClick={() => closeCorrespondence()}
          >
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
      </div>

      <div className="chat-typing__body">
        <div className="chat-typing__body-list">
          <div ref={listRef} className="chat-typing__body-list-wrapper">
            {Object.entries(correspondences[correspondenceId])
              .sort(([, a], [, b]) => a.sentDate - b.sentDate)
              .map(([messageId, message]) => (
                <MessageItem
                  key={messageId}
                  message={
                    message.imageURL
                      ? message.imageURL!
                      : message.fileURL
                      ? message.fileURL!
                      : message.text!
                  }
                  isManager={message.isManager}
                  date={message.sentDate}
                  type={
                    message.imageURL
                      ? MessageTypes.IMAGE
                      : message.fileURL
                      ? MessageTypes.FILE
                      : MessageTypes.TEXT
                  }
                />
              ))}
          </div>
        </div>
        <form
          className="chat-typing__body-form"
          onSubmit={(e: React.FormEvent) => sendMessage(e)}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="chat-typing__body-form-input"
            placeholder="Напишите сообщение..."
          />
          <button className="chat-typing__body-form-submit" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatTyping;
