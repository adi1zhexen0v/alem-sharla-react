import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../redux/store";

interface SidebarLinkProps {
  name: string;
  link?: string;
  icon: IconDefinition;
  func?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ name, link, icon, func }) => {
  const sidebarIsFull = useAppSelector((state: RootState) => state.settings.sidebarIsFull);
  return (
    <li className="sidebar-links__item">{
      link ? <Link to={link} className="sidebar-links__link">
      <div className="sidebar-links__link-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      { sidebarIsFull && <h4 className="sidebar-links__link-name">{name}</h4> }
    </Link> : <div className="sidebar-links__link sidebar-links__arrow" onClick={func}>
      <div className="sidebar-links__link-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      { sidebarIsFull && <h4 className="sidebar-links__link-name">{name}</h4> }
    </div>
    }</li>
  );
};

export default SidebarLink;
