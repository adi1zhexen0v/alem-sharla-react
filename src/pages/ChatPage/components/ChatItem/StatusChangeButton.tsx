import { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { changeChatIsCompleted } from "../../../../redux/slices/chatSlice";
import { updateCorrespondenceIsCompleted } from "../../../../firebase/database";
import { StatusRusTypes } from "../../../../utils/enums";

interface StatusChangeButtonProps {
  id: string;
  isCompleted: boolean;
}

const StatusChangeButton: React.FC<StatusChangeButtonProps> = ({ id, isCompleted}) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toogleButtonsList = () => {
    setIsOpen(!isOpen);
  };

  const changeStatus = async (isCompleted: boolean) => {
    setIsLoading(true);
    await updateCorrespondenceIsCompleted(id, isCompleted);
    dispatch(changeChatIsCompleted({ id, isCompleted }));
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <div className="chat-item__status">
      <button className="chat-item__status-btn" onClick={toogleButtonsList}>
        Переместить
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isOpen && (
        <div className="chat-item__status-list">
          {isLoading ? (
            <div className="chat-item__status-list__loading">Загрузка...</div>
          ) : (
            <div
                className="chat-item__status-list__btn"
                onClick={() => changeStatus(!isCompleted)}>
                {isCompleted ? StatusRusTypes.PROCESS : StatusRusTypes.COMPLETED}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusChangeButton;
