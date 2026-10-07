import { useEffect, useState } from "react";
import CustomerNavigation from "./components/CustomerNavigation";
import CustomerInformation from "./features/customer/components/CustomerInformation";
import CustomerOverviewPage from "./features/customer360/CustomerOverviewPage";
import {
  availableCustomerPages,
  customerTabs,
} from "./data/customerNavigation";
import RiskManagementPage from "./features/risk/RiskManagementPage";
import ProductsPage from "./features/products/ProductsPage";
import "./App.css";

function readPage() {
  const page = window.location.hash.slice(1);
  return availableCustomerPages.includes(page) ? page : "overview";
}

export default function App() {
  const [page, setPage] = useState(readPage);
  useEffect(() => {
    const handleNavigation = () => setPage(readPage());
    window.addEventListener("hashchange", handleNavigation);
    return () => window.removeEventListener("hashchange", handleNavigation);
  }, []);
  useEffect(() => {
    document.title = `${customerTabs.find((tab) => tab.id === page).label} | SaleApp`;
  }, [page]);
  return (
    <main className="dashboard">
      <CustomerInformation />
      <CustomerNavigation
        activePage={page}
        onNavigate={(id) => {
          window.location.hash = id;
        }}
      />
      <div hidden={page !== "overview"}>
        <CustomerOverviewPage />
      </div>
      <div hidden={page !== "products"}>
        <ProductsPage />
      </div>
      <div hidden={page !== "risk"}>
        <RiskManagementPage />
      </div>
    </main>
  );
}
