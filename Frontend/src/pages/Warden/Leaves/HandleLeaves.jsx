import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";

export default function HandleLeaves() {
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
      setLeaves((prev) =>
        prev.map((leave) => (leave.id === id ? { ...leave, status } : leave))
      );
    } catch (err) {
      console.error("Error updating leave status:", err);
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-semibold mb-6">Student Leaves</h1>
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
              {leaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{leave.student.username}</td>
                  <td className="px-4 py-2 border">{leave.start_date}</td>
                  <td className="px-4 py-2 border">{leave.end_date}</td>
                  <td className="px-4 py-2 border">{leave.reason}</td>
                  <td className="px-4 py-2 border">{leave.status}</td>
                  <td className="px-4 py-2 border">{new Date(leave.applied_at).toLocaleString()}</td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    {leave.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => updateStatus(leave.id, "APPROVED")}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(leave.id, "REJECTED")}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
                    No leave requests found
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
