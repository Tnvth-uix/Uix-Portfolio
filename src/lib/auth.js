const ADMIN_PASSWORD = "Esundemo1";
const VIEWER_PASSWORD = "SomosLosMejoresUIX";
const ROLE_KEY = "uix.role.v1";

export function resolveRole(password) {
  if (password === ADMIN_PASSWORD) return "admin";
  if (password === VIEWER_PASSWORD) return "viewer";
  return null;
}

export function getRole() {
  if (typeof window === "undefined") return null;
  const role = sessionStorage.getItem(ROLE_KEY);
  return role === "admin" || role === "viewer" ? role : null;
}

export function setRole(role) {
  sessionStorage.setItem(ROLE_KEY, role);
}

export function isAdmin() {
  return getRole() === "admin";
}
