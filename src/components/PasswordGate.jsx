"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import Particles from "./Particles";
import { useAuth } from "../contexts/AuthContext";

const PASSWORDS = {
  SomosLosMejoresUIX: "viewer",
  Esundemo1: "admin",
};

const SPLASH_MS = 2400;
const SUCCESS_HOLD_MS = 700;
const EXIT_DURATION_MS = 900;
const LOGO_URL =
  "https://iytpfckxdikpqqzmstyp.supabase.co/storage/v1/object/public/business-case-images/logo.png";

export default function PasswordGate({ children }) {
  const { mode, setAuthMode, isLoading } = useAuth();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [phase, setPhase] = useState("splash"); // splash | form
  const [status, setStatus] = useState("idle"); // idle | success | exiting
  const [revealOrigin, setRevealOrigin] = useState(null);
  const buttonRef = useRef(null);
  const pendingModeRef = useRef(null);

  useEffect(() => {
    if (isLoading || mode) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("uix.splash.seen");

    if (reduced || seen) {
      setPhase("form");
      return;
    }

    const timer = window.setTimeout(() => {
      sessionStorage.setItem("uix.splash.seen", "1");
      setPhase("form");
    }, SPLASH_MS);

    return () => window.clearTimeout(timer);
  }, [isLoading, mode]);

  if (isLoading) return null;
  if (mode && status === "idle") return children;

  const submit = (e) => {
    e.preventDefault();
    if (status !== "idle" || phase !== "form") return;

    const detectedMode = PASSWORDS[value];
    if (!detectedMode) {
      setError(true);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setRevealOrigin({
        x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
        y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
      });
    }

    pendingModeRef.current = detectedMode;
    setError(false);
    setStatus("success");

    window.setTimeout(() => setStatus("exiting"), SUCCESS_HOLD_MS);
    window.setTimeout(() => {
      setAuthMode(pendingModeRef.current);
      setStatus("idle");
    }, SUCCESS_HOLD_MS + EXIT_DURATION_MS);
  };

  const revealing = status !== "idle";
  const showForm = phase === "form" || revealing;

  return (
    <>
      {revealing && children}
      <div
        className={`gate ${phase === "form" ? "gate-show-form" : ""} ${
          status !== "idle" ? `gate-${status}` : ""
        }`}
        style={
          revealOrigin
            ? { "--reveal-x": `${revealOrigin.x}%`, "--reveal-y": `${revealOrigin.y}%` }
            : undefined
        }
      >
        <Particles
          count={78}
          speed={3.2}
          size={1.7}
          particleOpacity={0.95}
          linkOpacity={0.42}
          linkDistance={160}
          glow
        />
        <div className="gate-blob" />
        <div className="gate-flash" aria-hidden="true" />

        {phase === "splash" && status === "idle" && (
          <div className="gate-splash" aria-hidden="true">
            <img src={LOGO_URL} alt="" className="gate-splash-logo" />
            <p className="gate-splash-brand">
              Portafolio <span className="grad-text">UiX</span>
            </p>
            <div className="gate-splash-bar">
              <span />
            </div>
          </div>
        )}

        {showForm && (
          <form
            className={`gate-card ${phase === "form" && status === "idle" ? "gate-card-in" : ""}`}
            onSubmit={submit}
          >
            <img src={LOGO_URL} alt="" className="gate-logo" />
            <h1>
              Portafolio <span className="grad-text">UiX</span>
            </h1>
            <p>
              {status === "idle"
                ? "Ingresa la contraseña para continuar."
                : "Acceso concedido"}
            </p>
            {status === "idle" && (
              <>
                <input
                  type="password"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setError(false);
                  }}
                  placeholder="Contraseña"
                  autoFocus={phase === "form"}
                />
                {error && <p className="gate-error">Contraseña incorrecta.</p>}
              </>
            )}
            <button
              ref={buttonRef}
              type="submit"
              className={`btn btn-grad gate-submit ${status !== "idle" ? "is-success" : ""}`}
              disabled={status !== "idle"}
            >
              {status === "idle" ? (
                "Entrar →"
              ) : (
                <span className="gate-check">
                  <Check size={22} strokeWidth={3} />
                </span>
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
