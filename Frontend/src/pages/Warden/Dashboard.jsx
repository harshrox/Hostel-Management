import Layout from "../../components/Layout/Layout";

export default function WardenDashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Warden Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition">
          <h2 className="text-lg font-semibold mb-2">👥 Manage Users</h2>
          <p className="text-gray-600">Add, update, or delete student and warden accounts.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow text-gray-400">
          <h2 className="text-lg font-semibold mb-2">🛏 Rooms Management</h2>
          <p>Coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}
