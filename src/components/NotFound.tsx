import Lottie from "lottie-react";
import NotFoundAnimation from "../assets/img/notFound.json";

const NotFound = () => {
  return (
    <div className="not-found">
      <Lottie animationData={NotFoundAnimation} loop={false} className="not-found__img"/>
      <h4 className="not-found__text">Ничего не найдено</h4>
    </div>
  );
}

export default NotFound;