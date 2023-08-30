import { User } from "../utils/interfaces";
import UsersItem from "./UsersItem";

interface UsersListProps {
  users: User[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <div className="users-grid">{
      users.map(user => <UsersItem key={user.userID} user={user} />)
    }</div>
  )
}

export default UsersList;