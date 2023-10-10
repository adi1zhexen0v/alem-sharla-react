import { GreenCardApplication } from "../utils/interfaces";
import GreenCardApplicationsItem from "./GCApplicationsItem";

interface GreenCardApplicationsListProps {
  greenCardApplications: GreenCardApplication[];
}

const GreenCardApplicationsList: React.FC<GreenCardApplicationsListProps> = ({ greenCardApplications }) => {
  return (
    <div className="gca-grid">{ 
      greenCardApplications.map((item) => <GreenCardApplicationsItem greenCardApplication={item}/>)
    }</div>
  );
}

export default GreenCardApplicationsList;