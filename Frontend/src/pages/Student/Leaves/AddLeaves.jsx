import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";

export default function AddLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) return;

    try {
      await api.post("/leaves/leaves/", { start_date: startDate, end_date: endDate, reason });
      setStartDate("");
      setEndDate("");
      setReason("");
      fetchLeaves();
    } catch (err) {
      console.error("Error applying leave:", err.response?.data || err);
      setError("Failed to apply leave");
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
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-2xl">
          {/* Header */}
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6 text-center">
            Apply for Leave
          </h1>

          {/* Leave Form */}
          <div className="bg-gray-900 p-6 rounded-2xl mb-6 shadow-inner">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-200">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-200">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-200">Reason</label>
                <textarea
                  placeholder="Reason for leave"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition cursor-pointer"
              >
                Apply Leave
              </button>
            </form>
          </div>

          {/* Leave List */}
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
                </tr>
              </thead>
              <tbody>
                {leaves.length > 0 ? (
                  leaves.map((l) => (
                    <tr
                      key={l.id}
                      className="hover:bg-gray-700 transition-all cursor-pointer"
                    >
                      <td className="px-4 py-3 border-b border-gray-600">{l.student?.username || "Me"}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{l.start_date}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{l.end_date}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{l.reason}</td>
                      <td className={`px-4 py-3 border-b border-gray-600 font-semibold ${getStatusColor(l.status)}`}>
                        {l.status}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-600">{formatDateTimeIST(l.applied_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-400 py-6 italic">
                      No leaves found.
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
