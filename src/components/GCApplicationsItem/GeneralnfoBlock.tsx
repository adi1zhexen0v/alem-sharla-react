import { formatDate, getPrice } from "../../utils/utils";
import GreenCardApplicationsInfoBlock from "./InfoBlock";
import { GreenCardApplicationsItemProps } from "./index";

const GreenCardApplicationsItemGeneralInfoBlock: React.FC<GreenCardApplicationsItemProps> = ({ greenCardApplication }) => {
  return (
    <div className="gca-item__section">
      <h4 className="gca-item__title">Общая информация</h4>
      <div className="gca-item__grid">
        <div className="gca-item__column">
          <GreenCardApplicationsInfoBlock title="Итоговая цена" value={getPrice(1, greenCardApplication.finalCost)}/>
          <GreenCardApplicationsInfoBlock title="Количество заявителей" value={greenCardApplication.applicants.length}/>
          <GreenCardApplicationsInfoBlock title="Результат станет известен" value={formatDate(greenCardApplication.resultsDate * 1000, true)} />
        </div>
        <div className="gca-item__column"></div>
      </div>
    </div>
  );  
}
export default GreenCardApplicationsItemGeneralInfoBlock;