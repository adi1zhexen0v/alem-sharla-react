import ContentLoader from 'react-content-loader';

const ChatItemSkeletion: React.FC = () => (
  <ContentLoader
    speed={2}
    width={490}
    height={105}
    viewBox="0 0 490 105"
    backgroundColor="#e3dede"
    foregroundColor="#c1bebe"
  >
    <rect x="96" y="16" rx="6" ry="6" width="250" height="16" />
    <rect x="96" y="48" rx="6" ry="6" width="160" height="12" />
    <circle cx="40" cy="40" r="40" />
  </ContentLoader>
);

export default ChatItemSkeletion;
