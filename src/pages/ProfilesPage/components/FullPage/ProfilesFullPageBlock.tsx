interface ProfilesFullPageBlockProps {
  title: string;
  value: string;
}

const ProfilesFullPageBlock: React.FC<ProfilesFullPageBlockProps> = ({ title, value }) => {
  return (
    <div className="profiles-full__block">
      <h6 className="profiles-full__block-name">{title}</h6>
      <div className="profiles-full__block-info">{value ? value : "-"}</div>
    </div>
  );
}

export default ProfilesFullPageBlock;