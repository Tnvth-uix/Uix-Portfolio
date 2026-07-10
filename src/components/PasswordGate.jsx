"use client";

import { useEffect, useState } from "react";
import Particles from "./Particles";
import { useAuth } from "../contexts/AuthContext";

const PASSWORDS = {
  "SomosLosMejoresUIX": "viewer",
  "Esundemo1": "admin",
};

export default function PasswordGate({ children }) {
  const { mode, setAuthMode, isLoading } = useAuth();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  if (isLoading) return null;
  if (mode) return children;

  const submit = (e) => {
    e.preventDefault();
    const detectedMode = PASSWORDS[value];
    if (detectedMode) {
      setAuthMode(detectedMode);
    } else {
      setError(true);
    }
  };

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
