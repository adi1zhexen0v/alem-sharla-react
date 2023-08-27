interface ApplicationsItemBlockProps {
  title: string;
  value?: string | number;
  children?: React.ReactElement;
}

const ApplicationsItemBlock: React.FC<ApplicationsItemBlockProps> = ({ title, value, children }) => {
  return (
    <div className="applications-item__block">
      <span className="applications-item__block-key">{title}</span>
      {
        value && <h4 className="applications-item__block-value">{value}</h4>
      }
      <>{children}</>
    </div>
  )
}

export default ApplicationsItemBlock;