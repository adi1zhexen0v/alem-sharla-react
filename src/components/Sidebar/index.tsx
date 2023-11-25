import {
  faComments,
  faMap,
  faUsers,
  faAddressCard,
  faAngleLeft,
  faArrowRightFromBracket,
  faAngleRight,
  faEarthAmericas,
  faBriefcase,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import {
  TOURIST_VISAS_ROUTE,
  CHAT_ROUTE,
  FEEDBACK_ROUTE,
  GREEN_CARDS_ROUTE,
  USERS_ROUTE,
  IMMIGRATION_VISAS_ROUTE,
} from "../../utils/consts";
import { firebaseAuthSignOut } from "../../firebase/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { removeUser } from "../../redux/slices/userSlice";
import { toggleSidebar } from "../../redux/slices/settingsSlice";
import { RootState } from "../../redux/store";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const sidebarIsFull = useAppSelector((state: RootState) => state.settings.sidebarIsFull);

  const logOut = async () => {
    await firebaseAuthSignOut();
    dispatch(removeUser());
  };
  return (
    <nav className="sidebar">
      <div className="sidebar-part">
        <ul className="sidebar-links__list">
          <SidebarLink name="Скрыть меню" icon={sidebarIsFull ? faAngleLeft : faAngleRight} func={() => dispatch(toggleSidebar(null))}/>
          <SidebarLink name="Туристические визы" link={TOURIST_VISAS_ROUTE} icon={faEarthAmericas} />
          {/* <SidebarLink name="Рабочие визы" link={TOURIST_VISAS_ROUTE} icon={faBriefcase} /> */}
          <SidebarLink name="Иммиграционные визы" link={IMMIGRATION_VISAS_ROUTE} icon={faList} /> 
          <SidebarLink name="Грин-карты" link={GREEN_CARDS_ROUTE} icon={faAddressCard}/>
          <SidebarLink name="Чат" link={CHAT_ROUTE} icon={faComments} />
          <SidebarLink name="Обратная связь" link={FEEDBACK_ROUTE} icon={faMap}/>
          <SidebarLink name="Пользователи" link={USERS_ROUTE} icon={faUsers} />
        </ul>
      </div>
      <div className="sidebar-part">
        <SidebarLink name="Выйти" icon={faArrowRightFromBracket} func={logOut}/>
      </div>
    </nav>
  );
};

export default Sidebar;
