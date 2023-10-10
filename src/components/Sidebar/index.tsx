import {
  faList,
  faComments,
  faMap,
  faUsers,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import SidebarLink from "./SidebarLink";
import {
  APPLICATIONS_ROUTE,
  CHAT_ROUTE,
  FEEDBACK_ROUTE,
  GREEN_CARDS_ROUTE,
  USERS_ROUTE,
} from "../../utils/consts";
import SidebarLogoutBtn from "./SidebarLogoutBtn";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-part">
        <div className="sidebar-logo">
          alemSharla <br /> <span>- VISA AGENCY -</span>
        </div>
        <ul className="sidebar-links__list">
          <SidebarLink name="Заявки на Визу" link={APPLICATIONS_ROUTE} icon={faList} />
          <SidebarLink name="Чат" link={CHAT_ROUTE} icon={faComments} />
          <SidebarLink name="Обратная связь" link={FEEDBACK_ROUTE} icon={faMap}/>
          <SidebarLink name="Пользователи" link={USERS_ROUTE} icon={faUsers} />
          <SidebarLink name="Заявки на Грин-карты" link={GREEN_CARDS_ROUTE} icon={faAddressCard}/>
        </ul>
      </div>
      <div className="sidebar-part">
        <SidebarLogoutBtn />
      </div>
    </nav>
  );
};

export default Sidebar;
