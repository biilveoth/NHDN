import ContractLink from "./ContractLink";

export default function DataTable({
  columns,
  rows,
  children,
  label,
  onOpenRecord,
}) {
  return (
    <div className="table-scroll" tabIndex={0} aria-label={label}>
      <table className="data-table">
        <colgroup>
          {columns.map((c) => (
            <col key={c.key} style={{ width: c.width }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((c) => (
              <th scope="col" key={c.key} className={`table-header ${c.align}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children ||
            rows.map((row) => (
              <tr
                key={
                  row[
                    columns.findIndex((column) => column.key === "contract")
                  ] ?? row[0]
                }
                onDoubleClick={
                  onOpenRecord ? () => onOpenRecord(row) : undefined
                }
              >
                {columns.map((c, i) => (
                  <td className={`table-cell ${c.align}`} key={c.key}>
                    {c.key === "contract" && onOpenRecord ? (
                      <ContractLink
                        contract={row[i]}
                        onOpen={() => onOpenRecord(row)}
                      />
                    ) : c.render ? (
                      c.render(row[i])
                    ) : (
                      row[i]
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
