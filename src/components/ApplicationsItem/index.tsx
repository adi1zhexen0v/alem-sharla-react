import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Application } from "../../utils/interfaces";
import {
  IconDefinition,
  faClock,
  faCoins,
  faFileCircleQuestion,
  faHashtag,
  faIdCardClip,
  faInfo,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ApplicationsItemGeneral from "./ApplicationsItemGeneral";
import ApplicationsItemCost from "./ApplicationsItemCost";
import ApplicationsItemApplicants from "./ApplicationsItemApplicants";
import { formatDate } from "../../utils/utils";
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
  const [activeIndex, setActiveIndex] = useState<number>(0);
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
      <div className="applications-item__header">
        <div className="applications-item__header-name">
          <FontAwesomeIcon icon={faHashtag} />
          <h3>{application.orderID}</h3>
        </div>
        <div className="applications-item__header-date">
          <FontAwesomeIcon icon={faClock} />
          <h6>{formatDate(application.createdAt * 1000)}</h6>
        </div>
      </div>
      <div className="applications-item__line"></div>
      {activeIndex === 0 ? (
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
      )}

      { application.status === StatusTypes.NEW && <div className="applications-item__new">Новое</div> }
    </div>
  );
};

export default ApplicationsItem;
