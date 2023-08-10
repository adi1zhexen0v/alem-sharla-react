interface MessageItemProps {
	message: string;
	isManager: boolean;
	date: number;
	isImage: boolean;
}

const getZero = (num: number): string => {
	return num < 10 ? `0${num}` : `${num}`;
};

const formatDate = (timestamp: number): string => {
	const date = new Date(timestamp);
	const formattedDate = `${getZero(date.getDate())}.${getZero(
		date.getMonth() + 1
	)} ${getZero(date.getHours())}:${getZero(date.getMinutes())}`;
	return formattedDate;
};
const MessageItem = ({
	message,
	isManager,
	date,
	isImage
}: MessageItemProps) => {
	const className = isManager
		? 'chat-typing__body-message chat-typing__body-message-self'
		: 'chat-typing__body-message';

	if (isImage) {
		return (
			<div className={className}>
				<img
					src={message}
					alt='Изображение'
					className='chat-typing__body-image'
				/>
				<div className='chat-typing__body-message-date'>{formatDate(date)}</div>
			</div>
		);
	}

	return (
		<div className={className}>
			<div className='chat-typing__body-message-box'>{message}</div>
			<div className='chat-typing__body-message-date'>{formatDate(date)}</div>
		</div>
	);
};

export default MessageItem;
