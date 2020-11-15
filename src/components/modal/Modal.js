// external
import { Dialog } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';


function Modal({ 
  isOpen, 
  children, 
  title,
  actionSubmit,
  actionCancel
}) {

  const actions = [
    <FlatButton
      label="Salvar"
      primary={true}
      keyboardFocused={true}
      onClick={actionSubmit}
    />,
    <FlatButton
      label="Cancelar"
      primary={true}
      onClick={actionCancel}
    />,
  ];

  return (
    <Dialog
      title={title}
      actions={actions}
      modal={false}
      open={isOpen}
      onRequestClose={actionCancel}
    >
      <div>
        {children}
      </div>
    </Dialog>
  );
} 

export default Modal;
    
