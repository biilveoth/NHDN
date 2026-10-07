import { Fragment, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DataTable from "../../../components/DataTable";
import ContractLink from "../../../components/ContractLink";
export default function GroupedProductTable({
  groups,
  columns,
  label,
  onOpenRecord,
}) {
  const totalIndex = columns.findIndex((column) => column.key === "converted");
  const contractIndex = columns.findIndex(
    (column) => column.key === "contract",
  );
  const [expanded, setExpanded] = useState(() =>
    groups.filter((g) => !g.title.includes("6552")).map((g) => g.title),
  );
  function toggle(title) {
    setExpanded((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  }
  return (
    <DataTable columns={columns} label={label}>
      {groups.map((group) => {
        const open = expanded.includes(group.title);
        return (
          <Fragment key={group.title}>
            <tr className="deposit-group">
              <th scope="row" colSpan={totalIndex}>
                <span className="product-group-label">
                  <button
                    className="group-toggle"
                    aria-label={group.title}
                    aria-expanded={open}
                    onClick={() => toggle(group.title)}
                  >
                    {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  <span>{group.title}</span>
                </span>
              </th>
              <td className="right group-total">{group.total}</td>
              <td colSpan={columns.length - totalIndex - 1} />
            </tr>
            {open &&
              group.rows.map((row) => (
                <tr
                  key={row[contractIndex]}
                  onDoubleClick={() => onOpenRecord(row, group)}
                >
                  {row.map((value, i) => (
                    <td
                      key={columns[i].key}
                      className={`table-cell ${columns[i].align}`}
                    >
                      {i === contractIndex ? (
                        <ContractLink
                          contract={value}
                          onOpen={() => onOpenRecord(row, group)}
                        />
                      ) : columns[i].render ? (
                        columns[i].render(value)
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            {open && !group.rows.length && (
              <tr>
                <td colSpan={columns.length} className="empty-state">
                  Chưa có dữ liệu
                </td>
              </tr>
            )}
          </Fragment>
        );
      })}
    </DataTable>
  );
}
