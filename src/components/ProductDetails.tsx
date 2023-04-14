import { formatter } from '../components/utils/formatValue';
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

  return (
    <div className='p-3 bg-light-gray rounded mb-3 shadow-sm'>
      <div className='text-center mb-3'>
        <p className='m-0 fw-light'>{props.product?.productName}</p>
        <p className='m-0 text-steal'>
          {Stores[props.product?.storeName]}
          {props.product?.productUrl && (
            <a
              href={props.product?.productUrl}
              target='_blank'
              rel='noreferrer'
            >
              <i className='ms-2 fa-solid fa-arrow-up-right-from-square'></i>
            </a>
          )}
        </p>
      </div>
      <div className='d-flex justify-content-between'>
        <div className='text-center h-100 lh-sm'>
          <p className='m-0 fw-semibold'>
            {formatter.format(props.product?.price)}
          </p>
          <p className='m-0 fs-8'>PRICE</p>
        </div>
        <div className='text-center h-100 lh-sm'>
          <p className='m-0 fw-semibold'>
            {props.product?.quantityConverted} {getUnitMeasure()}
          </p>
          <p className='m-0 fs-8'>WEIGHT</p>
        </div>
        <div className='text-center h-100 lh-sm'>
          <p className='m-0 fw-bold'>
            {formatter.format(props.product?.priceUnitMeasure)}
          </p>
          <p className='m-0 fs-8'>UNIT PRICE</p>
        </div>
      </div>
      {props.showButton && (
        <div>
          <Button onClick={() => handleAdd(props.product)}>Add</Button>
        </div>
      )}
    </div>
  );
}
