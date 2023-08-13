import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { firebaseAuthSignOut } from '../../firebase/auth';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { removeUser } from '../../redux/slices/userSlice';
import { removeCorrespondenceId } from '../../redux/slices/correspondenceSlise';

const SidebarLogoutBtn = () => {
  const dispatch = useAppDispatch();

  const logOut = async () => {
    await firebaseAuthSignOut();
    dispatch(removeUser());
    dispatch(removeCorrespondenceId());
  };

  return (
    <div className="sidebar-links__item" onClick={logOut}>
      <div className="sidebar-links__link">
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        Выйти
      </div>
    </div>
  );
};

export default SidebarLogoutBtn;
