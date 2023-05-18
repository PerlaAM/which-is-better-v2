import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faBagShopping,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

import { formatter, formatterWeight } from '../components/utils/formatValue';
import { Stores } from '../enum/storesEnum';
import Button from 'react-bootstrap/Button';

export default function ProductDetails(props: any) {
  const getUnitMeasure = (): string => {
    const unitMeasure = props.product?.unitMeasure;
    let unitMeasureText = props.product?.unitMeasure;

    if (unitMeasure === 'kg') {
      unitMeasureText = 'g';
    } else if (unitMeasure === 'l') {
      unitMeasureText = 'ml';
    } else if (unitMeasure === 'pieces') {
      unitMeasureText = 'pieces';
    }

    return unitMeasureText;
  };

  const handleAdd = (product: any) => {
    props.onSelectProduct(product);
  };

  const handleRemove = (product: any) => {
    props.onRemoveProduct(product);
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
        <p className='m-0 fw-semibold'>
          {formatter.format(props.product?.price)}
        </p>
        <p className='m-0 fs-8'>PRICE</p>
      </div>
      <div className='text-center lh-sm'>
        <p className='m-0 fw-semibold'>
          {formatterWeight.format(props.product?.quantityConverted)}{' '}
          {getUnitMeasure()}
        </p>
        <p className='m-0 fs-8'>WEIGHT</p>
      </div>
      <div className='text-center lh-sm'>
        <p className='m-0 fw-bold'>
          {formatter.format(props.product?.priceUnitMeasure)}
        </p>
        <p className='m-0 fs-8'>UNIT PRICE</p>
      </div>
      {props.showButton && (
        <Button
          variant='primary'
          size='sm'
          onClick={() => handleAdd(props.product)}
        >
          <FontAwesomeIcon icon={faBagShopping} className='me-2' />
          Add
        </Button>
      )}
      {props.showRemoveButton && (
        <Button
          variant='primary'
          size='sm'
          onClick={() => handleRemove(props.product)}
        >
          <FontAwesomeIcon icon={faTrashCan} className='me-2' />
          Remove
        </Button>
      )}
    </div>
  );
}
