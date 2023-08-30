import ContentLoader from 'react-content-loader';

const ImageSkeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={140}
    height={140}
    viewBox="0 0 140 140"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="140" ry="140" width="140" height="140" />
  </ContentLoader>
);

export default ImageSkeleton;
