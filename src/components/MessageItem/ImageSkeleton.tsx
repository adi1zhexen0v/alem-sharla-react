import ContentLoader from 'react-content-loader';

const ImageSkeleton = () => (
  <ContentLoader
    speed={2}
    width={360}
    height={280}
    viewBox="0 0 360 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="360" height="280" />
  </ContentLoader>
);

export default ImageSkeleton;
