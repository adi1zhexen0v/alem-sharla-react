import ApplicationsItem from "./ApplicationsItem";
import { Application } from "../utils/interfaces";

interface ApplicationsListProps {
  applications: Application[];
}

const ApplicationsList: React.FunctionComponent<ApplicationsListProps> = ({ applications }) => {
  return (
    <div className="applications-grid">{
      applications.map(application => <ApplicationsItem key={application.id} application={application}/>)
    }</div>
  )
}

export default ApplicationsList;