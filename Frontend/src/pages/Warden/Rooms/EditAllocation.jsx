import { useEffect, useState } from "react";
import api from "../../../services/api";
import Layout from "../../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAllocation() {
  const { id } = useParams(); // allocation ID from route
  const [allocation, setAllocation] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [endDate, setEndDate] = useState("");
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
      setSelectedRoom({ id: res.data.room_id, number: res.data.room });
      setEndDate(res.data.end_date || "");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRoom) return;

    const payload = {
      room_id: selectedRoom.id,
      end_date: endDate || null, // allow clearing end date
    };

    try {
      await api.patch(`/rooms/allocations/${id}/`, payload);
      navigate("/warden/allocations");
    } catch (err) {
      console.error("Error updating allocation:", err.response?.data || err);
      setError("Failed to update allocation");
    }
  };

  if (!allocation) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-xl shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Edit Allocation
          </h2>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <p>
              <strong>Student:</strong> {allocation.student}
            </p>

            <select
              name="room"
              value={selectedRoom?.id || ""}
              onChange={(e) =>
                setSelectedRoom(
                  rooms.find((r) => r.id === parseInt(e.target.value))
                )
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Room</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.number} - {r.room_type}
                </option>
              ))}
            </select>

            <label className="block">
              End Date (optional):
              <input
                type="date"
                name="end_date"
                value={endDate || ""}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Update Allocation
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
