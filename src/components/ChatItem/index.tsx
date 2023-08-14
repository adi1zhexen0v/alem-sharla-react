import { truncateText } from "../../utils/utils";

const userProfilePicture = require('../../assets/img/ava-default.png');

interface ChatItemProps {
  correspondenceId: string;
  lastMessage: string;
  unseenMessageCount: number;
  markMessagesAsSeen: (userId: string) => void;
}


const ChatItem: React.FunctionComponent<ChatItemProps> = ({
  correspondenceId,
  lastMessage,
  unseenMessageCount,
  markMessagesAsSeen,
}) => {
  return (
    <div
      className="chat-item"
      onClick={() => markMessagesAsSeen(correspondenceId)}
    >
      <div className="chat-item__part">
        <img src={userProfilePicture} alt="Ava" className="chat-item__img" />
      </div>
      <div className="chat-item__part">
        <h4 className="chat-item__name">{correspondenceId}</h4>
        <p className="chat-item__message">{truncateText(lastMessage, 40)}</p>
      </div>
      <div className="chat-item__part">
        {unseenMessageCount > 0 && (
          <div className="chat-item__unseen">{unseenMessageCount}</div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
