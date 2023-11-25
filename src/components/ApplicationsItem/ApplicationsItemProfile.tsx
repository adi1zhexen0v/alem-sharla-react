import { Profile } from "../../utils/interfaces";
import ApplicationsItemBlock from "./ApplicationsItemBlock";

interface ApplicationsItemProfileProps {
  phoneNumber: string;
  user: Profile | null;
}

const ApplicationsItemProfile: React.FC<ApplicationsItemProfileProps> = ({
  phoneNumber, user
}) => {
  return user ? (
    <div className="applications-item__section">
      <h6 className="applications-item__title">Данные пользователя</h6>
      <div className="applications-item__grid">
        <div className="applications-item__grid-part">
          <ApplicationsItemBlock title="Имя пользователя" value={user.username} />
          <ApplicationsItemBlock title="E-mail" value={user.email} />
          <ApplicationsItemBlock title="Телефон" value={user.phoneNumber ? user.phoneNumber : phoneNumber} />
        </div>
        <div className="applications-item__grid-part">
          <ApplicationsItemBlock title="Адрес" value={user.address} />
          <ApplicationsItemBlock title="Квартира" value={user.apartment} />
        </div>
      </div>
    </div>
  ) : <div className="applications-item__section">
    <h6 className="applications-item__title">Данные пользователя</h6>
    <div className="applications-item__grid">
      <div className="applications-item__grid-part">
        <ApplicationsItemBlock title="Телефон" value={phoneNumber} />
      </div>
    </div>
  </div>;
};

export default ApplicationsItemProfile;
