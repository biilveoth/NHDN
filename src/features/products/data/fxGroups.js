import { fxRows } from "./products";

const forwardRows = [
  [
    "FXFW261001001",
    "USD",
    "2,000,000.00",
    "49,200,000,000",
    "492,000,000",
    "01/10/2026",
    "06/10/2026",
  ],
  [
    "FXFW261002002",
    "EUR",
    "1,000,000.00",
    "32,800,000,000",
    "328,000,000",
    "02/10/2026",
    "06/10/2026",
  ],
];
const swapRows = [
  [
    "FXSW261003001",
    "USD",
    "3,000,000.00",
    "73,800,000,000",
    "738,000,000",
    "03/10/2026",
    "06/10/2026",
  ],
  [
    "FXSW261005002",
    "JPY",
    "100,000,000.00",
    "17,000,000,000",
    "170,000,000",
    "05/10/2026",
    "06/10/2026",
  ],
];

export const fxGroups = [
  ["SP", fxRows],
  ["FW", forwardRows],
  ["SW", swapRows],
].map(([title, rows]) => ({
  title,
  total: rows
    .reduce((sum, row) => sum + Number(row[3].replaceAll(",", "")), 0)
    .toLocaleString("en-US"),
  rows,
}));
