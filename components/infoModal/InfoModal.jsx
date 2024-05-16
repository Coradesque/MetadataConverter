import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const InfoModal = (props) => {
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
        Controle de Versões
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <b>0.1.0</b> - (1) Primeira versão, compilada para testes em escala.
        </p>
        <p>
          <b>0.1.1</b> - (1) Aprimorado tratamento de erros na conversão. (2) Incluído log no console renderer.
        </p>
        <p>
          <b>0.2.0</b> - (1) Implantado modal com informações de controle de versões. 
          (2) Implantado modal para controle de log.
          (3) Implantado modal com aviso e log de conclusão 
          (3) Ampliação dos logs, principalmente renderer.
          (4) Adicionado suporte ao sensor Triplesat MS
        </p>
        <p>
          <b>0.3.0</b> - (1) Incluídos campos "Projeto" e "Alvo" (Objeto de interesse - OOI).
        </p>
        <p>
          <hr/>
          <b>SISTEMAS:</b> BSG, CSG, CSK, DE2_MS4, DE2_PAN, ERB, GF2, ICE, TRP_MS.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;