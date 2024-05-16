import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './LogModal.css'

const LogModal = (props) => {

  const [log, setLog] = useState([]);

  const updateLog = (newData) => {
    const finalData = [...log, newData];
    setLog(finalData);
  }

  window.pre.logOnRenderer((event, message) => {
    updateLog(message);
  });

  return (
    <Modal
      {...props}
      size="lg"
      fullscreen={true}
      style={{color:"white"}}
      data-bs-theme="dark"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Log
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {
            log.map((element) => {
              return (
                <p key={element} className='logText' >{element}</p>
              )
            })

          }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogModal;