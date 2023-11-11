import { useState, useEffect, ChangeEvent } from "react";
import { getAllGreenCardApplications } from "../firebase/firestore";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addGCApplications, changeGCApplicationsActiveStatus, changeGCApplicationsSearchText } from "../redux/slices/greenCardApplicationsSlice";
import { RootState } from "../redux/store";
import SectionHeader from "../components/SectionHeader";
import Loader from "../components/Loader";
import GreenCardApplicationsList from "../components/GCApplicationsList";
import { Status } from "../utils/interfaces";

export const GreenCardsStatuses: Status[] = [
  {
    eng: 'new',
    rus: 'Новые'
  },
  {
    eng: 'process',
    rus: 'В процессе'
  },
  {
    eng: 'won',
    rus: 'Одобренные'
  },
  {
    eng: 'lost',
    rus: 'Не одобренные'
  }
];

const GreenCardsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const greenCardApplications = useAppSelector(
    (state: RootState) => state.greenCardApplications.greenCardApplicationsList
  );
  const numberOfNewGCApplications: number = useAppSelector(
    (state: RootState) => state.greenCardApplications.greenCardApplicationsList.filter((item) => item.status === "new").length,
  );
  const activeStatus: string = useAppSelector(
    (state: RootState) => state.greenCardApplications.activeStatus,
  );
  const searchText: string = useAppSelector(
    (state: RootState) => state.greenCardApplications.searchText,
  );

  useEffect(() => {
    const fetchGreenCardApplications = async () => {
      setIsLoading(true);
      const applications = await getAllGreenCardApplications();
      dispatch(addGCApplications(applications));
      setIsLoading(false);
    };
    fetchGreenCardApplications();
  }, [dispatch]);

  const setActiveStatus = (status: string) => {
    dispatch(changeGCApplicationsActiveStatus(status));
  };

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeGCApplicationsSearchText(e.target.value));
  };

  return (
    <div className="content">
      <div className="gca">
        <h2 className="section-title">Заявки на Грин-карту</h2>
        <SectionHeader
          searchIsNumeric={true}
          searchPlaceholder="Поиск по номеру заявки..."
          activeStatus={activeStatus}
          numberOfNewItems={numberOfNewGCApplications}
          statuses={GreenCardsStatuses}
          setActiveStatus={setActiveStatus}
          handleChangeSearchText={handleChangeSearchText}
        />
        <div className="gca-wrapper">{
          isLoading ? <Loader/> : <GreenCardApplicationsList greenCardApplications={
            greenCardApplications.filter((item) => item.status === activeStatus && item.orderID.toString().includes(searchText))
          }/>
        }</div>
      </div>
    </div>
  );
}

export default GreenCardsPage;