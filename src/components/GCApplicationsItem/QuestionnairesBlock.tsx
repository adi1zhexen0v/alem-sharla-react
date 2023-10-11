import GreenCardApplicationsInfoBlock from "./InfoBlock";
import { GreenCardApplicationsItemProps } from "./index";

const GreenCardApplicationsItemQuestionnaireBlock: React.FC<GreenCardApplicationsItemProps> = ({ greenCardApplication }) => {
  const questionnaires = greenCardApplication.questionnaires;
  return (
    <div className="gca-item__section">
      <h4 className="gca-item__title">Анкета</h4>
      {
        questionnaires.map((questionnaire) => (
          <div className="gca-item__questionnaire">{
            questionnaire.applicantQuestionnaireAnswers.map((item) => (
              <GreenCardApplicationsInfoBlock title={item.question} value={item.answer}/>
            ))
          }</div>
        ))
      }
    </div>
  );  
}
export default GreenCardApplicationsItemQuestionnaireBlock;