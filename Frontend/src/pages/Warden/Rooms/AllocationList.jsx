import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

export default function AllocationList() {
  const [allocations, setAllocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    try {
      const res = await api.get("/rooms/allocations/");
      setAllocations(res.data);
    } catch (err) {
      console.error("Error fetching allocations:", err);
    }
  };

  const deleteAllocation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this allocation?")) return;
    try {
      await api.delete(`/rooms/allocations/${id}/`);
      setAllocations(allocations.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting allocation:", err);
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-6">
          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-semibold">Room Allocations</h1>
            <button
              onClick={() => navigate("/warden/allocations/add")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Allocate Room
            </button>
          </div>

          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Student</th>
                <th className="px-4 py-2 border">Room</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allocations.length > 0 ? (
                allocations.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{a.student_username}</td>
                    <td className="px-4 py-2 border">{a.room_number}</td>
                    <td className="px-4 py-2 border">{a.start_date}</td>
                    <td className="px-4 py-2 border">{a.end_date || "-"}</td>
                    <td className="px-4 py-2 border text-center">
                        <button
                            onClick={() => navigate(`/warden/allocations/edit/${a.id}`)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteAllocation(a.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    No allocations found
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
