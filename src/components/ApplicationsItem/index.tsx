import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faAngleDown,
  faClock,
  faCoins,
  faFileCircleQuestion,
  faIdCardClip,
  faInfo,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { updateStatus } from "../../firebase/firestore";
import { Application } from "../../utils/interfaces";
import { formatDate } from "../../utils/utils";
import { APPLICATIONS_COLLECTION, ApplicationsStatuses } from "../../utils/consts";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateApplicationsStatus } from "../../redux/slices/applicationsSlice";
import ApplicationsItemGeneral from "./ApplicationsItemGeneral";
import ApplicationsItemCost from "./ApplicationsItemCost";
import ApplicationsItemApplicants from "./ApplicationsItemApplicants";
import ApplicationsItemProfile from "./ApplicationsItemProfile";
import ApplicationsItemQuestionnaire from "./ApplicationsItemQuestionnaire";
import { StatusTypes } from "../../utils/enums";

export interface ApplicationItemProps {
  application: Application;
}

interface Data {
  icon: IconDefinition;
}

const data: Data[] = [
  {
    icon: faInfo,
  },
  {
    icon: faUsers,
  },
  {
    icon: faCoins,
  },
  {
    icon: faIdCardClip,
  },
  {
    icon: faFileCircleQuestion,
  },
];

const ApplicationsItem: React.FC<ApplicationItemProps> = ({ application }) => {
  const dispatch = useAppDispatch();

  const [listIsOpen, setListIsOpen] = useState<boolean>(false);
  const [statusNumber, setStatusNumber] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeStatus = async (status: number) => {
    setIsLoading(true);
    await updateStatus(application.id, APPLICATIONS_COLLECTION, status, false);
    dispatch(updateApplicationsStatus({id: application.id, status}));
    setIsLoading(true);
    setListIsOpen(false);
  };

  const statusIsNumber: boolean = typeof statusNumber === "number";
  const buttonIsDisabled: boolean = !statusIsNumber ? !statusIsNumber : application.status === statusNumber! + 1; 

  return (
    <div className="applications-item">
      <div className="applications-item__btn-list">
        {data.map((item, index) => (
          <div
            key={index}
            className={`applications-item__btn-item ${
              activeIndex === index && "applications-item__btn-item-active"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <FontAwesomeIcon icon={item.icon} />
          </div>
        ))}
      </div>
      <div className="applications-item__date">
        <FontAwesomeIcon icon={faClock} />
        <h6>{formatDate(application.createdAt * 1000)}</h6>
      </div>

      <div className="applications-item__btn" onClick={() => setListIsOpen(!listIsOpen)}>
        <div className="applications-item__btn-part">
          <h3>Статус заявки #{application.orderID}</h3>
          <h6>{ApplicationsStatuses[application.status - 1]}</h6>
        </div>
        <div className="applications-item__btn-part">
            <FontAwesomeIcon icon={faAngleDown}/>
        </div>
      </div>

      <div className="applications-item__line"></div>
      { listIsOpen ? <div className="applications-item__statuses">
        {
          ApplicationsStatuses.map((status, index) => (
            <>
              <div 
                className={`applications-item__statuses-item ${statusNumber === index && "applications-item__statuses-item-active"}`} 
                onClick={() => setStatusNumber(index)}>
                  {status}
              </div>
              {(statusNumber !== index && statusNumber !== index + 1) && index !== ApplicationsStatuses.length - 1 && <div className="applications-item__statuses-line"></div>}
            </>
          ))
        } 
        <div className="applications-item__statuses-btn-wrapper">
          { isLoading &&  <div className="applications-item__statuses-btn-loader"></div> }
          <button 
            disabled={buttonIsDisabled} 
            className="applications-item__statuses-btn" 
            onClick={() => changeStatus(statusNumber! + 1)}>
            Выбрать
          </button>
        </div>
      </div> 
      
      : (
        activeIndex === 0 ? (
          <ApplicationsItemGeneral application={application} />
        ) : activeIndex === 1 ? (
          <ApplicationsItemApplicants application={application} />
        ) : activeIndex === 2 ? (
          <ApplicationsItemCost application={application} />
        ) : activeIndex === 3 ? (
          <ApplicationsItemProfile user={application.user!} />
        ) : (
          <ApplicationsItemQuestionnaire
            questionnaires={application.questionnaires}
          />
        )
      )}

      { application.statusType === StatusTypes.NEW && <div className="applications-item__new">Новое</div> }
    </div>
  );
};

export default ApplicationsItem;
