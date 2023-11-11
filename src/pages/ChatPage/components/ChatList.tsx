import { Correspondence } from "../../../utils/interfaces";
import ChatItem from "./ChatItem";

interface ChatListProps {
	correspondences: Correspondence[];
}

const ChatList: React.FC<ChatListProps> = ({ correspondences }) => {
	return (
		<div className="chat-list">{
			correspondences.map(correspondence => (
					<ChatItem correspondence={correspondence}/>
			))
		}</div>
	);
}

export default ChatList;