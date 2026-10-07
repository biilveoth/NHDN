export default function StatusBadge({ value }) {
  const tone =
    value === "Chưa đăng ký"
      ? "danger"
      : value === "Gói Business Plus"
        ? "info"
        : "success";
  return (
    <span className={`status status--${tone}`}>
      <i aria-hidden="true" />
      <span>{value}</span>
    </span>
  );
}
