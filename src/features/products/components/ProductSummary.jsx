import {
  Banknote,
  ChartNoAxesCombined,
  Coins,
  Files,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import StatusBadge from "../../../components/StatusBadge";
import { summaries } from "../data/products";
const icons = {
  coins: Coins,
  credit: Banknote,
  shield: ShieldCheck,
  doc: Files,
  chart: ChartNoAxesCombined,
  phone: Smartphone,
};
export default function ProductSummary({ selectedType, onSelect, detailsId }) {
  return (
    <section className="summary-grid" aria-label="Tổng quan sản phẩm dịch vụ">
      {summaries.map((item) => {
        const Icon = icons[item.icon];
        return (
          <button
            type="button"
            className={`summary-card${selectedType === item.type ? " is-selected" : ""}`}
            key={item.type}
            aria-pressed={selectedType === item.type}
            aria-controls={detailsId}
            onClick={() => onSelect(item.type)}
          >
            <span className={`summary-icon summary-icon--${item.icon}`}>
              <Icon size={30} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <span className="summary-content">
              <span className="summary-heading">
                <span className="summary-count">{item.count}</span>
                <span className="summary-title">{item.title}</span>
              </span>
              {item.status ? (
                <StatusBadge value={item.value} />
              ) : (
                <span className="summary-value">
                  {item.value}
                  {item.note && <em>{item.note}</em>}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </section>
  );
}
