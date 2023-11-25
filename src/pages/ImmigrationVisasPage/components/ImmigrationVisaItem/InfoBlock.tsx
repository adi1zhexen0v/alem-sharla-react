interface ImmigrationVisasInfoBlockProps {
  title: string;
  value: string;
}

const ImmigrationVisasInfoBlock: React.FC<ImmigrationVisasInfoBlockProps> = ({ title, value }) => {
  return (
    <div className="iv-btn__block">
      <span className="iv-item__block-key">{title}</span>
      <h4 className="iv-item__block-value">{value}</h4>
    </div>
  );  
}

export default ImmigrationVisasInfoBlock;