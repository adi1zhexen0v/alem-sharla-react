import { useState } from "react";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateApplicationIsPaid } from "../../firebase/firestore";

interface ApplicationsItemBooleanToggleProps {
  isPaid: boolean;
  id: string;
}

const ApplicationsItemBooleanToggle: React.FC<
  ApplicationsItemBooleanToggleProps
> = ({ isPaid, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChangable, setIsChangable] = useState(false);
  const [checked, setChecked] = useState(isPaid);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const updateIsPaid = async () => {
    setIsLoading(true);
    await updateApplicationIsPaid(id, checked);
    setIsChangable(false);
    setIsLoading(false);
  };

  if (isChangable) {
    return (
      <div className="applications-item__block-boolean">
        <div className="applications-item__block-boolean-part">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
            className="applications-item__block-boolean-checkbox"
          />
          <div className="applications-item__block-boolean-text">
            {checked ? "Оплачен" : "Не оплачен"}
          </div>
        </div>
        <div className="applications-item__block-boolean-part">
          {isLoading ? (
            <div className="applications-item__block-loader"></div>
          ) : (
            <>
              <button
                className="applications-item__block-btn"
                onClick={() => setIsChangable(false)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="applications-item__block-btn"
                onClick={updateIsPaid}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="applications-item__block-boolean">
      <div className="applications-item__block-boolean-part">
        <h4 className="applications-item__block-value">
          {checked ? "Да" : "Нет"}
        </h4>
      </div>
      <div className="applications-item__block-boolean-part">
        <button
          className="applications-item__block-btn"
          onClick={() => setIsChangable(true)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
    </div>
  );
};

export default ApplicationsItemBooleanToggle;
