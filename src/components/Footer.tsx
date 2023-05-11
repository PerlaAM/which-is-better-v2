import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <footer className='d-flex flex-column align-items-center py-2 bg-white'>
      <p className='text-dark m-0 fs-8'>
        Made with
        <FontAwesomeIcon icon={faHeart} className='ms-1 ' />
      </p>
      <p className='m-0 fs-8 text-dark'>Perla Aguilar</p>
    </footer>
  );
}
