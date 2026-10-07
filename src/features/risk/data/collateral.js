const formatAmount = (value) => new Intl.NumberFormat("en-US").format(value);

export const collateralColumns = [
  { key: "assetId", label: "Mã tài sản", width: "8%" },
  { key: "group", label: "Nhóm tài sản", width: "12%" },
  { key: "type", label: "Loại tài sản", width: "12%" },
  {
    key: "amount",
    label: "Giá trị",
    width: "11%",
    align: "right",
    render: formatAmount,
  },
  { key: "currency", label: "Tiền tệ", width: "7%" },
  { key: "creditContract", label: "Mã hợp đồng tín dụng", width: "12%" },
  { key: "ratio", label: "Tỉ lệ đảm bảo (%)", width: "10%" },
  { key: "nextValuation", label: "Ngày định giá kế tiếp", width: "12%" },
  { key: "description", label: "Mô tả", width: "16%" },
];

export const collateralRows = [
  [
    "TSĐB001",
    "Bất động sản",
    "Quyền sử dụng đất",
    50000000000,
    "VND",
    "HD12345678",
    120,
    "2026-06-30",
    "Đất tại Q.1, TP.HCM",
  ],
  [
    "TSĐB002",
    "Bất động sản",
    "Nhà xưởng",
    80000000000,
    "VND",
    "HD12345678",
    150,
    "2026-08-15",
    "Nhà xưởng KCN Bình Dương",
  ],
  [
    "TSĐB003",
    "Phương tiện vận tải",
    "Ô tô",
    2500000000,
    "VND",
    "HD87654321",
    100,
    "2026-05-20",
    "Xe tải Hino 8 tấn",
  ],
  [
    "TSĐB004",
    "Máy móc thiết bị",
    "Dây chuyền sản xuất",
    10000000000,
    "VND",
    "HD87654321",
    110,
    "2026-07-10",
    "Dây chuyền sản xuất thực phẩm",
  ],
];

export function normalizeSearch(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLocaleLowerCase("vi")
    .trim();
}
