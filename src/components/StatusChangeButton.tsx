import { useState } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateStatus } from "../firebase/firestore";
import { useAppDispatch } from "../hooks/reduxHooks";
import { Status } from "../utils/interfaces";

interface StatusChangeProps {
  id: string;
  status?: string;
  statusType?: string;
}

interface StatusChangeButtonProps {
  isStatusType?: boolean;
  statuses: Status[];
  activeStatus: string;
  collection: string;
  id: string;
  rightOffset?: number;
  bottomOffset?: number;
  topOffset?: number;
  dispatchMethod: ActionCreatorWithPayload<StatusChangeProps, string>;
}

const StatusChangeButton: React.FC<StatusChangeButtonProps> = ({
  id,
  isStatusType = false,
  collection,
  activeStatus,
  statuses,
  rightOffset = 0,
  bottomOffset = 0,
  topOffset = 0,
  dispatchMethod
}) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toogleButtonsList = () => {
    setIsOpen(!isOpen);
  };

  const changeStatus = async (status: string) => {
    setIsLoading(true);
    await updateStatus(id, collection, status, isStatusType);
    dispatch(dispatchMethod(isStatusType ? { id, statusType: status } : { id, status }));
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <div className="status">
      <button className="status-btn" 
        onClick={toogleButtonsList} 
        style={bottomOffset >= 0 ? {bottom: bottomOffset, right: rightOffset} : {top: Math.abs(bottomOffset), right: rightOffset}}
      >
        Переместить
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isOpen && (
        <div className="status-list" 
          style={bottomOffset >= 0 ? 
            {right: rightOffset, top: `calc(100% - ${topOffset}px)`} : 
            {right: rightOffset, top: Math.abs(bottomOffset) + 42 + topOffset}
          }>
          {isLoading ? (
            <div className="status-list__loading">Загрузка...</div>
          ) : (
            statuses.filter((value) => value.eng !== activeStatus)
              .map((val) => (
                <div
                  className="status-list__btn"
                  key={val.eng}
                  onClick={() => changeStatus(val.eng)}>
                  {val.rus}
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default StatusChangeButton;
