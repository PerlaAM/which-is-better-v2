import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

export default function Header(props: any) {
  return (
    <Navbar bg='white'>
      <Container>
        <Navbar.Brand className='text-dark' href=''>
          Which is better?
        </Navbar.Brand>
        <Navbar.Text>
          <a
            href='#'
            className='text-primary fs-8 pe-auto text-decoration-none'
            onClick={() => props.handleShowShoppingCart()}
          >
            <FontAwesomeIcon icon={faBasketShopping} className='ms-1 ' />
            {props.quantity}
          </a>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}
