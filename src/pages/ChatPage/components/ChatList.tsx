import NotFound from "../../../components/NotFound";
import { Correspondence } from "../../../utils/interfaces";
import ChatItem from "./ChatItem";

interface ChatListProps {
	correspondences: Correspondence[];
}

const ChatList: React.FC<ChatListProps> = ({ correspondences }) => {
	return (
		<div className="chat-list">{
			correspondences.length > 0 ? correspondences.map(correspondence => (
        <ChatItem correspondence={correspondence}/>
			)) : <NotFound/>
		}</div>
	);
}

export default ChatList;