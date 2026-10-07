import { useRef, useState } from "react";
import RepresentativeSection from "./components/RepresentativeSection";
import BusinessInformation from "./components/BusinessInformation";
import { representativeGroups } from "./data/representatives";
import "./CustomerOverviewPage.css";

const tabs = [
  { id: "representatives", label: "Thông tin đại diện hợp pháp" },
  { id: "business", label: "Thông tin kinh doanh" },
];

export default function CustomerOverviewPage() {
  const [activeTab, setActiveTab] = useState("representatives");
  const tabRefs = useRef([]);
  function handleKeyDown(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setActiveTab(tabs[next].id);
      tabRefs.current[next].focus();
    }
  }
  return (
    <section className="customer-overview" aria-label="Thông tin 360">
      <div role="tablist" aria-label="Thông tin 360" className="overview-tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`overview-tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`overview-panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            className={`overview-tab nav-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id="overview-panel-representatives"
        role="tabpanel"
        aria-labelledby="overview-tab-representatives"
        hidden={activeTab !== "representatives"}
      >
        {representativeGroups.map((group) => (
          <RepresentativeSection key={group.id} group={group} />
        ))}
      </div>
      <div
        id="overview-panel-business"
        role="tabpanel"
        aria-labelledby="overview-tab-business"
        hidden={activeTab !== "business"}
      >
        <BusinessInformation />
      </div>
    </section>
  );
}
