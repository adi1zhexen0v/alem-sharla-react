import { ApplicationItemProps } from ".";
import { getPrice } from "../../utils/utils";
import ApplicationsItemBlock from "./ApplicationsItemBlock";

const ApplicationsItemCost: React.FunctionComponent<ApplicationItemProps> = ({ application }) => {
  const amountOfApplicants = application.applicants.length;

  return (
    <div className="applications-item__section">
      <h6 className="applications-item__title">Стоимость услуг</h6>
      <div className="applications-item__price-list">
        <div className="applications-item__">
          
        </div>
        <ApplicationsItemBlock title="Стоимость услуг агенства" value={getPrice(amountOfApplicants, application.processingCost)}/>
        <ApplicationsItemBlock title="Консульский сбор" value={getPrice(amountOfApplicants, application.consularFeeTenge)}/>
        {
          application.additionalServices.map(service => (
            <ApplicationsItemBlock
              title={service.title}
              value={`${service.price} ₸`}/>
          ))
        }
      </div>
      <div className="applications-item__line"></div> 
      <h2 className="applications-item__price-total">
        Общая сумма: 
        <span> {application.finalCost} ₸</span> 
      </h2>
    </div>
  )
}

export default ApplicationsItemCost;