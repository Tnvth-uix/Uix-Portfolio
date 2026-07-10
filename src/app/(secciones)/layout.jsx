import Sidebar from "../../components/common/Sidebar";

export default function SeccionesLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">{children}</div>
    </div>
  );
}
