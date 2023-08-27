import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageWithSkeleton from './ImageWithSkeleton';
import { formatDate } from '../../utils/utils';
import { MessageTypes } from '../../utils/enums';

interface MessageItemProps {
  message: string;
  isManager: boolean;
  date: number;
  type: MessageTypes;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isManager, date, type }) => {
  const [imageIsOpen, setImageIsOpen] = useState<boolean>(false);
  const className = isManager
    ? 'chat-typing__body-message chat-typing__body-message-self'
    : 'chat-typing__body-message';

  return (
    <div className={className}>
      {type === MessageTypes.IMAGE ? (
        <ImageWithSkeleton imageUrl={message} setValue={setImageIsOpen} />
      ) : type === MessageTypes.FILE ? (
        <div className="chat-typing__body-message-box">
          <Link
            to={message}
            className="chat-typing__body-message-box-file"
            target="_blank"
          >
            <span>
              <FontAwesomeIcon icon={faFile} />
            </span>
            Файл
          </Link>
        </div>
      ) : (
        <div className="chat-typing__body-message-box">{message}</div>
      )}
      <div className="chat-typing__body-message-date">{formatDate(date)}</div>
      {imageIsOpen && (
        <div className="picture-show" onClick={() => setImageIsOpen(false)}>
          <img src={message} alt="Изображение" className="picture-show__img" />
        </div>
      )}
    </div>
  );
};

export default MessageItem;
