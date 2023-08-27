import { ApplicationItemProps } from ".";
import ApplicationsItemBlock from "./ApplicationsItemBlock";
import { getPrice } from "../../utils/utils";

const ApplicationsItemCost: React.FC<ApplicationItemProps> = ({ application }) => {
  const amountOfApplicants = application.applicants.length;

  const feeDetails = [
    { title: "Стоимость сервисного сбора", value: application.serviceFeeTenge },
    { title: "Стоимость услуг агенства", value: application.processingCost },
    { title: "Стоимость курьера", value: application.courierFeeTenge },
    { title: "Плата за биометрию", value: application.biometricFeeTenge },
    { title: "Консульский сбор", value: application.consularFeeTenge }
  ];

  return (
    <div className="applications-item__section">
      <h6 className="applications-item__title">Стоимость услуг</h6>
      <div className="applications-item__grid">
        <div className="applications-item__grid-part">
          <div className="applications-item__price-list">
            {feeDetails.map(item =>
              item.value > 0 && (
                <ApplicationsItemBlock
                  title={item.title}
                  value={
                    item.title === "Стоимость курьера"
                      ? getPrice(1, item.value)
                      : getPrice(amountOfApplicants, item.value)
                  }
                />
              )
            )}
          </div>
        </div>
        <div className="applications-item__grid-part">
          <div className="applications-item__price-list">
            {application.additionalServices.map(service => (
              <ApplicationsItemBlock
                title={service.title}
                value={
                  service.title === "Premium фото сервис"
                    ? getPrice(amountOfApplicants, service.price)
                    : `${service.price} ₸`
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="applications-item__line"></div>
      <h2 className="applications-item__price-total">
        Общая сумма:
        <span> {application.finalCost} ₸</span>
      </h2>
    </div>
  );
}

export default ApplicationsItemCost;
