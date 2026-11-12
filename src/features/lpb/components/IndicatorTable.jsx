import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import DataTable from "../../../components/DataTable";

export default function IndicatorTable({ columns, groups, label, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(() => defaultExpanded ? groups.map((group) => group.id) : []);
  function toggle(id) {
    setExpanded((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  }
  const values = (rowValues = []) => columns.slice(1).map((column, index) => (
    <td key={column.key} className="table-cell center">{typeof rowValues[index] === "number" ? rowValues[index].toLocaleString("vi-VN") : (rowValues[index] ?? "---")}</td>
  ));
  return (
    <DataTable columns={columns} label={label}>
      {groups.map((group) => (
        <Fragment key={group.id}>
          <tr className={group.children ? "lpb-group" : "lpb-summary-row"}>
            {group.children ? (
              <>
              <th scope="row" colSpan={group.values ? 1 : columns.length}>
                <button className="lpb-group-toggle" aria-expanded={expanded.includes(group.id)} onClick={() => toggle(group.id)}>
                  <span className="lpb-chevron" aria-hidden="true">
                    {expanded.includes(group.id) ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  </span>
                  {group.title}
                </button>
              </th>
              {group.values && values(group.values)}
              </>
            ) : (
              <><th scope="row" className={group.regular ? "lpb-regular" : ""}>{group.title}</th>{values(group.values)}</>
            )}
          </tr>
          {group.children && expanded.includes(group.id) && group.children.map((row) => (
            <tr key={row.title} className="lpb-detail-row">
              <th scope="row">{row.title}</th>
              {values(row.values)}
            </tr>
          ))}
        </Fragment>
      ))}
    </DataTable>
  );
}
