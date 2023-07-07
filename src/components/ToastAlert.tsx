import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function ToastAlert(props: any) {
  return (
    <ToastContainer className='p-3' position='bottom-end' style={{ zIndex: 1 }}>
      <Toast
        onClose={() => props.handleClose()}
        show={props.show}
        delay={2000}
        autohide
      >
        <Toast.Header>
          <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
          <strong className='me-auto'>Success!</strong>
        </Toast.Header>
        <Toast.Body>Product added to shopping cart</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
