"use client";

import { useEffect, useState } from "react";
import Particles from "./Particles";
import { getRole, resolveRole, setRole } from "../lib/auth";

export default function PasswordGate({ children }) {
  const [role, setRoleState] = useState(undefined); // undefined = still checking
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setRoleState(getRole());
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const next = resolveRole(value);
    if (next) {
      setRole(next);
      setRoleState(next);
    } else {
      setError(true);
    }
  };

  if (role === undefined) return null;
  if (role) return children;

  return (
    <div className="gate">
      <Particles count={40} />
      <div className="gate-blob" />
      <form className="gate-card" onSubmit={submit}>
        <img src="/logo.png" alt="" className="gate-logo" />
        <h1>
          Business <span className="grad-text">Cases</span>
        </h1>
        <p>Ingresa la contraseña para continuar.</p>
        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Contraseña"
          autoFocus
        />
        {error && <p className="gate-error">Contraseña incorrecta.</p>}
        <button type="submit" className="btn btn-grad">
          Entrar →
        </button>
      </form>
    </div>
  );
}
