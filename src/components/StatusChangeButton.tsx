import { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatusRusTypes, StatusTypes } from "../utils/enums";
import { updateStatus } from "../firebase/firestore";
import { useAppDispatch } from "../hooks/reduxHooks";
import { updateFeedbackStatus } from "../redux/slices/feedbackSlice";

interface StatusChangeButtonProps {
  status: string;
  collection: string;
  id: string;
}

const StatusChangeButton: React.FC<StatusChangeButtonProps> = ({
  id,
  collection,
  status,
}) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toogleButtonsList = () => {
    setIsOpen(!isOpen);
  };

  const changeStatus = async (status: string) => {
    setIsLoading(true);
    await updateStatus(id, collection, status);
    dispatch(updateFeedbackStatus({ id, status }));
    setIsLoading(true);
    setIsOpen(false);
  };

  return (
    <div className="status">
      <button className="status-btn" onClick={toogleButtonsList}>
        Переместить
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isOpen && (
        <div className="status-list">
          {isLoading ? (
            <div className="status-list__loading">Загрузка...</div>
          ) : (
            Object.values(StatusTypes)
              .filter((value) => value !== status)
              .map((val) => (
                <div
                  className="status-list__btn"
                  key={val}
                  onClick={() => changeStatus(val)}
                  >
                  {Object(StatusRusTypes)[`${val.toUpperCase()}`]}
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default StatusChangeButton;
