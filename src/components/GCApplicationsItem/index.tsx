import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GreenCardApplication } from "../../utils/interfaces";
import { IconDefinition, faClock, faFileCircleQuestion, faHashtag, faInfo, faUsers } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/utils";
import { useState } from "react";
import GreenCardApplicationsItemGeneralInfoBlock from "./GeneralnfoBlock";
import GreenCardApplicationsItemApplicantsBlock from "./ApplicantsBlock";
import GreenCardApplicationsItemQuestionnaireBlock from "./QuestionnairesBlock";
import { StatusTypes } from "../../utils/enums";

export interface GreenCardApplicationsItemProps {
  greenCardApplication: GreenCardApplication;
}

interface Data {
  icon: IconDefinition;
}

const data: Data[] = [
  {
    icon: faInfo
  },
  {
    icon: faUsers
  },
  {
    icon: faFileCircleQuestion
  }
];

const GreenCardApplicationsItem: React.FC<GreenCardApplicationsItemProps> = ({ greenCardApplication }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="gca-item">
      <div className="gca-item__header">
        <div className="gca-item__btn-list">{data.map((item, index) => (
          <div
            key={index}
            className={`gca-item__btn-item ${
              activeIndex === index && "gca-item__btn-item-active"
            }`}
            onClick={() => setActiveIndex(index)}>
            <FontAwesomeIcon icon={item.icon} />
          </div>
        ))}</div>
        <div className="gca-item__header-name">
          <FontAwesomeIcon icon={faHashtag} />
          <h3>{greenCardApplication.orderID}</h3>
        </div>
        <div className="gca-item__header-date">
          <FontAwesomeIcon icon={faClock} />
          <h6>{formatDate(greenCardApplication.createdAt * 1000)}</h6>
        </div>
      </div>
      <div className="gca-item__body">{
        activeIndex === 0 ? <GreenCardApplicationsItemGeneralInfoBlock greenCardApplication={greenCardApplication}/> :
        activeIndex === 1 ? <GreenCardApplicationsItemApplicantsBlock greenCardApplication={greenCardApplication}/> :
        <GreenCardApplicationsItemQuestionnaireBlock greenCardApplication={greenCardApplication}/>
      }</div>
      {
        greenCardApplication.status === StatusTypes.NEW && <div className="gca-item__new">Новое</div>
      }
    </div>
  );
}

export default GreenCardApplicationsItem;