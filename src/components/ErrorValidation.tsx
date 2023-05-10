import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function ErrorValidation({ message, touched }: any) {
  const MessageText = () => {
    if (message) return message;
  };

  return (
    <p
      className={`m-0 text-danger fs-8 fw-light pt-1 ${
        message && touched ? '' : 'd-none'
      }`}
    >
      <FontAwesomeIcon icon={faCircleExclamation} className='me-1' />
      <MessageText />
    </p>
  );
}
