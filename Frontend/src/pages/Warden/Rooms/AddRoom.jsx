import { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import { ArrowLeft } from "lucide-react";

export default function AddRoom() {
  const [form, setForm] = useState({
    number: "",
    room_type: "SINGLE",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/rooms/rooms/", form);
      navigate("/warden/rooms");
    } catch {
      setError("Failed to create room");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start py-12 px-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl">
          {/* Back Button */}
          <button
            onClick={() => navigate("/warden/rooms")}
            className="flex items-center gap-2 text-gray-100 mb-6 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft size={20} />
            Back to Rooms
          </button>

          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6 text-center">
            Add New Room
          </h2>

          {error && (
            <div className="text-red-500 text-sm mb-4 bg-red-900 bg-opacity-30 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="number"
              placeholder="Room Number"
              value={form.number}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <select
              name="room_type"
              value={form.room_type}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="SINGLE">Single</option>
              <option value="DOUBLE">Double</option>
              <option value="TRIPLE">Triple</option>
            </select>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition cursor-pointer"
            >
              Create Room
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
