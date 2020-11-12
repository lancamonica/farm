import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


function Modal({ 
  isOpen, 
  children, 
  title,
  actionSubmit,
  actionCancel
}) {

  const actions = [
    <FlatButton
      label="Cancelar"
      primary={true}
      onClick={actionCancel}
    />,
    <FlatButton
      label="Salvar"
      primary={true}
      keyboardFocused={true}
      onClick={actionSubmit}
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
      {children}
    </Dialog>
  );
} 

export default Modal;
    
