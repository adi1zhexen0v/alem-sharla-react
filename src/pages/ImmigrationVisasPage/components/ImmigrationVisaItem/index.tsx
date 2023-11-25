import { faFileCircleQuestion, faIdCardClip, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import StatusChangeButton from "../../../../components/StatusChangeButton";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { updateImmigrationVisaStatus } from "../../../../redux/slices/immigrationVisaSlice";
import { RootState } from "../../../../redux/store";
import { GeneralStatuses, IMMIGRATION_VISAS_COLLECTION } from "../../../../utils/consts";
import { StatusTypes } from "../../../../utils/enums";
import { ImmigrationVisa } from "../../../../utils/interfaces";
import ImmigrationVisasProfileSection from "./ProfileSection";
import ImmigrationVisasQuestionnaireSection from "./QuestionnaireSection";
import ImmigrationVisaSectionButton from "./SectionButton";

interface ImmigrationVisasItemProps {
  immigrationVisa: ImmigrationVisa;
}

interface SectionButton {
  id: number;
  icon: IconDefinition;
  text: string;
}

const sections: SectionButton[] = [
  {
    id: 1,
    icon: faFileCircleQuestion,
    text: 'Ответы на вопросы'
  },
  {
    id: 2,
    icon: faIdCardClip,
    text: 'Пользователь'
  }
];

const ImmigrationVisasItem: React.FC<ImmigrationVisasItemProps> = ({ immigrationVisa }) => {
  const [sectionId, setSectionId] = useState<number>(1);
  const activeStatus: string = useAppSelector((state: RootState) => state.immigrationVisas.activeStatus);

  return (
    <div className="iv-item">
      <div className="iv-item__btn-list">{
        sections.map(item => <ImmigrationVisaSectionButton id={item.id} icon={item.icon} setSection={setSectionId}/>)
      }</div>
      { immigrationVisa.status === StatusTypes.NEW && <div className="iv-item__new">Новое</div> }
      <h3 className="iv-item__title">{sections.find(item => item.id === sectionId)?.text}</h3>
      <StatusChangeButton
        id={immigrationVisa.id}
        collection={IMMIGRATION_VISAS_COLLECTION}  
        rightOffset={36}
        topOffset={3}
        bottomOffset={-36}
        statuses={GeneralStatuses}
        activeStatus={activeStatus}
        dispatchMethod={updateImmigrationVisaStatus}
      />
      {
        sectionId === 1 ? 
          <ImmigrationVisasQuestionnaireSection questionnaires={immigrationVisa.applicantQuestionnaireAnswers}/> : 
          <ImmigrationVisasProfileSection profile={immigrationVisa.user}/>
      }
    </div>
  );
}

export default ImmigrationVisasItem;