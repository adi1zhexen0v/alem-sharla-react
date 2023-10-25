import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import { Profile } from "../../../utils/interfaces";
import ProfilesImageSkeleton from "./ProfilesImageSkeleton";
import { toggleActiveProfile } from "../../../redux/slices/profilesSlice";

const defaultImage = require("../../../assets/img/ava-default.png");

interface ProfilesItemProps {
  profile: Profile;
  index: number;
}

const ProfilesItem: React.FC<ProfilesItemProps> = ({ profile, index }) => {
  const dispatch = useAppDispatch();
  const isByEmail = useAppSelector((state: RootState) => state.profiles.isByEmail);
  const displayContactInfo = isByEmail ? profile.email : profile.phoneNumber;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className="profiles-item" onClick={() => dispatch(toggleActiveProfile(profile))}>
      <div className="profiles-item__number">{index}</div>
      <div className="profiles-item__info">
        <img 
          src={profile.photoLink ? profile.photoLink : defaultImage} 
          alt={profile.username} 
          className="profiles-item__img" 
          onLoad={() => setIsLoaded(true)}
          style={{display: isLoaded ? "block" : "none"}}
        />
        {
          !isLoaded && <ProfilesImageSkeleton/>
        }
        <div>
          <h3 className="profiles-item__name">{profile.username}</h3>
          <h6 className="profiles-item__contact">{displayContactInfo ? displayContactInfo : "-"}</h6>
        </div>
      </div>
    </div>
  );
}

export default ProfilesItem;