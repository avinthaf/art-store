import {useState} from 'react'

import './Alert.css'

const Alert = ({children, isOpen, setSubmitState}) => {

  function handleClose() {
    setSubmitState(false)
  };
  return (
    <div className="Alert" style={{ top: isOpen? '0' : '-100vh' }}>
        <h4>{children}</h4>
        <span onClick={handleClose}>X</span>
    </div>
  )
}

export default Alert