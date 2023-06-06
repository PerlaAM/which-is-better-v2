import Modal from 'react-bootstrap/Modal';
import ProductCartCard from '../components/ProductCartCard';
import { formatter } from '../components/utils/formatValue';

export default function ShoppingCartModal(props: any) {
  const productsToBuy = props.productsList;

  const getTotalAmount = (): number => {
    let totalAmount = 0.0;

    productsToBuy.map((product: any) => {
      totalAmount += Number(product?.price);
    });

    return totalAmount;
  };

  const handleAction = () => {
    props.handleShowConfirmatioModal();
    props.handleClose();
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      className='cart'
      backdropClassName='card-backdrop'
    >
      <Modal.Header closeButton>
        <Modal.Title>Shopping cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <a
          href='#'
          className='text-secondary fs-8 text-decoration-none mb-2 d-flex justify-content-end link-danger'
          onClick={() => handleAction()}
        >
          Clear
        </a>
        {productsToBuy
          .sort((firstElement: any, secondElement: any) =>
            firstElement.storeName > secondElement.storeName
              ? 1
              : -1 && firstElement.price > secondElement.price
              ? 1
              : -1
          )
          .map((product: any, index: number) => (
            <ProductCartCard
              product={product}
              key={index}
              handleRemoveProduct={props.handleRemoveProductModal}
            />
          ))}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between text-steal px-3'>
        TOTAL{' '}
        <span className='fw-semibold ps-1 text-dark'>
          {formatter.format(getTotalAmount())}
        </span>
      </Modal.Footer>
    </Modal>
  );
}
