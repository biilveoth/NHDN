import CollateralTable from "./components/CollateralTable";
import "./RiskManagementPage.css";

const tabs = [
  "Tài sản đảm bảo",
  "Xếp hạng tín dụng",
  "Mô hình cảnh báo sớm",
  "Hệ số rủi ro tín dụng",
];

export default function RiskManagementPage() {
  return (
    <section className="risk-management" aria-label="Quản trị rủi ro">
      <div className="risk-tabs" role="tablist" aria-label="Quản trị rủi ro">
        {tabs.map((label, index) => (
          <button
            key={label}
            id={index === 0 ? "risk-tab-collateral" : undefined}
            role="tab"
            className={`nav-tab risk-tab ${index === 0 ? "active" : ""}`}
            aria-selected={index === 0}
            aria-controls={index === 0 ? "risk-panel-collateral" : undefined}
            disabled={index !== 0}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="risk-panel-collateral"
        aria-labelledby="risk-tab-collateral"
      >
        <CollateralTable />
      </div>
    </section>
  );
}
