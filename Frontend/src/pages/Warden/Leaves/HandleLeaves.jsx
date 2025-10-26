import { useEffect, useState, useRef } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";

export default function HandleLeaves() {
  const [leaves, setLeaves] = useState([]);
  const intervalRef = useRef(null);

  // Fetch leaves initially and auto-refresh every 5s
  useEffect(() => {
    fetchLeaves();

    intervalRef.current = setInterval(fetchLeaves, 5000);
    return () => clearInterval(intervalRef.current);
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
      // Refresh from backend to get accurate full_name + updated data
      await fetchLeaves();
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
      timeZone: "Asia/Kolkata",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "text-green-400";
      case "REJECTED":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen p-8">
        <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
              Leave Requests
            </h1>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-200 border border-gray-700 rounded-xl">
              <thead className="bg-gray-700 text-gray-100">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-600">Student</th>
                  <th className="px-4 py-3 border-b border-gray-600">Start Date</th>
                  <th className="px-4 py-3 border-b border-gray-600">End Date</th>
                  <th className="px-4 py-3 border-b border-gray-600">Reason</th>
                  <th className="px-4 py-3 border-b border-gray-600">Status</th>
                  <th className="px-4 py-3 border-b border-gray-600">Applied At</th>
                  <th className="px-4 py-3 border-b border-gray-600 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {leaves.length > 0 ? (
                  leaves.map((l) => (
                    <tr
                      key={l.id}
                      className="hover:bg-gray-700 transition-all cursor-pointer"
                    >
                      <td className="px-4 py-3 border-b border-gray-600">
                        {l.student?.full_name ||
                          `${l.student?.first_name || ""} ${l.student?.last_name || ""}`.trim() ||
                          l.student?.username ||
                          "-"}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-600">
                        {l.start_date}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-600">
                        {l.end_date}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-600">
                        {l.reason}
                      </td>
                      <td
                        className={`px-4 py-3 border-b border-gray-600 font-semibold ${getStatusColor(
                          l.status
                        )}`}
                      >
                        {l.status}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-600">
                        {formatDateTimeIST(l.applied_at)}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-600 text-center space-x-3">
                        {l.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => updateStatus(l.id, "APPROVED")}
                              className="bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(l.id, "REJECTED")}
                              className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-6 text-gray-400 italic"
                    >
                      No leave requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
