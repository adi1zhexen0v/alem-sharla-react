import { ApplicantQuestionnaireAnswer } from "../../../../utils/interfaces";
import ImmigrationVisasInfoBlock from "./InfoBlock";

interface ImmigrationVisasQuestionnaireSectionProps {
  questionnaires: ApplicantQuestionnaireAnswer[];
}

const ImmigrationVisasQuestionnaireSection: React.FC<ImmigrationVisasQuestionnaireSectionProps> = ({ questionnaires }) => {
  return (
    <div className="iv-item__grid">{
      questionnaires.map(item => (
        <ImmigrationVisasInfoBlock title={item.question} value={item.answer} />
      ))
    }</div>
  );
}

export default ImmigrationVisasQuestionnaireSection;