import { updateAllMessagesAsSeen } from '../firebase/database';
import { useAppDispatch } from '../hooks/reduxHooks';
import { Chat } from '../pages/ChatPage';
import { setCorrespondenceId } from '../redux/slices/correspondenceSlise';
import { countUnseenMessages, getLastMessageText } from '../utils/utils';
import ChatItem from './ChatItem';

interface ChatListProps {
	correspondences: Chat;
	correspondencesKeys: string[];
}

const ChatList = ({ correspondences, correspondencesKeys }: ChatListProps) => {
	const dispatch = useAppDispatch();

	const markMessagesAsSeen = async (uid: string) => {
		dispatch(setCorrespondenceId(uid));
		if (!correspondences) return;
		updateAllMessagesAsSeen(uid, correspondences);
	};

	return (
		<div className='chat-list'>
			{correspondencesKeys.map(correspondenceId => {
				const correspondence = correspondences?.[correspondenceId];
				if (!correspondence) return null;
				const lastMessage = getLastMessageText(correspondence);
				const unseenMessageCount = countUnseenMessages(correspondence);
				return (
					<ChatItem
						key={correspondenceId}
						correspondenceId={correspondenceId}
						lastMessage={lastMessage}
						markMessagesAsSeen={markMessagesAsSeen}
						unseenMessageCount={unseenMessageCount}
					/>
				);
			})}
		</div>
	);
};

export default ChatList;