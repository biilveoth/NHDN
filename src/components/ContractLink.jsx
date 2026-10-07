export default function ContractLink({ contract, onOpen }) {
  return (
    <a
      className="contract-link"
      href={`#contract-${contract}`}
      onClick={(event) => {
        event.preventDefault();
        onOpen();
      }}
    >
      {contract}
    </a>
  );
}
