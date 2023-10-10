import GreenCardApplicantImage from "./ApplicantImage";
import { GreenCardApplicationsItemProps } from "./index";
import GreenCardApplicationsInfoBlock from "./InfoBlock";

const GreenCardApplicationsItemApplicantsBlock: React.FC<GreenCardApplicationsItemProps> = ({ greenCardApplication }) => {
  
  return (
    <div className="gca-item__section">
      <h4 className="gca-item__title">Данные заявителя</h4>
      {
        greenCardApplication.applicants.map((applicant) => (
        <div className="gca-item__grid">
          <div className="gca-item__column">
            <GreenCardApplicationsInfoBlock title="Фото" children={<GreenCardApplicantImage photoLink={applicant.photoLink}/>} />
            <GreenCardApplicationsInfoBlock title="Полное имя" value={`${applicant.name} ${applicant.surname}`}/>
            <GreenCardApplicationsInfoBlock title="Дата рождения" value={applicant.dateOfBirth}/>
          </div>
          <div className="gca-item__column">
            <GreenCardApplicationsInfoBlock title="Пол" value={applicant.gender}/>
            <GreenCardApplicationsInfoBlock title="ИИН" value={applicant.iin}/>
            <GreenCardApplicationsInfoBlock title="Гражданство" value={applicant.citizenship} />
            <GreenCardApplicationsInfoBlock title="Номер паспорта" value={applicant.passportID} />
            <div className="gca-item__grid">
              <div className="gca-item__column">
                <GreenCardApplicationsInfoBlock title="Дата выдачи" value={applicant.passportGivenDate} />
              </div>
              <div className="gca-item__column">
                <GreenCardApplicationsInfoBlock title="Действителен до" value={applicant.passportDueToDate} />
              </div>
            </div>
            <GreenCardApplicationsInfoBlock title="Орган, который выдал" value={applicant.authority} />
          </div>
        </div>
        ))
      }
      
    </div>
  );  
}
export default GreenCardApplicationsItemApplicantsBlock;