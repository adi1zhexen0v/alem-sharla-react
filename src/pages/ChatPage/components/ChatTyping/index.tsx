import { useState, useEffect, useRef } from "react";
import { faClose, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { insertNewMessage } from "../../../../firebase/database";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { RootState } from "../../../../redux/store";
import MessageItem from "../MessageItem";
import { MessageTypes } from "../../../../utils/enums";
import { Correspondence, Message } from "../../../../utils/interfaces";
import { addMessageToSelectedCorrespondence, deleteSelectedCorrespondence } from "../../../../redux/slices/chatSlice";

const userProfilePicture = require("../../../../assets/img/ava-default.png");

const ChatTyping: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);

  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const correspondence: Correspondence = useAppSelector((state: RootState) => state.chat.selectedCorrespondence)!;

  const sendMessage = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const newMessage: Message = await insertNewMessage(correspondence.id, inputText);
    dispatch(addMessageToSelectedCorrespondence(newMessage));
    setInputText("");
    setIsLoading(false);
  };

  const closeCorrespondence = () => {
    dispatch(deleteSelectedCorrespondence(null));
  };

  const scrollToBottom = () => {
    const list = listRef.current;
    if (list) {
      list.scrollTo(0, list.scrollHeight);
    }
  };
  const messages = [...correspondence.messages];
  const sortedMessages = messages.sort((a, b) => a.sentDate - b.sentDate);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <div className="chat-typing">
      <div className="chat-typing__header">
        <div className="chat-typing__header-part">
          <img
            src={correspondence.profile?.photoLink ? correspondence.profile?.photoLink : userProfilePicture}
            alt="Ava"
            className="chat-typing__header-img"
          />
        </div>
        <div className="chat-typing__header-part">
          <h4 className="chat-typing__header-name">{correspondence.profile ? correspondence.profile!.username : correspondence.id}</h4>
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
            {sortedMessages.map((message) => (
                <MessageItem
                  key={message.messageId}
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
          <button className="chat-typing__body-form-submit" type="submit" disabled={isLoading}>
            { isLoading ? <div className="chat-typing__body-form-loader"></div> : <FontAwesomeIcon icon={faPaperPlane} /> }
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatTyping;
