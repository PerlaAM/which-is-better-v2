import { useState } from 'react';
import { formatter, formatterWeight } from './utils/formatValue';
import { StoresEnum } from '../enum/storesEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBasketShopping,
  faArrowUpRightFromSquare,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { UnitMeasureEnum } from '../enum/unitMeasuresEnum';
import { unitMeasureOptions } from '../data/unitMeasures';
export default function ProductCard(props: any) {
  const [isAdded, setIsAdded] = useState(false);

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
    setIsAdded(true);
    props.onSelectProduct(product);
  };

  const handleRemove = (product: any) => {
    props.onRemoveProduct(product);
  };

  return (
    <div className='p-2 border rounded mb-3 '>
      <div className='mb-2 d-flex justify-content-between'>
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

        <a
          href='#'
          className='text-primary text-decoration-none link-steal'
          onClick={() => handleRemove(props.product)}
        >
          <FontAwesomeIcon icon={faTrashAlt} className='' />
        </a>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
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

        <Button
          className={`${isAdded ? 'disabled' : ''}`}
          variant={`${isAdded ? 'outline-primary' : 'primary'}`}
          size='sm'
          onClick={() => handleAdd(props.product)}
        >
          <FontAwesomeIcon icon={faBasketShopping} className='me-2 ' />
          Add
        </Button>
      </div>
    </div>
  );
}
