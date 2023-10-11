import StatusChangeButton from "../StatusChangeButton";
import GreenCardApplicationsInfoBlock from "./InfoBlock";
import { GreenCardApplicationsItemProps } from "./index";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks/reduxHooks";
import { GREEN_CARDS_APPLICATIONS_COLLECTION } from "../../utils/consts";
import { formatDate, getPrice } from "../../utils/utils";
import { GreenCardsStatuses } from "../../pages/GreenCardsPage";
import { updateGCApplicationsStatus } from "../../redux/slices/greenCardApplicationsSlice";
import ApplicationsItemBooleanToggle from "../ApplicationsItemBooleanToggle";


const GreenCardApplicationsItemGeneralInfoBlock: React.FC<GreenCardApplicationsItemProps> = ({ greenCardApplication }) => {
  const activeStatus: string = useAppSelector(
    (state: RootState) => state.greenCardApplications.activeStatus,
  );
  
  return (
    <div className="gca-item__section">
      <h4 className="gca-item__title">Общая информация</h4>
      <div className="gca-item__grid">
        <div className="gca-item__column">
          <GreenCardApplicationsInfoBlock title="Итоговая цена" value={getPrice(1, greenCardApplication.finalCost)}/>
          <GreenCardApplicationsInfoBlock title="Количество заявителей" value={greenCardApplication.applicants.length}/>
          <GreenCardApplicationsInfoBlock title="Результат станет известен" value={formatDate(greenCardApplication.resultsDate * 1000, true)} />
          <GreenCardApplicationsInfoBlock title="Оплачено" children={
            <ApplicationsItemBooleanToggle 
              id={greenCardApplication.id} 
              isPaid={greenCardApplication.isPaid} 
              collection={GREEN_CARDS_APPLICATIONS_COLLECTION}/>
            }
          />
        </div>
        <div className="gca-item__column"></div>
      </div>
      <StatusChangeButton
        id={greenCardApplication.id}
        collection={GREEN_CARDS_APPLICATIONS_COLLECTION}
        activeStatus={activeStatus}
        statuses={GreenCardsStatuses}
        bottomOffset={8}
        topOffset={3}
        dispatchMethod={updateGCApplicationsStatus}
      />
    </div>
  );  
}
export default GreenCardApplicationsItemGeneralInfoBlock;