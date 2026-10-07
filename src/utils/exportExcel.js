export async function exportExcel({ title, columns, rows, groups }) {
  const { default: ExcelJS } = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(
    title.replace(/[\\/*?:[\]]/g, "").slice(0, 31),
  );
  sheet.columns = columns.map((column) => ({
    header: column.label,
    key: column.key,
    width: Math.max(18, column.label.length + 4),
  }));
  sheet.views = [{ state: "frozen", ySplit: 1 }];
  function addRow(values) {
    sheet.addRow(
      values.map((value, index) => {
        if (typeof value === "number") return value;
        const key = columns[index].key;
        if (
          [
            "balance",
            "converted",
            "profit",
            "revenue",
            "count",
            "amount",
          ].includes(key)
        ) {
          return Number(
            key === "count"
              ? value.replaceAll(".", "")
              : value.replaceAll(",", ""),
          );
        }
        return value;
      }),
    );
  }
  if (groups) {
    groups.forEach((group) => {
      const heading = sheet.addRow([group.title]);
      const totalColumn =
        columns.findIndex((column) => column.key === "converted") + 1;
      sheet.mergeCells(heading.number, 1, heading.number, totalColumn - 1);
      heading.getCell(totalColumn).value = Number(
        group.total.replaceAll(",", ""),
      );
      heading.font = { bold: true, color: { argb: "FF245DFF" } };
      group.rows.forEach(addRow);
    });
  } else {
    rows.forEach(addRow);
  }
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFEDF3FF" },
  };
  columns.forEach((column, index) => {
    if (
      ["balance", "converted", "profit", "revenue", "count", "amount"].includes(
        column.key,
      )
    )
      sheet.getColumn(index + 1).numFmt = "#,##0.##";
  });
  const buffer = await workbook.xlsx.writeBuffer();
  const url = URL.createObjectURL(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title}.xlsx`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
