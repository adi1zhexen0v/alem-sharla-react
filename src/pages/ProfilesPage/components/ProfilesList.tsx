import { Profile } from "../../../utils/interfaces";
import ProfilesItem from "./ProfilesItem";

interface ProfilesListProps {
  profiles: Profile[];
}

const ProfilesList: React.FC<ProfilesListProps> = ({ profiles }) => {
  return (
    <div className="profiles-list">
      {profiles.map((profile, index) => (
        <ProfilesItem profile={profile} key={profile.userID} index={index + 1} />
      ))}
    </div>
  );
};

export default ProfilesList;
