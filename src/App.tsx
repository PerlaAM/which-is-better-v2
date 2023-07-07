import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import CurrencyInput from 'react-currency-input-field';
import { storesOptions } from './data/stores';
import { UnitMeasureEnum } from './enum/unitMeasuresEnum';
import { StoresEnum } from './enum/storesEnum';
import { unitMeasureOptions } from './data/unitMeasures';
import { IProduct } from './interfaces/productInterfaces';
import ProductCard from './components/ProductCard';
import ErrorValidation from './components/ErrorValidation';
import ConfirmationModal from './components/ConfirmationModal';
import ToastAlert from './components/ToastAlert';
import Header from './components/Header';
import Footer from './components/Footer';
import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ShoppingCartModal from './components/ShoppingCartModal';

type Errors = {
  productName?: string;
  price?: string;
  quantity?: string;
};

const validate = (values: any) => {
  const errors: Errors = {};

  if (!values.productName) errors.productName = 'Required';
  if (!values.price) errors.price = 'Required';
  if (!values.quantity) errors.quantity = 'Required';

  return errors;
};

function App() {
  const productNameRef: any = useRef(null);
  const storesRef: any = useRef(null);
  const unitMeasureRef: any = useRef(null);
  const priceRef: any = useRef(null);
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [productsToBuy, setProductsToBuy] = useState<IProduct[]>([]);
  const [unitMeasures, setUnitMeasures] = useState(unitMeasureOptions);
  const [keepProduct, setKeepProduct] = useState({
    productName: '',
    storeName: storesOptions[0].value,
    unitMeasure: unitMeasureOptions[0].value,
  });
  const [showProductsList, setShowProductsList] = useState(false);
  const [showProductsToBuyModal, setShowProductsToBuyModal] = useState(false);
  const [showShoppingCartModal, setShowShoppingCartModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('productsToBuyList'))
      setProductsToBuy(
        JSON.parse(localStorage.getItem('productsToBuyList') || '{}')
      );
  }, []);

  useEffect(() => {}, [keepProduct]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: keepProduct.productName,
      variant: '',
      storeName: keepProduct.storeName,
      otherStoreName: '',
      productUrl: '',
      price: 0.0,
      quantity: 0,
      unitMeasure: keepProduct.unitMeasure,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      saveFirstProduct(values);
      addProductsList(values);
      priceRef.current.focus();
      resetForm();
    },
  });

  const addProductsList = (values: any) => {
    let newProduct = {
      id: values?.productName + values?.quantity + Math.random(),
      productName: values?.productName,
      variant: values?.variant,
      storeName:
        values.otherStoreName != '' ? values.otherStoreName : values?.storeName,
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

  const saveFirstProduct = (values: any) => {
    let product = {
      productName: values.productName,
      storeName: values.storeName,
      unitMeasure: values.unitMeasure,
    };
    let unitMeasure = unitMeasureOptions.find(
      (unit) => unit.value === product?.unitMeasure
    );
    let unitMeasureTypes = unitMeasureOptions.filter(
      ({ type }) => type === unitMeasure?.type
    );

    setUnitMeasures(unitMeasureTypes);
    setKeepProduct(product);
  };

  const handleAddToShopping = (product: any) => {
    if (
      !productsToBuy.find(
        (productToBuy) =>
          productToBuy.price === product.price &&
          productToBuy.quantity === product.quantity &&
          productToBuy.productName === product.productName
      )
    ) {
      toggleShowToast();
      setProductsToBuy([product, ...productsToBuy]);
      localStorage.setItem(
        'productsToBuyList',
        JSON.stringify([product, ...productsToBuy])
      );
    }
  };

  const handleRemoveProductList = (product: any) => {
    setProductsList((productsList) =>
      productsList.filter((productList) => productList.id !== product.id)
    );

    productsList.splice(productsList.indexOf(product), 1);
    priceRef.current.focus();
  };

  const handleRemoveProduct = (product: any) => {
    setProductsToBuy((productsCart) =>
      productsCart.filter((productCart) => productCart.id !== product.id)
    );

    let productsCartList = JSON.parse(
      localStorage.getItem('productsToBuyList') || '{}'
    );
    productsCartList.splice(productsToBuy.indexOf(product), 1);
    localStorage.setItem('productsToBuyList', JSON.stringify(productsCartList));
  };

  const handleClearProductList = () => {
    setProductsList([]);
    setKeepProduct({
      productName: '',
      storeName: storesOptions[0].value,
      unitMeasure: unitMeasureOptions[0].value,
    });
    unitMeasureRef.current.setValue(unitMeasureOptions[0]);
    setUnitMeasures(unitMeasureOptions);
    storesRef.current.setValue(storesOptions[0]);
    handleCloseProductsList();
  };

  const handleClearShoppingCart = () => {
    setProductsToBuy([]);
    localStorage.removeItem('productsToBuyList');
    handleCloseProductsToBuyModal();
  };

  const handleShowProductsList = () => {
    productNameRef.current.focus();
    setShowProductsList(true);
  };

  const handleCloseProductsList = () => setShowProductsList(false);

  const handleShowProductsToBuyModal = () => setShowProductsToBuyModal(true);

  const handleCloseProductsToBuyModal = () => setShowProductsToBuyModal(false);

  const handleShowShoppingCartModal = () => setShowShoppingCartModal(true);

  const handleCloseShoppingCartModal = () => setShowShoppingCartModal(false);

  const toggleShowToast = () => setShowToast(!showToast);

  const closeModal = () => setShowToast(false);

  return (
    <section>
      <Header
        quantity={productsToBuy?.length}
        handleShowShoppingCart={handleShowShoppingCartModal}
      />
      <Container className='h-calc-header py-4 bg-light-blue overflow-auto'>
        <Row className='h-100'>
          <Col lg={{ span: 4 }} className='gx-4 mb-lg-0 mb-4'>
            <div className='bg-white rounded border h-100'>
              <div className='p-3 border-bottom'>
                <h5 className='m-0 text-dark lh-1'>New product</h5>
              </div>
              <form className='p-3' onSubmit={formik.handleSubmit}>
                <div className='d-flex'>
                  <div className='w-50 d-flex flex-column mb-3 me-2'>
                    <label htmlFor='productName'>Product name</label>
                    <div className='w-100 d-flex flex-column'>
                      <input
                        ref={productNameRef}
                        id='productName'
                        name='productName'
                        className='form-control'
                        autoComplete='off'
                        autoFocus={true}
                        type='text'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={
                          formik.values.productName || keepProduct.productName
                        }
                      />
                      <ErrorValidation
                        message={formik.errors.productName}
                        touched={formik.touched.productName}
                      />
                    </div>
                  </div>
                  <div className='w-50 d-flex flex-column mb-3 ms-2'>
                    <label htmlFor='variant'>Variant</label>
                    <div className='w-100 d-flex flex-column'>
                      <input
                        id='variant'
                        name='variant'
                        className='form-control'
                        autoComplete='off'
                        type='text'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.variant}
                      />
                    </div>
                  </div>
                </div>
                <div className='w-100 d-flex flex-column mb-3'>
                  <label htmlFor='storeName'>Store</label>
                  <Select
                    ref={storesRef}
                    className='basic-single'
                    classNamePrefix='select'
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary50: '#44444433',
                        primary25: '#44444433',
                        primary: '#444444',
                      },
                    })}
                    styles={{
                      control: (base) => ({
                        ...base,
                        border: '1px solid #E2DCDE',
                        background: '#ffffff',
                      }),
                    }}
                    defaultValue={storesOptions[0]}
                    name='storeName'
                    options={storesOptions}
                    onChange={(selectedStore) =>
                      formik.setFieldValue('storeName', selectedStore?.value)
                    }
                  />
                </div>
                {formik.values.storeName === 'others' && (
                  <div className='w-100 d-flex flex-column mb-3'>
                    <label htmlFor='otherStoreName'>Store name</label>
                    <input
                      id='otherStoreName'
                      name='otherStoreName'
                      className='form-control'
                      autoComplete='off'
                      type='text'
                      onChange={formik.handleChange}
                      value={formik.values.otherStoreName}
                    />
                  </div>
                )}
                <div className='w-100 d-flex flex-column mb-3'>
                  <label htmlFor='productUrl'>Product URL</label>
                  <input
                    id='productUrl'
                    name='productUrl'
                    className='form-control'
                    autoComplete='off'
                    type='text'
                    onChange={formik.handleChange}
                    value={formik.values.productUrl}
                  />
                </div>
                <div className='row gx-2'>
                  <div className='col-4 d-flex flex-column mb-3'>
                    <label htmlFor='price'>Price</label>
                    <CurrencyInput
                      ref={priceRef}
                      id='price'
                      name='price'
                      placeholder='$0.0'
                      className='form-control'
                      prefix={'$'}
                      value={formik.values.price}
                      onBlur={formik.handleBlur}
                      onValueChange={(value) => {
                        formik.setFieldValue('price', value);
                      }}
                    />

                    <ErrorValidation
                      message={formik.errors.price}
                      touched={formik.touched.price}
                    />
                  </div>
                  <div className='col-4 d-flex flex-column mb-3'>
                    <label htmlFor='quantity' className='text-truncate'>
                      Weight or pieces
                    </label>
                    <input
                      id='quantity'
                      name='quantity'
                      className='form-control'
                      autoComplete='off'
                      type='number'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.quantity}
                    />
                    <ErrorValidation
                      message={formik.errors.quantity}
                      touched={formik.touched.quantity}
                    />
                  </div>
                  <div className='col-4 d-flex flex-column mb-3'>
                    <label htmlFor='unitMeasure' className='text-truncate'>
                      Unit of measure
                    </label>
                    <Select
                      ref={unitMeasureRef}
                      className='basic-single'
                      classNamePrefix='select'
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary50: '#44444433',
                          primary25: '#44444433',
                          primary: '#444444',
                        },
                      })}
                      styles={{
                        control: (base) => ({
                          ...base,
                          border: '1px solid #E2DCDE',
                          background: '#ffffff',
                        }),
                      }}
                      defaultValue={unitMeasureOptions[0]}
                      name='unitMeasure'
                      options={unitMeasures}
                      onChange={(selectedUnitMeasure) =>
                        formik.setFieldValue(
                          'unitMeasure',
                          selectedUnitMeasure?.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className='d-grid gap-2 mt-3'>
                  <Button variant='primary' size='sm' type='submit'>
                    Add product
                  </Button>
                </div>
              </form>
            </div>
          </Col>

          <Col lg={{ span: 8 }} className='gx-4 pb-lg-0 pb-4'>
            <div className='bg-white rounded border h-100'>
              <div className='d-flex justify-content-between align-middle p-3 border-bottom'>
                <h5 className='m-0 text-dark lh-1'>Products</h5>
                <a
                  href='#'
                  className='text-secondary fs-8 pe-auto text-decoration-none link-danger'
                  onClick={() => handleShowProductsList()}
                >
                  Clear
                </a>
              </div>
              <div
                className={`overflow-scroll h-calc p-3 ${
                  productsList.length > 0 ? 'visible' : 'invisible'
                } `}
              >
                {productsList
                  .sort((firstElement, secondElement) =>
                    firstElement.priceUnitMeasure >
                    secondElement.priceUnitMeasure
                      ? 1
                      : -1
                  )
                  .map((product, index) => (
                    <ProductCard
                      product={product}
                      key={index}
                      onSelectProduct={handleAddToShopping}
                      onRemoveProduct={handleRemoveProductList}
                    />
                  ))}
              </div>
            </div>
          </Col>
          <ToastAlert show={showToast} handleClose={toggleShowToast} />
        </Row>
        <ConfirmationModal
          show={showProductsList}
          handleAction={handleClearProductList}
          handleClose={handleCloseProductsList}
          title={'Clear products'}
          description={'Are you sure you want to empty the products?'}
        />
        <ConfirmationModal
          show={showProductsToBuyModal}
          handleAction={handleClearShoppingCart}
          handleClose={handleCloseProductsToBuyModal}
          title={'Clear shoppingCart'}
          description={'Are you sure you want to empty shopping cart?'}
        />
        <ShoppingCartModal
          show={showShoppingCartModal}
          productsList={productsToBuy}
          handleClose={handleCloseShoppingCartModal}
          handleShowConfirmatioModal={handleShowProductsToBuyModal}
          handleRemoveProductModal={handleRemoveProduct}
        />
      </Container>
      <Footer />
    </section>
  );
}

export default App;
