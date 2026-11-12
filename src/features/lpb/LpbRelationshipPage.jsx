import { useRef, useState } from "react";
import { FileDown, LoaderCircle } from "lucide-react";
import IndicatorTable from "./components/IndicatorTable";
import { relationshipTabs, businessColumns, businessGroups, incomeColumns, incomeGroups, incomeExportRows } from "./data/relationship";
import { exportExcel } from "../../utils/exportExcel";
import "./LpbRelationshipPage.css";

export default function LpbRelationshipPage() {
  const [tab, setTab] = useState("business");
  const [exporting, setExporting] = useState(false);
  const [status, setStatus] = useState("");
  const tabRefs = useRef({});
  function handleKey(event) {
    const enabled = relationshipTabs.filter((item) => !item.disabled);
    const index = enabled.findIndex((item) => item.id === tab);
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % enabled.length;
    if (event.key === "ArrowLeft") next = (index + enabled.length - 1) % enabled.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = enabled.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setTab(enabled[next].id);
    tabRefs.current[enabled[next].id].focus();
  }
  async function handleExport() {
    setExporting(true);
    setStatus("");
    try {
      await exportExcel({ title: "Thu nhập chi phí", columns: incomeColumns, rows: incomeExportRows });
      setStatus("Đã xuất Excel");
    } catch {
      setStatus("Không thể xuất Excel. Vui lòng thử lại.");
    } finally {
      setExporting(false);
    }
  }
  return (
    <section className="lpb-page" aria-label="Tình hình quan hệ tại LPB">
      <div className="lpb-tabs" role="tablist" aria-label="Tình hình quan hệ tại LPB">
        {relationshipTabs.map((item) => (
          <button key={item.id} ref={(element) => { tabRefs.current[item.id] = element; }}
            id={`lpb-tab-${item.id}`} role="tab" className={`nav-tab lpb-tab ${tab === item.id ? "active" : ""}`}
            aria-selected={tab === item.id} aria-controls={item.disabled ? undefined : `lpb-panel-${item.id}`}
            tabIndex={tab === item.id ? 0 : -1} disabled={item.disabled}
            onClick={() => setTab(item.id)} onKeyDown={handleKey}>
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="lpb-panel-business" aria-labelledby="lpb-tab-business" hidden={tab !== "business"}>
        <h2 className="section-title lpb-title">Tình hình kinh doanh</h2>
        <div className="lpb-business-table">
          <IndicatorTable columns={businessColumns} groups={businessGroups} label="Tình hình kinh doanh" />
        </div>
      </div>
      <div role="tabpanel" id="lpb-panel-income" aria-labelledby="lpb-tab-income" hidden={tab !== "income"}>
        <div className="lpb-toolbar">
          <span role="status">{status}</span>
          <button className="export-button" aria-label="Export Excel - Thu nhập chi phí" title="Xuất Excel" disabled={exporting} onClick={handleExport}>
            {exporting ? <LoaderCircle className="spin" size={15} /> : <FileDown size={15} />}
          </button>
        </div>
        <IndicatorTable columns={incomeColumns} groups={incomeGroups} label="Thu nhập chi phí" defaultExpanded />
      </div>
    </section>
  );
}
