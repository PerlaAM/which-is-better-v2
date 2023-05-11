import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <Navbar bg='white'>
      <Container>
        <Navbar.Brand className='text-dark' href=''>
          Which is better?
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
