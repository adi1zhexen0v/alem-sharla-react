import { ApplicationItemProps } from ".";
import { getGender } from "../../utils/utils";
import ApplicationsItemBlock from "./ApplicationsItemBlock";

const ApplicationsItemApplicants: React.FC<ApplicationItemProps> = ({
  application,
}) => {
  const applicants = application.applicants;
  const amountOfApplicants = application.applicants.length;
  const sectionTitle = `Данные ${
    amountOfApplicants > 1 ? "заявителей" : "заявителя"
  }`;

  return (
    <div className="applications-item__section">
      <h6 className="applications-item__title">{sectionTitle}</h6>
      {applicants.map((applicant, index) => (
        <>
          <div className="applications-item__grid" key={index}>
            <div className="applications-item__grid-part">
              <ApplicationsItemBlock
                title="Полное имя"
                value={`${applicant.name} ${applicant.surname}`}
              />
              <ApplicationsItemBlock
                title="Дата рождения"
                value={applicant.dateOfBirth}
              />
              <ApplicationsItemBlock
                title="Гражданство"
                value={applicant.citizenship}
              />
              <ApplicationsItemBlock title="Пол" value={getGender(applicant.gender)} />
            </div>
            <div className="applications-item__grid-part">
              <ApplicationsItemBlock title="ИИН" value={applicant.iin} />
              <ApplicationsItemBlock
                title="Номер паспорта"
                value={applicant.passportID}
              />
              <div className="applications-item__grid">
                <div className="applications-item__grid-part">
                  <ApplicationsItemBlock
                    title="Дата выдачи"
                    value={applicant.passportGivenDate}
                  />
                </div>
                <div className="applications-item__grid-part">
                  <ApplicationsItemBlock
                    title="Действителен до"
                    value={applicant.passportDueToDate}
                  />
                </div>
              </div>
              <ApplicationsItemBlock
                title="Орган, который выдал"
                value={applicant.authority}
              />
            </div>
          </div>
          {index + 1 !== amountOfApplicants && (
            <div className="applications-item__line"></div>
          )}
        </>
      ))}
    </div>
  );
};

export default ApplicationsItemApplicants;
