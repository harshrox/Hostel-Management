import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddAllocation() {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    student_id: "",
    room_id: "",
    start_date: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    fetchRooms();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/accounts/users/?role=STUDENT");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms/rooms/");
      const available = res.data.filter((r) => !r.is_allocated);
      setRooms(available);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/rooms/allocations/", form);
      navigate("/warden/allocations");
    } catch (err) {
      console.error("Error creating allocation:", err.response?.data || err);
      setError("Failed to create allocation");
    }
  };

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
            Allocate Room
          </h2>

          {error && (
            <div className="text-red-500 text-sm mb-4 bg-red-900 bg-opacity-30 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="student_id"
              value={form.student_id}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.username} ({s.email})
                </option>
              ))}
            </select>

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

            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition cursor-pointer"
            >
              Allocate Room
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
