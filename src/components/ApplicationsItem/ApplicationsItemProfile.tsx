import { User } from "../../utils/interfaces";
import ApplicationsItemBlock from "./ApplicationsItemBlock";

interface ApplicationsItemProfileProps {
  user: User | null;
}

const ApplicationsItemProfile: React.FC<ApplicationsItemProfileProps> = ({ user }) => {
  return user ? (
    <div className="applications-item__sectiom">
      <h6 className="applications-item__title">Данные пользователя</h6>
      <div className="applications-item__grid">
        <div className="applications-item__grid-part">
          <ApplicationsItemBlock title="Имя пользователя" value={user.username} />
          <ApplicationsItemBlock title="E-mail" value={user.email} />
          <ApplicationsItemBlock title="Телефон" value={user.phoneNumber} />
        </div>
        <div className="applications-item__grid-part">
          <ApplicationsItemBlock title="Адрес" value={user.address} />
          <ApplicationsItemBlock title="Квартира" value={user.aparment} />
        </div>
      </div>
    </div>
  ) : null;
}

export default ApplicationsItemProfile;