import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";

export default function MyAllocations() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    try {
      const res = await api.get("/rooms/allocations/"); // fetch student's active allocations
      setAllocations(res.data);
    } catch (err) {
      console.error("Error fetching allocations:", err);
    }
  };

  const formatDateIST = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen p-8">
        <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-2xl">
          {/* Header */}
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6">
            My Room Allocations
          </h1>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-200 border border-gray-700 rounded-xl">
              <thead className="bg-gray-700 text-gray-100">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-600">Room Number</th>
                  <th className="px-4 py-3 border-b border-gray-600">Room Type</th>
                  <th className="px-4 py-3 border-b border-gray-600">Start Date</th>
                  <th className="px-4 py-3 border-b border-gray-600">End Date</th>
                </tr>
              </thead>
              <tbody>
                {allocations.length > 0 ? (
                  allocations.map((a) => (
                    <tr
                      key={a.id}
                      className="hover:bg-gray-700 transition-all cursor-pointer"
                    >
                      <td className="px-4 py-3 border-b border-gray-600">{a.room_number}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{a.room_type || "-"}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{formatDateIST(a.start_date)}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{formatDateIST(a.end_date)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-400 py-6 italic">
                      No room allocations found.
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
