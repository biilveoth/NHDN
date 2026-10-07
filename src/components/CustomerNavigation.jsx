import {
  customerTabs,
  availableCustomerPages,
} from "../data/customerNavigation";
export default function CustomerNavigation({ activePage, onNavigate }) {
  return (
    <nav className="customer-nav" aria-label="Thông tin khách hàng">
      {customerTabs.map(({ id, label }) => (
        <button
          key={id}
          className={`nav-item nav-tab ${id === activePage ? "is-active active" : ""}`}
          aria-current={id === activePage ? "page" : undefined}
          disabled={!availableCustomerPages.includes(id)}
          onClick={() => onNavigate(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
