import { useCallback, useId, useState } from "react";
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
  },
  {
    type: "lc",
    title: "LC & TTQT",
    columns: lcColumns,
    rows: lcRows,
  },
  {
    type: "digital",
    title: "Kênh số",
    columns: digitalColumns,
    rows: digitalRows,
  },
];

export default function ProductsPage() {
  const [selectedType, setSelectedType] = useState("deposits");
  const detailsId = useId();
  const [details, setDetails] = useState(null);
  const closeDetails = useCallback(() => setDetails(null), []);
  return (
    <section aria-label="Sản phẩm dịch vụ">
      <ProductSummary
        selectedType={selectedType}
        onSelect={setSelectedType}
        detailsId={detailsId}
      />
      <div className="product-sections" id={detailsId}>
        {sections.filter((section) => section.type === selectedType).map((section) => {
          const openRecord = (row, group) =>
            setDetails(getContractDetails(section.type, row, group));
          return (
            <ProductSection
              key={section.type}
              title={section.title}
              defaultOpen
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
