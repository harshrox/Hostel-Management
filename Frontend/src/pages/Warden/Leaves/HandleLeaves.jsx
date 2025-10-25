import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";

export default function WardenLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await api.get("/leaves/leaves/");
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/leaves/leaves/${id}/`, { status });
      setLeaves(
        leaves.map((l) => (l.id === id ? { ...l, status } : l))
      );
    } catch (err) {
      console.error("Error updating leave:", err);
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
          <h1 className="text-2xl font-semibold mb-6">Leaves</h1>

          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Student</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Reason</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Applied At</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{l.student.username}</td>
                  <td className="px-4 py-2 border">{l.start_date}</td>
                  <td className="px-4 py-2 border">{l.end_date}</td>
                  <td className="px-4 py-2 border">{l.reason}</td>
                  <td className="px-4 py-2 border">{l.status}</td>
                  <td className="px-4 py-2 border">{formatDateTimeIST(l.applied_at)}</td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    {l.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => updateStatus(l.id, "APPROVED")}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(l.id, "REJECTED")}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {leaves.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-6">
                    No leaves found
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
