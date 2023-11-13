import { MouseEvent } from "react";
import { updateAllMessagesAsSeen } from "../../../../firebase/database";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { readAllMessagesIntoSelectedCorrespondence, setSelectedCorrespondence } from "../../../../redux/slices/chatSlice";
import { Correspondence } from "../../../../utils/interfaces";
import { countUnseenMessages, getLastMessageText, truncateText } from "../../../../utils/utils";
import StatusChangeButton from "./StatusChangeButton";

const userDefaultProfile = require('../../../../assets/img/ava-default.png');

interface ChatItemProps {
	correspondence: Correspondence;
}

const ChatItem: React.FC<ChatItemProps> = ({ correspondence }) => {
  const dispatch = useAppDispatch();

  const { profile, messages } = correspondence;
  const lastMessage = getLastMessageText(messages);
  const unseenMessageCount = countUnseenMessages(messages);

  const selectCorrespondence = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const targetClassName = (e.target as Element)?.className;
    const excludedClassNames = ["chat-item__status-btn", "chat-item__status-list", "chat-item__status-list__btn"];
  
    if (!excludedClassNames.some(className => targetClassName.includes(className))) {
      dispatch(setSelectedCorrespondence(correspondence));
      dispatch(readAllMessagesIntoSelectedCorrespondence(null));
      updateAllMessagesAsSeen(correspondence);
    }
  }
  
	return (
		<div className="chat-item" onClick={(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => selectCorrespondence(e)}>
      <div className="chat-item__part">
        <div className="chat-item__img">
          <img src={profile && profile.photoLink ? profile.photoLink : userDefaultProfile} alt={correspondence.id} />
          {unseenMessageCount > 0 && (
            <div className="chat-item__unseen">{unseenMessageCount}</div>
          )}
        </div>
        <div className="chat-item__info">
          <h4 className="chat-item__name">{profile && profile.username ? profile.username : correspondence.id.substring(0, 20) + "..."}</h4>
          <p className="chat-item__message">{lastMessage.isManager && <span>Вы:</span>} {truncateText(lastMessage.text, 22)}</p>
        </div>
      </div>
      <div className="chat-item__part">
        <StatusChangeButton id={correspondence.id} isCompleted={correspondence.isCompleted}/>
      </div>  
    </div>
	);
}

export default ChatItem;