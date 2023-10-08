import ChatTyping from "../components/ChatTyping";
import ChatList from "../components/ChatList";
import { useAppSelector } from "../hooks/reduxHooks";
import { useMessages } from "../hooks/useMessages";
import { RootState } from "../redux/store";
import ChatItemSkeletion from "../components/ChatItem/Skeleton";

const ChatPage: React.FC = () => {
  const { isLoading, correspondences, sortedCorrespondencesKeys } =
    useMessages();

  const correspondenceId = useAppSelector(
    (state: RootState) => state.correspondence.id,
  );

  return (
    <div className="content">
      <div className="chat">
        <h2 className="section-title">Чат</h2>
        <div className="chat-wrapper">
          <div className="chat-part">
            {isLoading
              ? [...new Array(6)].map((_, index) => (
                  <ChatItemSkeletion key={index} />
                ))
              : correspondences && (
                  <ChatList
                    correspondences={correspondences!}
                    correspondencesKeys={sortedCorrespondencesKeys}
                  />
                )}
          </div>
          <div className="chat-part">
            {correspondenceId !== "" && (
              <ChatTyping correspondences={correspondences!} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
