import { useState } from "react";
import { faClose, faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QuestionnaireAnswer } from "../../utils/interfaces";

interface ApplicationsItemQuestionnaireProps {
  questionnaire: QuestionnaireAnswer;
}

const ApplicationsItemQuestionnaire: React.FC<ApplicationsItemQuestionnaireProps> = ({ questionnaire }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (
      event.target instanceof Element &&
      (event.target.classList.contains("applications-item__questionnaire") ||
        event.target.classList.contains("applications-item__questionnaire-modal-close") ||
        event.target.closest(".applications-item__questionnaire-modal-close"))
    ) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="applications-item__questionnaire-btn" onClick={openModal}>
        <FontAwesomeIcon icon={faFileCircleQuestion}/>
      </div>
      {
        isOpen && <div className="applications-item__questionnaire" onClick={closeModal} >
          <div className="applications-item__questionnaire-modal">
            <div className="applications-item__questionnaire-modal-header">
              <h2 className="applications-item__questionnaire-modal-title">Анкета</h2>
              <div className="applications-item__questionnaire-modal-close" onClick={closeModal}>
                <FontAwesomeIcon icon={faClose} />
              </div>  
            </div>
            <div className="applications-item__questionnaire-modal-body">{
              questionnaire.applicantQuestionnaireAnswers.map(item => (
                <div className="applications-item__questionnaire-modal-block">
                  <span className="applications-item__questionnaire-modal-key">{item.question}</span>
                  <h6 className="applications-item__questionnaire-modal-value">{item.answer}</h6>
                </div>
              ))
            }</div>
          </div>
        </div>
      }
    </>
  )
}

export default ApplicationsItemQuestionnaire;