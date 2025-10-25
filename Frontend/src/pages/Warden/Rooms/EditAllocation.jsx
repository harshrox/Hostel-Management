import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EditAllocation() {
  const { id } = useParams();
  const [allocation, setAllocation] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    room_id: "",
    end_date: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllocation();
    fetchRooms();
  }, []);

  const fetchAllocation = async () => {
    try {
      const res = await api.get(`/rooms/allocations/${id}/`);
      setAllocation(res.data);
      setForm({
        room_id: res.data.room_id,
        end_date: res.data.end_date || "",
      });
    } catch (err) {
      console.error("Error fetching allocation:", err);
      setError("Failed to load allocation");
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms/rooms/");
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/rooms/allocations/${id}/`, form);
      navigate("/warden/allocations");
    } catch (err) {
      console.error("Error updating allocation:", err.response?.data || err);
      setError("Failed to update allocation");
    }
  };

  if (!allocation)
    return (
      <Layout>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-300">
          Loading allocation...
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start py-12 px-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl">
          {/* Back Button */}
          <button
            onClick={() => navigate("/warden/allocations")}
            className="flex items-center gap-2 text-gray-100 mb-6 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft size={20} />
            Back to Allocations
          </button>

          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6 text-center">
            Edit Allocation
          </h2>

          {error && (
            <div className="text-red-500 text-sm mb-4 bg-red-900 bg-opacity-30 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-300">
              <strong className="text-gray-100">Student:</strong>{" "}
              {allocation.student}
            </p>

            <select
              name="room_id"
              value={form.room_id}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select Room</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.number} - {r.room_type}
                </option>
              ))}
            </select>

            <div>
              <label className="block text-gray-300 mb-1">End Date (optional)</label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition cursor-pointer"
            >
              Update Allocation
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
