import { useState } from 'react';
import ImageSkeleton from './ImageSkeleton';

interface ImageWithSkeletonProps {
  imageUrl: string;
  setValue: (value: boolean) => void;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ imageUrl, setValue }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      <img
        src={imageUrl}
        alt="Изображение"
        onLoad={() => setIsLoaded(true)}
        onClick={() => setValue(true)}
        className="chat-typing__body-image"
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
      {!isLoaded && <ImageSkeleton />}
    </>
  );
};

export default ImageWithSkeleton;
