import { Feedback } from "../utils/interfaces";
import FeedbackItem from "./FeedbackItem";
import NotFound from "./NotFound";

interface FeedbackListProps {
  feedback: Feedback[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedback }) => {
  return (
    feedback.length > 0 ? <div className="feedback-grid">{
      feedback.map((item) => (
        <FeedbackItem feedback={item} />
      ))
    }</div> : <NotFound/>
  );
};

export default FeedbackList;
