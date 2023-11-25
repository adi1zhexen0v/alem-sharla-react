import NotFound from "../../../../components/NotFound";
import { ImmigrationVisa } from "../../../../utils/interfaces";
import ImmigrationVisasItem from "../ImmigrationVisaItem";

interface ImmigrationVisaListProps {
  immigrationVisas: ImmigrationVisa[];
}

const ImmigrationVisasList: React.FC<ImmigrationVisaListProps> = ({ immigrationVisas }) => {
  return (
    immigrationVisas.length > 0 ? <div className="iv-grid">{
      immigrationVisas.map(item => (
        <ImmigrationVisasItem key={item.id} immigrationVisa={item}/>
      )) 
    }</div>
    : <NotFound/>
  );
}

export default ImmigrationVisasList;