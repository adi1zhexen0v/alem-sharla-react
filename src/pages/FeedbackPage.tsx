import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { removeCorrespondenceId } from "../redux/slices/correspondenceSlise";
import { getFeedback } from "../firebase/firestore";
import { Feedback } from "../utils/interfaces";
import Loader from "../components/Loader";
import FeedbackList from "../components/FeedbackList";

const FeedbackPage = () => {
  const dispatch = useAppDispatch();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(removeCorrespondenceId());
    const fetchFeedback = async () => {
      setIsLoading(true);
      const feedbackList = await getFeedback();
      setFeedback(feedbackList);
      setIsLoading(false);
    }
    fetchFeedback();
  }, [dispatch]);
  
  return (
    <div className="content">
      <div className="feedback">
        <h2 className="section-title">Обратная связь</h2>
        <div className="feedback-wrapper">
          {
            isLoading ? <Loader/> : <FeedbackList feedback={feedback}/>
          }
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage;
