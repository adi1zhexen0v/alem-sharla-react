import { useState } from 'react';
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { insertNewMessage } from '../firebase/database';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';
import { removeCorrespondenceId } from '../redux/slices/correspondenceSlise';
import { Chat } from '../pages/ChatPage';
import MessageItem from './MessageItem';

interface ChatTypingProps {
	correspondences: Chat;
}

const userProfilePicture = require('../assets/img/ava-default.png');

const ChatTyping = ({ correspondences }: ChatTypingProps) => {
	const [inputText, setInputText] = useState('');
	const dispatch = useAppDispatch();
	const userId = useAppSelector((state: RootState) => state.correspondence.id);
	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		insertNewMessage(userId, inputText);
		setInputText('');
	};

	const closeCorrespondence = () => {
		dispatch(removeCorrespondenceId());
	};

	return (
		<div className='chat-typing'>
			<div className='chat-typing__header'>
				<div className='chat-typing__header-part'>
					<img
						src={userProfilePicture}
						alt='Ava'
						className='chat-typing__header-img'
					/>
				</div>
				<div className='chat-typing__header-part'>
					<h4 className='chat-typing__header-name'>{userId}</h4>
				</div>
				<div className='chat-typing__header-part'>
					<div
						className='chat-typing__header-close'
						onClick={() => closeCorrespondence()}
					>
						<FontAwesomeIcon icon={faClose} />
					</div>
				</div>
			</div>

			<div className='chat-typing__body'>
				<div className='chat-typing__body-list'>
					{Object.entries(correspondences[userId])
						.sort(([, a], [, b]) => a.sentDate - b.sentDate)
						.map(([messageId, message]) => (
							<MessageItem
								key={messageId}
								message={message.text ? message.text! : message.imageURL!}
								isManager={message.isManager}
								date={message.sentDate}
								isImage={message.imageURL ? true : false}
							/>
						))}
				</div>
				<form
					className='chat-typing__body-form'
					onSubmit={(e: React.FormEvent) => sendMessage(e)}
				>
					<input
						type='text'
						value={inputText}
						onChange={e => setInputText(e.target.value)}
						className='chat-typing__body-form-input'
						placeholder='Напишите сообщение...'
					/>
					<button className='chat-typing__body-form-submit' type='submit'>
						<FontAwesomeIcon icon={faPaperPlane} />
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChatTyping;
