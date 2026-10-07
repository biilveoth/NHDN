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
export default function ProductSummary() {
  return (
    <section className="summary-grid" aria-label="Tổng quan sản phẩm dịch vụ">
      {summaries.map((item) => {
        const Icon = icons[item.icon];
        return (
          <article className="summary-card" key={item.title}>
            <div className={`summary-icon summary-icon--${item.icon}`}>
              <Icon size={30} strokeWidth={1.7} aria-hidden="true" />
            </div>
            <div className="summary-content">
              <div className="summary-heading">
                <span className="summary-count">{item.count}</span>
                <h2>{item.title}</h2>
              </div>
              {item.status ? (
                <StatusBadge value={item.value} />
              ) : (
                <p>
                  {item.value}
                  {item.note && <em>{item.note}</em>}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
