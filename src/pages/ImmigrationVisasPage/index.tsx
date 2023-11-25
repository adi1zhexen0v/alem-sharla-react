import { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import SectionHeader from '../../components/SectionHeader';
import { getAllImmigrationVisas } from '../../firebase/firestore';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addImmigrationVisas, changeImmigrationVisasActiveStatus } from '../../redux/slices/immigrationVisaSlice';
import { RootState } from '../../redux/store';
import { GeneralStatuses } from '../../utils/consts';
import { StatusTypes } from '../../utils/enums';
import { ImmigrationVisa } from '../../utils/interfaces';
import ImmigrationVisasList from './components/ImmigrationVisaList';

const ImmigrationVisasPage: React.FC= () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const immigrationVisas: ImmigrationVisa[] = useAppSelector((state: RootState) => state.immigrationVisas.immigrationVisasList);
  const numberOfNewApplications: number = useAppSelector((state: RootState) => state.immigrationVisas.immigrationVisasList.filter((item) => item.status === StatusTypes.NEW).length);
  const activeStatus: string = useAppSelector((state: RootState) => state.immigrationVisas.activeStatus);

  useEffect(() => {
    const fetchImmigrationVisas = async () => {
      setIsLoading(true);
      const immigrationVisasList = await getAllImmigrationVisas();
      dispatch(addImmigrationVisas(immigrationVisasList));
      setIsLoading(false);
    }
    fetchImmigrationVisas();
  }, []);

  const setActiveStatus = (status: string) => {
    dispatch(changeImmigrationVisasActiveStatus(status));
  };


  return (
    <div className="content">
      <div className="iv">
        <h2 className="section-title">Заявки на Иммиграционную Визу</h2>
        <SectionHeader
          searchIsNumeric={true}
          searchPlaceholder="Поиск по номеру заявки..."
          activeStatus={activeStatus}
          numberOfNewItems={numberOfNewApplications}
          statuses={GeneralStatuses}
          setActiveStatus={setActiveStatus}
          hasSearch={false}
        />
        <div className="iv-wrapper">
          {isLoading ? (
            <Loader />
          ) : (
            <ImmigrationVisasList immigrationVisas={immigrationVisas.filter(item => item.status === activeStatus)}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImmigrationVisasPage;