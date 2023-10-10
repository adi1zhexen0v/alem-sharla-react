interface GreenCardApplicationsInfoBlockProps {
  title: string;
  value?: string | number;
  children?: React.ReactElement;
} 

const GreenCardApplicationsInfoBlock: React.FC<GreenCardApplicationsInfoBlockProps> = ({ title, value, children }) => {
  return (
    <div className="gca-item__block">
      <span className="gca-item__block-key">{title}</span>
      { value && <h6 className="gca-item__block-value">{value}</h6> }
      <>{children}</>
    </div>
  );
}

export default GreenCardApplicationsInfoBlock;