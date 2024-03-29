import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { formatter } from './utils/formatValue';
import { StoresEnum } from '../enum/storesEnum';

export default function ProductCartCard(props: any) {
  const handleRemove = (product: any) => {
    props.handleRemoveProduct(product);
  };

  return (
    <div className='card-cart p-2 border rounded mb-3 d-flex justify-content-between align-items-center'>
      <div className='lh-sm'>
        <p className='m-0 fw-light'>
          {props.product?.productName} {props.product?.variant}
        </p>
        <p className='m-0 text-steal'>
          {StoresEnum[props.product?.storeName] != undefined
            ? StoresEnum[props.product?.storeName]
            : props.product?.storeName}
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

      <div className='text-end lh-sm'>
        <a
          href='#'
          className='text-primary fs-8 pe-auto text-decoration-none link-steal'
          onClick={() => handleRemove(props.product)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </a>

        <p className='m-0 fw-light'>{formatter.format(props.product?.price)}</p>
      </div>
    </div>
  );
}
