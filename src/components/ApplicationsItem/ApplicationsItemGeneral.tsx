import { ApplicationItemProps } from ".";
import { getVisaEntryType, getVisaType } from "../../utils/utils";
import ApplicationsItemBooleanToggle from "./ApplicationsItemBooleanToggle";
import ApplicationsItemDate from "./ApplicationsItemDate";
import ApplicationsItemBlock from "./ApplicationsItemBlock";


const ApplicationsItemGeneral: React.FC<ApplicationItemProps> = ({ application }) => {
  const amountOfApplicants = application.applicants.length;

  return (
    <div className="applications-item__section">
      <h6 className="applications-item__title">Общая информация</h6>
      <div className="applications-item__grid">
        <div className="applications-item__grid-part">
          <ApplicationsItemBlock title="Страна въезда" value={application.country}/>
          <ApplicationsItemBlock title="Тип визы" value={getVisaType(application.visaType)}/>
          {application.visaEntryType !== "" && <ApplicationsItemBlock title="Вид визы" value={getVisaEntryType(application.visaEntryType)}/>}
          <ApplicationsItemBlock title="Срок визы" value={`${application.visaStartDate} - ${application.visaEndDate}`}/>
          <ApplicationsItemBlock title="Оплачено" children={<ApplicationsItemBooleanToggle isPaid={application.isPaid} id={application.id} />}/>
          <ApplicationsItemBlock title="Оплачено" children={<ApplicationsItemDate id={application.id} date={application.interViewDate}/>}/>
        </div>
        <div className="applications-item__grid-part">
          <ApplicationsItemBlock title="Количество заявителей" value={amountOfApplicants}/>
          <ApplicationsItemBlock title="Срок подготовки агенством" value={`${application.processingTime} дней`}/>
          <ApplicationsItemBlock title="Срок расмотрения консульством" value={`${application.standartVisaApplicationTimeDays} дней`}/>
        </div>
      </div>
    </div>
  )
}

export default ApplicationsItemGeneral;