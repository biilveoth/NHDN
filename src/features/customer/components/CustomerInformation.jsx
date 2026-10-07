import { useId, useState } from "react";
import { customerInformationColumns } from "../data/customerInformation";
import "./CustomerInformation.css";

export default function CustomerInformation() {
  const [expanded, setExpanded] = useState(true);
  const id = useId();
  return (
    <section className="customer-information" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section-title">
        Thông tin khách hàng
      </h2>
      <div
        id={`${id}-fields`}
        className="customer-information__fields"
        hidden={!expanded}
      >
        {customerInformationColumns.map((fields, index) => (
          <dl key={index} className="customer-information__column">
            {fields.map((field) => (
              <div key={field.key} className="customer-information__field">
                <dt>{field.label}</dt>
                <dd>{field.value ?? "---"}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
      <div className="customer-information__actions">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`${id}-fields`}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Thu gọn" : "Mở rộng"}
        </button>
      </div>
    </section>
  );
}
