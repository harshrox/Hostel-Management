import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";

export default function HandleComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints/complaints/");
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/complaints/complaints/${id}/`, { status });
      setComplaints(
        complaints.map((c) => (c.id === id ? { ...c, status } : c))
      );
    } catch (err) {
      console.error("Error updating complaint:", err);
    }
  };

  const formatDateTimeIST = (datetime) => {
    if (!datetime) return "-";
    const date = new Date(datetime);
    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata", // ensures IST
    });
  };


  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-semibold mb-6">Complaints</h1>

          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Student</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Updated At</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{c.student.first_name + " " + c.student.last_name}</td>
                  <td className="px-4 py-2 border">{c.title}</td>
                  <td className="px-4 py-2 border">{c.description}</td>
                  <td className="px-4 py-2 border">{c.status}</td>
                  <td className="px-4 py-2 border">{formatDateTimeIST(c.created_at)}</td>
                  <td className="px-4 py-2 border">{formatDateTimeIST(c.updated_at)}</td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    {c.status !== "RESOLVED" && (
                      <>
                        <button
                          onClick={() => updateStatus(c.id, "IN_PROGRESS")}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => updateStatus(c.id, "RESOLVED")}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Resolve
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {complaints.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-6">
                    No complaints found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
