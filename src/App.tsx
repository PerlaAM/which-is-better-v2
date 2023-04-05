import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { storesOptions } from './data/stores';
import { unitMeasureOptions } from './data/unitMeasures';
import { IProduct } from './interfaces/productInterfaces';
import ProductDetails from './components/ProductDetails';
import ErrorValidation from './components/ErrorValidation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

type Errors = {
  productName?: string;
  productUrl?: string;
  price?: string;
  quantity?: string;
  unitMeasure?: string;
};

const validate = (values: any) => {
  const errors: Errors = {};
  if (!values.productName) errors.productName = 'Required';
  if (!values.productUrl) errors.productUrl = 'Required';
  if (!values.price) errors.price = 'Required';
  if (!values.quantity) errors.quantity = 'Required';
  if (!values.unitMeasure) errors.unitMeasure = 'Required';

  return errors;
};

function App() {
  const selectInputRef: any = useRef(null);
  const unitMeasureRef: any = useRef(null);
  const [productsList, setProductsList] = useState<IProduct[]>([]);

  const formik = useFormik({
    initialValues: {
      productName: '',
      storeName: storesOptions[0].value,
      productUrl: '',
      price: 0.0,
      quantity: 0,
      unitMeasure: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      selectInputRef.current.selectOption(storesOptions[0]);

      addProductsList(values);
    },
  });

  const addProductsList = (values: any) => {
    let newProduct = {
      productName: values?.productName,
      storeName: values?.storeName,
      productUrl: values?.productUrl,
      price: values?.price,
      quantity: values?.quantity,
      unitMeasure: values?.unitMeasure,
      quantityConverted: getQuantity(values?.unitMeasure, values?.quantity),
      priceUnitMeasure: getPrice(
        values?.unitMeasure,
        values?.quantity,
        values?.price
      ),
    };

    setProductsList([newProduct, ...productsList]);
  };

  const getQuantity = (unitMeasure: string, quantity: number): number => {
    if (unitMeasure === 'kg' || unitMeasure === 'l') {
      return quantity * 1000;
    } else {
      return quantity;
    }
  };

  const getPrice = (
    unitMeasure: string,
    quantity: number,
    price: number
  ): number => {
    if (unitMeasure === 'kg' || unitMeasure === 'l') {
      let quantityLittle = quantity * 1000;
      return price / quantityLittle;
    } else {
      return price / quantity;
    }
  };

  return (
    <Container className='vh-100 py-5'>
      <Row className='h-100'>
        <Col md={{ span: 4 }}>
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
              <ErrorValidation message={formik.errors.productName} />
            </div>
            <div className='w-100 d-flex flex-column mb-3'>
              <label htmlFor='storeName'>Store</label>
              <Select
                ref={selectInputRef}
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
              <ErrorValidation message={formik.errors.productUrl} />
            </div>
            <div className='w-100 d-flex flex-column mb-3'>
              <label htmlFor='price'>Price</label>
              <input
                id='price'
                name='price'
                type='number'
                onChange={formik.handleChange}
                value={formik.values.price}
              />
              <ErrorValidation message={formik.errors.price} />
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
              <ErrorValidation message={formik.errors.quantity} />
            </div>
            <div>
              <label htmlFor='unitMeasure'>Unit of measure</label>
              <Select
                ref={unitMeasureRef}
                className='basic-single'
                classNamePrefix='select'
                defaultValue={unitMeasureOptions[0]}
                name='unitMeasure'
                options={unitMeasureOptions}
                onChange={(selectedUnitMeasure) =>
                  formik.setFieldValue(
                    'unitMeasure',
                    selectedUnitMeasure?.value
                  )
                }
              />
            </div>

            <Button variant='outline-dark' type='submit'>
              Add product
            </Button>
          </form>
        </Col>

        <Col md={{ span: 4 }} className='h-100'>
          <h1>Products</h1>
          <div className='overflow-scroll h-calc'>
            {productsList
              .sort((firstElement, secondElement) =>
                firstElement.priceUnitMeasure > secondElement.priceUnitMeasure
                  ? 1
                  : -1
              )
              .map((product, index) => (
                <ProductDetails product={product} key={index} />
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
