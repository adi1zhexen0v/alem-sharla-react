import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { removeCorrespondenceId } from "../../redux/slices/correspondenceSlise";
import { getAllProfiles } from "../../firebase/firestore";
import Loader from "../../components/Loader";
import ProfilesList from "./components/ProfilesList";
import { RootState } from "../../redux/store";
import { addProfiles, changeProfilesSearchText, changeProfilesSort, toggleProfilesIsByEmail } from "../../redux/slices/profilesSlice";
import ProfilesSectionHeader from "./components/ProfilesSectionHeader";
import { FromAtoZSorting, FromZtoASorting } from "../../utils/consts";
import ProfilesFullPage from "./components/FullPage";

const ProfilesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isByEmail = useAppSelector((state: RootState) => state.profiles.isByEmail);
  const activeProfile = useAppSelector((state: RootState) => state.profiles.activeProfile);

  const setIsByEmail = () => {
    dispatch(toggleProfilesIsByEmail(!isByEmail));
  }

  const profiles = useAppSelector((state: RootState) => {
    const searchText = state.profiles.searchText;
    const sort = state.profiles.sort;
    const profilesList = state.profiles.profilesList;

    const filteredProfiles = profilesList.filter((profile) =>
      profile.username.toLowerCase().includes(searchText.toLowerCase())
    );

    if (sort === FromAtoZSorting) {
      return filteredProfiles.slice().sort((a, b) => a.username.localeCompare(b.username));
    } else if (sort === FromZtoASorting) {
      return filteredProfiles.slice().sort((a, b) => b.username.localeCompare(a.username));
    }

    return filteredProfiles;
  });

  const sort = useAppSelector(
    (state: RootState) => state.profiles.sort
  );

  const setSort = (sort: string) => {
    dispatch(changeProfilesSort(sort));
  }

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeProfilesSearchText(e.target.value));
  };

  useEffect(() => {
    dispatch(removeCorrespondenceId());
    const fetchProfiles = async () => {
      setIsLoading(true);
      const profilesList = await getAllProfiles();
      dispatch(addProfiles(profilesList));
      setIsLoading(false);
    };
    fetchProfiles();
  }, [dispatch]);

  return (
    <div className="content">
      <div className="profiles">
        <h2 className="section-title">Пользователи</h2>
        <ProfilesSectionHeader
          searchPlaceholder="Поиск по имени..."
          handleChangeSearchText={handleChangeSearchText}
          sort={sort}
          setSort={setSort}
          isByEmail={isByEmail}
          setIsByEmail={setIsByEmail}
        />
        <div className="profiles-wrapper">
          {isLoading ? <Loader /> : <ProfilesList profiles={profiles} />}
          {!isLoading && activeProfile && <ProfilesFullPage profile={activeProfile}/>}
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
