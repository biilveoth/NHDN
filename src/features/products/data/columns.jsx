import StatusBadge from "../../../components/StatusBadge";
const c = (key, label, width, align = "") => ({ key, label, width, align });
export const depositColumns = [
  c("index", "STT", "4%", "center"),
  c("contract", "Số hợp đồng", "15%"),
  c("currency", "Loại tiền tệ", "10%"),
  c("balance", "Số dư nguyên tệ", "19%", "right"),
  c("converted", "Số dư quy đổi (VNĐ)", "15%", "right"),
  c("opened", "Ngày mở", "13%", "center"),
  c("maturity", "Ngày đáo hạn", "13%", "center"),
  c("date", "Ngày dữ liệu", "11%", "center"),
];
export const fxColumns = [
  c("contract", "Số hợp đồng", "14%"),
  c("currency", "Loại tiền tệ", "10%"),
  c("balance", "Số dư nguyên tệ", "13%", "right"),
  c("converted", "Số dư quy đổi (VNĐ)", "16%", "right"),
  c("profit", "Lợi nhuận", "17%", "right"),
  c("transactionDate", "Ngày thực hiện giao dịch", "20%", "center"),
  c("date", "Ngày dữ liệu", "10%", "center"),
];
export const lcColumns = [
  c("contract", "Số hợp đồng", "14%"),
  c("currency", "Loại tiền tệ", "10%"),
  c("balance", "Số dư nguyên tệ", "13%", "right"),
  c("revenue", "Doanh thu", "23%", "right"),
  c("transactionDate", "Ngày thực hiện giao dịch", "30%", "center"),
  c("date", "Ngày dữ liệu", "10%", "center"),
];
export const digitalColumns = [
  c("service", "Dịch vụ", "24%"),
  {
    ...c("status", "Trạng thái", "22%"),
    render: (value) => <StatusBadge value={value} />,
  },
  c("count", "Số lượng GD (LK tháng)", "24%", "right"),
  c("amount", "Giá trị GD (LK tháng)", "30%", "right"),
];
