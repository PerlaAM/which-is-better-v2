export default function ErrorValidation({ message }: any) {
  const MessageText = () => {
    if (message) return message;
  };

  return (
    <p className={`m-0 ${message ? '' : 'd-none'}`}>
      <MessageText />
    </p>
  );
}
