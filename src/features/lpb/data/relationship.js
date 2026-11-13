export const relationshipTabs = [
  { id: "business", label: "Tình hình kinh doanh" },
  { id: "income", label: "Thu nhập chi phí" },
  { id: "development", label: "Tình hình khai thác khách hàng", disabled: true },
  { id: "portfolio", label: "Quản trị danh mục", disabled: true },
];

export const businessColumns = [
  { key: "indicator", label: "Chỉ tiêu", width: "50%" },
  { key: "snapshot", label: "11/11/2026", width: "50%", align: "center" },
];

const businessDefinitions = [
  { id: "customer", title: "A. KHÁCH HÀNG", children: ["Trạng thái khách hàng", "Đối tượng khách hàng"] },
  { id: "credit", title: "B. DƯ NỢ", children: [
    "Dư nợ trung-dài hạn bình quân (VND)",
    "Dư nợ ngắn hạn bình quân (VND)",
    "Tổng giá trị cho vay đã cấp (VND)",
    "Tỷ lệ khai thác giá trị cho vay đã cấp (%)",
    "Lãi suất cho vay trung dài hạn BQ (%)",
    "Lãi suất cho vay ngắn hạn BQ (%)",
  ] },
  { id: "deposits", title: "C. HUY ĐỘNG", children: [
    "Dư tiền gửi CKH bình quân (VND)", "Dư CASA bình quân (VND)", "Tỷ trọng CASA/tổng HĐV (%)",
  ] },
  { id: "guarantee", title: "D. BẢO LÃNH", children: [
    "Dư bảo lãnh bình quân (VND)", "Tổng giá trị bảo lãnh đã cấp (VND)",
    "Tỷ lệ khai thác giá trị bảo lãnh đã cấp (%)", "Doanh số bảo lãnh (VND)",
  ] },
  { id: "trade", title: "E. TÀI TRỢ THƯƠNG MẠI", children: ["Doanh số mua bán ngoại tệ (USD)"] },
  { id: "services", title: "F. SẢN PHẨM DỊCH VỤ", children: [
    "Số lượng sản phẩm cấp 4 sử dụng (VND)", "Tần suất giao dịch chuyển tiền đi (VND)",
  ] },
];

export const incomeColumns = [
  { key: "indicator", label: "Chỉ tiêu", width: "30%" },
  { key: "last12", label: "12 tháng gần nhất", width: "14%", align: "center" },
  { key: "ytd", label: "LK trong năm", width: "14%", align: "center" },
  { key: "month", label: "Tháng gần nhất (T)", width: "14%", align: "center" },
  { key: "previousMonth", label: "Tháng T-1", width: "14%", align: "center" },
  { key: "sameMonthLastYear", label: "Tháng T-12", width: "14%", align: "center" },
];

const incomeDefinitions = [
  { id: "beforeRisk", title: "Doanh thu thuần trước rủi ro (đồng)" },
  { id: "afterRisk", title: "Doanh thu thuần sau rủi ro (đồng)" },
  { id: "toi", title: "TOI (%)", regular: true },
  { id: "creditIncome", title: "Thu tín dụng (đồng)", children: [
    "Thu lãi tín dụng (đồng)", "Chi lãi tín dụng MBV (tín dụng) (đồng)",
    "Thu tương tự lãi (đồng)", "Thu nhập trái phiếu (đồng)",
  ] },
  { id: "depositIncome", title: "Thu huy động vốn (đồng)", children: [
    "Thu lãi MBV HĐV (đồng)", "Chi lãi huy động HĐV (đồng)",
  ] },
  { id: "serviceIncome", title: "Thu dịch vụ (đồng)", children: [
    "Thu bảo lãnh (đồng)", "Thu TTQT (đồng)", "Thu khác (đồng)",
  ] },
  { id: "fxIncome", title: "Thu KDNT (đồng)" },
  { id: "otherIncome", title: "Thu bất thường (đồng)" },
];

// Illustrative data only; replace with customer API values when available.
const businessSamples = {
  customer: ["Đang hoạt động", "Khách hàng doanh nghiệp"],
  credit: [450_000_000_000, 750_000_000_000, 1_500_000_000_000, "80%", "8,5%", "7,2%"],
  deposits: [900_000_000_000, 300_000_000_000, "25%"],
  guarantee: [200_000_000_000, 500_000_000_000, "40%", 650_000_000_000],
  trade: [25_000_000],
  services: [7, "125 giao dịch/tháng"],
};

export const businessGroups = businessDefinitions.map((group) => ({
  ...group,
  children: group.children.map((title, index) => ({
    title,
    values: [businessSamples[group.id][index]],
  })),
}));

// Sample periods: trailing 12 months, year to date, T, T-1, T-12.
const periods = [1.08, 1, 0.08, 0.075, 0.065];
const amounts = (millions) => periods.map((factor) => Math.round(millions * factor * 1_000_000));
const incomeSamples = {
  creditIncome: [amounts(96_000), amounts(60_000), amounts(2_400), amounts(3_600)],
  depositIncome: [amounts(66_000), amounts(48_000)],
  serviceIncome: [amounts(4_800), amounts(3_600), amounts(1_200)],
};
const net = (rows, signs) => periods.map((_, index) =>
  rows.reduce((sum, row, rowIndex) => sum + row[index] * signs[rowIndex], 0),
);
const incomeTotals = {
  creditIncome: net(incomeSamples.creditIncome, [1, -1, 1, 1]),
  depositIncome: net(incomeSamples.depositIncome, [1, -1]),
  serviceIncome: net(incomeSamples.serviceIncome, [1, 1, 1]),
  fxIncome: amounts(6_000),
  otherIncome: amounts(400),
};
incomeTotals.beforeRisk = net(Object.values(incomeTotals), [1, 1, 1, 1, 1]);
incomeTotals.afterRisk = net([incomeTotals.beforeRisk, amounts(8_000)], [1, -1]);
incomeTotals.toi = ["2,92%", "2,85%", "2,76%", "2,70%", "2,55%"];

export const incomeGroups = incomeDefinitions.map((group) => ({
  ...group,
  ...(group.children ? {
    children: group.children.map((title, index) => ({ title, values: incomeSamples[group.id][index] })),
  } : { values: incomeTotals[group.id] }),
}));

export const incomeExportRows = incomeGroups.flatMap((group) => [
  [group.title, ...(group.values ?? Array(incomeColumns.length - 1).fill(""))],
  ...(group.children || []).map((row) => [row.title, ...row.values]),
]);
