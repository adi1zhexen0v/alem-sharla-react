import { useState } from 'react';
import ImageSkeleton from './ImageSkeleton';

interface ImageWithSkeletonProps {
  imageUrl: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ imageUrl }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      <img
        src={imageUrl}
        alt="Изображение"
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
      {!isLoaded && <ImageSkeleton />}
    </>
  );
};

export default ImageWithSkeleton;
