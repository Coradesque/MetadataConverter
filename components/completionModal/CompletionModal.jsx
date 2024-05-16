import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './CompletionModal.css'

const CompletionModal = (props) => {

  const [writtenData, setWrittenData] = useState([]);

  const updateData = (newData) => {
    const finalData = [...newData];
    setWrittenData(finalData);
  }

  window.pre.eventListener((event, message) => {
    if (message.eventName === "writingFinished") {
      updateData(message.eventData);
    }
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
        Arquivos Escritos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {
            writtenData.map((element) => {
              return (
                <p key={element} className='logText'>{element}</p>
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

export default CompletionModal;