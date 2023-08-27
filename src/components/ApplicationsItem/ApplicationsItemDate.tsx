import { useState } from "react";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDateToISO, formatISOToDate } from "../../utils/utils";
import { updateApplicationInterviewDate } from "../../firebase/firestore";

interface ApplicationsItemDateProps {
  date: string;
  id: string;
}

const ApplicationsItemDate: React.FC<ApplicationsItemDateProps> = ({ date, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChangable, setIsChangable] = useState(false);
  const [changeDate, setChangeDate] = useState(date ? formatDateToISO(date) : '');

  const updateDate = async () => {
    if (changeDate !== '') {
      setIsLoading(true);
      await updateApplicationInterviewDate(id, formatISOToDate(changeDate));
      setIsChangable(false);
      setIsLoading(false);
    } else {
      alert('Заполните поле даты интервью!');
    }
  }

  if (isChangable) {
    return (
      <div className="applications-item__block-date">
        <div className="applications-item__block-date-part">
          <input type="datetime-local" value={changeDate} onChange={(e) => setChangeDate(e.target.value)} />
        </div>
        <div className="applications-item__block-date-part">
          {
            isLoading ? <div className="applications-item__block-loader"></div> : <>
              <button className="applications-item__block-btn" onClick={() => setIsChangable(false)}>
                <FontAwesomeIcon icon={faEdit}/>
              </button>
              <button className="applications-item__block-btn" onClick={updateDate}>
                <FontAwesomeIcon icon={faSave}/>
              </button>
            </>
          }    
        </div>
      </div>
    );
  }
  
  return (
    <div className="applications-item__block-date">
      <div className="applications-item__block-date-part">
        <h4 className="applications-item__block-value">{changeDate.trim() === '' ? 'Не назначен' : formatISOToDate(changeDate)}</h4>
      </div>
      <div className="applications-item__block-date-part">
        <button className="applications-item__block-btn" onClick={() => setIsChangable(true)}>
          <FontAwesomeIcon icon={faEdit}/>
        </button>
      </div>
    </div>
  )
}

export default ApplicationsItemDate;