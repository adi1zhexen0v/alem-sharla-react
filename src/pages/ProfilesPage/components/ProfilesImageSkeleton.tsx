import ContentLoader from "react-content-loader";

const ProfilesImageSkeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={40}
    height={40}
    viewBox={`0 0 40 40`}
    backgroundColor="#c4c8cb"
    foregroundColor="#e4e6e7"
  >
    <rect x="0" y="0" rx="40" ry="40" width={40} height={40} />
  </ContentLoader>
);

export default ProfilesImageSkeleton;
