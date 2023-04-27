import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ConfirmationModal(props: any) {
  const handleAction = () => {
    props.onAction();
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.description}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => props.handleClose()}>
          Close
        </Button>
        <Button variant='primary' onClick={() => handleAction()}>
          Clear
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
