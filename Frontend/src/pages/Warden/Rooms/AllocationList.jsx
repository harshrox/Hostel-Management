import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

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
      <div className="bg-gray-900 min-h-screen p-8">
        <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
              Room Allocations
            </h1>
            <button
              onClick={() => navigate("/warden/allocations/add")}
              className="flex items-center gap-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition cursor-pointer"
            >
              <Plus size={18} />
              Allocate Room
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-200 border border-gray-700 rounded-xl">
              <thead className="bg-gray-700 text-gray-100">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-600">Student</th>
                  <th className="px-4 py-3 border-b border-gray-600">Room</th>
                  <th className="px-4 py-3 border-b border-gray-600">Start Date</th>
                  <th className="px-4 py-3 border-b border-gray-600">End Date</th>
                  <th className="px-4 py-3 border-b border-gray-600 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allocations.length > 0 ? (
                  allocations.map((a) => (
                    <tr
                      key={a.id}
                      className="hover:bg-gray-700 transition-all cursor-pointer"
                    >
                      <td className="px-4 py-3 border-b border-gray-600">{a.student_username}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{a.room_number}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{a.start_date}</td>
                      <td className="px-4 py-3 border-b border-gray-600">{a.end_date || "-"}</td>
                      <td className="px-4 py-3 border-b border-gray-600 text-center">
                        <button
                          onClick={() => navigate(`/warden/allocations/edit/${a.id}`)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition cursor-pointer mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAllocation(a.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-400 italic"
                    >
                      No allocations found.
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
