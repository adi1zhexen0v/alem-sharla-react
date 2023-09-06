import ApplicationsItemBlock from "./ApplicationsItemBlock";
import { QuestionnaireAnswer } from "../../utils/interfaces";

interface ApplicationsItemQuestionnaireProps {
  questionnaires: QuestionnaireAnswer[];
}

const ApplicationsItemQuestionnaire: React.FC<ApplicationsItemQuestionnaireProps> = ({ questionnaires }) => {
  const sectionTitle = questionnaires && questionnaires.length > 1 ? 'Анкеты' : 'Анкета';
  console.log(sectionTitle);

  return (
    <div className="applications-item__section">
      <h6 className="applications-item__title">{sectionTitle}</h6>
      {questionnaires && questionnaires.map((questionnaire, index) => (
        <>
          <div className="applications-item__grid applications-item__questionnaire" key={questionnaire.id}>{
            questionnaire.applicantQuestionnaireAnswers.map((item, index) => (
              <ApplicationsItemBlock title={item.question} value={item.answer} key={index}/>
            ))
          }</div>
          {index + 1 !== questionnaires.length && <div className="applications-item__line"></div> }
        </>
      ))}
    </div>
  );
}

export default ApplicationsItemQuestionnaire;