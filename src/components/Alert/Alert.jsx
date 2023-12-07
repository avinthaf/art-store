import {useState} from 'react'

import './Alert.css'

const Alert = ({isOpen, setSubmitState}) => {

  function handleClose() {
    setSubmitState(false)
  };
  return (
    <div className="Alert" style={{ top: isOpen? '0' : '-100vh' }}>
        <h4>Your message has been sent!</h4>
        <span onClick={handleClose}>X</span>
    </div>
  )
}

export default Alert