import { ChangeEvent, useEffect, useState } from "react";
import { getFeedback } from "../firebase/firestore";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import { removeCorrespondenceId } from "../redux/slices/correspondenceSlise";
import { addFeedback, changeFeedbackActiveStatus, changeFeedbackSearchText } from "../redux/slices/feedbackSlice";
import Loader from "../components/Loader";
import FeedbackList from "../components/FeedbackList";
import SectionHeader from "../components/SectionHeader";
import { Feedback } from "../utils/interfaces";

const FeedbackPage = () => {
  const dispatch = useAppDispatch();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const numberOfNewFeedback: number = useAppSelector((state: RootState) => state.feedback.feedbackList.filter(item => item.status === 'new').length);
  const activeStatus: string = useAppSelector((state: RootState) => state.feedback.activeStatus);
  const searchText: string = useAppSelector((state: RootState) => state.feedback.searchText);

  useEffect(() => {
    dispatch(removeCorrespondenceId());
    const fetchFeedback = async () => {
      setIsLoading(true);
      const feedbackList = await getFeedback();
      setFeedback(feedbackList);
      dispatch(addFeedback(feedbackList));
      setIsLoading(false);
    }
    fetchFeedback();
  }, [dispatch]);
  
  const setActiveStatus = (status: string) => {
    dispatch(changeFeedbackActiveStatus(status));
  }

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFeedbackSearchText(e.target.value));
  }

  return (
    <div className="content">
      <div className="feedback">
        <h2 className="section-title">Обратная связь</h2>
        <SectionHeader activeStatus={activeStatus} numberOfNewItems={numberOfNewFeedback} setActiveStatus={setActiveStatus} handleChangeSearchText={handleChangeSearchText}/>
        <div className="feedback-wrapper">
          {
            isLoading ? <Loader/> : <FeedbackList feedback={feedback.filter(item => (item.status === activeStatus) && (item.name.includes(searchText) || item.contact.includes(searchText) || item.message.includes(searchText)))}/>
          }
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage;
