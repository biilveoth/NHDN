import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import "./RecordDetailsDialog.css";

export default function RecordDetailsDialog({ details, onClose }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog
      className="record-dialog"
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <header className="record-dialog__header">
        <h2 id={titleId}>{details.title}</h2>
        <button
          autoFocus
          className="record-dialog__close"
          title="Đóng"
          aria-label="Đóng chi tiết"
          onClick={onClose}
        >
          <X size={14} />
        </button>
      </header>
      <dl className="record-dialog__fields">
        {details.fields.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value || "\u00a0"}</dd>
          </div>
        ))}
      </dl>
      <footer className="record-dialog__footer">
        <button onClick={onClose}>Đóng</button>
      </footer>
    </dialog>
  );
}
