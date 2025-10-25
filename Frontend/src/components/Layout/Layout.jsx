import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
