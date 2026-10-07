import { useCallback, useState } from "react";
import ProductSummary from "./components/ProductSummary";
import GroupedProductTable from "./components/GroupedProductTable";
import ProductSection from "../../components/ProductSection";
import DataTable from "../../components/DataTable";
import RecordDetailsDialog from "../../components/RecordDetailsDialog";
import {
  depositGroups,
  creditRows,
  guaranteeRows,
  lcRows,
  digitalRows,
} from "./data/products";
import {
  depositColumns,
  fxColumns,
  lcColumns,
  digitalColumns,
} from "./data/columns";
import { getContractDetails } from "./data/contractDetails";
import { exportExcel } from "../../utils/exportExcel";
import { fxGroups } from "./data/fxGroups";

const sections = [
  {
    type: "deposits",
    title: "Huy động vốn",
    groups: depositGroups,
    columns: depositColumns,
    defaultOpen: true,
  },
  {
    type: "credit",
    title: "Tín dụng",
    rows: creditRows,
    columns: depositColumns,
  },
  {
    type: "guarantee",
    title: "Bảo lãnh",
    rows: guaranteeRows,
    columns: depositColumns,
  },
  {
    type: "fx",
    title: "FX",
    columns: fxColumns,
    groups: fxGroups,
    defaultOpen: true,
  },
  {
    type: "lc",
    title: "LC & TTQT",
    columns: lcColumns,
    rows: lcRows,
    defaultOpen: true,
  },
  {
    type: "digital",
    title: "Kênh số",
    columns: digitalColumns,
    rows: digitalRows,
    defaultOpen: true,
  },
];

export default function ProductsPage() {
  const [details, setDetails] = useState(null);
  const closeDetails = useCallback(() => setDetails(null), []);
  return (
    <section aria-label="Sản phẩm dịch vụ">
      <ProductSummary />
      <div className="product-sections">
        {sections.map((section) => {
          const openRecord = (row, group) =>
            setDetails(getContractDetails(section.type, row, group));
          return (
            <ProductSection
              key={section.type}
              title={section.title}
              defaultOpen={section.defaultOpen}
              onExport={() => exportExcel(section)}
            >
              {section.groups ? (
                <GroupedProductTable
                  groups={section.groups}
                  columns={section.columns}
                  label={section.title}
                  onOpenRecord={openRecord}
                />
              ) : (
                <DataTable
                  columns={section.columns}
                  rows={section.rows}
                  label={section.title}
                  onOpenRecord={
                    section.type === "digital" ? undefined : openRecord
                  }
                />
              )}
            </ProductSection>
          );
        })}
      </div>
      {details && (
        <RecordDetailsDialog details={details} onClose={closeDetails} />
      )}
    </section>
  );
}
