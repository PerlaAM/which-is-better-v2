import { formatter } from '../components/utils/formatValue';
import { Stores } from '../enum/storesEnum';

export default function ProductDetails({ product }: any) {
  const getUnitMeasure = (): string => {
    const unitMeasure = product?.unitMeasure;
    let unitMeasureText = product?.unitMeasure;

    if (unitMeasure === 'kg') {
      unitMeasureText = 'g';
    } else if (unitMeasure === 'l') {
      unitMeasureText = 'ml';
    } else if (unitMeasure === 'pieces') {
      unitMeasureText = 'pieces';
    }

    return unitMeasureText;
  };

  return (
    <div className='p-3 bg-light-gray rounded'>
      <div className='text-center mb-3'>
        <p className='m-0 fw-light'>{product?.productName}</p>
        <p className='m-0 text-steal'>
          {Stores[product?.storeName]}
          {product?.productUrl && (
            <a href={product?.productUrl} target='_blank' rel='noreferrer'>
              <i className='ms-2 fa-solid fa-arrow-up-right-from-square'></i>
            </a>
          )}
        </p>
      </div>
      <div className='d-flex justify-content-between'>
        <div className='text-center'>
          <p className='m-0 fw-bold'>{formatter.format(product?.price)}</p>
          <p className='m-0 fs-8'>PRICE</p>
        </div>
        <div className='text-center'>
          <p className='m-0 fw-bold'>
            {product?.quantityConverted} {getUnitMeasure()}
          </p>
          <p className='m-0 fs-8'>WEIGHT</p>
        </div>
        <div className='text-center'>
          <p className='m-0 fw-bold'>
            {formatter.format(product?.priceUnitMeasure)}
          </p>
          <p className='m-0 fs-8'>UNIT PRICE</p>
        </div>
      </div>
    </div>
  );
}
