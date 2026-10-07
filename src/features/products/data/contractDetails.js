import { fxDetailsById } from "./fxDetails";
import { lcDetailsById } from "./lcDetails";

const customer = [
  ["Mã khách hàng", "899198198"],
  ["Tên khách hàng", "CONG TY CO PHAN CHUNG KHOAN LPS"],
];
const rm = "T673-Huỳnh Gia Ngọc";
const money = (value, currency = "VND") =>
  `${Number(value.replaceAll(",", "")).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${currency})`;
const date = (value) =>
  value ? `${value.split("/").reverse().join("-")} 00:00:00.0` : "";
const managers = [
  ["CN phát hành", ""],
  ["RM quản lý", rm],
  ["RM chốt hợp đồng", rm],
];

export function getContractDetails(type, row, group) {
  if (type === "deposits") {
    const account = group.title.includes("1001");
    const certificate = group.title.includes("6552");
    const title = account
      ? "1001-TAI KHOAN THANH TOAN"
      : certificate
        ? "6552-CHUNG CHI TIEN GUI"
        : "6517-HDTG TRA LAI SAU";
    const fields = [
      ...customer,
      [account ? "Số tài khoản" : "Số tài khoản/hợp đồng/số sổ", row[1]],
      [
        account ? "Trạng thái" : "Loại tiết kiệm",
        account
          ? "Hoạt động"
          : certificate
            ? "CHUNG CHI TIEN GUI"
            : "HDTG TRA LAI SAU",
      ],
      ["Tiền tệ", row[2]],
      ["Số dư nguyên tệ", money(row[3], row[2])],
      ["Số dư quy đổi", money(row[4])],
      ["Số dư đầu ngày", money(account ? row[3] : "0")],
    ];
    if (account)
      fields.push(
        ["Ngày mở", row[5].split("/").reverse().join("")],
        ...managers,
      );
    else
      fields.push(
        ["Lãi suất (%)", certificate ? "9.10" : "8.90"],
        ["Kỳ hạn", certificate ? "" : "0256D"],
        ["Lãi dự chi", money("0")],
        ["Ngày mở", date(row[5])],
        ["Ngày đáo hạn", date(row[6])],
        ...managers,
      );
    return { title, fields };
  }
  if (type === "credit")
    return {
      title: `${row[1]} - Tín dụng`,
      fields: [
        ...customer,
        ["Số tài khoản", row[1]],
        ["Trạng thái", "Đang hoạt động"],
        ["Tiền tệ", row[2]],
        ["Số dư", money(row[3], row[2])],
        ["Kỳ hạn", "12 tháng"],
        ["Lãi suất", "8.5%/năm"],
        ["Ngày vay", date(row[5])],
        ["Ngày đáo hạn", date(row[6])],
        ["Ngày gia hạn", ""],
        ["Số dư gốc", money("1500000000")],
        ["Lãi dự thu", money("30000000")],
        ["Tài sản đảm bảo", "Bất động sản - Quyền sử dụng đất"],
        ["Nhóm nợ", "Nhóm 1"],
        ["Mục đích vay", "Bổ sung vốn lưu động"],
        ["CN vay", "CN Sở giao dịch LPBank"],
        ["RM quản lý", rm],
        ["RM chốt hợp đồng", rm],
      ],
    };
  if (type === "guarantee")
    return {
      title: "Bảo lãnh",
      fields: [
        ...customer,
        ["Số tài khoản/hợp đồng", row[1]],
        ["Tiền tệ", row[2]],
        ["Số dư nguyên tệ", money(row[3], row[2])],
        ["Ngày mở", date(row[5])],
        ["Ngày hiệu lực", row[5].split("/").reverse().join("")],
        ["Ngày đáo hạn", date(row[6])],
        ["Mã người thụ hưởng", ""],
        ["Tên người thụ hưởng", "NGAN HANG TMCP QUAN DOI CN SGD 1"],
        ["Phí bảo lãnh", money("0")],
        ["Ký quỹ", "Không"],
        ["Số tiền ký quỹ", money("0")],
        ["Tỷ lệ ký quỹ (%)", ""],
        ["CN phát hành", ""],
        ["Chế độ tất toán", "SEMI-AUTOMATIC"],
        ["Tự động đáo hạn", "Có"],
        ["RM quản lý", rm],
        ["RM chốt hợp đồng", rm],
      ],
    };
  if (type === "fx") {
    const deal = fxDetailsById[row[0]];
    const volume = Number(row[3].replaceAll(",", ""));
    const profit = Number(row[4].replaceAll(",", ""));
    const margin =
      volume > 0 ? `${((profit / volume) * 100).toFixed(2)}%` : "---";
    return {
      title: `${row[0]} - FX`,
      fields: [
        ["Mã khách hàng", customer[0][1]],
        ["Tên khách hàng", deal?.customerName ?? customer[1][1]],
        ["Mã giao dịch", row[0]],
        ["Trạng thái", deal?.status ?? "---"],
        ["Tiền tệ", row[1]],
        ["Số tiền nguyên tệ", money(row[2], row[1])],
        ["Doanh số quy đổi VNĐ", money(row[3])],
        [
          "Doanh số quy đổi USD",
          deal?.usdVolume ? money(deal.usdVolume, "USD") : "---",
        ],
        ["Lợi nhuận", money(row[4])],
        ["Margin", margin],
        [
          "Giao dịch đảo ngược",
          deal?.reversed == null ? "---" : deal.reversed ? "True" : "False",
        ],
        ["Sản phẩm", deal?.product ?? "---"],
        ["Ngày deal", date(row[5])],
        ["RM quản lý", rm],
      ],
    };
  }
  const contract = lcDetailsById[row[0]];
  return {
    title: `${row[0]} - LC & TTQT`,
    fields: [
      ["Mã khách hàng", customer[0][1]],
      ["Tên khách hàng", contract?.customerName ?? customer[1][1]],
      ["Mã hợp đồng", row[0]],
      ["Trạng thái", contract?.status ?? "--"],
      ["Tiền tệ", row[1]],
      ["Nghiệp vụ", contract?.operation ?? "--"],
      ["Loại LC", contract?.lcType ?? "--"],
      ["Ngày phát hành", date(row[4])],
      ["Ngày hết hạn", contract?.expiresAt ? date(contract.expiresAt) : "--"],
      ["Ngày đóng", contract?.closedAt ? date(contract.closedAt) : "--"],
      ["Doanh số", money(row[2], contract?.turnoverUnit ?? row[1])],
      ["Phí", money(row[3])],
      ["RM quản lý", rm],
    ],
  };
}
