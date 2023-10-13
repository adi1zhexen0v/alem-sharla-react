import ApplicationsItem from "./ApplicationsItem";
import { Application } from "../utils/interfaces";
import NotFound from "./NotFound";

interface ApplicationsListProps {
  applications: Application[];
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({
  applications,
}) => {
  return (
    applications.length > 0 ? <div className="applications-grid">
      {applications.map((application) => (
        <ApplicationsItem key={application.id} application={application} />
      ))} 
    </div> : <NotFound/>
  );
};

export default ApplicationsList;
