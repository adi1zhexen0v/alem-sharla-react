import { ChangeEvent, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { StatusTypes } from "../utils/enums";
import { NUMBER_REGEXP } from "../utils/consts";
import { Status } from "../utils/interfaces";

interface SectionHeaderProps {
  searchIsNumeric: boolean;
  searchPlaceholder: string;
  activeStatus: string;
  numberOfNewItems: number;
  statuses: Status[];
  setActiveStatus: (value: string) => void;
  handleChangeSearchText: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  searchIsNumeric,
  searchPlaceholder,
  activeStatus,
  numberOfNewItems,
  statuses,
  setActiveStatus,
  handleChangeSearchText,
}) => {
  return (
    <div className="section-header">
      <div className="section-tabs">{
        statuses.map((status) => (
          <div
            className={
              activeStatus === status.eng
                ? "section-tabs__item section-tabs__item-active"
                : "section-tabs__item"
            }
            onClick={() => setActiveStatus(status.eng)}>
            {status.rus}
            {status.eng === StatusTypes.NEW && numberOfNewItems > 0 && (
              <div className="section-tabs__item-amount">{numberOfNewItems}</div>
            )}
          </div>
        ))
      }</div>
      <div className="section-search">
        <input
          type="text"
          className="section-search__input"
          placeholder={searchPlaceholder}
          onChange={handleChangeSearchText}
          onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
            if (searchIsNumeric && !NUMBER_REGEXP.test(e.key)) {
              e.preventDefault(); 
            }
          }}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
  );
};

export default SectionHeader;
