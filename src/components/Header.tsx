import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <Navbar bg='secondary'>
      <Container>
        <Navbar.Brand href=''>Which is better?</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
