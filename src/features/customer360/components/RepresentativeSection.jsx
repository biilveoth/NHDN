import { useId, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import DataTable from "../../../components/DataTable";
import { representativeColumns } from "../data/representatives";

export default function RepresentativeSection({ group }) {
  const [expanded, setExpanded] = useState(true);
  const bodyId = useId();
  return (
    <section className="representative-section" aria-label={group.title}>
      <h2 className="representative-heading">
        <button
          className="section-title"
          aria-expanded={expanded}
          aria-controls={bodyId}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <span>{group.title}</span>
        </button>
      </h2>
      <div id={bodyId} hidden={!expanded} className="representative-table">
        <DataTable
          columns={representativeColumns}
          rows={group.rows}
          label={group.title}
        />
      </div>
    </section>
  );
}
