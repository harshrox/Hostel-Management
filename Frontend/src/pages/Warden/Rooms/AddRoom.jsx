import { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";

export default function AddRoom() {
  const [form, setForm] = useState({
    number: "",
    room_type: "SINGLE",
    capacity: 1,
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
        <div className="bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-md w-96">
                <h2 className="text-xl font-semibold mb-4 text-center">Add New Room</h2>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="number"
                    placeholder="Room Number"
                    value={form.number}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <select
                    name="room_type"
                    value={form.room_type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="SINGLE">Single</option>
                    <option value="DOUBLE">Double</option>
                    <option value="TRIPLE">Triple</option>
                </select>
                <input
                    name="capacity"
                    type="number"
                    min="1"
                    value={form.capacity}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Create Room
                </button>
                </form>
            </div>
        </div>
    </Layout>
  );
}
