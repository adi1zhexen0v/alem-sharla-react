import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase/config';
import ChatTyping from '../components/ChatTyping';
import ChatList from '../components/ChatList';
import { useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';

export interface Message {
	isManager: false;
	sentDate: number;
	text?: string;
	imageURL?: string;
	isSeen: boolean;
}

export interface Correspondence {
	[messageId: string]: Message;
}

export interface Chat {
	[correspondenceId: string]: Correspondence;
}

const ChatPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [correspondences, setCorrespondences] = useState<Chat | null>(null);
	const [sortedCorrespondencesKeys, setSortedCorrespondencesKeys] = useState<
		string[]
	>([]);
	const correspondenceId = useAppSelector(
		(state: RootState) => state.correspondence.id
	);

	useEffect(() => {
		setIsLoading(true);
		const messagesRef = ref(database, 'messages/');

		const messagesListener = onValue(messagesRef, snapshot => {
			const data = snapshot.val();
			setCorrespondences(data);

			if (data) {
				const sortedKeys = Object.keys(data).sort(
					(a, b) =>
						data[b][Object.keys(data[b])[0]].sentDate -
						data[a][Object.keys(data[a])[0]].sentDate
				);
				setSortedCorrespondencesKeys(sortedKeys);
			}
		});

		setIsLoading(false);

		return () => {
			messagesListener();
		};
	}, []);

	if (isLoading) {
		return <h2>Loading...</h2>;
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
