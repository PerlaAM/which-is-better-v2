import { formatValue } from '../components/utils/formatValue';
import { Stores } from '../enum/stores-enum';

export default function ProductDetails({ product }: any) {
  return (
    <div>
      <p className='fw-light'>{product?.productName}</p>
      <p className='fw-light'>{Stores[product.storeName]}</p>
      <p className='fw-light'>{product?.productUrl}</p>
      <p className='fw-light'>{formatValue(product?.price)}</p>
      <p className='fw-light'>
        {product?.quantity} {product?.unitMeasure}
      </p>
      <p className='fw-light'>{formatValue(product?.priceUnitMeasure)}</p>
    </div>
  );
}
