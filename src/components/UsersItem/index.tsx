import { User } from "../../utils/interfaces";
import ImageWithSkeleton from "./ImageWithSkeleton";
import UsersItemBlock from "./UsersItemBlock";

interface UsersItemProps {
  user: User
}

const UsersItem: React.FC<UsersItemProps> = ({ user }) => {
  return (
    <div className="users-item">
      <div className="users-item__header">
        <div className="users-item__header-img">
          <ImageWithSkeleton imageUrl={user.photoLink} />
        </div>
      </div>
      <div className="users-item__body">
        <h4 className="users-item__body-name">{user.username}</h4>
        <UsersItemBlock title="E-mail" value={user.email}/>
        <UsersItemBlock title="Телефон" value={user.phoneNumber}/>
        <UsersItemBlock title="Адрес" value={user.address}/>
        <UsersItemBlock title="Квартира" value={user.aparment}/>
      </div>
    </div>
  )
}

export default UsersItem;