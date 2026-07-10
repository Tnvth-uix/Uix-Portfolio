"use client";

import { useEffect, useState } from "react";

const PASSWORD = "SomosLosMejoresUIX";
const KEY = "uix.authed.v1";

export default function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(null); // null = still checking
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(KEY) === "1");
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(KEY, "1");
      setAuthed(true);
    } else {
      setError(true);
    }
  };

  if (authed === null) return null;
  if (authed) return children;

  return (
    <div className="gate">
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
