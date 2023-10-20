import { useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import { Profile } from "../../../utils/interfaces";
const defaultImage = require("../../../assets/img/ava-default.png");

interface ProfilesItemProps {
  profile: Profile;
  index: number;
}

const ProfilesItem: React.FC<ProfilesItemProps> = ({ profile, index }) => {
  const isByEmail = useAppSelector(
    (state: RootState) => state.profiles.isByEmail
  );
  const displayContactInfo = isByEmail ? profile.email : profile.phoneNumber;

  return (
    <div className="profiles-item">
      <div className="profiles-item__number">{index}</div>
      <div className="profiles-item__info">
        <img src={profile.photoLink ? profile.photoLink : defaultImage} alt={profile.username} className="profiles-item__img" />
        <div>
          <h3 className="profiles-item__name">{profile.username}</h3>
          <h6 className="profiles-item__contact">{displayContactInfo ? displayContactInfo : "-"}</h6>
        </div>
      </div>
    </div>
  );
}

export default ProfilesItem;