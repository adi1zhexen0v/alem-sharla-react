import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faClock } from "@fortawesome/free-solid-svg-icons";
import { Feedback } from "../utils/interfaces";
import { formatDate } from "../utils/utils";

interface FeedbackItemProps {
  feedback: Feedback
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback }) => {
  return (
    <div className="feedback-item">
      <div className="feedback-item__block">
        <span className="feedback-item__block-key">Имя пользователя</span>
        <h4 className="feedback-item__block-value">{feedback.name}</h4>
      </div>
      <div className="feedback-item__block">
        <span className="feedback-item__block-key">Контактные данные</span>
        <h4 className="feedback-item__block-value">{feedback.contact}</h4>
      </div>
      <div className="feedback-item__block">
        <span className="feedback-item__block-key">Сообщение</span>
        <h4 className="feedback-item__block-value">{feedback.message}</h4>
      </div>
      <span className="feedback-item__date">
        <FontAwesomeIcon icon={faClock}/>
        <h6>{formatDate(feedback.createdAt.seconds * 1000)}</h6>
      </span>
      <div className="status">
        <button className="status-btn">
          Переместить
          <FontAwesomeIcon icon={faChevronDown}/>
        </button>
        <div className="status-list"></div>
      </div>

    </div>
  )
}

export default FeedbackItem;