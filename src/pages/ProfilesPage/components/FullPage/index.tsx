import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Profile } from "../../../../utils/interfaces";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { toggleActiveProfile } from "../../../../redux/slices/profilesSlice";
import ProfilesFullPageBlock from "./ProfilesFullPageBlock";

const defaultImage = require("../../../../assets/img/ava-default.png");

interface ProfilesListProps {
  profile: Profile;
}

const ProfilesFullPage: React.FC<ProfilesListProps> = ({ profile }) => {
  const dispatch = useAppDispatch();
  const closeFullPage = () => {
    dispatch(toggleActiveProfile(null));
  }

  return (
    <div className="profiles-full">
      <div className="profiles-full__header">
        <div className="profiles-full__header-part">
          <img 
            src={profile.photoLink ? profile.photoLink : defaultImage} 
            alt={profile.username} 
            className="profiles-full__header-img" 
          />
          <h5 className="profiles-full__header-name">{profile.username ? profile.username : "-"}</h5>
        </div>
        <div className="profiles-full__header-part">
          <FontAwesomeIcon icon={faClose} onClick={closeFullPage}/>
        </div>
      </div>
      <div className="profiles-full__grid">
        <ProfilesFullPageBlock title="Город, район" value={profile.address} />
        <ProfilesFullPageBlock title="Улица, дом/квартира" value={profile.apartment} />
        <ProfilesFullPageBlock title="Номер телефона" value={profile.phoneNumber} />
        <ProfilesFullPageBlock title="E-mail" value={profile.email} />
      </div>
    </div>
  );
};

export default ProfilesFullPage;
