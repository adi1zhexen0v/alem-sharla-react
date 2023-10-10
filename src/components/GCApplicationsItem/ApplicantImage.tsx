import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import ImageSkeleton from "../ImageSkeleton";

interface GreenCardApplicantImageProps {
  photoLink: string;
}

const GreenCardApplicantImage: React.FC<GreenCardApplicantImageProps> = ({ photoLink }) => {
  const [isMaximize, setIsMaximize] = useState<boolean>(true);
  const [imageIsOpen, setImageIsOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  console.log(isLoaded);
  return (
    <>
      <div className="gca-item__block-img">
        <img 
          src={photoLink} 
          alt="Изображение" 
          onLoad={() => setIsLoaded(true)}
          style={{display: isLoaded ? "block" : "none", objectFit: isMaximize ? "cover" : "contain"}} />
        {
          !isLoaded ? <ImageSkeleton width={200} height={200}/> 
          : <div className="gca-item__block-img-btns">
            <button className="gca-item__block-img-btn" onClick={() => setImageIsOpen(true)}>
              <FontAwesomeIcon icon={faExpand}/>
            </button>
            <button className="gca-item__block-img-btn" onClick={() => setIsMaximize(!isMaximize)}>
              <FontAwesomeIcon icon={isMaximize ? faMinimize : faMaximize}/>
            </button>
          </div>
        }
        
      </div>
      {imageIsOpen && (
        <div className="picture-show" onClick={() => setImageIsOpen(false)}>
          <img src={photoLink} alt="Изображение" className="picture-show__img" />
        </div>
      )}
    </>
  );
}

export default GreenCardApplicantImage;