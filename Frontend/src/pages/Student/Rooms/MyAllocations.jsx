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

  // Format date in IST
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
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">My Room Allocation</h1>

        <div className="bg-white shadow rounded-xl p-6">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Room Number</th>
                <th className="px-4 py-2 border">Room Type</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{a.room_number}</td>
                  <td className="px-4 py-2 border">{a.room_type || "-"}</td>
                  <td className="px-4 py-2 border">{formatDateIST(a.start_date)}</td>
                  <td className="px-4 py-2 border">{formatDateIST(a.end_date)}</td>
                </tr>
              ))}
              {allocations.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-6">
                    No room allocations found
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
