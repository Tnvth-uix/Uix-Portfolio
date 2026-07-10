"use client";

import { useEffect, useState } from "react";
import { getTaxonomySelection, toggleTaxonomyItem } from "../lib/store";
import { SERVICES, METHODOLOGIES, METHODS } from "../data/taxonomies";

const FIELDS = {
  services: SERVICES,
  methodologies: METHODOLOGIES,
  methods: METHODS,
};

const GROUPS = [
  { key: "services", label: "Tipo de servicios incluidos" },
  { key: "methodologies", label: "Metodologías utilizadas" },
  { key: "methods", label: "Métodos y técnicas utilizados" },
];

export default function TaxonomyBlock({ slug, raw, admin }) {
  const [selection, setSelection] = useState(null);
  const [editing, setEditing] = useState({});

  useEffect(() => {
    setSelection(getTaxonomySelection(slug, FIELDS, raw));
  }, [slug, raw]);

  if (!selection) return null;

  const toggle = (field, item) => {
    const next = toggleTaxonomyItem(slug, field, item);
    setSelection((prev) => ({ ...prev, [field]: next }));
  };

  return (
    <div className="tax-block">
      {GROUPS.map((g) => {
        const items = FIELDS[g.key];
        const sel = selection[g.key] || [];
        const isEditing = !!editing[g.key];
        const visible = isEditing ? items : items.filter((it) => sel.includes(it));

        return (
          <div className="tax-group" key={g.key}>
            <div className="tax-group-head">
              <h4>{g.label}</h4>
              {admin && (
                <button
                  type="button"
                  className="tax-edit-btn"
                  onClick={() => setEditing((p) => ({ ...p, [g.key]: !p[g.key] }))}
                >
                  {isEditing ? "Listo" : "Editar"}
                </button>
              )}
            </div>
            <div className="tax-chip-row">
              {visible.length === 0 && (
                <span className="tax-empty">Ninguno seleccionado todavía.</span>
              )}
              {visible.map((item) => {
                const active = sel.includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    className={`tax-chip ${active ? "active" : ""} ${
                      isEditing ? "editable" : ""
                    }`}
                    onClick={() => isEditing && toggle(g.key, item)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
