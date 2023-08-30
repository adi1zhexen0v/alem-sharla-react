import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { removeCorrespondenceId } from "../redux/slices/correspondenceSlise";
import { getAllUsers } from "../firebase/firestore";
import { User } from "../utils/interfaces";
import Loader from "../components/Loader";
import UsersList from "../components/UsersList";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(removeCorrespondenceId());
    const fetchUsers = async () => {
      setIsLoading(true);
      const usersList = await getAllUsers();
      setUsers(usersList);
      setIsLoading(false);
    }
    fetchUsers();
  }, [dispatch]);
  
  return (
    <div className="content">
      <div className="users">
        <h2 className="section-title">Пользователи</h2>
        <div className="users-wrapper">
          {
            isLoading ? <Loader/> : <UsersList users={users}/>
          }
        </div>
      </div>
    </div>
  )
}

export default UsersPage;
