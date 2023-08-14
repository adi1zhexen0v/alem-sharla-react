import { faList, faComments } from '@fortawesome/free-solid-svg-icons';
import SidebarLink from './SidebarLink';
import { APPLICATIONS_ROUTE, CHAT_ROUTE } from '../../utils/consts';
import SidebarLogoutBtn from './SidebarLogoutBtn';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-part">
        <div className="sidebar-logo">alemSharla <br/> <span>- VISA AGENCY -</span></div>
        <ul className="sidebar-links__list">
          <SidebarLink name="Заявки" link={APPLICATIONS_ROUTE} icon={faList} />
          <SidebarLink name="Чат" link={CHAT_ROUTE} icon={faComments} />
        </ul>
      </div>
      <div className="sidebar-part">
        <SidebarLogoutBtn />
      </div>
    </nav>
  );
};

export default Sidebar;
