import { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faMagnifyingGlass, faPhone, faSort } from "@fortawesome/free-solid-svg-icons";
import { ProfilesSorting } from "../../../utils/consts";

interface ProfilesSectionHeaderProps {
  searchPlaceholder: string;
  handleChangeSearchText: (e: ChangeEvent<HTMLInputElement>) => void;
  sort: string;
  setSort: (value: string) => void;
  isByEmail: boolean;
  setIsByEmail: () => void;
}

const ProfilesSectionHeader: React.FC<ProfilesSectionHeaderProps> = ({
  searchPlaceholder,
  handleChangeSearchText,
  sort,
  setSort,
  isByEmail,
  setIsByEmail
}) => {
  const selectedSort = ProfilesSorting.find(item => item.sort === sort);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClickSort = (sort: string) => {
    setSort(sort);
    setIsOpen(false);
  }

  return (
    <div className="section-header">
      <div className="section-profiles">
        <div className="section-toggle" onClick={setIsByEmail}>
          <FontAwesomeIcon icon={isByEmail ? faPhone :faAt} />
        </div>
        <div className="section-select">
          <div className="section-select__btn" onClick={() => setIsOpen(!isOpen)}>
            <div className="section-select__item">
              <FontAwesomeIcon icon={selectedSort!.icon}/>
              <h6 className="section-select__item-name">{selectedSort!.name}</h6>
            </div>
            <FontAwesomeIcon icon={faSort} className="section-select__btn-sort" />
          </div>
          {isOpen && <div className="section-select__list">
            {ProfilesSorting.map(item => (
              <div className="section-select__item" onClick={() => handleClickSort(item.sort)}>
                <FontAwesomeIcon icon={item.icon}/>
                <h6 className="section-select__item-name">{item.name}</h6>
              </div>
            ))}
          </div>}
        </div>
      </div>
      <div className="section-search">
        <input
          type="text"
          className="section-search__input"
          placeholder={searchPlaceholder}
          onChange={handleChangeSearchText}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
  );
};

export default ProfilesSectionHeader;
