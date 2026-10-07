import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileDown,
  LoaderCircle,
  Search,
  X,
} from "lucide-react";
import DataTable from "../../../components/DataTable";
import { exportExcel } from "../../../utils/exportExcel";
import {
  collateralColumns,
  collateralRows,
  normalizeSearch,
} from "../data/collateral";

export default function CollateralTable() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const filtered = collateralRows.filter((row) =>
    row.some((value) =>
      normalizeSearch(value).includes(normalizeSearch(query)),
    ),
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  function search(event) {
    event.preventDefault();
    setQuery(input);
    setPage(1);
  }
  function clearSearch() {
    setInput("");
    setQuery("");
    setPage(1);
  }
  async function handleExport() {
    setExporting(true);
    setExportError("");
    try {
      await exportExcel({
        title: "Tài sản đảm bảo",
        columns: collateralColumns,
        rows: filtered,
      });
    } catch {
      setExportError("Không thể xuất Excel. Vui lòng thử lại.");
    } finally {
      setExporting(false);
    }
  }
  return (
    <section className="collateral-panel" aria-labelledby="collateral-title">
      <h2 className="section-title collateral-title" id="collateral-title">
        Danh sách tài sản đảm bảo
      </h2>
      <div className="collateral-toolbar">
        <form role="search" onSubmit={search} className="collateral-search">
          <div className="collateral-search-input">
            <input
              aria-label="Tìm kiếm tài sản đảm bảo"
              placeholder="Tìm kiếm"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                if (!event.target.value) {
                  setQuery("");
                  setPage(1);
                }
              }}
            />
            {input && (
              <button
                type="button"
                aria-label="Xóa tìm kiếm"
                title="Xóa tìm kiếm"
                onClick={clearSearch}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            className="risk-icon-button"
            type="submit"
            aria-label="Tìm kiếm"
            title="Tìm kiếm"
          >
            <Search size={18} />
          </button>
        </form>
        <button
          className="risk-icon-button"
          aria-label="Export Excel - Tài sản đảm bảo"
          title="Export Excel"
          onClick={handleExport}
          disabled={exporting || !filtered.length}
        >
          {exporting ? (
            <LoaderCircle size={18} className="spin" />
          ) : (
            <FileDown size={18} />
          )}
        </button>
      </div>
      {exportError && (
        <p className="export-error" role="alert">
          {exportError}
        </p>
      )}
      <div className="collateral-grid">
        <DataTable
          columns={collateralColumns}
          rows={visibleRows}
          label="Danh sách tài sản đảm bảo"
        >
          {!visibleRows.length && (
            <tr>
              <td
                colSpan={collateralColumns.length}
                className="collateral-empty"
              >
                Không tìm thấy tài sản đảm bảo
              </td>
            </tr>
          )}
        </DataTable>
      </div>
      <footer className="collateral-pagination">
        <label htmlFor="collateral-page-size">Hiển thị</label>
        <select
          id="collateral-page-size"
          value={pageSize}
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(1);
          }}
        >
          {[2, 5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>bản ghi</span>
        <nav
          aria-label="Phân trang tài sản đảm bảo"
          className="collateral-page-buttons"
        >
          <button
            aria-label="Trang trước"
            title="Trang trước"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="collateral-current-page" aria-current="page">
            {currentPage}
          </span>
          <button
            aria-label="Trang sau"
            title="Trang sau"
            disabled={currentPage === pageCount}
            onClick={() => setPage(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </nav>
        <span className="sr-only" role="status">
          {filtered.length} tài sản, trang {currentPage} trên {pageCount}
        </span>
      </footer>
    </section>
  );
}
