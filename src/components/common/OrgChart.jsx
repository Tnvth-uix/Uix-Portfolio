export default function OrgChart({ lead, reports }) {
  return (
    <div className="org-chart">
      <div className="org-node org-node-lead">
        <div className="org-avatar">{initials(lead.name)}</div>
        <div className="org-name">{lead.name}</div>
        <div className="org-role">{lead.role}</div>
        {!lead.cv && <div className="org-pending">CV próximamente</div>}
      </div>

      <div className="org-connector" aria-hidden="true" />

      <div className="org-row">
        {reports.map((m) => (
          <div className="org-node" key={m.name}>
            <div className="org-avatar org-avatar-sm">{initials(m.name)}</div>
            <div className="org-name">{m.name}</div>
            <div className="org-role">{m.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
