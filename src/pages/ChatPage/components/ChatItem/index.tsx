import { Correspondence } from "../../../../utils/interfaces";
import { countUnseenMessages, getLastMessageText, truncateText } from "../../../../utils/utils";
import StatusChangeButton from "./StatusChangeButton";
const userDefaultProfile = require('../../../../assets/img/ava-default.png');

interface ChatItemProps {
	correspondence: Correspondence;
}

const ChatItem: React.FC<ChatItemProps> = ({ correspondence }) => {
  const { profile, messages } = correspondence;
  const lastMessage = getLastMessageText(messages);
  const unseenMessageCount = countUnseenMessages(messages);

	return (
		<div className="chat-item">
      <div className="chat-item__part">
        <div className="chat-item__img">
          <img src={profile && profile.photoLink ? profile.photoLink : userDefaultProfile} alt={correspondence.id} />
          {unseenMessageCount > 0 && (
            <div className="chat-item__unseen">{unseenMessageCount}</div>
          )}
        </div>
        <div className="chat-item__info">
          <h4 className="chat-item__name">{profile && profile.username ? profile.username : correspondence.id.substring(0, 20) + "..."}</h4>
          <p className="chat-item__message">{truncateText(lastMessage, 30)}</p>
        </div>
      </div>
      <div className="chat-item__part">
        <StatusChangeButton id={correspondence.id} isCompleted={correspondence.isCompleted}/>
      </div>  
    </div>
	);
}

export default ChatItem;