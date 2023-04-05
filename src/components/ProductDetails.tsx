import { formatValue } from '../components/utils/formatValue';
import { Stores } from '../enum/storesEnum';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function ProductDetails({ product }: any) {
  const getUnitMeasure = (): string => {
    const unitMeasure = product?.unitMeasure;
    let unitMeasureText = '';

    if (unitMeasure === 'kg') {
      return 'g';
    } else if (unitMeasure === 'l') {
      return 'ml';
    } else if (unitMeasure === 'pieces') {
      return 'pieces';
    }

    return unitMeasureText;
  };

  return (
    <Card className='mb-3'>
      <Card.Body>
        <Card.Title>{product?.productName}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {Stores[product.storeName]}
        </Card.Subtitle>
      </Card.Body>

      <ListGroup className='list-group-flush'>
        <ListGroup.Item>{formatValue(product?.price)}</ListGroup.Item>
        <ListGroup.Item>
          {product?.quantityConverted} {getUnitMeasure()}
        </ListGroup.Item>
        <ListGroup.Item>
          <p className='fw-bolder m-0'>
            Unit price: <span>{formatValue(product?.priceUnitMeasure)}</span>
          </p>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link target='_blank' href={product?.productUrl}>
          Link
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
