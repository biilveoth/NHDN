import { businessInformationColumns } from "../data/businessInformation";
import "./BusinessInformation.css";

export default function BusinessInformation() {
  return (
    <div className="business-information">
      {businessInformationColumns.map((fields, index) => (
        <dl className="business-information__column" key={index}>
          {fields.map((field) => (
            <div className="business-information__field" key={field.key}>
              <dt>{field.label}</dt>
              <dd>{field.value ?? "---"}</dd>
            </div>
          ))}
        </dl>
      ))}
    </div>
  );
}
