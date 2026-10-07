import { useId, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileDown,
  LoaderCircle,
} from "lucide-react";
export default function ProductSection({
  title,
  defaultOpen = false,
  onExport,
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [status, setStatus] = useState("");
  const [exporting, setExporting] = useState(false);
  const id = useId();
  async function handleExport() {
    setExporting(true);
    setStatus("");
    try {
      await onExport();
      setStatus("Đã xuất Excel");
    } catch {
      setStatus("Không thể xuất Excel. Vui lòng thử lại.");
    } finally {
      setExporting(false);
    }
  }
  return (
    <section className="product-section" aria-label={title}>
      <header className="section-header">
        <button
          className="section-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={id}
        >
          {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          <h2 className="section-title">{title}</h2>
        </button>
        <button
          className="export-button"
          onClick={handleExport}
          disabled={exporting}
          onBlur={() => setStatus("")}
          title={status || `Export Excel - ${title}`}
          aria-label={`Export Excel - ${title}`}
        >
          {exporting ? (
            <LoaderCircle className="spin" size={15} />
          ) : (
            <FileDown size={15} />
          )}
        </button>
        <span className="sr-only" role="status">
          {status}
        </span>
      </header>
      {status.startsWith("Không") && (
        <p role="alert" className="export-error">
          {status}
        </p>
      )}
      <div id={id} hidden={!open} className="section-body">
        {children}
      </div>
    </section>
  );
}
