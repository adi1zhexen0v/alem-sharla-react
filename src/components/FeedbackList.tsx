import { Feedback } from "../utils/interfaces";
import FeedbackItem from "./FeedbackItem";

interface FeedbackListProps {
  feedback: Feedback[]
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedback }) => {
  return (
    <div className="feedback-grid">{
      feedback.map(item => <FeedbackItem feedback={item}/>)
    }</div>
  )
}

export default FeedbackList;