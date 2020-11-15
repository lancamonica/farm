// style
import './ActionButton.scss';

const ActionButton = ({
  onClick, 
  label
}) => (
  <button className="button" onClick={onClick}>
      <p className="label">{label}</p>
  </button>

)
  

export default ActionButton;