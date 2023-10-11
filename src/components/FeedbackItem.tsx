import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Feedback } from "../utils/interfaces";
import { formatDate } from "../utils/utils";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import StatusChangeButton from "./StatusChangeButton";
import { FEEDBACK_COLLECTION, GeneralStatuses } from "../utils/consts";
import { updateFeedbackStatus } from "../redux/slices/feedbackSlice";

interface FeedbackItemProps {
  feedback: Feedback;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback }) => {
  const activeStatus: string = useAppSelector(
    (state: RootState) => state.feedback.activeStatus,
  );

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
        <FontAwesomeIcon icon={faClock} />
        <h6>{formatDate(feedback.createdAt * 1000)}</h6>
      </span>

      <StatusChangeButton
        id={feedback.id}
        collection={FEEDBACK_COLLECTION}
        activeStatus={activeStatus}
        statuses={GeneralStatuses}
        bottomOffset={30}
        rightOffset={30}
        topOffset={25}
        dispatchMethod={updateFeedbackStatus}
      />

      { activeStatus === 'new' && <div className="feedback-item__new">Новое</div> }
    </div>
  );
};

export default FeedbackItem;
