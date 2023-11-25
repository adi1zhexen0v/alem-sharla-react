import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface ImmigrationVisaSectionProps {
  id: number;
  icon: IconDefinition;
  setSection: (index: number) => void;
}

const ImmigrationVisaSectionButton: React.FC<ImmigrationVisaSectionProps> = ({ id, icon, setSection }) => {
  return (
    <div className="iv-item__btn-item" onClick={() => setSection(id)}>
      <FontAwesomeIcon icon={icon}/>
    </div>
  );
}

export default ImmigrationVisaSectionButton;