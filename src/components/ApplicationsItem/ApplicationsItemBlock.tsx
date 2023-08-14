interface ApplicationsItemBlockProps {
  title: string;
  value: string | number;
}

const ApplicationsItemBlock: React.FunctionComponent<ApplicationsItemBlockProps> = ({ title, value }) => {
  return (
    <div className="applications-item__block">
      <span className="applications-item__block-key">{title}</span>
      <h4 className="applications-item__block-value">{value}</h4>
    </div>
  )
}

export default ApplicationsItemBlock;