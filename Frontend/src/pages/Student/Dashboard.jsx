import Layout from "../../components/Layout/Layout";

export default function StudentDashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <p className="text-gray-600">
        Welcome! You can view your room allocation, leaves, and complaints here.
      </p>
    </Layout>
  );
}
