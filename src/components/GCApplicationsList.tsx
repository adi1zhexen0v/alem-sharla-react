import { GreenCardApplication } from "../utils/interfaces";
import GreenCardApplicationsItem from "./GCApplicationsItem";
import NotFound from "./NotFound";

interface GreenCardApplicationsListProps {
  greenCardApplications: GreenCardApplication[];
}

const GreenCardApplicationsList: React.FC<GreenCardApplicationsListProps> = ({ greenCardApplications }) => {
  return (
    greenCardApplications.length > 0 ? <div className="gca-grid">{ 
      greenCardApplications.map((item) => <GreenCardApplicationsItem greenCardApplication={item}/>)
    }</div> : <NotFound/>
  );
}

export default GreenCardApplicationsList;