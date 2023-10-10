import { useState, useEffect } from "react";
import { getAllApplications } from "../firebase/firestore";
import { Application } from "../utils/interfaces";
import ApplicationsList from "../components/ApplicationsList";
import Loader from "../components/Loader";
import { useAppDispatch } from "../hooks/reduxHooks";
import { removeCorrespondenceId } from "../redux/slices/correspondenceSlise";

const ApplicationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(removeCorrespondenceId());
    const fetchApplications = async () => {
      setIsLoading(true);
      const applications = await getAllApplications();
      setApplications(applications);
      setIsLoading(false);
    };
    fetchApplications();
  }, [dispatch]);

  return (
    <div className="content">
      <div className="applications">
        <h2 className="section-title">Заявки на Визу</h2>
        <div className="applications-wrapper">
          {isLoading ? (
            <Loader />
          ) : (
            <ApplicationsList applications={applications} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
