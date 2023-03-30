import { useFormik } from 'formik';
import { storesOptions } from './data/stores';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

type Errors = {
  productName?: string;
  productUrl?: string;
  quantity?: string;
  unitMeasure?: string;
};

const validate = (values: any) => {
  const errors: Errors = {};
  if (!values.productName) errors.productName = 'Required';
  if (!values.productUrl) errors.productUrl = 'Required';
  if (!values.quantity) errors.quantity = 'Required';
  if (!values.unitMeasure) errors.unitMeasure = 'Required';
  return errors;
};

function App() {
  const formik = useFormik({
    initialValues: {
      productName: '',
      storeName: storesOptions[0].value,
      productUrl: '',
      unitMeasure: '',
      quantity: '',
    },
    validate,
    onSubmit: (values) => {},
  });

  return (
    <Container className='vh-100 py-5'>
      <Row>
        <Col md={{ span: 3 }}>
          <h1>New product</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className='w-100 d-flex flex-column mb-3'>
              <label htmlFor='productName'>Product name</label>
              <input
                id='productName'
                name='productName'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.productName}
              />
              {formik.errors.productName ? (
                <div>{formik.errors.productName}</div>
              ) : null}
            </div>
            <div className='w-100 d-flex flex-column mb-3'>
              <label htmlFor='storeName'>Store</label>
              <Select
                className='basic-single'
                classNamePrefix='select'
                defaultValue={storesOptions[0]}
                name='storeName'
                options={storesOptions}
                onChange={(selectedStore) =>
                  formik.setFieldValue('storeName', selectedStore?.value)
                }
              />
            </div>
            <div className='w-100 d-flex flex-column mb-3'>
              <label htmlFor='productUrl'>Product URL</label>
              <input
                id='productUrl'
                name='productUrl'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.productUrl}
              />
              {formik.errors.productUrl ? (
                <div>{formik.errors.productUrl}</div>
              ) : null}
            </div>
            <div className='w-100 d-flex flex-column mb-3'>
              <label htmlFor='quantity'>Weight or units</label>
              <input
                id='quantity'
                name='quantity'
                type='number'
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
              {formik.errors.quantity ? (
                <div>{formik.errors.quantity}</div>
              ) : null}
            </div>
            <div>
              <label className='w-100'>Unit of measure</label>
              <div className='radio-box'>
                <input
                  id='milliliters'
                  type='radio'
                  name='milliliters'
                  value='ml'
                  checked={formik.values.unitMeasure === 'ml'}
                  onChange={() => formik.setFieldValue('unitMeasure', 'ml')}
                />
                <label htmlFor='milliliters' className='me-2'>
                  ml
                </label>
                <input
                  id='liters'
                  type='radio'
                  name='liters'
                  value='l'
                  checked={formik.values.unitMeasure === 'l'}
                  onChange={() => formik.setFieldValue('unitMeasure', 'l')}
                />
                <label htmlFor='liters' className='me-2'>
                  L
                </label>
                <input
                  id='grams'
                  type='radio'
                  name='grams'
                  value='g'
                  checked={formik.values.unitMeasure === 'g'}
                  onChange={() => formik.setFieldValue('unitMeasure', 'g')}
                />
                <label htmlFor='grams' className='me-2'>
                  g
                </label>
                <input
                  id='kilograms'
                  type='radio'
                  name='kilograms'
                  value='kg'
                  checked={formik.values.unitMeasure === 'kg'}
                  onChange={() => formik.setFieldValue('unitMeasure', 'kg')}
                />
                <label htmlFor='kilograms' className='me-2'>
                  kg
                </label>
                <input
                  id='pieces'
                  type='radio'
                  name='pieces'
                  value='pieces'
                  checked={formik.values.unitMeasure === 'pieces'}
                  onChange={() => formik.setFieldValue('unitMeasure', 'pieces')}
                />
                <label htmlFor='pieces'>Pieces</label>
              </div>
              {formik.errors.unitMeasure ? (
                <div>{formik.errors.unitMeasure}</div>
              ) : null}
            </div>

            <Button variant='outline-dark' type='submit'>
              Dark
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
