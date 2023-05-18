import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { formatter } from './utils/formatValue';
import { Stores } from '../enum/storesEnum';

export default function ProductCartCard(props: any) {
  const handleRemove = (product: any) => {
    props.handleRemoveProduct(product);
  };

  return (
    <div className='p-2 border rounded mb-3 d-flex justify-content-between align-items-center'>
      <div className='text-center lh-sm'>
        <p className='m-0 fw-light'>{props.product?.productName}</p>
        <p className='m-0 text-steal'>
          {Stores[props.product?.storeName]}
          {props.product?.productUrl && (
            <a
              href={props.product?.productUrl}
              target='_blank'
              rel='noreferrer'
            >
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className='ms-2'
              />
            </a>
          )}
        </p>
      </div>

      <div className='text-center lh-sm'>
        <a
          href='#'
          className='text-primary fs-8 pe-auto text-decoration-none'
          onClick={() => handleRemove(props.product)}
        >
          <FontAwesomeIcon icon={faTrashCan} className='me-2' />
        </a>

        <p className='m-0 fw-bold'>{formatter.format(props.product?.price)}</p>
      </div>
    </div>
  );
}
