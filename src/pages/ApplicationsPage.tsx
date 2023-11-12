import { useState, useEffect, ChangeEvent } from "react";
import { getAllApplications } from "../firebase/firestore";
import ApplicationsList from "../components/ApplicationsList";
import Loader from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import SectionHeader from "../components/SectionHeader";
import { RootState } from "../redux/store";
import { addApplications, changeApplicationsActiveStatus, changeApplicationsSearchText } from "../redux/slices/applicationsSlice";
import { ApplicationsStatuses, GeneralStatuses } from "../utils/consts";
import { Application } from "../utils/interfaces";

const ApplicationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const applications: Application[] = useAppSelector((state: RootState) => state.applications.applicationsList,);
  const numberOfNewApplications: number = useAppSelector((state: RootState) => state.applications.applicationsList.filter((item) => item.status === 1).length);
  const activeStatus: number = useAppSelector((state: RootState) => state.applications.activeStatus);
  const searchText: string = useAppSelector((state: RootState) => state.applications.searchText);

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      const applications = await getAllApplications();
      dispatch(addApplications(applications));
      setIsLoading(false);
    };
    fetchApplications();
  }, [dispatch]);

  const setActiveStatus = (status: string | number) => {
    dispatch(changeApplicationsActiveStatus(status));
  };

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeApplicationsSearchText(e.target.value));
  };

  return (
    <div className="content">
      <div className="applications">
        <h2 className="section-title">Заявки на Визу</h2>
        <SectionHeader
          searchIsNumeric={true}
          searchPlaceholder="Поиск по номеру заявки..."
          activeStatus={activeStatus}
          numberOfNewItems={numberOfNewApplications}
          statusesIsStrings={true}
          statusesAsStrings={ApplicationsStatuses}
          setActiveStatus={setActiveStatus}
          handleChangeSearchText={handleChangeSearchText}
        />
        <div className="applications-wrapper">
          {isLoading ? (
            <Loader />
          ) : (
            <ApplicationsList applications={
              applications.filter((item) => item.status === activeStatus && item.orderID.toString().includes(searchText))
            } />
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
