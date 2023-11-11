import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useMessages } from "../../hooks/useMessages";
import { RootState } from "../../redux/store";
import Loader from "../../components/Loader";
import { Correspondence, Status } from "../../utils/interfaces";
import ChatList from "./components/ChatList";
import SectionHeader from "../../components/SectionHeader";
import { changeChatActiveStatus, changeChatSearchText } from "../../redux/slices/chatSlice";
import { ChangeEvent } from "react";

const ChatStatuses: Status[] = [
  {
    eng: 'new',
    rus: 'Новые'
  },
  {
    eng: 'seen',
    rus: 'Прочитанные'
  },
  {
    eng: 'completed',
    rus: 'Завершенные'
  }
];

const ChatPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useMessages();
  const correspondences: Correspondence[] = useAppSelector((state: RootState) => state.chat.chatList);
  const activeStatus: string = useAppSelector((state: RootState) => state.chat.activeStatus);
  const setActiveStatus = (status: string) => {
    dispatch(changeChatActiveStatus(status));
  };

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeChatSearchText(e.target.value));
  };

  return (
    <div className="content">
      <div className="chat">
        <h2 className="section-title">Чат</h2>
        <SectionHeader
          searchIsNumeric={false}
          searchPlaceholder="Поиск по имени..."
          activeStatus={activeStatus}
          numberOfNewItems={0}
          statuses={ChatStatuses}
          setActiveStatus={setActiveStatus}
          handleChangeSearchText={handleChangeSearchText}
        />
        <div className="chat-wrapper">
          <div className="chat-part">{
            isLoading && correspondences ? <Loader/> : <ChatList correspondences={correspondences}/>
          }</div>
          <div className="chat-part"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
