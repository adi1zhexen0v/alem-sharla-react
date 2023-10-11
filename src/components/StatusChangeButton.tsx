import { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateStatus } from "../firebase/firestore";
import { useAppDispatch } from "../hooks/reduxHooks";
import { Status } from "../utils/interfaces";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface StatusChangeProps {
  id: string;
  status: string;
}

interface StatusChangeButtonProps {
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
    await updateStatus(id, collection, status);
    dispatch(dispatchMethod({ id, status }));
    setIsLoading(true);
    setIsOpen(false);
  };

  return (
    <div className="status">
      <button className="status-btn" onClick={toogleButtonsList} style={{bottom: bottomOffset, right: rightOffset}}>
        Переместить
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isOpen && (
        <div className="status-list" style={{right: rightOffset, top: `calc(100% - ${topOffset}px)`}}>
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
