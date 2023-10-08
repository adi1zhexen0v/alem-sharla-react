import { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { StatusRusTypes, StatusTypes } from "../utils/enums";

interface SectionHeaderProps {
  activeStatus: string;
  numberOfNewItems: number;
  setActiveStatus: (value: string) => void;
  handleChangeSearchText: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  activeStatus,
  numberOfNewItems,
  setActiveStatus,
  handleChangeSearchText,
}) => {
  return (
    <div className="section-header">
      <div className="section-tabs">
        <div
          className={
            activeStatus === StatusTypes.NEW
              ? "section-tabs__item section-tabs__item-active"
              : "section-tabs__item"
          }
          onClick={() => setActiveStatus(StatusTypes.NEW)}
        >
          {StatusRusTypes.NEW}
          {numberOfNewItems > 0 && (
            <div className="section-tabs__item-amount">{numberOfNewItems}</div>
          )}
        </div>
        <div
          className={
            activeStatus === StatusTypes.PROGRESS
              ? "section-tabs__item section-tabs__item-active"
              : "section-tabs__item"
          }
          onClick={() => setActiveStatus(StatusTypes.PROGRESS)}
        >
          {StatusRusTypes.PROGRESS}
        </div>
        <div
          className={
            activeStatus === StatusTypes.COMPLETED
              ? "section-tabs__item section-tabs__item-active"
              : "section-tabs__item"
          }
          onClick={() => setActiveStatus(StatusTypes.COMPLETED)}
        >
          {StatusRusTypes.COMPLETED}
        </div>
      </div>
      <div className="section-search">
        <input
          type="text"
          className="section-search__input"
          placeholder="Поиск"
          onChange={handleChangeSearchText}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
  );
};

export default SectionHeader;
