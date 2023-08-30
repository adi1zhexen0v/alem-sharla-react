interface UsersItemBlockProps {
  title: string;
  value: string;
}

const UsersItemBlock: React.FC<UsersItemBlockProps> = ({ title, value }) => {
  return value.trim() !== '' ? (
    <div className="users-item__block">
      <span className="users-item__block-key">{title}</span>
      <h4 className="users-item__block-value">{value}</h4>
    </div>
  ) : null;
}

export default UsersItemBlock;