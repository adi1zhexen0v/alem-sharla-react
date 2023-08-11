import ChatTyping from '../components/ChatTyping';
import ChatList from '../components/ChatList';
import FullPageLoader from '../components/FullPageLoader';
import { useAppSelector } from '../hooks/reduxHooks';
import { useMessages } from '../hooks/useMessages';
import { RootState } from '../redux/store';

export interface Message {
  displayName: string;
  isManager: false;
	isSeen: boolean;
	imageURL?: string;
  messageId: string;
  senderId: string;
	sentDate: number;
	text?: string;
}

export interface Correspondence {
	[messageId: string]: Message;
}

export interface Chat {
	[correspondenceId: string]: Correspondence;
}

const ChatPage = () => {
  const { isLoading, correspondences, sortedCorrespondencesKeys } = useMessages();
	
	const correspondenceId = useAppSelector(
		(state: RootState) => state.correspondence.id
	);

	if (isLoading) {
		return <FullPageLoader/>;
	}

	return (
		<div className='content'>
			<div className='chat'>
				<h2 className='section-title'>Чат</h2>
				<div className='chat-wrapper'>
					<div className='chat-part'>
						{correspondences && (
							<ChatList
								correspondences={correspondences!}
								correspondencesKeys={sortedCorrespondencesKeys}
							/>
						)}
					</div>
					<div className='chat-part'>
						{correspondenceId !== '' && (
							<ChatTyping correspondences={correspondences!} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatPage;
