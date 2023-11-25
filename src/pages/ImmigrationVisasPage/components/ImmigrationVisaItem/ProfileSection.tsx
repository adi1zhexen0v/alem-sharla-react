import { Profile } from "../../../../utils/interfaces";
import ImmigrationVisasInfoBlock from "./InfoBlock";

interface ImmigrationVisasProfileSectionProps {
  profile: Profile | null | undefined;
}

const ImmigrationVisasProfileSection: React.FC<ImmigrationVisasProfileSectionProps> = ({ profile }) => {
  return (
    profile ? <div className="iv-item__grid">
      <ImmigrationVisasInfoBlock title="Имя пользователя" value={profile.username}/>
      <ImmigrationVisasInfoBlock title="Адрес" value={profile.address}/>
      <ImmigrationVisasInfoBlock title="E-mail" value={profile.email}/>
      <ImmigrationVisasInfoBlock title="Квартира" value={profile.apartment}/>
      <ImmigrationVisasInfoBlock title="Телефон" value={profile.phoneNumber}/>
    </div> : <div className="iv-item__grid">
      <ImmigrationVisasInfoBlock title="Пользователь не найден" value="Заявку оставил пользователь, который не заполнил свой профиль"/>
    </div>
  );
}

export default ImmigrationVisasProfileSection;